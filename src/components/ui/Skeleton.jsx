import React from 'react';

export const SkeletonText = ({ lines = 1, className = "" }) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
      ))}
    </div>
  );
};

export const SkeletonCard = ({ className = "" }) => {
  return (
    <div className={`p-4 bg-white border border-gray-100 rounded-2xl shadow-sm ${className}`}>
      <div className="flex gap-4 items-center mb-4">
        <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
        <div className="space-y-2 flex-1">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
          <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2"></div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
      </div>
    </div>
  );
};

export const SkeletonTable = ({ rows = 3, cols = 4, className = "" }) => {
  return (
    <div className={`w-full border border-gray-200 rounded-2xl overflow-hidden ${className}`}>
      <div className="flex bg-gray-50 border-b border-gray-200 p-4 gap-4">
        {Array.from({ length: cols }).map((_, i) => (
          <div key={`th-${i}`} className="h-4 bg-gray-300 rounded animate-pulse flex-1"></div>
        ))}
      </div>
      {Array.from({ length: rows }).map((_, r) => (
        <div key={`tr-${r}`} className="flex border-b border-gray-100 p-4 gap-4 bg-white">
          {Array.from({ length: cols }).map((_, c) => (
            <div key={`td-${r}-${c}`} className="h-4 bg-gray-200 rounded animate-pulse flex-1"></div>
          ))}
        </div>
      ))}
    </div>
  );
};
