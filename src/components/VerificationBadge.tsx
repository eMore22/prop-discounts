import React from 'react';
import { CheckCircle, Star, Heart, Clock } from 'lucide-react';

interface VerificationBadgeProps {
  status: 'verified' | 'sponsored' | 'community-favorite' | 'limited-time';
}

export const VerificationBadge: React.FC<VerificationBadgeProps> = ({ status }) => {
  const badges = {
    verified: {
      icon: CheckCircle,
      label: 'Verified',
      color: 'bg-green-100 text-green-800',
      iconColor: 'text-green-600'
    },
    sponsored: {
      icon: Star,
      label: 'Sponsored',
      color: 'bg-yellow-100 text-yellow-800',
      iconColor: 'text-yellow-600'
    },
    'community-favorite': {
      icon: Heart,
      label: 'Community Favorite',
      color: 'bg-pink-100 text-pink-800',
      iconColor: 'text-pink-600'
    },
    'limited-time': {
      icon: Clock,
      label: 'Limited Time',
      color: 'bg-orange-100 text-orange-800',
      iconColor: 'text-orange-600'
    }
  };

  const badge = badges[status];
  const Icon = badge.icon;

  return (
    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${badge.color}`}>
      <Icon className={`w-3 h-3 ${badge.iconColor}`} />
      {badge.label}
    </div>
  );
};