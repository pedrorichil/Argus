import React from 'react';
import { Doughnut, Line } from 'react-chartjs-2';

const gaugeOptions = {
  responsive: true,
  maintainAspectRatio: false,
  circumference: 180,
  rotation: -90,
  cutout: '80%',
  plugins: { tooltip: { enabled: false } },
  animation: { duration: 0 },
};

const trendOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: { x: { display: false }, y: { display: false } },
  elements: { point: { radius: 0 }, line: { borderWidth: 2, tension: 0.4 } },
  plugins: { legend: { display: false }, tooltip: { enabled: false } },
  animation: { duration: 0 },
};


const GaugeKpi = ({ value, unit, historyData, color }) => {
  const gaugeData = {
    datasets: [{
      data: [value, 100 - value],
      backgroundColor: [color, 'rgba(255, 255, 255, 0.08)'],
      borderColor: 'transparent',
      borderWidth: 0,
    }],
  };

  const trendData = {
    labels: historyData.map((_, i) => i),
    datasets: [{
      data: historyData,
      borderColor: color,
    }],
  };

  return (
    <div className="h-full flex flex-col justify-between items-center pt-2">

      <div className="relative w-full flex-1">
        <Doughnut data={gaugeData} options={gaugeOptions} />
        
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-2 pointer-events-none">
          <span className="text-4xl font-bold text-white tracking-tight">
            {value?.toFixed(1) ?? '-'}
          </span>
          <span className="text-lg text-theme-text-muted">{unit}</span>
        </div>
      </div>

      <div className="w-full h-1/4 mt-auto">
        {historyData.length > 1 && <Line data={trendData} options={trendOptions} />}
      </div>

    </div>
  );
};

export default GaugeKpi;