import React from 'react';
import { Line } from 'react-chartjs-2';
import Card from '../Card';
import { FaWifi } from 'react-icons/fa';
import { themeColors } from '../../utils/colors';

const chartOptions = {
    responsive: true, maintainAspectRatio: false,
    scales: {
        y: { beginAtZero: true, ticks: { color: themeColors.textMuted, callback: (v) => `${v} Mbps` }, grid: { color: themeColors.border } },
        x: { ticks: { display: false }, grid: { display: false } },
    },
    elements: { point: { radius: 0, hoverRadius: 6 }, line: { borderWidth: 2, tension: 0.4 } },
    plugins: { legend: { display: true, position: 'top', align: 'end', labels: { color: themeColors.text } } },
};

const NetworkTrend = ({ rxHistory, txHistory }) => {
    const chartData = {
        labels: rxHistory.map((_, i) => i),
        datasets: [
            { label: 'Download', data: rxHistory, borderColor: themeColors.green, fill: false },
            { label: 'Upload', data: txHistory, borderColor: themeColors.orange, fill: false }
        ]
    };

    return (
        <Card title="Rede (Mbps)" icon={FaWifi}>
            <div className="h-48">
                <Line data={chartData} options={chartOptions} />
            </div>
        </Card>
    );
};

export default NetworkTrend;