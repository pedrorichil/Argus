import React from 'react';
import Card from './Card';
import { FaThermometerHalf, FaFan } from 'react-icons/fa';
import { SiNvidia } from 'react-icons/si';

const getTempStatus = (temp) => {
    if (temp === null || temp === undefined) return { color: 'text-gray-400', label: 'N/A' };
    if (temp < 70) return { color: 'text-green-400', label: 'Normal' };
    if (temp < 85) return { color: 'text-yellow-400', label: 'Alerta' };
    return { color: 'text-red-500', label: 'Crítico' };
};

const TemperaturePanel = ({ temps }) => {
    const cpuStatus = getTempStatus(temps?.cpu);

    return (
        <Card title="Monitoramento de Hardware" icon={FaThermometerHalf}>
            <div className="flex flex-col gap-3 text-sm">
                <div className="flex justify-between items-center">
                    <span className="text-theme-text-muted">Temperatura da CPU</span>
                    <span className={`font-bold ${cpuStatus.color}`}>{temps?.cpu ?? 'N/A'} °C ({cpuStatus.label})</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-theme-text-muted">GPU</span>
                    <span className="font-bold text-white">{temps?.gpu ? `${temps.gpu} °C` : 'Não Detectada'}</span>
                </div>
                 <div className="flex justify-between items-center">
                    <span className="text-theme-text-muted">Fan</span>
                    <span className="font-bold text-white">{temps?.fanRpm ? `${temps.fanRpm} RPM` : 'N/A'}</span>
                </div>
            </div>
        </Card>
    );
};

export default TemperaturePanel;