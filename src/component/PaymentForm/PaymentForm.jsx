// PaymentForm.jsx
import React, { useState } from 'react';
import './PaymentForm.css'; // import the CSS file

export default function PaymentForm() {
  const [email, setEmail] = useState('');
  const [plan, setPlan] = useState('Standard');
  const [amount, setAmount] = useState('49.99');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  // Simulate backend payment call
  const simulatePayment = (payload, delay = 700) =>
    new Promise(res => setTimeout(() => res({ ok: true, data: payload }), delay));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = { email, plan, amount: parseFloat(amount), date: new Date().toISOString() };
    const res = await simulatePayment(payload);
    setResponse(res);
    setLoading(false);
  };

  return (
    <div className="payment-container">
      <h1 className="payment-title">Mobile Payment Form</h1>
      <form className="payment-form" onSubmit={handleSubmit}>
        <label className="form-label">
          Email:
          <input
            className="form-input"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
        </label>

        <label className="form-label">
          Select Plan:
          <select
            className="form-select"
            value={plan}
            onChange={e => setPlan(e.target.value)}
          >
            <option>Basic</option>
            <option>Standard</option>
            <option>Premium</option>
          </select>
        </label>

        <label className="form-label">
          Amount (USD):
          <input
            className="form-input"
            type="number"
            step="0.01"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            required
          />
        </label>

        <button className="pay-button" disabled={loading}>
          {loading ? 'Processing…' : 'Pay Now'}
        </button>
      </form>

      <div className="response-box">
        <h2>Response</h2>
        <pre>{response ? JSON.stringify(response, null, 2) : 'No payment submitted yet.'}</pre>
      </div>
    </div>
  );
}
