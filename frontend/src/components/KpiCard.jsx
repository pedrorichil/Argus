import React from 'react';
import { Line } from 'react-chartjs-2'; 

const miniChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: { enabled: false },
  },
  scales: {
    x: { display: false },
    y: { display: false },
  },
  elements: {
    point: { radius: 0 }, 
    line: { borderWidth: 2, tension: 0.4 },
  },
  layout: {
    padding: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
  },
  animation: {
    duration: 0,
  },
};

const KpiCard = ({ title, value, unit, icon, color, historyData = [], chartColor = 'rgb(34, 211, 238)' }) => {
  const Icon = icon;

  const chartData = {
    labels: historyData.map((_, i) => i),
    datasets: [{
      data: historyData,
      borderColor: chartColor,
      backgroundColor: `rgba(${parseInt(chartColor.slice(4, -1).split(',')[0])}, ${parseInt(chartColor.slice(4, -1).split(',')[1])}, ${parseInt(chartColor.slice(4, -1).split(',')[2])}, 0.1)`, // Um tom mais claro
      fill: true,
    }],
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col justify-between h-40">
      <div className="flex justify-between items-center mb-2">
        <div className="text-sm text-gray-400">{title}</div>
        <div className={`text-xl ${color}`}>
          <Icon />
        </div>
      </div>
      <div className="text-3xl font-bold text-white mb-2">
        {value ?? '-'}
        <span className="text-xl ml-1 text-gray-300">{unit}</span>
      </div>
      <div className="h-16 w-full mt-auto"> 
        {historyData.length > 1 && <Line data={chartData} options={miniChartOptions} />}
      </div>
    </div>
  );
};

export default KpiCard;