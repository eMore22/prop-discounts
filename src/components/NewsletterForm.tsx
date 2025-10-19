// src/components/NewsletterForm.tsx

"use client";

import { useState } from 'react';

export const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Newsletter signup submitted:', email);
    setIsSubmitted(true);
    // In a real application, you would connect this to an email service like Mailchimp or Brevo.
  };

  if (isSubmitted) {
    return (
      <div className="bg-green-500 text-white p-4 rounded-lg text-center">
        <p>Thank you for signing up! Check your inbox for our first newsletter.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full sm:w-auto flex-grow p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-800"
        required
      />
      <button
        type="submit"
        className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Subscribe
      </button>
    </form>
  );
};