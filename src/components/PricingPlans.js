import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PricingPlans.css';
import { Icon } from 'semantic-ui-react';

const PricingPlans = () => {
  const navigate = useNavigate();

  const handlePremiumSelect = (plan) => {
    navigate('/payment', { state: { plan } });
  };

  const plans = [
    {
      name: 'Free Plan',
      price: 'Free',
      features: ['Basic Post and Question features', 'Community support'],
      buttonText: 'Selected',
      disabled: true,
      icon: 'check circle',
      isPremium: false,
    },
    {
      name: 'Premium Plan - Basic',
      price: '$9.99/month',
      features: [
        'Customization (messages, banners, themes)',
        'Content controls & admin features',
        'Analytics Dashboard',
        '24/7 priority support',
      ],
      buttonText: 'Select Premium Basic',
      disabled: false,
      icon: 'star',
      isPremium: true,
    },
    {
      name: 'Premium Plan - Advanced',
      price: '$19.99/month',
      features: [
        'All features of Basic',
        'Advanced Analytics',
        'Priority 1-on-1 support',
        'Personalized assistance',
      ],
      buttonText: 'Select Premium Advanced',
      disabled: false,
      icon: 'diamond',
      isPremium: true,
    },
    {
      name: 'Premium Plan - Pro',
      price: '$29.99/month',
      features: [
        'All features of Advanced',
        'Dedicated Account Manager',
        'Custom Integrations',
        'Priority Response Time',
      ],
      buttonText: 'Select Premium Pro',
      disabled: false,
      icon: 'rocket',
      isPremium: true,
    },
  ];

  return (
    <div className="pricing-container">
      <h2 className="pricing-header">Choose Your Plan</h2>
      <div className="pricing-cards">
        {plans.map((plan, index) => (
          <div key={index} className={`plan-card ${plan.isPremium ? 'premium' : ''}`}>
            <Icon name={plan.icon} size="big" className="plan-icon" />
            <h3>{plan.name}</h3>
            <p className="plan-price">{plan.price}</p>
            <ul className="plan-features">
              {plan.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
            <button
              className={`select-btn ${plan.disabled ? 'selected-btn' : ''}`}
              onClick={() => handlePremiumSelect(plan)}
              disabled={plan.disabled}
            >
              {plan.buttonText}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingPlans;
