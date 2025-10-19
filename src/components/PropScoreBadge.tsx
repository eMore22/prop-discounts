import React from 'react';
import { Award } from 'lucide-react';

interface PropScoreBadgeProps {
  score: number;
}

export const PropScoreBadge: React.FC<PropScoreBadgeProps> = ({ score }) => {
  const getScoreColor = (score: number) => {
    if (score >= 9.0) return { bg: 'bg-green-100', text: 'text-green-800', ring: 'ring-green-600' };
    if (score >= 8.0) return { bg: 'bg-blue-100', text: 'text-blue-800', ring: 'ring-blue-600' };
    if (score >= 7.0) return { bg: 'bg-yellow-100', text: 'text-yellow-800', ring: 'ring-yellow-600' };
    return { bg: 'bg-red-100', text: 'text-red-800', ring: 'ring-red-600' };
  };

  const colors = getScoreColor(score);

  return (
    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full ${colors.bg} ring-2 ${colors.ring}`}>
      <Award className={`w-4 h-4 ${colors.text}`} />
      <span className={`font-bold text-sm ${colors.text}`}>{score.toFixed(1)}/10</span>
    </div>
  );
};