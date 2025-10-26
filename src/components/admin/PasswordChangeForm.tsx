// src/components/admin/PasswordChangeForm.tsx
"use client";

import React, { useState } from 'react';
import { Lock, AlertTriangle, CheckCircle } from 'lucide-react';

interface PasswordChangeFormProps {
    adminEmail: string; // Dynamic email passed from the dashboard component
}

const PasswordChangeForm: React.FC<PasswordChangeFormProps> = ({ adminEmail }) => {
  // REMOVED: const ADMIN_EMAIL = 'admin@propdiscounts.com'; 

  const [currentPassword, setCurrentPassword] = useState(''); 
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setIsSuccess(false);

    // Ensure we have an email before submitting (extra safeguard)
    if (!adminEmail) {
        setMessage('Error: Cannot identify the logged-in administrator.');
        return;
    }
    
    // --- Client-side validation ---
    if (newPassword.length < 8) {
        setMessage('Password must be at least 8 characters long.');
        return;
    }
    
    if (newPassword !== confirmPassword) {
        setMessage('New password and confirmation password do not match.');
        return;
    }

    if (currentPassword === newPassword) {
        setMessage('New password cannot be the same as the current password.');
        return;
    }
    // -----------------------------

    setIsLoading(true);

    try {
      const response = await fetch('/api/admin/update-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // USING DYNAMIC EMAIL
        body: JSON.stringify({ 
          email: adminEmail, 
          currentPassword: currentPassword, 
          newPassword: newPassword 
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Success! Password has been securely updated. You will need to log in again with the new password upon session expiry.');
        setIsSuccess(true);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setMessage(data.error || 'Failed to update password.');
        setIsSuccess(false);
      }
    } catch (error) {
      console.error('Password change error:', error);
      setMessage('Network error or server issue. Check console for details.');
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  const messageStyles = isSuccess 
    ? "bg-green-100 border-green-400 text-green-700" 
    : "bg-red-100 border-red-400 text-red-700";

  return (
    <div className="bg-white rounded-xl shadow-xl p-6 border border-gray-100">
      <div className="flex items-center gap-3 mb-5">
        <Lock className="w-5 h-5 text-purple-600" />
        <h3 className="text-xl font-bold text-gray-900">Change Admin Password</h3>
      </div>
      
      {message && (
        <div className={`p-3 mb-4 rounded-lg border flex items-start gap-2 ${messageStyles}`}>
          {isSuccess ? <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" /> : <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0" />}
          <p className="text-sm font-medium">{message}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
            disabled={isLoading}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
          />
        </div>
        
        <div>
          <input
            type="password"
            placeholder="New Password (min 8 chars)"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            disabled={isLoading}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
          />
        </div>
        
        <div>
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={isLoading}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
          />
        </div>
        
        <button 
          type="submit" 
          disabled={isLoading || !currentPassword || !newPassword || !confirmPassword}
          className={`w-full py-3 rounded-lg font-bold text-white transition-all ${
            isLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-purple-600 hover:bg-purple-700 hover:shadow-md'
          }`}
        >
          {isLoading ? 'Updating...' : 'Update Password Securely'}
        </button>
      </form>
    </div>
  );
};

export default PasswordChangeForm;