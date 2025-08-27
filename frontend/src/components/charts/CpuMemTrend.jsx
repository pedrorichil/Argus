import React from 'react';
import { Line } from 'react-chartjs-2';
import Card from '../Card';
import { FaChartArea } from 'react-icons/fa';
import { themeColors } from '../../utils/colors';

const createGradient = (context, rgbColor) => {
  const chart = context.chart;
  const { ctx, chartArea } = chart;

  if (!chartArea) {
    return null;
  }
  
  const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
  gradient.addColorStop(0, `rgba(${rgbColor}, 0)`);      
  gradient.addColorStop(0.5, `rgba(${rgbColor}, 0.2)`); 
  gradient.addColorStop(1, `rgba(${rgbColor}, 0.5)`); 
  
  return gradient;
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      max: 100,
      ticks: {
        color: themeColors.textMuted,
        callback: (value) => `${value}%`,
      },
      grid: {
        color: themeColors.border, 
      },
    },
    x: {
      ticks: {
        display: false,
      },
      grid: {
        display: false, 
      },
    },
  },
  elements: {
    point: {
      radius: 0,
      hoverRadius: 6, 
      backgroundColor: 'white',
      borderColor: 'white',
    },
    line: {
      borderWidth: 2,
      tension: 0.4, 
    },
  },
  plugins: {
    legend: {
      display: true,
      position: 'top',
      align: 'end',
      labels: {
        color: themeColors.text,
        boxWidth: 12,
        padding: 20,
        font: {
          size: 14,
        }
      },
    },
    tooltip: {
      mode: 'index',
      intersect: false,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleFont: { size: 14 },
      bodyFont: { size: 12 },
      callbacks: {
        label: function(context) {
          return ` ${context.dataset.label}: ${context.parsed.y.toFixed(1)}%`;
        }
      }
    }
  }
};


const CpuMemTrend = ({ cpuData = [], ramData = [] }) => {
  const chartData = {
    labels: cpuData.map((_, index) => index), 
    datasets: [
      {
        label: 'CPU',
        data: cpuData,
        borderColor: themeColors.cyan,
        fill: true,
        backgroundColor: (context) => createGradient(context, '34, 211, 238'), 
      },
      {
        label: 'RAM',
        data: ramData,
        borderColor: themeColors.purple,
        fill: true,
        backgroundColor: (context) => createGradient(context, '192, 132, 252'),
      },
    ],
  };

  return (
    <Card title="Tendência de Uso (CPU & RAM)" icon={FaChartArea}>
      <div className="h-full min-h-[250px] md:min-h-[300px]">
        <Line data={chartData} options={chartOptions} />
      </div>
    </Card>
  );
};

export default CpuMemTrend;