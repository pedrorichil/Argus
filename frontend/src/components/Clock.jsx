import React, { useState, useEffect } from 'react';

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timerId); 
  }, []);

  const formatDate = (date) => {
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('pt-BR');
  };

  return (
    <div className="font-mono text-right">
      <div className="text-sm text-theme-text">{formatDate(time)}</div>
      <div className="text-lg font-bold text-white">{formatTime(time)}</div>
    </div>
  );
};

export default Clock;