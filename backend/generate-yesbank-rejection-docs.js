/**
 * YES BANK — Distressed Financial Documents Generator
 * Generates documents with real-world Yes Bank crisis metrics (FY2018-2020)
 * that should trigger REJECTED decision in CreditForge
 *
 * Key Distress Signals:
 * - Net NPA: 16.8% (critically high)
 * - Net Loss: ₹-16,418 Cr (FY2020)
 * - Revenue declining 3 years in a row
 * - Debt/Equity: 18.5x (dangerously high)
 * - Under RBI Moratorium (regulatory action)
 * - Multiple ED/CBI investigations
 */

const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, 'test-docs');
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// ─── COLOUR PALETTE ────────────────────────────────────────────────────────
const RED = '#D32F2F';
const DARK = '#1A1A2E';
const WHITE = '#FFFFFF';
const LIGHT = '#F5F5F5';
const GREY = '#757575';
const WARN = '#FF6B35';
const BORDER = '#BDBDBD';

// ─── HELPERS ───────────────────────────────────────────────────────────────
function hr(doc, y, color = BORDER) {
    doc.moveTo(40, y).lineTo(555, y).strokeColor(color).lineWidth(0.5).stroke();
}

function tableRow(doc, y, cols, widths, isHeader = false, isNeg = false) {
    const bg = isHeader ? RED : (isNeg ? '#FFF3F3' : WHITE);
    doc.rect(40, y, 515, 18).fill(bg);
    let x = 40;
    cols.forEach((cell, i) => {
        doc.fillColor(isHeader ? WHITE : (isNeg ? RED : '#212121'))
            .fontSize(8)
            .font(isHeader ? 'Helvetica-Bold' : 'Helvetica')
            .text(String(cell), x + 4, y + 5, { width: widths[i] - 8, align: i === 0 ? 'left' : 'right' });
        x += widths[i];
    });
}

// ══════════════════════════════════════════════════════════════════════════════
// 1. FINANCIAL STATEMENT — Distressed P&L + Balance Sheet
// ══════════════════════════════════════════════════════════════════════════════
async function generateFinancialStatement() {
    const doc = new PDFDocument({ size: 'A4', margins: { top: 40, bottom: 40, left: 40, right: 40 } });
    const filePath = path.join(OUTPUT_DIR, 'yesbank_financial_statement.pdf');
    const writeStream = fs.createWriteStream(filePath);
    doc.pipe(writeStream);

    const finishPromise = new Promise(resolve => writeStream.on('finish', resolve));

    // Header
    doc.rect(0, 0, 595, 80).fill(RED);
    doc.fillColor(WHITE).fontSize(22).font('Helvetica-Bold').text('YES BANK LIMITED', 40, 20);
    doc.fontSize(11).font('Helvetica').text('Consolidated Financial Statement  |  FY2018 – FY2020  |  ₹ in Crore', 40, 48);
    doc.fillColor(WHITE).fontSize(9).text('CIN: L65190MH2003PLC145908  |  PAN: AAACY3786J  |  BSE: 532648', 40, 62);

    // WARNING BOX
    doc.rect(40, 90, 515, 35).fill('#FFF3F3').stroke(RED);
    doc.fillColor(RED).fontSize(10).font('Helvetica-Bold')
        .text('⚠ MATERIAL RISK WARNING: Company placed under RBI Moratorium — March 2020. Significant NPA, capital adequacy breach & regulatory investigations.', 50, 98, { width: 495 });

    // P&L Summary
    doc.fillColor(DARK).fontSize(13).font('Helvetica-Bold').text('PROFIT & LOSS STATEMENT', 40, 140);
    hr(doc, 155, RED);

    const plHeaders = ['Particulars', 'FY2020 (₹ Cr)'];
    const plWidths = [415, 100];
    tableRow(doc, 160, plHeaders, plWidths, true);

    const plRows = [
        ['Net Interest Income', '2,514', false],
        ['Other Income', '1,210', false],
        ['Total Revenue', '3,724', false],
        ['Operating Expenses', '5,210', false],
        ['EBITDA', '-1,486', true],
        ['Provisions & Write-offs', '21,087', true],
        ['Profit Before Tax', '-22,573', true],
        ['Tax', '0', false],
        ['NET PROFIT / (LOSS)', '-22,573', true],
    ];

    let y = 178;
    plRows.forEach(([label, a, isNeg]) => {
        tableRow(doc, y, [label, a], plWidths, false, isNeg);
        y += 18;
    });

    // Balance Sheet
    y += 20;
    doc.fillColor(DARK).fontSize(13).font('Helvetica-Bold').text('BALANCE SHEET SUMMARY', 40, y);
    y += 15;
    hr(doc, y, RED); y += 5;

    const bsHeaders = ['Particulars', 'FY2020'];
    tableRow(doc, y, bsHeaders, plWidths, true); y += 18;

    const bsRows = [
        ['Equity Share Capital', '2,352', false],
        ['Reserves & Surplus', '-7,400', true],
        ['Net Worth', '-5,048', true],
        ['Total Borrowings', '2,29,000', false],
        ['Gross NPA Amount', '52,550', true],
        ['Gross NPA Ratio (%)', '16.80%', true],
        ['Net NPA Ratio (%)', '5.03%', true],
        ['Capital Adequacy Ratio (%)', '6.30%', true],
        ['Debt-to-Equity Ratio', 'N/A (neg)', true],
    ];

    bsRows.forEach(([label, a, isNeg]) => {
        tableRow(doc, y, [label, a], plWidths, false, isNeg);
        y += 18;
    });

    // Key Ratios
    y += 20;
    doc.fillColor(DARK).fontSize(13).font('Helvetica-Bold').text('KEY FINANCIAL RATIOS', 40, y);
    y += 15;
    hr(doc, y, RED); y += 5;

    const ratioHeaders = ['Ratio', 'FY2020', 'Status'];
    const ratioWidths = [275, 100, 140];
    tableRow(doc, y, ratioHeaders, ratioWidths, true); y += 18;

    const ratios = [
        ['Return on Equity (%)', '-N/A', '⛔ Critical'],
        ['Return on Assets (%)', '-4.9%', '⛔ Critical'],
        ['CASA Ratio (%)', '26.6%', '⚠ Declining'],
        ['Provision Coverage (%)', '14.5%', '⛔ Critical'],
        ['CET-1 Capital Ratio (%)', '0.6%', '⛔ RBI Breach'],
        ['Credit Cost (%)', '11.4%', '⛔ Critical'],
    ];

    ratios.forEach(([label, a, status]) => {
        const isNeg = status.includes('Critical');
        tableRow(doc, y, [label, a, status], ratioWidths, false, isNeg);
        y += 18;
    });

    // Footer
    doc.rect(0, 795, 595, 50).fill(RED);
    doc.fillColor(WHITE).fontSize(8).font('Helvetica')
        .text('CONFIDENTIAL — For Credit Assessment via CreditForge AI  |  Data based on Yes Bank audited financials FY2020  |  RBI Moratorium: March 5, 2020', 40, 808, { align: 'center', width: 515 });

    doc.end();
    await finishPromise;
    console.log('✅ Generated: yesbank_financial_statement.pdf');
}

// ══════════════════════════════════════════════════════════════════════════════
// 2. BANK STATEMENT — Severely stressed cash flows
// ══════════════════════════════════════════════════════════════════════════════
async function generateBankStatement() {
    const doc = new PDFDocument({ size: 'A4', margins: { top: 40, bottom: 40, left: 40, right: 40 } });
    const filePath = path.join(OUTPUT_DIR, 'yesbank_bank_statement.pdf');
    const writeStream = fs.createWriteStream(filePath);
    doc.pipe(writeStream);
    const finishPromise = new Promise(resolve => writeStream.on('finish', resolve));

    // Header
    doc.rect(0, 0, 595, 80).fill(RED);
    doc.fillColor(WHITE).fontSize(20).font('Helvetica-Bold').text('YES BANK LIMITED — BANK STATEMENT', 40, 18);
    doc.fontSize(10).font('Helvetica').text('Account No: 0002300045122990  |  Period: Apr 2019 – Mar 2020  |  ₹ in Crore', 40, 44);
    doc.fontSize(9).text('Branch: Mumbai Fort Main Branch  |  IFS Code: YESB0000026', 40, 60);

    // Account Info
    doc.rect(40, 90, 515, 60).fill(LIGHT);
    doc.fillColor(DARK).fontSize(9).font('Helvetica-Bold')
        .text('Account Holder: YES BANK LIMITED (Treasury)', 50, 98)
        .text('Opening Balance: ₹18,240 Cr  |  Closing Balance: ₹2,104 Cr  |  Net Change: -₹16,136 Cr', 50, 112)
        .text('ALERT: 3 Cheque Returns (insufficient funds)  |  4 RBI penalty debits  |  Under RBI Moratorium from Mar 2020', 50, 126);

    // Table
    doc.fillColor(DARK).fontSize(12).font('Helvetica-Bold').text('TRANSACTION STATEMENT', 40, 165);
    hr(doc, 178, RED);

    const headers = ['Date', 'Description', 'Debit (₹ Cr)', 'Credit (₹ Cr)', 'Balance (₹ Cr)'];
    const widths = [60, 215, 80, 80, 80];

    let y = 183;
    tableRow(doc, y, headers, widths, true); y += 18;

    const txns = [
        ['Apr 2019', 'Opening Balance (FY2020)', '', '', '18,240'],
        ['Apr 2019', 'Corporate loan disbursement — Anil Ambani Group', '2,400', '', '15,840'],
        ['May 2019', 'Retail deposits inflow', '', '1,800', '17,640'],
        ['Jun 2019', 'RBI penalty — Governance violation', '1,450', '', '16,190'],
        ['Jul 2019', 'DHFL loan exposure write-off', '3,700', '', '12,490'],
        ['Aug 2019', 'YES FDMC bond repayment', '2,100', '', '10,390'],
        ['Sep 2019', 'Deposit withdrawal surge', '4,200', '', '6,190'],
        ['Oct 2019', 'Loans to stressed telecom cos', '1,890', '', '4,300'],
        ['Nov 2019', 'Operating inflows (NII)', '', '940', '5,240'],
        ['Dec 2019', 'IL&FS exposure provision', '2,800', '', '2,440'],
        ['Jan 2020', 'RBI inspection penalty', '180', '', '2,260'],
        ['Feb 2020', 'Customer withdrawals (bank run)', '1,940', '', '320'],
        ['Feb 2020', '⚠ Cheque bounce — NSF', '320', '', '0'],
        ['Mar 2020', 'RBI Moratorium imposed — withdrawals frozen', '', '2,104', '2,104'],
    ];

    const negRows = new Set([0, 1, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13]);
    txns.forEach(([date, desc, debit, credit, bal], i) => {
        const isNeg = debit !== '' || desc.includes('⚠') || desc.includes('Moratorium');
        tableRow(doc, y, [date, desc, debit, credit, bal], widths, false, isNeg);
        y += 18;
    });

    // Summary
    y += 10;
    doc.rect(40, y, 515, 90).fill('#FFF3F3').stroke(RED);
    doc.fillColor(RED).fontSize(10).font('Helvetica-Bold').text('ACCOUNT SUMMARY — DISTRESS INDICATORS', 50, y + 8);
    doc.fillColor(DARK).fontSize(9).font('Helvetica')
        .text(`Total Credits:  ₹4,844 Cr`, 50, y + 22)
        .text(`Total Debits:   ₹20,980 Cr`, 50, y + 36)
        .text(`Net Cash Flow:  ₹-16,136 Cr  ⛔ SEVERELY NEGATIVE`, 50, y + 50)
        .text(`Credit-to-Debit Ratio: 0.23x  (Healthy benchmark: >1.2x)`, 50, y + 64)
        .text(`Cheque Returns: 3  |  Regulatory Penalties: 4  |  Moratorium: YES`, 50, y + 78);

    doc.end();
    await finishPromise;
    console.log('✅ Generated: yesbank_bank_statement.pdf');
}

// ══════════════════════════════════════════════════════════════════════════════
// 3. GST RETURN — Declining turnover
// ══════════════════════════════════════════════════════════════════════════════
async function generateGSTReturn() {
    const data = [
        'GSTIN,27AAACY3786J1Z3',
        'Legal Name,YES BANK LIMITED',
        'Trade Name,YES BANK',
        'Return Period,April 2019 to March 2020',
        'Filing Date,18-06-2020',
        'Status,FILED (WITH NOTICES)',
        '',
        'Financial Summary (₹ in Crore)',
        'Total Turnover,3724.00',
        'Taxable Turnover,2890.00',
        'Zero Rated Exports,0.00',
        'Nil Rated,834.00',
        '',
        'GST Liability',
        'CGST Payable,234.00',
        'SGST Payable,234.00',
        'IGST Payable,412.00',
        'Total GST Payable,880.00',
        'ITC Available,695.00',
        'Net GST Payable,185.00',
        'GST Paid (Cash),185.00',
        'GST Paid (Credit),0.00',
        '',
        'Prior Year Comparison',
        'FY2019 Turnover,9127.00',
        'FY2020 Turnover,3724.00',
        'YoY Decline %,-59.2%',
        '',
        'Compliance Notices',
        'Notice Type 1,GSTR-3B Mismatch (FY2020)',
        'Notice Type 2,Input Tax Credit Reversal Demand',
        'Penalty Amount Disputed,28.40',
        '',
        'TDS/TCS',
        'TDS Deducted,0.00',
        'TCS Collected,0.00',
    ].join('\n');

    fs.writeFileSync(path.join(OUTPUT_DIR, 'yesbank_gst_return.csv'), data);
    console.log('✅ Generated: yesbank_gst_return.csv');
}

// ══════════════════════════════════════════════════════════════════════════════
// 4. ITR FILING — Multi-year net loss
// ══════════════════════════════════════════════════════════════════════════════
async function generateITRFiling() {
    const doc = new PDFDocument({ size: 'A4', margins: { top: 40, bottom: 40, left: 40, right: 40 } });
    const filePath = path.join(OUTPUT_DIR, 'yesbank_itr_filing.pdf');
    const writeStream = fs.createWriteStream(filePath);
    doc.pipe(writeStream);
    const finishPromise = new Promise(resolve => writeStream.on('finish', resolve));

    doc.rect(0, 0, 595, 75).fill(RED);
    doc.fillColor(WHITE).fontSize(18).font('Helvetica-Bold').text('INCOME TAX RETURN — YES BANK LIMITED', 40, 20);
    doc.fontSize(10).font('Helvetica').text('ITR-6  |  Assessment Year: 2020-21  |  PAN: AAACY3786J  |  Filed: 30-Nov-2020', 40, 46);
    doc.fontSize(9).text('Note: Filed under RBI Reconstruction Scheme — Under Banking Regulation Act Section 45', 40, 62);

    let y = 95;
    doc.fillColor(DARK).fontSize(13).font('Helvetica-Bold').text('INCOME & TAX COMPUTATION', 40, y); y += 18;
    hr(doc, y, RED); y += 5;

    const rows = [
        ['Particulars', 'FY2019-20 (₹ Cr)'],
        ['Gross Total Income', '3,724.00'],
        ['Less: Provisions (NPA)', '21,087.00'],
        ['Net Income / (Loss)', '(22,573.00)'],
        ['Tax Payable', 'NIL'],
        ['Brought Forward Losses', '(9,153.00)'],
        ['Carried Forward Losses', '(31,726.00)'],
    ];

    rows.forEach((row, i) => {
        const isHeader = i === 0;
        const isNeg = row[1].includes('(');
        doc.rect(40, y, 515, 18).fill(isHeader ? RED : (isNeg ? '#FFF3F3' : WHITE));
        const widths = [300, 215];
        let x = 40;
        row.forEach((cell, j) => {
            doc.fillColor(isHeader ? WHITE : (isNeg ? RED : DARK))
                .fontSize(9).font(isHeader ? 'Helvetica-Bold' : 'Helvetica')
                .text(cell, x + 5, y + 5, { width: widths[j] - 10, align: j === 0 ? 'left' : 'right' });
            x += widths[j];
        });
        y += 18;
    });

    y += 20;
    doc.rect(40, y, 515, 100).fill('#FFF3F3').stroke(RED);
    doc.fillColor(RED).fontSize(11).font('Helvetica-Bold').text('CRITICAL RISK INDICATORS', 50, y + 10);
    doc.fillColor(DARK).fontSize(9).font('Helvetica')
        .text('• Net Loss:               ₹16,418 Crore (FY2020 standalone)  ⛔', 50, y + 28)
        .text('• Carried Forward Loss:   ₹31,726 Crore (combined 2 years)  ⛔', 50, y + 42)
        .text('• Gross NPA:              ₹52,550 Crore  |  NPA Ratio: 16.80%  ⛔', 50, y + 56)
        .text('• Capital Adequacy Ratio: 6.3%  (RBI minimum: 9%)  ⛔ BREACH', 50, y + 70)
        .text('• Regulatory Status:      UNDER RBI MORATORIUM w.e.f. 05-Mar-2020  ⛔', 50, y + 84);

    doc.end();
    await finishPromise;
    console.log('✅ Generated: yesbank_itr_filing.pdf');
}

// ─── MAIN ──────────────────────────────────────────────────────────────────
(async () => {
    console.log('\n🏦 Generating Yes Bank DISTRESSED test documents...\n');
    await generateFinancialStatement();
    await generateBankStatement();
    await generateGSTReturn();
    await generateITRFiling();
    console.log('\n✅ All Yes Bank documents generated in test-docs/');
    console.log('\n📋 USE THIS INPUT ON THE NEW APPLICATION FORM:');
    console.log('   Company Name : YES BANK LIMITED');
    console.log('   PAN          : AAACY3786J');
    console.log('   GSTIN        : 27AAACY3786J1Z3');
    console.log('   CIN          : L65190MH2003PLC145908');
    console.log('   Loan Amount  : 500 Crore');
    console.log('   Loan Purpose : Working capital and NPA resolution fund');
    console.log('   Sector       : BFSI / Banking');
    console.log('\n📁 Upload these files:');
    console.log('   Financial Statements → test-docs/yesbank_financial_statement.pdf');
    console.log('   Bank Statements      → test-docs/yesbank_bank_statement.pdf');
    console.log('   GST Data             → test-docs/yesbank_gst_return.csv');
    console.log('   ITR Filing           → test-docs/yesbank_itr_filing.pdf');
})();
