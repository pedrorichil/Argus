import React from 'react';
import { FaServer } from 'react-icons/fa';

const Header = ({ isConnected }) => {
  return (
    <header className="mb-6">
      <div className="flex items-center gap-4">
        <FaServer className="text-3xl text-cyan-400" />
        <div>
          <h1 className="text-3xl font-bold text-white">Argus API Dashboard</h1>
          <div className="flex items-center gap-2 text-sm">
            <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
            <span>{isConnected ? 'Conectado ao Servidor' : 'Desconectado'}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;