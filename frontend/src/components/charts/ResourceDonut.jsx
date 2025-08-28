import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import Card from '../Card';
import { FaChartPie } from 'react-icons/fa';
import { themeColors } from '../../utils/colors';

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '70%',
  plugins: {
    legend: {
      position: 'right',
      labels: {
        color: themeColors.text,
        boxWidth: 12,
        padding: 15,
      },
    },
  },
};

const ResourceDonut = ({ stats }) => {
  const chartData = {
    labels: ['CPU', 'RAM', 'Disco'],
    datasets: [{
      data: [stats?.cpu, stats?.ram, stats?.disk],
      backgroundColor: [
        themeColors.cyan,
        themeColors.purple,
        themeColors.amber,
      ],
      borderColor: themeColors.card,
      borderWidth: 4,
      hoverOffset: 8,
    }],
  };

  return (
    <Card title="Detalhes dos Recursos" icon={FaChartPie}>
      <div className="h-48">
        <Doughnut data={chartData} options={chartOptions} />
      </div>
    </Card>
  );
};

export default ResourceDonut;