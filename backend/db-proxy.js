const net = require('net');
const dns = require('dns');

// Configure DNS to use Google
// dns.setServers(['8.8.8.8', '8.8.4.4']);

const LOCAL_PORT = 5433; // Use 5433 to avoid conflict
const REMOTE_HOST = 'ep-rough-water-a1f60bcx.ap-southeast-1.aws.neon.tech';
const REMOTE_PORT = 5432;

console.log(`Starting Database Proxy on localhost:${LOCAL_PORT} -> ${REMOTE_HOST}:${REMOTE_PORT}`);

const server = net.createServer((socket) => {
    console.log('New connection from client');

    // Resolve remote host using public DNS (forcing IPv4)
    dns.lookup(REMOTE_HOST, { family: 4 }, (err, address) => {
        if (err) {
            console.error('DNS Lookup Failed:', err);
            socket.destroy();
            return;
        }

        console.log(`Resolved ${REMOTE_HOST} to ${address}. Connecting...`);

        const remoteSocket = net.connect(REMOTE_PORT, address, () => {
            console.log('Connected to remote database');
            socket.pipe(remoteSocket);
            remoteSocket.pipe(socket);
        });

        remoteSocket.on('data', (data) => {
            // console.log(`Data from remote: ${data.length} bytes`);
        });

        socket.on('data', (data) => {
            // console.log(`Data from client: ${data.length} bytes`);
        });

        remoteSocket.on('error', (err) => {
            console.error('Remote Socket Error:', err.message);
            socket.destroy();
        });

        socket.on('error', (err) => {
            console.error('Client Socket Error:', err.message);
            remoteSocket.destroy();
        });

        socket.on('close', () => {
            console.log('Client connection closed');
            remoteSocket.destroy();
        });
        remoteSocket.on('close', () => {
            console.log('Remote connection closed');
            socket.destroy();
        });
    });
});

server.listen(LOCAL_PORT, '0.0.0.0', () => {
    console.log(`Proxy is listening on 0.0.0.0:${LOCAL_PORT}`);
});
