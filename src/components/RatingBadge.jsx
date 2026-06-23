import React from 'react';
import { Star } from 'lucide-react';

export default function RatingBadge({ type = 'google', rating = 4.7, count = 1325, className = '' }) {
  const isGoogle = type.toLowerCase() === 'google';
  
  return (
    <div className={`inline-flex items-center gap-3 bg-[#1e1e1e]/80 backdrop-blur-md border border-[#3a3939] px-4 py-2 rounded-full shadow-lg ${className}`}>
      {/* Brand Icon/Name */}
      <span className="text-xs font-bold font-sans uppercase tracking-wider text-[#8e9192]">
        {isGoogle ? 'Google' : 'Zomato'}
      </span>
      
      {/* Divider */}
      <div className="w-[1px] h-4 bg-[#3a3939]" />
      
      {/* Star + Score */}
      <div className="flex items-center gap-1">
        <Star className="w-4 h-4 fill-[#ffbf00] text-[#ffbf00]" />
        <span className="text-sm font-bold text-[#c8c6c5] font-sans">
          {rating.toFixed(1)}
        </span>
      </div>
      
      {/* Reviews Count */}
      <span className="text-xs text-[#8e9192] font-sans hidden sm:inline">
        ({count} reviews)
      </span>
    </div>
  );
}
