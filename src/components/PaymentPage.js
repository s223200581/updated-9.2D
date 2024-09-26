// src/components/PaymentPage.js
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './PaymentPage.css';
import { Icon } from 'semantic-ui-react';

const stripePromise = loadStripe('your-publishable-key-here');

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);

    // Add validation for personal details if needed
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.address) {
      setError("Please fill out all personal details.");
      setLoading(false);
      return;
    }

    const result = await stripe.createToken(card, {
      name: `${formData.firstName} ${formData.lastName}`,
      address_line1: formData.address,
      email: formData.email,
    });

    if (result.error) {
      setError(result.error.message);
      setLoading(false);
    } else {
      setError(null);
      console.log(result.token);
      // Send the token and formData to your backend for processing the payment
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="personal-details">
        <label>
          First Name:
          <input 
            type="text" 
            name="firstName" 
            value={formData.firstName} 
            onChange={handleInputChange} 
            required
          />
        </label>
        <label>
          Last Name:
          <input 
            type="text" 
            name="lastName" 
            value={formData.lastName} 
            onChange={handleInputChange} 
            required
          />
        </label>
        <label>
          Email:
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleInputChange} 
            required
          />
        </label>
        <label>
          Address:
          <input 
            type="text" 
            name="address" 
            value={formData.address} 
            onChange={handleInputChange} 
            required
          />
        </label>
      </div>
      <div className="card-details">
        <CardElement className="card-element" />
      </div>
      {error && <div className="error-message">{error}</div>}
      <button type="submit" className="pay-btn" disabled={!stripe || loading}>
        {loading ? <Icon loading name="spinner" /> : 'Pay'}
      </button>
    </form>
  );
};

const PaymentPage = () => {
  return (
    <div className="payment-container">
      <h2>Complete Your Payment</h2>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default PaymentPage;
