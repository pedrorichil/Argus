import React, { useState, useEffect, useCallback } from 'react';

import { useSysMetrics } from './hooks/useSysMetrics';
import { useProcesses } from './hooks/useProcesses';
import { useStorage } from './hooks/useStorage';
import { useTemps } from './hooks/useTemps';

import { formatBps } from './utils/format';

import Header from './components/Header';
import MainKpi from './components/MainKpi';
import ProcessesTable from './components/ProcessesTable';
import Storage from './components/Storage';
import CpuMemTrend from './components/charts/CpuMemTrend';
import TemperaturePanel from './components/TemperaturePanel';
import ResourceDonut from './components/charts/ResourceDonut';
import NetworkTrend from './components/charts/NetworkTrend';

import { FaMicrochip, FaMemory, FaHdd, FaNetworkWired } from 'react-icons/fa';

const CHART_HISTORY_LIMIT = 60; 
function App() {
  const { stats, loading, error, latency } = useSysMetrics();
  const { processes } = useProcesses();
  const { storage } = useStorage();
  const { temps } = useTemps();

  const [cpuHistory, setCpuHistory] = useState([]);
  const [ramHistory, setRamHistory] = useState([]);
  const [netRxHistory, setNetRxHistory] = useState([]);
  const [netTxHistory, setNetTxHistory] = useState([]);

  const isConnected = !loading && !error;
  const updateHistory = useCallback((setter, value) => {
    setter(prev => {
      const next = [...prev, value];
      return next.length > CHART_HISTORY_LIMIT ? next.slice(1) : next;
    });
  }, []); 

  useEffect(() => {
    if (stats) {
      updateHistory(setCpuHistory, stats.cpu);
      updateHistory(setRamHistory, stats.ram);
      updateHistory(setNetRxHistory, stats.net.rx_mbps);
      updateHistory(setNetTxHistory, stats.net.tx_mbps);
    }
  }, [stats, updateHistory]);

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-theme-bg text-theme-text">
      <Header isConnected={isConnected} latency={latency} />

      {loading && <p className="text-center text-lg">Conectando ao servidor Argus...</p>}
      {error && <p className="text-center text-lg text-red-500">Erro de conexão: {error}</p>}
      
      {isConnected && stats && (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row flex-wrap gap-6">
                <MainKpi 
                    title="CPU" 
                    value={stats.cpu} 
                    unit="%" 
                    icon={FaMicrochip} 
                    textColorClass="text-theme-cyan"
                    bgColorClass="bg-theme-cyan" 
                />
                <MainKpi 
                    title="RAM" 
                    value={stats.ram} 
                    unit="%" 
                    icon={FaMemory} 
                    textColorClass="text-theme-purple"
                    bgColorClass="bg-theme-purple"
                />
                <MainKpi 
                    title="Disco" 
                    value={stats.disk} 
                    unit="%" 
                    icon={FaHdd} 
                    textColorClass="text-theme-amber"
                    bgColorClass="bg-theme-amber"
                />
                <MainKpi 
                    title="Rede" 
                    value={`${formatBps(stats.net.rx_bps * 8)} ↓ / ${formatBps(stats.net.tx_bps * 8)} ↑`} 
                    unit="" 
                    icon={FaNetworkWired} 
                    textColorClass="text-theme-green"
                />

            </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            <div className="lg:col-span-2 flex flex-col gap-6">
              <CpuMemTrend cpuData={cpuHistory} ramData={ramHistory} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ResourceDonut stats={stats} />
                <NetworkTrend rxHistory={netRxHistory} txHistory={netTxHistory} />
              </div>
            </div>
            <div className="lg:col-span-1 flex flex-col gap-6">
              <TemperaturePanel temps={temps} />
              <Storage storageData={storage} />
              <ProcessesTable processes={processes} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;