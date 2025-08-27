import { useState, useEffect } from 'react';

export const useTemps = (refreshInterval = 2000) => {
  const [temps, setTemps] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/temps');
        if (response.ok) {
          const data = await response.json();
          setTemps(data);
        }
      } catch (error) {
        console.error("Failed to fetch temps:", error);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, refreshInterval);
    return () => clearInterval(interval);
  }, [refreshInterval]);

  return { temps };
};