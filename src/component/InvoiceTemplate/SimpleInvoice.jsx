// SimpleInvoice.jsx
// Usage: <SimpleInvoice invoice={invoiceObject} />
// Also uses jspdf + html2canvas for download, same CSS file can be reused.
import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './InvoiceTemplate.css';

export function SimpleInvoice({ invoice }) {
  const ref = useRef();

  const downloadPdf = async () => {
    if (!ref.current) return;
    const canvas = await html2canvas(ref.current, { scale: 2, useCORS: true });
    const img = canvas.toDataURL('image/png');
    const pdf = new jsPDF({ unit: 'pt', format: [canvas.width, canvas.height] });
    pdf.addImage(img, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save(`${invoice.id || 'invoice'}.pdf`);
  };

  return (
    <div className="simple-inv-wrapper">
      <div className="simple-inv-card" ref={ref}>
        <div className="simple-header">
          <div className="brand">LUMEN</div>
          <div className="meta">
            <div className="id">{invoice.id}</div>
            <div className="date">{invoice.date}</div>
          </div>
        </div>

        <div className="simple-body">
          <div className="row">
            <div className="label">Billed To</div>
            <div className="value">{invoice.billingTo?.name}</div>
          </div>
          <div className="row">
            <div className="label">Description</div>
            <div className="value">{invoice.items?.[0]?.description}</div>
          </div>
          <div className="row">
            <div className="label">Amount</div>
            <div className="value">${Number(invoice.total ?? 0).toFixed(2)}</div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 12 }}>
        <button className="btn" onClick={downloadPdf}>Download PDF</button>
      </div>
    </div>
  );
}
