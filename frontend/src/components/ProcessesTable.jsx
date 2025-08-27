import React from 'react';
import Card from './Card';
import { FaListAlt } from 'react-icons/fa';
import { formatBytes } from '../utils/format';

const ProcessesTable = ({ processes }) => {
  return (
    <Card title="Processos" icon={FaListAlt} className="overflow-x-auto">
      <div className="min-w-full">
        <table className="w-full text-sm text-left text-gray-400">
          <thead className="text-xs text-gray-300 uppercase bg-gray-700/50">
            <tr>
              <th scope="col" className="px-4 py-2">PID</th>
              <th scope="col" className="px-4 py-2">Nome</th>
              <th scope="col" className="px-4 py-2">Usuário</th>
              <th scope="col" className="px-4 py-2 text-right">CPU %</th>
              <th scope="col" className="px-4 py-2 text-right">RAM</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {processes.rows.map((p) => (
              <tr key={p.pid} className="hover:bg-gray-800">
                <td className="px-4 py-2 font-mono">{p.pid}</td>
                <td className="px-4 py-2 font-medium text-white truncate max-w-xs">{p.name}</td>
                <td className="px-4 py-2">{p.user}</td>
                <td className="px-4 py-2 font-mono text-right">{p.cpu.toFixed(1)}%</td>
                <td className="px-4 py-2 font-mono text-right">{formatBytes(p.ramMB * 1024 * 1024)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default ProcessesTable;