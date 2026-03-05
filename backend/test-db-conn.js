const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('Connecting to Prisma...');
    try {
        const test = await prisma.$queryRaw`SELECT 1 as result`;
        console.log('SUCCESS:', test);
        process.exit(0);
    } catch (e) {
        console.error('ERROR:', e.message);
        process.exit(1);
    }
}

main();
