import React from 'react';
import Card from './Card';
import { FaHdd } from 'react-icons/fa';
import { formatBytes } from '../utils/format';

const StorageItem = ({ data }) => {
  const { label, pct, usedBytes, totalBytes } = data;

  return (
    <div className="grid grid-cols-12 items-center gap-3 text-sm">
      
      <div className="col-span-2 truncate font-bold text-theme-text">
        {label}
      </div>

      <div className="col-span-7">
        <div className="w-full bg-gray-700/50 rounded-full h-3 relative">
          <div
            className="h-3 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400"
            style={{ width: `${pct}%` }}
          ></div>
        </div>
      </div>

      <div className="col-span-3 text-right">
         <span className="font-mono font-bold text-white">{pct?.toFixed(1) ?? '0.0'}%</span>
      </div>

       <div className="col-start-3 col-span-10 text-xs text-theme-text-muted -mt-1">
          {formatBytes(usedBytes)} de {formatBytes(totalBytes)}
       </div>
    </div>
  );
};

const Storage = ({ storageData }) => {
  return (
    <Card title="Armazenamento" icon={FaHdd}>
      <div className="flex flex-col gap-5 h-full justify-center">
        {storageData?.rows?.length > 0 ? (
          storageData.rows.map((disk) => <StorageItem key={disk.id} data={disk} />)
        ) : (
          <p className="text-theme-text-muted text-sm text-center">
            Nenhum dispositivo de armazenamento encontrado.
          </p>
        )}
      </div>
    </Card>
  );
};

export default Storage;