import React, { useState } from 'react';
import './Form.css';
import { normalizeUrl } from '../utils/urlNormalizer';

function Form({ onSubmit, loading, error }) {
  const [formData, setFormData] = useState({
    url: '',
    sector: '',
    offer: '',
    email: '',
    analysis_type: 'both',
    acceptTerms: false
  });

  const handleChange = (e) => {
    // Pour le champ URL, ajouter automatiquement https:// si manquant
    if (e.target.name === 'url') {
      let value = e.target.value;
      // Si l'URL ne commence pas par http:// ou https://, on la laisse telle quelle
      // La normalisation se fera au onBlur ou à la soumission
      setFormData({
        ...formData,
        [e.target.name]: value
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    }
  };

  const handleUrlBlur = (e) => {
    // Normaliser l'URL quand l'utilisateur quitte le champ
    // Cela ajoute automatiquement https:// si manquant et normalise au domaine de base
    if (e.target.name === 'url' && e.target.value.trim()) {
      const normalized = normalizeUrl(e.target.value);
      setFormData({
        ...formData,
        url: normalized
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.acceptTerms) {
      alert('Veuillez accepter les conditions d\'utilisation pour continuer.');
      return;
    }
    
    // Normaliser l'URL avant de soumettre (au cas où l'utilisateur n'a pas quitté le champ)
    const normalizedUrl = normalizeUrl(formData.url);
    const formDataToSubmit = {
      ...formData,
      url: normalizedUrl
    };
    
    onSubmit(formDataToSubmit);
  };

  return (
    <div className="form-container">
      <div className="form-card">
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="form">
          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label htmlFor="url" className="form-label">
              URL du site *
            </label>
            <input
              type="url"
              id="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
              onBlur={handleUrlBlur}
              className="form-input"
              placeholder="https://example.com"
              required
            />
            <small className="form-hint">
              💡 L'URL sera automatiquement normalisée au domaine de base (ex: https://example.com)
            </small>
          </div>

          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label htmlFor="analysis_type" className="form-label">
              Type d'analyse *
            </label>
            <select
              id="analysis_type"
              name="analysis_type"
              value={formData.analysis_type}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="both">🔍 Analyse complète (SEO + IA)</option>
              <option value="seo">📈 Analyse SEO uniquement</option>
              <option value="ia">🤖 Analyse IA uniquement</option>
            </select>
            <small className="form-hint">
              {formData.analysis_type === 'both' && '✨ Recommandé : évalue les deux canaux de visibilité'}
              {formData.analysis_type === 'seo' && '📊 Évalue uniquement la préparation pour les moteurs de recherche classiques'}
              {formData.analysis_type === 'ia' && '🤖 Évalue uniquement la préparation pour les moteurs conversationnels'}
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              placeholder="votre@email.com"
              required
            />
            <small className="form-hint">
              📧 Utilisé uniquement pour l'analyse
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="sector" className="form-label">
              Secteur d'activité
            </label>
            <input
              type="text"
              id="sector"
              name="sector"
              value={formData.sector}
              onChange={handleChange}
              className="form-input"
              placeholder="Ex: SaaS B2B, E-commerce"
            />
          </div>

          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label htmlFor="offer" className="form-label">
              Offre principale
            </label>
            <input
              type="text"
              id="offer"
              name="offer"
              value={formData.offer}
              onChange={handleChange}
              className="form-input"
              placeholder="Ex: Logiciel de facturation"
            />
          </div>

          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label className="form-checkbox-label">
              <input
                type="checkbox"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                className="form-checkbox"
                required
              />
              <span className="form-checkbox-text">
                J'accepte les{' '}
                <a 
                  href="#conditions" 
                  className="form-link"
                  onClick={(e) => {
                    e.preventDefault();
                    const event = new CustomEvent('openLegalModal', { detail: 'conditions' });
                    window.dispatchEvent(event);
                  }}
                >
                  conditions d'utilisation
                </a>
                {' '}et les{' '}
                <a 
                  href="#mentions" 
                  className="form-link"
                  onClick={(e) => {
                    e.preventDefault();
                    const event = new CustomEvent('openLegalModal', { detail: 'mentions' });
                    window.dispatchEvent(event);
                  }}
                >
                  mentions légales
                </a>
                {' '}*
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="form-button"
            disabled={loading || !formData.acceptTerms}
          >
            {loading ? '⏳ Analyse en cours...' : '🚀 Lancer l\'analyse'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Form;

