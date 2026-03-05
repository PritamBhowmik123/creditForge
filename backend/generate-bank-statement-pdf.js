/**
 * Generate Bank Statement PDF for CreditForge demo
 * Run: node generate-bank-statement-pdf.js
 */
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, 'test-docs');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR);

const doc = new PDFDocument({ margin: 50 });
const out = path.join(OUT_DIR, 'bank_statement.pdf');
doc.pipe(fs.createWriteStream(out));

// ── Header ────────────────────────────────────────────────────────────────────
doc.rect(0, 0, 612, 80).fill('#003366');
doc.fillColor('white').fontSize(18).font('Helvetica-Bold')
    .text('STATE BANK OF INDIA', 50, 18, { align: 'center' });
doc.fontSize(10).font('Helvetica')
    .text('Corporate Banking Division  |  Mumbai Main Branch  |  IFSC: SBIN0000001', 50, 42, { align: 'center' });
doc.fillColor('black');
doc.moveDown(3.5);

// ── Account Info ──────────────────────────────────────────────────────────────
doc.roundedRect(50, doc.y, 510, 72, 4).fill('#f0f4f8').stroke('#cccccc');
const infoY = doc.y + 8;
doc.fillColor('#333333').font('Helvetica-Bold').fontSize(9);

const leftCol = [
    ['Account Holder', 'Reliance Industries Limited'],
    ['Account Number', 'XXXX XXXX XXXX 9456'],
    ['Account Type', 'Current Account'],
];
const rightCol = [
    ['Statement Period', 'April 2023 – March 2024'],
    ['IFSC Code', 'SBIN0000001'],
    ['Branch', 'Mumbai Corporate Branch'],
];

leftCol.forEach(([k, v], i) => {
    doc.font('Helvetica-Bold').fillColor('#555').text(k + ':', 60, infoY + (i * 18), { width: 110 });
    doc.font('Helvetica').fillColor('#111').text(v, 175, infoY + (i * 18), { width: 160 });
});
rightCol.forEach(([k, v], i) => {
    doc.font('Helvetica-Bold').fillColor('#555').text(k + ':', 340, infoY + (i * 18), { width: 110 });
    doc.font('Helvetica').fillColor('#111').text(v, 455, infoY + (i * 18), { width: 100 });
});

doc.fillColor('black');
doc.y = infoY + 80;
doc.moveDown(0.5);

// ── Section Title ─────────────────────────────────────────────────────────────
doc.font('Helvetica-Bold').fontSize(11).fillColor('#003366')
    .text('TRANSACTION DETAILS (FY 2023-24)', 50, doc.y);
doc.fillColor('black');
doc.moveDown(0.5);

// ── Table Header ──────────────────────────────────────────────────────────────
const cols = { date: 50, desc: 110, debit: 285, credit: 375, balance: 465 };
const colWidths = { date: 55, desc: 170, debit: 85, credit: 85, balance: 95 };

const headerY = doc.y;
doc.rect(50, headerY, 510, 16).fill('#003366');
doc.fillColor('white').font('Helvetica-Bold').fontSize(8);
doc.text('Date', cols.date, headerY + 3, { width: colWidths.date });
doc.text('Description', cols.desc, headerY + 3, { width: colWidths.desc });
doc.text('Debit (₹)', cols.debit, headerY + 3, { width: colWidths.debit, align: 'right' });
doc.text('Credit (₹)', cols.credit, headerY + 3, { width: colWidths.credit, align: 'right' });
doc.text('Balance (₹)', cols.balance, headerY + 3, { width: colWidths.balance, align: 'right' });
doc.fillColor('black');
doc.y = headerY + 20;

// ── Rows ──────────────────────────────────────────────────────────────────────
const transactions = [
    ['01-Apr-23', 'Opening Balance', '', '', '1,20,00,00,000'],
    ['05-Apr-23', 'Customer Remittance – Jio Platforms Ltd', '', '85,00,00,000', '2,05,00,00,000'],
    ['10-Apr-23', 'GST Payment – Govt of India', '4,20,00,000', '', '2,00,80,00,000'],
    ['14-Apr-23', 'Customer Payment – Reliance Retail Ops', '', '62,00,00,000', '2,62,80,00,000'],
    ['20-Apr-23', 'Vendor Payment – Raw Material Procurement', '18,00,00,000', '', '2,44,80,00,000'],
    ['25-Apr-23', 'Customer Payment – Petrochem Division', '', '94,00,00,000', '3,38,80,00,000'],
    ['30-Apr-23', 'Salary Disbursement – April 2023', '9,50,00,000', '', '3,29,30,00,000'],
    ['05-May-23', 'Customer Payment – Export Receivables', '', '1,12,00,00,000', '4,41,30,00,000'],
    ['10-May-23', 'Loan EMI – Term Loan A', '2,80,00,000', '', '4,38,50,00,000'],
    ['15-May-23', 'Customer Payment – Media & Entertainment', '', '48,00,00,000', '4,86,50,00,000'],
    ['20-May-23', 'Capital Expenditure – 5G Network Infrastructure', '25,00,00,000', '', '4,61,50,00,000'],
    ['25-May-23', 'Customer Payment – Jio Digital Services', '', '76,00,00,000', '5,37,50,00,000'],
    ['30-Jun-23', 'GST Reconciliation Payment', '8,40,00,000', '', '6,14,20,00,000'],
    ['31-Jul-23', 'Customer Bulk Payment – Q1 Close', '', '1,20,00,00,000', '7,34,20,00,000'],
    ['15-Sep-23', 'Advance Tax Payment – Q2 FY24', '5,60,00,000', '', '7,84,60,00,000'],
    ['30-Sep-23', 'Customer Bulk Payment – Q2 Close', '', '1,35,00,00,000', '9,19,60,00,000'],
    ['31-Dec-23', 'Customer Bulk Payment – Q3 Close', '', '1,42,00,00,000', '10,56,60,00,000'],
    ['15-Mar-24', 'Advance Tax Payment – Q4 FY24', '5,60,00,000', '', '10,51,00,00,000'],
    ['28-Mar-24', 'Final Customer Receipts – Q4 FY24', '', '1,40,00,00,000', '11,91,00,00,000'],
    ['31-Mar-24', 'Closing Balance March 2024', '', '', '11,91,00,00,000'],
];

transactions.forEach((row, i) => {
    const y = doc.y;
    if (i % 2 === 0) {
        doc.rect(50, y - 1, 510, 14).fill('#f8fafc').stroke();
    }
    doc.fillColor('#111').font('Helvetica').fontSize(7.5);
    doc.text(row[0], cols.date, y + 1, { width: colWidths.date });
    doc.text(row[1], cols.desc, y + 1, { width: colWidths.desc });
    doc.fillColor(row[2] ? '#c0392b' : '#111')
        .text(row[2], cols.debit, y + 1, { width: colWidths.debit, align: 'right' });
    doc.fillColor(row[3] ? '#1a7a3f' : '#111')
        .text(row[3], cols.credit, y + 1, { width: colWidths.credit, align: 'right' });
    doc.fillColor('#333')
        .text(row[4], cols.balance, y + 1, { width: colWidths.balance, align: 'right' });
    doc.fillColor('black');
    doc.y = y + 15;
});

// ── Summary ───────────────────────────────────────────────────────────────────
doc.moveDown(1);
doc.roundedRect(50, doc.y, 510, 95, 4).fill('#eaf4ea').stroke('#2e7d32');
const sumY = doc.y + 10;
doc.font('Helvetica-Bold').fontSize(10).fillColor('#1a5c1a')
    .text('ANNUAL STATEMENT SUMMARY (FY 2023-24)', 60, sumY);

const summaryRows = [
    ['Total Credits (Annual)', '₹ 9,01,53,00,00,000', '₹ 9,01,530 Crore'],
    ['Total Debits (Annual)', '₹ 8,15,20,00,00,000', '₹ 8,15,200 Crore'],
    ['Average Monthly Inflow', '₹ 75,127.50 Crore', ''],
    ['Closing Balance (31-Mar-2024)', '₹ 11,91,00,00,000', '₹ 1,191 Crore'],
];

summaryRows.forEach(([label, amount, note], i) => {
    const y = sumY + 20 + (i * 16);
    doc.font('Helvetica-Bold').fontSize(8.5).fillColor('#333').text(label + ' :', 60, y, { width: 185 });
    doc.font('Helvetica').fillColor('#1a5c1a').text(amount, 250, y, { width: 160 });
    if (note) doc.fillColor('#666').font('Helvetica').text('(' + note + ')', 415, y, { width: 130 });
});

doc.fillColor('black');

// ── Footer ────────────────────────────────────────────────────────────────────
doc.moveDown(2);
doc.fontSize(7.5).fillColor('#888').font('Helvetica')
    .text('This is a system-generated statement and does not require a signature. For queries contact: 1800-11-2211', { align: 'center' });
doc.text('State Bank of India | CIN: L55230MH1955GOI008486 | Regd. Office: State Bank Bhavan, Nariman Point, Mumbai - 400 021', { align: 'center' });

doc.end();

doc.on('finish', () => {
    console.log('✅ Bank Statement PDF generated:', out);
});
