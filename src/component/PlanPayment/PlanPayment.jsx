// PlanPayment.jsx
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import './PlanPayment.css';

// Load your public key
const stripePromise = loadStripe('pk_test_YOUR_PUBLIC_KEY'); // Replace with your real Stripe public key

// This array holds our plans
const plans = [
  {
    id: 'basic',
    name: 'Basic Plan',
    price: '$9.99/month',
    description: 'Ideal for individuals. Includes core features.',
    image: '/images/basic.jpg', // add your image
    priceId: 'price_123_basic', // your Stripe price ID
  },
  {
    id: 'standard',
    name: 'Standard Plan',
    price: '$19.99/month',
    description: 'Great for small teams. Includes extended features.',
    image: '/images/standard.jpg',
    priceId: 'price_123_standard',
  },
  {
    id: 'premium',
    name: 'Premium Plan',
    price: '$29.99/month',
    description: 'Best for larger teams. All features included.',
    image: '/images/premium.jpg',
    priceId: 'price_123_premium',
  },
];

export default function PlanPayment() {
  const handleCheckout = async (priceId) => {
    const stripe = await stripePromise;

    // Call your backend to create a checkout session
    // Replace with your real backend endpoint
    const res = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priceId }),
    });

    const session = await res.json();

    // Redirect to Stripe Checkout
    const result = await stripe.redirectToCheckout({ sessionId: session.id });
    if (result.error) {
      console.error(result.error.message);
    }
  };

  return (
    <div className="plans-container">
      {plans.map(plan => (
        <div key={plan.id} className="plan-card">
          {/* <img src={plan.image} alt={plan.name} className="plan-image" /> */}
          <div className="plan-content">
            <h3 className="plan-title">{plan.name}</h3>
            <p className="plan-price">{plan.price}</p>
            <p className="plan-description">{plan.description}</p>
            <button className="plan-button" onClick={() => handleCheckout(plan.priceId)}>
              Choose {plan.name}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
