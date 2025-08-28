import React from 'react';
import Clock from './Clock';
import argusIcon from '/logo.png';

const Header = ({ isConnected, latency }) => {
  return (
    <header className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-4">
        <img src={argusIcon} alt="Argus Icon" className="h-10 w-10" />
        <div>
          <h1 className="text-2xl font-bold text-white">Argus – Dashboard de Monitoramento</h1>
          <div className="flex items-center gap-2 text-sm text-theme-text-muted">
            <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span>{isConnected ? `Sistema Online – ${latency}ms` : 'Desconectado'}</span>
          </div>
        </div>
      </div>
      
      <Clock />
    </header>
  );
};

export default Header;