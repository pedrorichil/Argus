import { useState, useEffect } from 'react';

export const useProcesses = (refreshInterval = 2000) => {
  const [processes, setProcesses] = useState({ rows: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/processes');
        if (response.ok) {
          const data = await response.json();
          setProcesses(data);
        }
      } catch (error) {
        console.error("Failed to fetch processes:", error);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, refreshInterval);
    return () => clearInterval(interval);
  }, [refreshInterval]);

  return { processes };
};