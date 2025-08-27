import { useState, useEffect } from 'react';

export const useSysMetrics = (refreshInterval = 2000) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/stats');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setStats(data);
        setError(null);
      } catch (e) {
        setError('Failed to fetch stats');
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData(); 
    const interval = setInterval(fetchData, refreshInterval);

    return () => clearInterval(interval); 
  }, [refreshInterval]);

  return { stats, loading, error };
};