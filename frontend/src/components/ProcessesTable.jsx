import React from 'react';
import Card from './Card';
import { FaListAlt } from 'react-icons/fa';
import { formatBytes } from '../utils/format';
import { getUserColor } from '../utils/colors';

const ProcessesTable = ({ processes }) => {
  return (
    <Card title="Processos em Execução" icon={FaListAlt} className="overflow-x-auto">
      <div className="min-w-full">
        <table className="w-full text-sm text-left text-theme-text-muted">
          <thead className="text-xs text-theme-text uppercase bg-gray-700/10">
            <tr>
              <th scope="col" className="px-4 py-3">PID</th>
              <th scope="col" className="px-4 py-3">Nome</th>
              <th scope="col" className="px-4 py-3">Usuário</th>
              <th scope="col" className="px-4 py-3 text-right">CPU %</th>
              <th scope="col" className="px-4 py-3 text-right">RAM</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-theme-border/50">
            {processes?.rows?.map((p) => (
              <tr key={p.pid} className="hover:bg-gray-800/50">
                <td className="px-4 py-2 font-mono">{p.pid}</td>
                <td className="px-4 py-2 font-medium text-theme-text truncate max-w-xs">{p.name}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${getUserColor(p.user).replace('text-', 'bg-')}/20 ${getUserColor(p.user)}`}>
                    {p.user}
                  </span>
                </td>
                
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