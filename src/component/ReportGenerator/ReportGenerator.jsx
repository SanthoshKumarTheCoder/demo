// ReportGenerator.jsx
import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './ReportGenerator.css';

export default function ReportGenerator() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Simulate API load for animation
    setTimeout(() => {
      setData([
        { id: 'txn_001', user: 'Jane', plan: 'Basic', amount: 9.99, date: '2025-09-01' },
        { id: 'txn_002', user: 'Bob', plan: 'Standard', amount: 19.99, date: '2025-09-02' },
        { id: 'txn_003', user: 'Alice', plan: 'Premium', amount: 29.99, date: '2025-09-03' },
      ]);
    }, 500);
  }, []);

  const downloadCSV = () => {
    if (!data.length) return;
    const keys = Object.keys(data[0]);
    const csv = [
      keys.join(','),
      ...data.map(r => keys.map(k => `"${r[k]}"`).join(',')),
    ].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'report.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text('Subscription Report', 14, 15);
    const headers = Object.keys(data[0]).map(key => key.toUpperCase());
    const rows = data.map(item => Object.values(item));
    doc.autoTable({ head: [headers], body: rows, startY: 20 });
    doc.save('report.pdf');
  };

  return (
    <div className="report-container">
      <h1 className="report-title animated-title"> Report Generator</h1>

      <div className="table-card">
        <div className="table-wrapper">
          <table className="report-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Plan</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr key={i} className="fade-in-row">
                  <td>{row.id}</td>
                  <td>{row.user}</td>
                  <td>{row.plan}</td>
                  <td>${row.amount}</td>
                  <td>{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="button-row slide-in-buttons">
        <button className="btn pulse" onClick={downloadCSV}>Download CSV</button>
        <button className="btn pulse" onClick={downloadPDF}>Download PDF</button>
      </div>
    </div>
  );
}
