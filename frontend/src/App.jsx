import React, { useState, useEffect } from 'react';
import { useSysMetrics } from './hooks/useSysMetrics';
import { useProcesses } from './hooks/useProcesses';
import { useStorage } from './hooks/useStorage';
import { useTemps } from './hooks/useTemps';

import Header from './components/Header';
import Card from './components/Card';
import GaugeKpi from './components/GaugeKpi';
import ProcessesTable from './components/ProcessesTable';
import Storage from './components/Storage';
import CpuMemTrend from './components/charts/CpuMemTrend';
import TemperaturePanel from './components/TemperaturePanel';
import { themeColors } from './utils/colors';
import { FaServer, FaMemory, FaHdd, FaMicrochip } from 'react-icons/fa'; 

const HISTORY_LIMIT = 30;

function App() {
  const { stats, loading, error } = useSysMetrics();
  const { processes } = useProcesses();
  const { storage } = useStorage();
  const { temps } = useTemps();

  const [cpuHistory, setCpuHistory] = useState([]);
  const [ramHistory, setRamHistory] = useState([]);
  const [diskHistory, setDiskHistory] = useState([]);

  const isConnected = !loading && !error;

  useEffect(() => {
    if (stats) {
      const updateHistory = (setter, value) => {
        setter(prev => {
          const next = [...prev, value];
          return next.length > HISTORY_LIMIT ? next.slice(1) : next;
        });
      };
      updateHistory(setCpuHistory, stats.cpu);
      updateHistory(setRamHistory, stats.ram);
      updateHistory(setDiskHistory, stats.disk);
    }
  }, [stats]);

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-theme-bg">
      <Header isConnected={isConnected} />

      {loading && <p className="text-center text-lg">Conectando ao servidor Argus...</p>}
      {error && <p className="text-center text-lg text-red-500">Erro de conexão: {error}</p>}
      
      {isConnected && (
        <div className="grid grid-cols-12 gap-6">

          <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3">
            <Card title="Uso de CPU" icon={FaMicrochip}>
              <GaugeKpi value={stats.cpu} unit="%" historyData={cpuHistory} color={themeColors.cyan} />
            </Card>
          </div>

          <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3">
            <Card title="Uso de RAM" icon={FaMemory}>
              <GaugeKpi value={stats.ram} unit="%" historyData={ramHistory} color={themeColors.purple} />
            </Card>
          </div>

          <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3">
            <Card title="Uso de Disco" icon={FaHdd}>
              <GaugeKpi value={stats.disk} unit="%" historyData={diskHistory} color={themeColors.amber} />
            </Card>
          </div>

          <div className="col-span-12 sm:col-span-6 md:col-span-12 lg:col-span-3">
            <TemperaturePanel temps={temps} />
          </div>

          <div className="col-span-12 lg:col-span-8">
            <CpuMemTrend cpuData={cpuHistory} ramData={ramHistory} />
          </div>

          <div className="col-span-12 lg:col-span-4">
            <Storage storageData={storage} />
          </div>

          <div className="col-span-12">
            <ProcessesTable processes={processes} />
          </div>
          
        </div>
      )}
    </div>
  );
}

export default App;