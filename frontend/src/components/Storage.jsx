import React from 'react';
import Card from './Card';
import { FaHdd } from 'react-icons/fa';
import { formatBytes } from '../utils/format';

const Storage = ({ storageData }) => {
  return (
    <Card title="Armazenamento" icon={FaHdd}>
      <div className="flex flex-col gap-2 text-sm">
        {storageData?.rows?.length > 0 ? (
          storageData.rows.map(disk => (
            <div key={disk.id} className="flex justify-between items-center">
              <span className="font-bold text-theme-text">{disk.label} →</span>
              <span className="font-mono text-theme-text-muted">
                {formatBytes(disk.usedBytes)} / {formatBytes(disk.totalBytes)} ({disk.pct.toFixed(1)}%)
              </span>
            </div>
          ))
        ) : (
          <p className="text-theme-text-muted">Nenhum dispositivo encontrado.</p>
        )}
      </div>
    </Card>
  );
};

export default Storage;