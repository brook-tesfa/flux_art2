import React from 'react';
import { Check } from 'lucide-react';
import { PaymentButton } from './PaymentButton';
import { useAuthStore } from '../store/authStore';

const plans = [
  {
    name: 'Starter',
    price: '29',
    priceId: 'price_starter',
    features: [
      '1 Custom AI Model',
      '100 Generated Images/month',
      'Email Support',
      'Basic Training Priority'
    ]
  },
  {
    name: 'Creator',
    price: '79',
    priceId: 'price_creator',
    popular: true,
    features: [
      '3 Custom AI Models',
      '500 Generated Images/month',
      'Priority Support',
      'Medium Training Priority',
      'Advanced Prompting Tools'
    ]
  },
  {
    name: 'Professional',
    price: '199',
    priceId: 'price_professional',
    features: [
      'Unlimited AI Models',
      '2000 Generated Images/month',
      '24/7 Priority Support',
      'Highest Training Priority',
      'Advanced Prompting Tools',
      'API Access',
      'Custom Branding'
    ]
  }
];

const Pricing = () => {
  const { user } = useAuthStore();

  return (
    <section id="pricing" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Simple Pricing</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Choose the perfect plan for your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-xl p-8 transform transition-all duration-200 hover:scale-105 ${
                plan.popular
                  ? 'bg-purple-600 border-2 border-purple-400'
                  : 'bg-gray-800/50 border border-gray-700'
              }`}
            >
              {plan.popular && (
                <span className="bg-purple-500 text-sm font-semibold px-3 py-1 rounded-full">
                  Most Popular
                </span>
              )}
              <h3 className="text-2xl font-bold mt-4">{plan.name}</h3>
              <div className="mt-4 flex items-baseline">
                <span className="text-4xl font-bold">${plan.price}</span>
                <span className="ml-2 text-gray-400">/month</span>
              </div>
              <ul className="mt-6 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="w-5 h-5 text-purple-400 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              {user ? (
                <PaymentButton priceId={plan.priceId} planName={plan.name} />
              ) : (
                <button
                  onClick={() => useAuthStore.getState().signInWithGoogle()}
                  className={`mt-8 w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 hover:scale-105 ${
                    plan.popular
                      ? 'bg-white text-purple-600 hover:bg-gray-100'
                      : 'bg-purple-600 hover:bg-purple-700'
                  }`}
                >
                  Sign in to Get Started
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;