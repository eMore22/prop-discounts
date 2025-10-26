"use client";

import React, { useState } from 'react';
import { ThumbsUp, Clock, ThumbsDown, MessageSquare, TrendingUp } from 'lucide-react';

interface Vote {
  gotPaid: number;
  stillWaiting: number;
  failed: number;
}

interface TraderFeedbackProps {
  firmName: string;
  dealId?: string;
  initialVotes: Vote;
}

export const TraderFeedback: React.FC<TraderFeedbackProps> = ({ firmName, dealId, initialVotes }) => {
  const [votes, setVotes] = useState<Vote>(initialVotes);
  const [userVote, setUserVote] = useState<string | null>(null);
  const [comment, setComment] = useState('');
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const total = votes.gotPaid + votes.stillWaiting + votes.failed;
  const payoutReliability = total > 0 ? Math.round((votes.gotPaid / total) * 100) : 0;

  const getReliabilityColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600 bg-green-100';
    if (percentage >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const handleVote = async (type: 'got_paid' | 'still_waiting' | 'failed') => {
    if (!dealId) {
      setMessage({ type: 'error', text: 'Cannot submit vote at this time' });
      return;
    }

    if (userVote) {
      setMessage({ type: 'error', text: 'You have already voted!' });
      return;
    }

    setSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch('/api/votes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dealId,
          voteType: type,
          comment: comment.trim() || null
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit vote');
      }

      // Update with actual counts from database
      if (data.votes) {
        setVotes(data.votes);
      } else {
        // Fallback: Update local count if API doesn't return votes
        const voteKey = type === 'got_paid' ? 'gotPaid' : type === 'still_waiting' ? 'stillWaiting' : 'failed';
        setVotes(prev => ({
          ...prev,
          [voteKey]: prev[voteKey] + 1
        }));
      }

      setUserVote(type);
      setShowCommentBox(false);
      setComment('');
      setMessage({ type: 'success', text: 'Thank you for your feedback! Your vote has been recorded.' });

    } catch (error: any) {
      console.error('Vote error:', error);
      setMessage({ 
        type: 'error', 
        text: error.message || 'Failed to submit vote. Please try again.' 
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          Trader Feedback
        </h3>
        <div className={`px-3 py-1 rounded-full text-sm font-bold ${getReliabilityColor(payoutReliability)}`}>
          {payoutReliability}% Reliable
        </div>
      </div>

      {/* Success Rate Progress Bar */}
      {total > 0 && (
        <div className="mb-4">
          <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-green-500 to-green-600 h-full transition-all duration-500"
              style={{ width: `${payoutReliability}%` }}
            />
          </div>
          <p className="text-xs text-gray-600 mt-1 text-center">
            Based on {total} trader {total === 1 ? 'review' : 'reviews'}
          </p>
        </div>
      )}

      <div className="space-y-3 mb-4">
        <button
          onClick={() => handleVote('got_paid')}
          disabled={submitting || !!userVote}
          className={`w-full flex items-center justify-between p-3 rounded-lg border-2 transition-all ${
            userVote === 'got_paid'
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
          onClick={() => handleVote('still_waiting')}
          disabled={submitting || !!userVote}
          className={`w-full flex items-center justify-between p-3 rounded-lg border-2 transition-all ${
            userVote === 'still_waiting'
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
          disabled={submitting || !!userVote}
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

      {/* Comment Box Toggle */}
      {!userVote && dealId && (
        <button
          onClick={() => setShowCommentBox(!showCommentBox)}
          className="text-sm text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2 mb-3 w-full justify-center"
        >
          <MessageSquare className="w-4 h-4" />
          {showCommentBox ? 'Hide' : 'Add'} Comment (Optional)
        </button>
      )}

      {/* Comment Box */}
      {showCommentBox && !userVote && (
        <div className="mb-4">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience with this prop firm..."
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none resize-none"
            rows={3}
            maxLength={500}
          />
          <p className="text-xs text-gray-500 mt-1">{comment.length}/500 characters</p>
        </div>
      )}

      {/* Message Display */}
      {message && (
        <div className={`p-3 rounded-lg mb-4 ${
          message.type === 'success' 
            ? 'bg-green-50 border-2 border-green-200 text-green-800' 
            : 'bg-red-50 border-2 border-red-200 text-red-800'
        }`}>
          <p className="text-sm font-semibold">{message.text}</p>
        </div>
      )}

      <p className="text-xs text-gray-500 text-center">
        {total} trader{total !== 1 ? 's' : ''} voted • {userVote ? 'Thanks for your feedback!' : 'Share your experience'}
      </p>

      {userVote && (
        <div className="mt-3 bg-blue-50 border-2 border-blue-200 rounded-lg p-3 text-center">
          <p className="text-sm text-blue-800 font-semibold">
            ✓ Thank you for voting! Your feedback helps other traders.
          </p>
        </div>
      )}
    </div>
  );
};