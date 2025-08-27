import React from 'react';
import Card from './Card';
import { FaTemperatureHigh, FaThermometerHalf, FaFan } from 'react-icons/fa';
import { SiNvidia } from 'react-icons/si';

const TempItem = ({ icon, label, value, unit }) => {
  const Icon = icon;
  return (
    <div className="flex items-center justify-between text-sm">
      <div className="flex items-center gap-2 text-gray-300">
        <Icon />
        <span>{label}</span>
      </div>
      <span className="font-mono font-bold text-white">
        {value ?? 'N/A'}
        {value && unit}
      </span>
    </div>
  );
};

const TemperaturePanel = ({ temps }) => {
  return (
    <Card title="Temperaturas e Fans" icon={FaThermometerHalf}>
      <div className="flex flex-col gap-3">
        <TempItem icon={FaTemperatureHigh} label="CPU" value={temps?.cpu} unit="°C" />
        <TempItem icon={FaTemperatureHigh} label="CPU (Max)" value={temps?.cpuMax} unit="°C" />
        <TempItem icon={SiNvidia} label="GPU" value={temps?.gpu} unit="°C" />
        <TempItem icon={FaFan} label="Fan" value={temps?.fanRpm} unit=" RPM" />
      </div>
    </Card>
  );
};

export default TemperaturePanel;