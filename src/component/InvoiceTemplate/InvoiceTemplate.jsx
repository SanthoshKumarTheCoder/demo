// InvoiceTemplate.jsx
import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './InvoiceTemplate.css';

export default function InvoiceTemplate({ invoice: propInvoice }) {
  const invoiceRef = useRef();

  // If no prop passed, show mock invoice immediately:
  const invoice = propInvoice || {
    id: 'INV-2025-009',
    date: '2025-09-13',
    dueDate: '2025-09-27',
    billingTo: { name: 'Jane Smith', email: 'jane@ex.com', address: '221B Baker St' },
    items: [
      { description: 'Standard Plan (Monthly)', qty: 1, unitPrice: 49.99 },
      { description: 'One-time Setup', qty: 1, unitPrice: 10.00 },
    ],
    subtotal: 59.99,
    tax: 0,
    discount: 0,
    total: 59.99,
    notes: 'Payment due within 14 days. Please contact support for questions.',
  };

  // --- PDF download ---
  const downloadPdf = async () => {
    if (!invoiceRef.current) return;
    const scale = 2;
    const canvas = await html2canvas(invoiceRef.current, { scale, useCORS: true });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: [canvas.width, canvas.height],
    });
    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save(`${invoice.id || 'invoice'}.pdf`);
  };

  const items = invoice.items || [];
  const subtotal = invoice.subtotal ?? items.reduce((s, i) => s + (i.qty || 0) * (i.unitPrice || 0), 0);
  const tax = invoice.tax ?? 0;
  const discount = invoice.discount ?? 0;
  const total = invoice.total ?? subtotal + tax - discount;

  return (
    <div className="inv-wrapper">
      <div className="inv-card" ref={invoiceRef} id="invoice-to-print">
        <header className="inv-header">
          <div className="inv-brand">
            <div className="brand-logo">LUMEN</div>
            <div className="brand-sub">Subscription Management</div>
          </div>
          <div className="inv-meta">
            <div><strong>Invoice</strong></div>
            <div>ID: {invoice.id}</div>
            <div>Date: {invoice.date}</div>
            <div>Due: {invoice.dueDate}</div>
          </div>
        </header>

        <section className="inv-section inv-addresses">
          <div className="bill-to">
            <div className="small-title">Bill To</div>
            <div className="bold">{invoice.billingTo?.name}</div>
            <div className="muted">{invoice.billingTo?.email}</div>
            {invoice.billingTo?.address && (
              <div className="muted">{invoice.billingTo.address}</div>
            )}
          </div>

          <div className="from">
            <div className="small-title">From</div>
            <div className="bold">Lumen Technologies</div>
            <div className="muted">billing@lumen.com</div>
            <div className="muted">Support: +1 800 123 4567</div>
          </div>
        </section>

        <section className="inv-section inv-items">
          <table className="items-table">
            <thead>
              <tr>
                <th className="desc">Description</th>
                <th className="qty">Qty</th>
                <th className="unit">Unit</th>
                <th className="total-col">Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((it, idx) => (
                <tr key={idx}>
                  <td className="desc">
                    <div className="item-desc">{it.description}</div>
                    {it.meta && <div className="muted small">{it.meta}</div>}
                  </td>
                  <td className="qty">{it.qty}</td>
                  <td className="unit">${Number(it.unitPrice || 0).toFixed(2)}</td>
                  <td className="total-col">
                    ${(it.qty * it.unitPrice).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="inv-section inv-summary">
          <div className="notes">
            {invoice.notes && (
              <>
                <div className="small-title">Notes</div>
                <div className="muted small">{invoice.notes}</div>
              </>
            )}
          </div>

          <div className="summary">
            <div className="summary-row">
              <div>Subtotal</div>
              <div>${Number(subtotal).toFixed(2)}</div>
            </div>
            <div className="summary-row">
              <div>Tax</div>
              <div>${Number(tax).toFixed(2)}</div>
            </div>
            <div className="summary-row">
              <div>Discount</div>
              <div>-${Number(discount).toFixed(2)}</div>
            </div>
            <div className="summary-row grand">
              <div>Total</div>
              <div>${Number(total).toFixed(2)}</div>
            </div>
          </div>
        </section>

        <footer className="inv-footer">
          <div className="muted small">
            If you have questions about this invoice, contact billing@lumen.com
          </div>
        </footer>
      </div>

      <div className="inv-actions">
        <button className="btn" onClick={downloadPdf}>Download PDF</button>
      </div>
    </div>
  );
}
