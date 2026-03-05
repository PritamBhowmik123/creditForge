const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function testReject() {
    const settings = await prisma.settings.findFirst();
    console.log('--- DB connection established ---');

    const app = await prisma.application.findFirst({
        where: { companyName: { contains: 'YES BANK' } },
        include: {
            companyAnalysis: true,
            aiResearch: true,
            riskScore: true
        }
    });

    if (!app) {
        console.log('No Yes Bank app found');
        return;
    }

    console.log(`Testing App: ${app.id} - ${app.companyName}`);
    console.log('Current status:', app.status);
    console.log('Current Risk Score:', app.aiScore);

    console.log('\n--- Clearing manual overrides ---');
    await prisma.companyAnalysis.update({
        where: { applicationId: app.id },
        data: { financialOverrides: null }
    });
    console.log('Overrides cleared.');

    // Let's trigger the re-run via a quick axios call
    const axios = require('axios');

    // Login to get token
    const loginRes = await axios.post('http://localhost:5000/api/auth/login', {
        email: 'analyst@creditforge.com',
        password: 'password123'
    });
    const token = loginRes.data.token;

    console.log('\n--- Triggering Re-Run Analysis ---');
    try {
        const rerunRes = await axios.post(`http://localhost:5000/api/applications/${app.id}/rerun-analysis`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        });

        const risk = rerunRes.data.riskScore;
        console.log('\n✅ RESULT CHECK:');
        console.log('Score:', risk.compositeScore);
        console.log('Risk Level:', risk.riskLevel);
        console.log('Recommendation:', risk.recommendation);

        console.log('\nDeductions triggered:');
        risk.deductions.forEach(d => console.log(`- ${d.factor}: ${d.points} pts (${d.reason})`));

    } catch (err) {
        console.log('Error triggering rerun:', err.response?.data || err.message);
    }
}

testReject().then(() => process.exit(0));
