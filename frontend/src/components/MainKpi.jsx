import React from 'react';

const MainKpi = ({ title, value, unit, icon, textColorClass, bgColorClass }) => {
  const Icon = icon;
  
  const progressValue = typeof value === 'number' ? value : parseFloat(value);

  return (
    <div className="bg-theme-card p-4 rounded-lg border border-theme-border flex-1 min-w-[240px]">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Icon className={`text-2xl ${textColorClass}`} />
          <span className="text-theme-text-muted">{title}</span>
        </div>
        <span className="text-xl font-bold text-white">
          {typeof value === 'number' ? value.toFixed(1) : value}
          <span className="text-base">{unit}</span>
        </span>
      </div>

      {typeof progressValue === 'number' && !isNaN(progressValue) && (
        <div className="w-full bg-gray-700/50 rounded-full h-1.5 mt-3">
          <div 
            className={`h-1.5 rounded-full ${bgColorClass}`} 
            style={{ width: `${progressValue}%` }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default MainKpi;