/**
 * Generate test PDFs for CreditForge demo
 * Run: node generate-test-pdfs.js
 */
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, 'test-docs');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR);

// ── 1. Financial Statement PDF ────────────────────────────────────────────────
function generateFinancialStatement() {
    const doc = new PDFDocument({ margin: 50 });
    const out = path.join(OUT_DIR, 'financial_statement.pdf');
    doc.pipe(fs.createWriteStream(out));

    doc.fontSize(18).font('Helvetica-Bold')
        .text('RELIANCE INDUSTRIES LIMITED', { align: 'center' });
    doc.fontSize(14).font('Helvetica')
        .text('Audited Financial Statements', { align: 'center' });
    doc.moveDown(2);

    doc.fontSize(12).font('Helvetica-Bold')
        .text('PROFIT & LOSS STATEMENT (₹ in Crore)');
    doc.moveDown(0.5);

    const plData = [
        ['Particulars', 'FY 2023-24', 'FY 2022-23', 'FY 2021-22'],
        ['Revenue from Operations', '9,01,608.00 Cr', '7,88,215.00 Cr', '6,59,205.00 Cr'],
        ['Other Income', '14,280.00 Cr', '11,445.00 Cr', '9,830.00 Cr'],
        ['Total Revenue', '9,15,888.00 Cr', '7,99,660.00 Cr', '6,69,035.00 Cr'],
        ['Total Expenses', '8,15,820.00 Cr', '7,15,430.00 Cr', '5,92,840.00 Cr'],
        ['EBITDA', '1,99,400.00 Cr', '1,62,320.00 Cr', '1,34,215.00 Cr'],
        ['EBITDA Margin', '21.76%', '20.30%', '20.06%'],
        ['Depreciation & Amortization', '42,350.00 Cr', '39,120.00 Cr', '35,680.00 Cr'],
        ['Finance Costs', '20,840.00 Cr', '18,960.00 Cr', '16,420.00 Cr'],
        ['Profit Before Tax', '1,36,210.00 Cr', '1,04,240.00 Cr', '82,115.00 Cr'],
        ['Tax Expense', '24,840.00 Cr', '18,250.00 Cr', '14,630.00 Cr'],
        ['Net Profit After Tax', '1,11,370.00 Cr', '86,006.00 Cr', '67,485.00 Cr'],
        ['Net Profit Margin', '12.16%', '10.76%', '10.09%'],
    ];

    plData.forEach((row, idx) => {
        doc.font(idx === 0 ? 'Helvetica-Bold' : 'Helvetica').fontSize(10);
        const y = doc.y;
        if (idx === 0 || idx % 2 === 0) doc.rect(50, y - 2, 510, 16).fill('#f0f0f0').fillColor('black');
        doc.text(row[0], 55, y, { width: 200 });
        doc.text(row[1], 255, y, { width: 100, align: 'right' });
        doc.text(row[2], 360, y, { width: 100, align: 'right' });
        doc.text(row[3], 460, y, { width: 90, align: 'right' });
        doc.moveDown(0.4);
    });

    doc.moveDown(1);
    doc.fontSize(12).font('Helvetica-Bold').text('BALANCE SHEET (₹ in Crore)');
    doc.moveDown(0.5);

    const bsData = [
        ['Particulars', 'FY 2023-24', 'FY 2022-23'],
        ['EQUITY & LIABILITIES', '', ''],
        ['Share Capital', '6,766.00 Cr', '6,766.00 Cr'],
        ['Reserves & Surplus', '8,42,640.00 Cr', '7,44,282.00 Cr'],
        ['Net Worth (Shareholders Equity)', '8,49,406.00 Cr', '7,51,048.00 Cr'],
        ['Long Term Borrowings', '2,10,840.00 Cr', '2,45,220.00 Cr'],
        ['Short Term Borrowings', '68,420.00 Cr', '72,140.00 Cr'],
        ['Total Debt', '2,79,260.00 Cr', '3,17,360.00 Cr'],
        ['Total Liabilities', '13,28,666.00 Cr', '12,08,408.00 Cr'],
        ['ASSETS', '', ''],
        ['Fixed Assets (Net Block)', '7,84,012.00 Cr', '7,12,300.00 Cr'],
        ['Current Assets', '3,86,420.00 Cr', '3,24,810.00 Cr'],
        ['Cash & Equivalents', '1,72,350.00 Cr', '1,48,260.00 Cr'],
        ['Total Assets', '13,28,666.00 Cr', '12,08,408.00 Cr'],
        ['Debt-to-Equity Ratio', '0.33x', '0.42x'],
        ['Current Ratio', '1.82x', '1.74x'],
    ];

    bsData.forEach((row, idx) => {
        doc.font(idx === 0 || row[1] === '' ? 'Helvetica-Bold' : 'Helvetica').fontSize(10);
        const y = doc.y;
        if (idx === 0 || idx % 2 === 0) doc.rect(50, y - 2, 510, 16).fill('#f0f0f0').fillColor('black');
        doc.text(row[0], 55, y, { width: 250 });
        doc.text(row[1], 305, y, { width: 130, align: 'right' });
        doc.text(row[2], 435, y, { width: 120, align: 'right' });
        doc.moveDown(0.4);
    });

    doc.end();
    console.log('✅ Generated:', out);
}

// ── 2. Bank Statement CSV ─────────────────────────────────────────────────────
function generateBankStatement() {
    const out = path.join(OUT_DIR, 'bank_statement.csv');
    const rows = [
        'Date,Description,Debit (₹),Credit (₹),Balance (₹)',
        '01-Apr-2023,Opening Balance,,,1200000000',
        '05-Apr-2023,Customer Payment - Jio,,,850000000',
        '10-Apr-2023,GST Payment,-42000000,,808000000',
        '15-Apr-2023,Customer Payment - Retail,,,620000000',
        '20-Apr-2023,Vendor Payment,-180000000,,1248000000',
        '25-Apr-2023,Customer Payment - Petrochem,,,940000000',
        '30-Apr-2023,Salary Disbursement,-95000000,,2093000000',
        '05-May-2023,Customer Payment - Exports,,,1120000000',
        '10-May-2023,Loan EMI Payment,-28000000,,3185000000',
        '15-May-2023,Customer Payment - Media,,,480000000',
        '20-May-2023,Capital Expenditure,-250000000,,3415000000',
        '25-May-2023,Customer Payment - Jio Digital,,,760000000',
        '31-May-2023,Total Credits for Period,,9015300000,',
        'SUMMARY,,,,',
        'Total Credits (Annual),,,901530000000,',
        'Total Debits (Annual),-815200000000,,,',
        'Average Monthly Balance,,,75127500000,',
    ];
    fs.writeFileSync(out, rows.join('\n'));
    console.log('✅ Generated:', out);
}

// ── 3. GST Return CSV ─────────────────────────────────────────────────────────
function generateGSTReturn() {
    const out = path.join(OUT_DIR, 'gst_return.csv');
    const rows = [
        'GSTIN,27AAACR5055K1ZZ,,,',
        'Legal Name,Reliance Industries Limited,,,',
        'Return Period,April 2023 - March 2024,,,',
        ',,,',
        'GSTR-3B Summary,,,',
        'Month,Taxable Turnover (₹),IGST (₹),CGST (₹),SGST (₹)',
        'April-2023,7422000000,750000000,225000000,225000000',
        'May-2023,7680000000,780000000,235000000,235000000',
        'June-2023,7550000000,762000000,228000000,228000000',
        'July-2023,7820000000,800000000,240000000,240000000',
        'August-2023,7350000000,740000000,222000000,222000000',
        'September-2023,8100000000,820000000,246000000,246000000',
        'October-2023,7900000000,795000000,238000000,238000000',
        'November-2023,8250000000,835000000,250000000,250000000',
        'December-2023,8600000000,870000000,261000000,261000000',
        'January-2024,8400000000,848000000,254000000,254000000',
        'February-2024,7950000000,803000000,241000000,241000000',
        'March-2024,8730000000,882000000,265000000,265000000',
        'TOTAL,96752000000,9685000000,2905000000,2905000000',
        ',,,',
        'Annual Taxable Turnover (₹ Crore),9675.20 Cr,,,',
        'Total GST Paid (₹ Crore),1549.50 Cr,,,',
    ];
    fs.writeFileSync(out, rows.join('\n'));
    console.log('✅ Generated:', out);
}

// ── 4. ITR PDF ────────────────────────────────────────────────────────────────
function generateITR() {
    const doc = new PDFDocument({ margin: 50 });
    const out = path.join(OUT_DIR, 'itr_filing.pdf');
    doc.pipe(fs.createWriteStream(out));

    doc.fontSize(16).font('Helvetica-Bold').text('INCOME TAX RETURN - ITR-6', { align: 'center' });
    doc.fontSize(12).font('Helvetica').text('Assessment Year: 2024-25 (Financial Year 2023-24)', { align: 'center' });
    doc.moveDown(1);

    const data = [
        ['PAN', 'AAACR5055K'],
        ['Company Name', 'Reliance Industries Limited'],
        ['GSTIN', '27AAACR5055K1ZZ'],
        ['CIN', 'L17110MH1973PLC019786'],
        ['Gross Total Income', '₹ 1,36,210.00 Crore'],
        ['Total Tax Payable', '₹ 24,840.00 Crore'],
        ['Tax Already Paid (TDS/Advance)', '₹ 23,920.00 Crore'],
        ['Tax Refundable/Payable', '₹ 920.00 Crore Refund'],
        ['Net Profit (PAT)', '₹ 1,11,370.00 Crore'],
        ['Turnover as per Books', '₹ 9,01,608.00 Crore'],
        ['Status', 'Filed'],
        ['Date of Filing', '31-Oct-2024'],
        ['Acknowledgment No', 'ACK20241031AAACR5055K'],
    ];

    data.forEach(([key, val]) => {
        doc.font('Helvetica-Bold').fontSize(10).text(key + ':', 50, doc.y, { continued: true, width: 200 });
        doc.font('Helvetica').text('  ' + val);
        doc.moveDown(0.3);
    });

    doc.end();
    console.log('✅ Generated:', out);
}

generateFinancialStatement();
generateBankStatement();
generateGSTReturn();
generateITR();

console.log('\n📁 All test documents created in:', OUT_DIR);
console.log('\n📋 FORM INPUT to use:');
console.log('Company Name : Reliance Industries Limited');
console.log('PAN          : AAACR5055K');
console.log('GSTIN        : 27AAACR5055K1ZZ');
console.log('CIN          : L17110MH1973PLC019786');
console.log('Loan Amount  : 500 (₹ in Cr)');
console.log('Loan Purpose : Expansion of Jio 5G infrastructure');
console.log('Sector       : Services');
