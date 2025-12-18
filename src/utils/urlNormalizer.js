/**
 * Normalise une URL pour ne garder que le domaine de base (protocole + hostname)
 * Exemples:
 * - https://example.com/page/subpage → https://example.com
 * - https://www.example.fr/article → https://www.example.fr
 * - https://example.co.uk/blog → https://example.co.uk
 * - example.com → https://example.com (ajoute https:// si manquant)
 * 
 * @param {string} urlString - L'URL à normaliser
 * @returns {string} - L'URL normalisée (protocole + hostname uniquement)
 */
export function normalizeUrl(urlString) {
  if (!urlString || typeof urlString !== 'string') {
    return '';
  }

  // Nettoyer l'URL (enlever les espaces)
  const cleaned = urlString.trim();

  // Si l'URL est vide, retourner vide
  if (!cleaned) {
    return '';
  }

  try {
    // Ajouter le protocole si manquant (https:// par défaut)
    let urlToParse = cleaned;
    if (!cleaned.startsWith('http://') && !cleaned.startsWith('https://')) {
      urlToParse = 'https://' + cleaned;
    }

    // Parser l'URL
    const url = new URL(urlToParse);

    // Retourner uniquement le protocole + hostname
    return `${url.protocol}//${url.hostname}`;
  } catch (error) {
    // Si l'URL est invalide, essayer d'ajouter https:// et réessayer
    try {
      const urlWithProtocol = cleaned.startsWith('http://') || cleaned.startsWith('https://') 
        ? cleaned 
        : 'https://' + cleaned;
      const url = new URL(urlWithProtocol);
      return `${url.protocol}//${url.hostname}`;
    } catch (secondError) {
      // Si ça échoue encore, retourner l'original avec https:// ajouté (sera validé côté backend)
      console.warn('Erreur lors de la normalisation de l\'URL:', error);
      return cleaned.startsWith('http://') || cleaned.startsWith('https://') 
        ? cleaned 
        : 'https://' + cleaned;
    }
  }
}

/**
 * Normalise l'URL et met à jour le champ du formulaire
 * Utile pour être utilisé dans un onChange ou onBlur
 * 
 * @param {Event} e - L'événement du champ input
 * @param {Function} setFormData - La fonction pour mettre à jour le state du formulaire
 * @param {Object} formData - L'objet formData actuel
 */
export function handleUrlNormalize(e, setFormData, formData) {
  const normalized = normalizeUrl(e.target.value);
  setFormData({
    ...formData,
    url: normalized
  });
}

