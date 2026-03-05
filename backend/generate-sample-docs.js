const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, 'test-docs');
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// ─── COLOUR PALETTE ────────────────────────────────────────────────────────
const GREEN = '#2E7D32';
const YELLOW = '#F9A825';
const DARK = '#1A1A2E';
const WHITE = '#FFFFFF';
const LIGHT = '#F5F5F5';
const GREY = '#757575';
const BORDER = '#BDBDBD';

function hr(doc, y, color = BORDER) {
    doc.moveTo(40, y).lineTo(555, y).strokeColor(color).lineWidth(0.5).stroke();
}

function tableRow(doc, y, cols, widths, isHeader = false, isNeg = false, color = DARK) {
    const bg = isHeader ? color : (isNeg ? '#FFF3F3' : WHITE);
    doc.rect(40, y, 515, 18).fill(bg);
    let x = 40;
    cols.forEach((cell, i) => {
        doc.fillColor(isHeader ? WHITE : (isNeg ? '#D32F2F' : '#212121'))
            .fontSize(8)
            .font(isHeader ? 'Helvetica-Bold' : 'Helvetica')
            .text(String(cell), x + 4, y + 5, { width: widths[i] - 8, align: i === 0 ? 'left' : 'right' });
        x += widths[i];
    });
}

// =========================================================================
// ACCEPT SCENARIO (Low Risk) - PrimeWealth Finance Ltd.
// =========================================================================
async function generateAcceptDocs() {
    const doc = new PDFDocument({ size: 'A4', margins: { top: 40, bottom: 40, left: 40, right: 40 } });
    const filePath = path.join(OUTPUT_DIR, 'primewealth_financials.pdf');
    const writeStream = fs.createWriteStream(filePath);
    doc.pipe(writeStream);
    const finishPromise = new Promise(resolve => writeStream.on('finish', resolve));

    // Header
    doc.rect(0, 0, 595, 80).fill(GREEN);
    doc.fillColor(WHITE).fontSize(22).font('Helvetica-Bold').text('PRIMEWEALTH FINANCE LTD', 40, 20);
    doc.fontSize(11).font('Helvetica').text('Audited Financial Statement  |  FY2023  |  ₹ in Crore', 40, 48);

    doc.fillColor(DARK).fontSize(13).font('Helvetica-Bold').text('PROFIT & LOSS STATEMENT', 40, 110);
    hr(doc, 125, GREEN);

    const plHeaders = ['Particulars', 'FY2023 (₹ Cr)'];
    const plWidths = [415, 100];
    tableRow(doc, 130, plHeaders, plWidths, true, false, GREEN);

    const plRows = [
        ['Total Revenue', '85,420', false],
        ['Operating Expenses', '42,100', false],
        ['EBITDA', '43,320', false],
        ['Profit Before Tax', '16,800', false],
        ['NET PROFIT / (LOSS)', '12,500', false],
    ];

    let y = 148;
    plRows.forEach(([label, a, isNeg]) => {
        tableRow(doc, y, [label, a], plWidths, false, isNeg);
        y += 18;
    });

    y += 30;
    doc.fillColor(DARK).fontSize(13).font('Helvetica-Bold').text('BALANCE SHEET SUMMARY', 40, y);
    y += 15;
    hr(doc, y, GREEN); y += 5;

    tableRow(doc, y, ['Particulars', 'FY2023'], plWidths, true, false, GREEN); y += 18;

    const bsRows = [
        ['Net Worth', '55,400', false],
        ['Total Borrowings', '44,320', false],
        ['Gross NPA Ratio (%)', '0.50%', false],
        ['Capital Adequacy Ratio (%)', '19.40%', false],
        ['Debt-to-Equity Ratio', '0.8x', false],
    ];

    bsRows.forEach(([label, a, isNeg]) => {
        tableRow(doc, y, [label, a], plWidths, false, isNeg);
        y += 18;
    });

    doc.end();
    await finishPromise;
    console.log('✅ Generated: primewealth_financials.pdf (ACCEPT SCENARIO)');
}

// =========================================================================
// CONDITIONAL SCENARIO (Medium Risk) - UrbanInfra Developers
// =========================================================================
async function generateConditionalDocs() {
    const doc = new PDFDocument({ size: 'A4', margins: { top: 40, bottom: 40, left: 40, right: 40 } });
    const filePath = path.join(OUTPUT_DIR, 'urbaninfra_financials.pdf');
    const writeStream = fs.createWriteStream(filePath);
    doc.pipe(writeStream);
    const finishPromise = new Promise(resolve => writeStream.on('finish', resolve));

    // Header
    doc.rect(0, 0, 595, 80).fill(YELLOW);
    doc.fillColor(DARK).fontSize(22).font('Helvetica-Bold').text('URBANINFRA DEVELOPERS', 40, 20);
    doc.fontSize(11).font('Helvetica').text('Audited Financial Statement  |  FY2023  |  ₹ in Crore', 40, 48);

    doc.fillColor(DARK).fontSize(13).font('Helvetica-Bold').text('PROFIT & LOSS STATEMENT', 40, 110);
    hr(doc, 125, YELLOW);

    const plHeaders = ['Particulars', 'FY2023 (₹ Cr)'];
    const plWidths = [415, 100];
    tableRow(doc, 130, plHeaders, plWidths, true, false, YELLOW);

    const plRows = [
        ['Total Revenue', '4,500', false],
        ['Operating Expenses', '3,900', false],
        ['EBITDA', '600', false],
        ['Profit Before Tax', '450', false],
        ['NET PROFIT / (LOSS)', '350', false],
    ];

    let y = 148;
    plRows.forEach(([label, a, isNeg]) => {
        tableRow(doc, y, [label, a], plWidths, false, isNeg);
        y += 18;
    });

    y += 30;
    doc.fillColor(DARK).fontSize(13).font('Helvetica-Bold').text('BALANCE SHEET SUMMARY', 40, y);
    y += 15;
    hr(doc, y, YELLOW); y += 5;

    tableRow(doc, y, ['Particulars', 'FY2023'], plWidths, true, false, YELLOW); y += 18;

    const bsRows = [
        ['Net Worth', '2,100', false],
        ['Total Borrowings', '9,450', false], // ~4.5x D/E
        ['Gross NPA Ratio (%)', '3.1%', false],
        ['Capital Adequacy Ratio (%)', '12.0%', false],
        ['Debt-to-Equity Ratio', '4.5x', false],
    ];

    bsRows.forEach(([label, a, isNeg]) => {
        tableRow(doc, y, [label, a], plWidths, false, isNeg);
        y += 18;
    });

    doc.end();
    await finishPromise;
    console.log('✅ Generated: urbaninfra_financials.pdf (CONDITIONAL SCENARIO)');
}

async function generateAcceptBankStatement() {
    const doc = new PDFDocument({ size: 'A4', margins: { top: 40, bottom: 40, left: 40, right: 40 } });
    const filePath = path.join(OUTPUT_DIR, 'primewealth_bank_statement.pdf');
    const writeStream = fs.createWriteStream(filePath);
    doc.pipe(writeStream);
    const finishPromise = new Promise(resolve => writeStream.on('finish', resolve));

    doc.rect(0, 0, 595, 80).fill(GREEN);
    doc.fillColor(WHITE).fontSize(20).font('Helvetica-Bold').text('PRIMEWEALTH FINANCE LTD — BANK STATEMENT', 40, 18);

    doc.fillColor(DARK).fontSize(12).font('Helvetica-Bold').text('TRANSACTION STATEMENT', 40, 120);
    const headers = ['Date', 'Description', 'Debit (₹ Cr)', 'Credit (₹ Cr)', 'Balance (₹ Cr)'];
    const widths = [60, 215, 80, 80, 80];
    tableRow(doc, 135, headers, widths, true, false, GREEN);

    const txns = [
        ['Apr 2023', 'Opening Balance', '', '', '12,500'],
        ['May 2023', 'Loan EMIs Received', '', '4,200', '16,700'],
        ['Jun 2023', 'Operating Expenses', '1,100', '', '15,600'],
        ['Jul 2023', 'Wholesale Borrowing Drawdown', '', '2,500', '18,100'],
        ['Aug 2023', 'Loan Disbursements', '5,000', '', '13,100'],
        ['Sep 2023', 'Tax Payment (Q2 Advance)', '800', '', '12,300']
    ];
    let y = 153;
    txns.forEach(row => { tableRow(doc, y, row, widths, false, false, GREEN); y += 18; });
    doc.end(); await finishPromise;
    console.log('✅ Generated: primewealth_bank_statement.pdf');
}

async function generateAcceptGST() {
    const data = [
        'GSTIN,27AAACP8888Z1Z9',
        'Legal Name,PRIMEWEALTH FINANCE LTD',
        'Total Turnover,85420.00',
        'Net GST Payable,15375.00',
        'GST Paid (Cash),15375.00'
    ].join('\\n');
    fs.writeFileSync(path.join(OUTPUT_DIR, 'primewealth_gst_return.csv'), data);
    console.log('✅ Generated: primewealth_gst_return.csv');
}

async function generateAcceptITR() {
    const doc = new PDFDocument({ size: 'A4', margins: { top: 40, bottom: 40, left: 40, right: 40 } });
    const filePath = path.join(OUTPUT_DIR, 'primewealth_itr_filing.pdf');
    const writeStream = fs.createWriteStream(filePath);
    doc.pipe(writeStream);
    const finishPromise = new Promise(resolve => writeStream.on('finish', resolve));

    doc.rect(0, 0, 595, 80).fill(GREEN);
    doc.fillColor(WHITE).fontSize(20).font('Helvetica-Bold').text('INCOME TAX RETURN — PRIMEWEALTH', 40, 18);

    doc.fillColor(DARK).fontSize(13).font('Helvetica-Bold').text('INCOME & TAX COMPUTATION', 40, 120);
    const rows = [
        ['Gross Total Income', '16,800.00'],
        ['Tax Payable', '4,200.00'],
        ['Taxes Paid', '4,200.00'],
        ['Refund Due', '0.00']
    ];
    let y = 140;
    rows.forEach(row => { tableRow(doc, y, row, [300, 215], false, false, GREEN); y += 18; });

    doc.end(); await finishPromise;
    console.log('✅ Generated: primewealth_itr_filing.pdf');
}

async function generateConditionalBankStatement() {
    const doc = new PDFDocument({ size: 'A4', margins: { top: 40, bottom: 40, left: 40, right: 40 } });
    const filePath = path.join(OUTPUT_DIR, 'urbaninfra_bank_statement.pdf');
    const writeStream = fs.createWriteStream(filePath);
    doc.pipe(writeStream);
    const finishPromise = new Promise(resolve => writeStream.on('finish', resolve));

    doc.rect(0, 0, 595, 80).fill(YELLOW);
    doc.fillColor(DARK).fontSize(20).font('Helvetica-Bold').text('URBANINFRA DEVELOPERS — BANK STATEMENT', 40, 18);

    doc.fillColor(DARK).fontSize(12).font('Helvetica-Bold').text('TRANSACTION STATEMENT', 40, 120);
    const headers = ['Date', 'Description', 'Debit (₹ Cr)', 'Credit (₹ Cr)', 'Balance (₹ Cr)'];
    const widths = [60, 215, 80, 80, 80];
    tableRow(doc, 135, headers, widths, true, false, YELLOW);

    const txns = [
        ['Apr 2023', 'Opening Balance', '', '', '240'],
        ['May 2023', 'Project Milestone Received', '', '600', '840'],
        ['Jun 2023', 'Supplier Payments', '450', '', '390'],
        ['Jul 2023', 'Debt Servicing (Interest)', '120', '', '270'],
        ['Aug 2023', 'Contractor Payments', '200', '', '70'],
        ['Sep 2023', 'Working Capital Loan Tranche', '', '300', '370']
    ];
    let y = 153;
    txns.forEach(row => { tableRow(doc, y, row, widths, false, false, YELLOW); y += 18; });
    doc.end(); await finishPromise;
    console.log('✅ Generated: urbaninfra_bank_statement.pdf');
}

async function generateConditionalGST() {
    const data = [
        'GSTIN,27AADCU1234E1Z5',
        'Legal Name,URBANINFRA DEVELOPERS',
        'Total Turnover,4500.00',
        'Net GST Payable,810.00',
        'GST Paid (Cash),750.00',
        'GST Paid (ITC),60.00'
    ].join('\\n');
    fs.writeFileSync(path.join(OUTPUT_DIR, 'urbaninfra_gst_return.csv'), data);
    console.log('✅ Generated: urbaninfra_gst_return.csv');
}

async function generateConditionalITR() {
    const doc = new PDFDocument({ size: 'A4', margins: { top: 40, bottom: 40, left: 40, right: 40 } });
    const filePath = path.join(OUTPUT_DIR, 'urbaninfra_itr_filing.pdf');
    const writeStream = fs.createWriteStream(filePath);
    doc.pipe(writeStream);
    const finishPromise = new Promise(resolve => writeStream.on('finish', resolve));

    doc.rect(0, 0, 595, 80).fill(YELLOW);
    doc.fillColor(DARK).fontSize(20).font('Helvetica-Bold').text('INCOME TAX RETURN — URBANINFRA', 40, 18);

    doc.fillColor(DARK).fontSize(13).font('Helvetica-Bold').text('INCOME & TAX COMPUTATION', 40, 120);
    const rows = [
        ['Gross Total Income', '450.00'],
        ['Tax Payable', '112.50'],
        ['Taxes Paid', '112.50'],
        ['Refund Due', '0.00']
    ];
    let y = 140;
    rows.forEach(row => { tableRow(doc, y, row, [300, 215], false, false, YELLOW); y += 18; });

    doc.end(); await finishPromise;
    console.log('✅ Generated: urbaninfra_itr_filing.pdf');
}

(async () => {
    console.log('\\n--- Generating Accept Scenario Docs ---');
    await generateAcceptDocs();
    await generateAcceptBankStatement();
    await generateAcceptGST();
    await generateAcceptITR();

    console.log('\\n--- Generating Conditional Scenario Docs ---');
    await generateConditionalDocs();
    await generateConditionalBankStatement();
    await generateConditionalGST();
    await generateConditionalITR();

    console.log('\\n✅ All Documents for Accept and Conditional scenarios generated successfully!');
})();
