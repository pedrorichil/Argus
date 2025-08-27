import { useState, useEffect } from 'react';

export const useStorage = (refreshInterval = 10000) => { 
  const [storage, setStorage] = useState({ rows: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/storage');
        if (response.ok) {
          const data = await response.json();
          setStorage(data);
        }
      } catch (error) {
        console.error("Failed to fetch storage:", error);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, refreshInterval);
    return () => clearInterval(interval);
  }, [refreshInterval]);

  return { storage };
};