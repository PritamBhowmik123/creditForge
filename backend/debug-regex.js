const svc = require('./src/services/pdf.service');

const text = `
PROFIT & LOSS STATEMENT
Particulars FY2020 (₹ Cr)
Net Interest Income 2,514
Other Income 1,210
Total Revenue 3,724
Operating Expenses 5,210
EBITDA -1,486
Provisions & Write-offs 21,087
Profit Before Tax -22,573
Tax 0
NET PROFIT / (LOSS) -22,573

BALANCE SHEET SUMMARY
Particulars FY2020
Equity Share Capital 2,352
Reserves & Surplus -7,400
Net Worth -5,048
Total Borrowings 2,29,000
Gross NPA Amount 52,550
Gross NPA Ratio (%) 16.80%
Net NPA Ratio (%) 5.03%
Capital Adequacy Ratio (%) 6.30%
Debt-to-Equity Ratio 45.36
`;

const res = svc.parseFinancialData(text);
console.log("\nParsed Data:", res);

// Test extracting just net profit
console.log("\nJust Net Profit:", svc._extractValue(svc._normalize(text), [
    'profit after tax', 'net profit after tax', 'net profit',
    'pat', 'profit for the year', 'profit for the period',
]));
