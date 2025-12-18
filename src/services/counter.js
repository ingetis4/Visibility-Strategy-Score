/**
 * Service pour récupérer et afficher le compteur social proof
 */

const API_BASE_URL = process.env.REACT_APP_API_URL || '';

/**
 * Récupère les statistiques du compteur depuis l'API
 */
async function getStats() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/stats`);
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des stats');
    }
    const data = await response.json();
    return data.counter || { total: 0, today: 0, formatted: { total: '0', today: '0' } };
  } catch (error) {
    console.error('[COUNTER] Erreur:', error);
    // Retourner des valeurs par défaut en cas d'erreur
    return { total: 0, today: 0, formatted: { total: '0', today: '0' } };
  }
}

/**
 * Formate un nombre pour l'affichage (ex: 1234 -> "1.2k")
 */
function formatNumber(num) {
  if (num < 1000) return num.toString();
  if (num < 1000000) return (num / 1000).toFixed(1) + 'k';
  return (num / 1000000).toFixed(1) + 'M';
}

export default {
  getStats,
  formatNumber
};

