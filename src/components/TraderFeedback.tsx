"use client";

import React, { useState, useEffect } from 'react';
import { ThumbsUp, Clock, ThumbsDown } from 'lucide-react';

interface Vote {
  gotPaid: number;
  stillWaiting: number;
  failed: number;
}

interface TraderFeedbackProps {
  firmName: string;
  initialVotes: Vote;
}

export const TraderFeedback: React.FC<TraderFeedbackProps> = ({ firmName, initialVotes }) => {
  const [votes, setVotes] = useState<Vote>(initialVotes);
  const [userVote, setUserVote] = useState<string | null>(null);

  useEffect(() => {
    const savedVote = localStorage.getItem(`vote_${firmName}`);
    if (savedVote) {
      setUserVote(savedVote);
    }
  }, [firmName]);

  const handleVote = (type: 'gotPaid' | 'stillWaiting' | 'failed') => {
    if (userVote) {
      alert('You have already voted for this firm!');
      return;
    }

    const newVotes = {
      ...votes,
      [type]: votes[type] + 1
    };
    setVotes(newVotes);
    setUserVote(type);
    localStorage.setItem(`vote_${firmName}`, type);
    localStorage.setItem(`votes_${firmName}`, JSON.stringify(newVotes));
  };

  const total = votes.gotPaid + votes.stillWaiting + votes.failed;
  const payoutReliability = total > 0 ? Math.round((votes.gotPaid / total) * 100) : 0;

  const getReliabilityColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600 bg-green-100';
    if (percentage >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">Trader Feedback</h3>
        <div className={`px-3 py-1 rounded-full text-sm font-bold ${getReliabilityColor(payoutReliability)}`}>
          {payoutReliability}% Reliable
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <button
          onClick={() => handleVote('gotPaid')}
          disabled={!!userVote}
          className={`w-full flex items-center justify-between p-3 rounded-lg border-2 transition-all ${
            userVote === 'gotPaid'
              ? 'border-green-500 bg-green-50'
              : userVote
              ? 'border-gray-200 opacity-50 cursor-not-allowed'
              : 'border-gray-200 hover:border-green-500 hover:bg-green-50'
          }`}
        >
          <div className="flex items-center gap-2">
            <ThumbsUp className="w-5 h-5 text-green-600" />
            <span className="font-medium text-gray-700">Got Paid</span>
          </div>
          <span className="font-bold text-green-600">{votes.gotPaid}</span>
        </button>

        <button
          onClick={() => handleVote('stillWaiting')}
          disabled={!!userVote}
          className={`w-full flex items-center justify-between p-3 rounded-lg border-2 transition-all ${
            userVote === 'stillWaiting'
              ? 'border-yellow-500 bg-yellow-50'
              : userVote
              ? 'border-gray-200 opacity-50 cursor-not-allowed'
              : 'border-gray-200 hover:border-yellow-500 hover:bg-yellow-50'
          }`}
        >
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-yellow-600" />
            <span className="font-medium text-gray-700">Still Waiting</span>
          </div>
          <span className="font-bold text-yellow-600">{votes.stillWaiting}</span>
        </button>

        <button
          onClick={() => handleVote('failed')}
          disabled={!!userVote}
          className={`w-full flex items-center justify-between p-3 rounded-lg border-2 transition-all ${
            userVote === 'failed'
              ? 'border-red-500 bg-red-50'
              : userVote
              ? 'border-gray-200 opacity-50 cursor-not-allowed'
              : 'border-gray-200 hover:border-red-500 hover:bg-red-50'
          }`}
        >
          <div className="flex items-center gap-2">
            <ThumbsDown className="w-5 h-5 text-red-600" />
            <span className="font-medium text-gray-700">Failed/Issues</span>
          </div>
          <span className="font-bold text-red-600">{votes.failed}</span>
        </button>
      </div>

      <p className="text-xs text-gray-500 text-center">
        {total} trader{total !== 1 ? 's' : ''} voted • {userVote ? 'Thanks for your feedback!' : 'Share your experience'}
      </p>
    </div>
  );
};