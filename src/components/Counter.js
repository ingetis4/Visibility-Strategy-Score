import React, { useState, useEffect } from 'react';
import counterService from '../services/counter';
import './Counter.css';

function Counter() {
  const [stats, setStats] = useState({ total: 0, today: 0, formatted: { total: '0', today: '0' } });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await counterService.getStats();
        setStats(data);
      } catch (error) {
        console.error('[COUNTER] Erreur:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    
    // Rafraîchir toutes les 5 minutes
    const interval = setInterval(fetchStats, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="counter-container">
        <div className="counter-loading">...</div>
      </div>
    );
  }

  return (
    <div className="counter-container">
      <div className="counter-item">
        <span className="counter-label">Sites analysés</span>
        <span className="counter-value">{stats.formatted.total || stats.total}</span>
      </div>
      {stats.today > 0 && (
        <div className="counter-item counter-today">
          <span className="counter-label">Aujourd'hui</span>
          <span className="counter-value">{stats.today}</span>
        </div>
      )}
    </div>
  );
}

export default Counter;

