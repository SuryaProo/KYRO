import React from 'react';

const ForgotPasswordPage = () => {
  const handleReset = (e) => {
    e.preventDefault();
    console.log('Password reset link sent');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-sm text-center">
        <h1 className="text-4xl text-gray-900 font-signerica mb-6">KYRO</h1>
        <h2 className="text-2xl font-light">Reset password</h2>
        <p className="mt-2 text-sm text-gray-600">
          Enter your email and we’ll send you a reset link.
        </p>
        <form onSubmit={handleReset} className="mt-6 space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
            required
          />
          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-3 rounded-md text-sm font-bold uppercase tracking-wider hover:bg-gray-700 transition-colors"
          >
            Send reset link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;