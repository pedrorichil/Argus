import React from 'react';

const Card = ({ title, icon, children, className = '' }) => {
  const Icon = icon;
  return (
    <div className={`bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-gray-700 ${className}`}>
      {title && (
        <div className="flex items-center gap-2 mb-4">
          {Icon && <Icon className="text-cyan-400" />}
          <h2 className="text-lg font-bold text-white">{title}</h2>
        </div>
      )}
      <div className="h-full">
        {children}
      </div>
    </div>
  );
};

export default Card;