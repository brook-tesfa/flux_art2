import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

interface PaymentButtonProps {
  priceId: string;
  planName: string;
}

export const PaymentButton: React.FC<PaymentButtonProps> = ({ planName }) => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const handlePayment = async () => {
    if (!user) {
      localStorage.setItem('redirectTo', '/pricing');
      navigate('/login');
      return;
    }

    // TODO: Implement payment flow after authentication
    console.log(`Processing payment for ${planName} plan`);
  };

  return (
    <button
      onClick={handlePayment}
      className="w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 bg-purple-600 hover:bg-purple-700 text-white"
    >
      {user ? `Get Started with ${planName}` : 'Login to Subscribe'}
    </button>
  );
};