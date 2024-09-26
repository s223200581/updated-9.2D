// src/components/CheckoutForm.js
import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button, Form, Message } from 'semantic-ui-react';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
      setError(null);
      // Handle successful payment here (backend API integration)
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <CardElement />
      <Button color="green" type="submit" disabled={!stripe}>Pay</Button>
      {success && <Message success header="Payment Successful!" />}
      {error && <Message error header="Payment Error" content={error} />}
    </Form>
  );
};

export default CheckoutForm;
