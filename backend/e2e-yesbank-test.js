const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const path = require('path');

const docsDir = path.join(__dirname, 'test-docs');

async function runTest() {
    console.log('--- STARTING YES BANK END-TO-END TEST ---');

    try {
        // 1. Login
        console.log('1. Logging in...');
        const loginRes = await axios.post('http://localhost:5000/api/auth/login', {
            email: 'analyst@creditforge.com',
            password: 'password123'
        });
        const token = loginRes.data.token;
        const authHeaders = { headers: { Authorization: `Bearer ${token}` } };
        console.log('   ✅ Logged in successfully.');

        // 2. Create Application
        console.log('\n2. Creating new YES BANK application...');
        const appData = {
            companyName: 'YES BANK LIMITED',
            pan: 'AAACY3786J',
            gstin: '27AAACY3786J1Z3',
            cin: 'L65190MH2003PLC145908',
            loanAmount: 5000000000,
            loanPurpose: 'Working capital and NPA resolution fund',
            sector: 'BFSI / Banking'
        };
        const appRes = await axios.post('http://localhost:5000/api/applications', appData, authHeaders);
        const appId = appRes.data.application.id;
        console.log(`   ✅ App created with ID: ${appId}`);

        // 3. Upload Documents
        console.log('\n3. Uploading exact distilled distress PDFs...');

        // We must map internal API file fields to our files
        // Looking at application.routes.js:
        // { name: 'financials', maxCount: 1 },
        // { name: 'bankStatements', maxCount: 3 },
        // { name: 'gstReturns', maxCount: 3 },
        // { name: 'itr', maxCount: 3 },
        // { name: 'other', maxCount: 5 }

        const form = new FormData();
        form.append('documents', fs.createReadStream(path.join(docsDir, 'yesbank_financial_statement.pdf')));
        form.append('documents', fs.createReadStream(path.join(docsDir, 'yesbank_bank_statement.pdf')));

        // GST might be CSV
        if (fs.existsSync(path.join(docsDir, 'yesbank_gst_return.csv'))) {
            form.append('documents', fs.createReadStream(path.join(docsDir, 'yesbank_gst_return.csv')));
        }

        // ITR
        if (fs.existsSync(path.join(docsDir, 'yesbank_itr_filing.pdf'))) {
            form.append('documents', fs.createReadStream(path.join(docsDir, 'yesbank_itr_filing.pdf')));
        }

        const uploadHeaders = {
            headers: {
                ...form.getHeaders(),
                Authorization: `Bearer ${token}`
            }
        };

        await axios.post(`http://localhost:5000/api/applications/${appId}/documents`, form, uploadHeaders);
        console.log('   ✅ Documents uploaded successfully.');

        // 4. Run Analysis
        console.log('\n4. Running thorough Risk Analysis (may take 20s+)...');
        const analyzeRes = await axios.post(`http://localhost:5000/api/applications/${appId}/analyze`, {}, authHeaders);

        console.log('\n--- ANALYSIS COMPLETE ---');
        const analysis = analyzeRes.data.companyAnalysis;
        console.log('\nExtracted Financials:');
        console.log('  Net Worth:', analysis.netWorth);
        console.log('  Net Profit:', analysis.netProfit);
        console.log('  Total Debt:', analysis.totalDebt);
        console.log('  Debt-to-Equity:', analysis.debtToEquity);

        const risk = analyzeRes.data.riskScore;
        console.log('\nRisk Engine Results:');
        console.log(`  Composite Score: ${risk.compositeScore} / 100`);
        console.log(`  Risk Level:      ${risk.riskLevel}`);
        console.log(`  RECOMMENDATION:  ${risk.recommendation}`);

        console.log('\nDeductions triggered:');
        risk.deductions.forEach(d => console.log(`  ❌ ${d.factor}: -${d.points} pts (${d.reason})`));

    } catch (err) {
        console.error('\n❌ ERROR:', err.response?.data?.error || err.response?.data || err.message);
    }
}

runTest();
