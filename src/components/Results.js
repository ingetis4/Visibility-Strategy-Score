import React from 'react';
import './Results.css';

function Results({ data, onReset, onOpenCalendly }) {
  const { seo, ia, orientation, crawlData, siteType } = data;

  // Mapping des axes SEO vers français
  const seoAxisLabels = {
    crawl: 'Crawl & Accès',
    contenu: 'Optimisation On-Page',
    technique: 'Technique On-page',
    architecture: 'Architecture & Maillage',
    autorite: 'Autorité'
  };

  // Définitions des axes SEO
  const seoAxisDefinitions = {
    crawl: 'Évalue l\'accessibilité du site : HTTPS, robots.txt optimisé, LLMs.txt, sitemap.xml, temps de réponse (TTFB), taux d\'erreurs, propreté des URLs, et indexation des pages.',
    contenu: 'Mesure l\'optimisation technique du contenu : pages exploitables (≥300 mots), titres optimisés (25-65 caractères), meta descriptions (70-160 caractères), qualité des H1, et structure sémantique (H2/H3).',
    technique: 'Analyse les éléments techniques on-page : meta viewport, alt text des images, balises canonical, Schema.org, indexabilité des pages, et répartition par codes statut HTTP.',
    architecture: 'Évalue la structure du site : profondeur de navigation, liens internes entrants/sortants (important pour SEO et IA), et texte d\'ancrage descriptif.',
    autorite: 'Mesure l\'autorité du site : domaines référents (backlinks, cap 3000), pourcentage de liens follow, âge du domaine (poids réduit), et mentions de marque (cap 3000).'
  };

  // Mapping des axes IA vers français (nouveau modèle : maturité IA)
  const iaAxisLabels = {
    exploitabilite: 'Exploitabilité machine',
    credibilite: 'Crédibilité / Entité',
    stabilite: 'Stabilité & fraîcheur'
  };

  // Définitions des axes IA (nouveau modèle : maturité IA)
  const iaAxisDefinitions = {
    exploitabilite: 'Est-ce que l\'IA peut techniquement lire, découper, extraire ? Structure Hn, formats extractibles (listes, tableaux), accessibilité du contenu, HTML stable (peu de JS bloquant).',
    credibilite: 'Est-ce que l\'IA a une raison de faire confiance à ce site ? NAP, Schema.org entité, page À propos, références externes crédibles, avis clients. Si < 20%, l\'IA est structurellement fragile.',
    stabilite: 'Est-ce que le contenu est fiable dans le temps ? Dates & auteurs présents, site à jour, régularité minimale.'
  };

  const getOrientationText = () => {
    if (!seo || !ia) return '';
    
    // Utiliser scoreOn10 si disponible, sinon convertir score/100 en /10
    const seoScore = seo.scoreOn10 !== undefined ? seo.scoreOn10 : (seo.score / 10);
    const iaScore = ia.scoreOn10 !== undefined ? ia.scoreOn10 : (ia.score / 10);
    const diff = Math.abs(iaScore - seoScore);
    
    switch (orientation) {
      case 'IA':
        if (seoScore < 4) {
          return 'Votre site est nettement mieux préparé pour la visibilité IA. Le potentiel SEO est faible, priorisez l\'amélioration de la structure pour les moteurs conversationnels (ChatGPT, Perplexity).';
        } else if (diff >= 2) {
          return 'Votre site est significativement mieux préparé pour la visibilité IA. Les moteurs conversationnels pourront mieux comprendre et citer votre contenu.';
        } else {
          return 'Votre site est mieux préparé pour la visibilité IA. Les moteurs conversationnels pourront mieux comprendre et citer votre contenu.';
        }
      case 'SEO':
        if (iaScore < 4) {
          return 'Votre site est nettement mieux préparé pour la visibilité SEO traditionnelle. Le potentiel IA est faible, priorisez l\'amélioration de la clarté et de la citabilité pour les moteurs de recherche classiques.';
        } else if (diff >= 2) {
          return 'Votre site est significativement mieux préparé pour la visibilité SEO traditionnelle. Les moteurs de recherche classiques (Google, Bing) pourront mieux explorer et classer vos pages.';
        } else {
          return 'Votre site est mieux préparé pour la visibilité SEO traditionnelle. Les moteurs de recherche classiques pourront mieux explorer et classer vos pages.';
        }
      case 'HYBRIDE':
        if (seoScore >= 7 && iaScore >= 7) {
          return 'Excellent ! Votre site présente un équilibre optimal entre préparation SEO et IA. Les deux canaux de visibilité sont bien optimisés.';
        } else if (seoScore >= 5 && iaScore >= 5) {
          return 'Votre site présente un bon équilibre entre préparation SEO et IA. Une approche hybride est recommandée pour maximiser votre visibilité sur tous les canaux.';
        } else {
          return 'Votre site présente un équilibre entre préparation SEO et IA, mais les deux potentiels peuvent être améliorés. Une approche hybride est recommandée pour maximiser votre visibilité.';
        }
      default:
        return '';
    }
  };

  const getScoreColor = (score) => {
    // Score sur 10
    if (score >= 7) return '#4CAF50';
    if (score >= 5) return '#C9AD01';
    return '#FF6B6B';
  };

  const getInterpretation = (score) => {
    // Score sur 10
    if (score >= 8) return 'Excellent : Votre site est très bien préparé.';
    if (score >= 6) return 'Bon : Votre site est bien préparé avec quelques axes d\'amélioration.';
    if (score >= 4) return 'Moyen : Votre site nécessite des améliorations significatives.';
    return 'Faible : Votre site nécessite une refonte importante.';
  };

  // Labels business-friendly pour le score IA réel
  const getIALabel = (iaScore) => {
    // iaScore est sur 10, on le convertit en 0-100 pour les labels
    const iaScore100 = iaScore * 10;
    
    if (iaScore100 >= 80) return { label: '🧠 IA cœur de valeur', message: 'L\'IA est au cœur de votre stratégie de visibilité' };
    if (iaScore100 >= 65) return { label: '🚀 IA stratégique', message: 'L\'IA est un levier à exploiter' };
    if (iaScore100 >= 45) return { label: '✅ IA envisageable', message: 'L\'IA peut devenir un levier intéressant' };
    if (iaScore100 >= 25) return { label: '⚠️ IA prématurée', message: 'L\'IA n\'est pas encore prioritaire aujourd\'hui' };
    return { label: '❌ IA non pertinente', message: 'L\'IA n\'est pas un levier rentable pour votre site' };
  };

  return (
    <div className="results-container">
      <div className="results-header">
        <h2 className="results-title">Résultats de l'analyse</h2>
        <button onClick={onReset} className="reset-button">
          Nouvelle analyse
        </button>
      </div>

      <div className="results-grid">
        {seo && (
          <div className="score-card">
            <div className="score-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 className="score-label">Potentiel SEO</h3>
                <div className="score-info-icon" title="Le potentiel SEO évalue la préparation technique et structurelle de votre site pour les moteurs de recherche classiques (Google, Bing). Il mesure 5 axes selon leur importance : Crawl & Accès (25 pts) - HTTPS, robots.txt optimisé, LLMs.txt, sitemap, TTFB, erreurs, URLs, indexation ; Optimisation On-Page (20 pts) - Pages exploitables, titres, meta, H1, H2/H3 ; Technique On-page (15 pts) - Viewport, alt text, canonical, Schema.org, indexabilité, codes statut ; Architecture & Maillage (20 pts) - Profondeur, liens internes, texte d'ancrage ; Autorité (20 pts) - Liens follow, âge domaine. Le score est adapté selon le type de site détecté.">
                  <span style={{ cursor: 'help', fontSize: '14px', fontWeight: '700' }}>?</span>
                </div>
              </div>
              <div className="score-value" style={{ color: getScoreColor(seo.scoreOn10 || seo.score / 10) }}>
                {seo.scoreOn10 !== undefined ? seo.scoreOn10.toFixed(1) : (seo.score / 10).toFixed(1)}/10
              </div>
            </div>
            {seo.note && (
              <p className="score-note" style={{ fontSize: '0.85rem', color: '#999', fontStyle: 'italic', marginTop: '5px' }}>
                {seo.note}
              </p>
            )}
            <p className="score-interpretation">{getInterpretation(seo.scoreOn10 !== undefined ? seo.scoreOn10 : (seo.score / 10))}</p>
            
            <div className="score-details">
              <h4 className="details-title">Détail par axe</h4>
              {seo.details && (
                <div className="details-list">
                  {Object.entries(seo.details).map(([key, value]) => (
                    <div 
                      key={key} 
                      className="detail-item"
                      title={seoAxisDefinitions[key] || ''}
                      style={{ cursor: 'help' }}
                    >
                      <span className="detail-label">{seoAxisLabels[key] || key}:</span>
                      <span className="detail-score">{value.score || 0}/{value.maxScore || 20} points</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {ia && (
          <div className="score-card">
            <div className="score-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 className="score-label">Potentiel IA</h3>
                <div className="score-info-icon" title="Le potentiel IA évalue la capacité de votre site à transformer son SEO en valeur IA. Il est calculé selon le modèle hiérarchique : IA réel = SEO × Maturité IA. La maturité IA (0-100%) mesure 3 axes : Exploitabilité machine (35%) - Structure Hn, formats extractibles, accessibilité, HTML stable ; Crédibilité/Entité (35%) - NAP, Schema.org entité, page À propos, références externes, avis (si crédibilité < 20%, l'IA est structurellement fragile) ; Stabilité & fraîcheur (30%) - Dates & auteurs, site à jour. Le score IA ne peut jamais dépasser le score SEO, car l'IA dépend structurellement du SEO.">
                  <span style={{ cursor: 'help', fontSize: '14px', fontWeight: '700' }}>?</span>
                </div>
              </div>
              <div className="score-value" style={{ color: getScoreColor(ia.scoreOn10 !== undefined ? ia.scoreOn10 : (ia.score / 10)) }}>
                {ia.scoreOn10 !== undefined ? ia.scoreOn10.toFixed(1) : (ia.score / 10).toFixed(1)}/10
              </div>
              {ia.maturityOn100 !== undefined && (
                <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '8px', fontStyle: 'italic' }}>
                  Maturité IA : {ia.maturityOn100}%
                </p>
              )}
            </div>
            {ia.note && (
              <p className="score-note" style={{ fontSize: '0.85rem', color: '#999', fontStyle: 'italic', marginTop: '5px' }}>
                {ia.note}
              </p>
            )}
            {(() => {
              const iaScore = ia.scoreOn10 !== undefined ? ia.scoreOn10 : (ia.score / 10);
              const iaLabel = getIALabel(iaScore);
              return (
                <div>
                  <p className="score-interpretation" style={{ fontWeight: 'bold', marginBottom: '8px' }}>
                    {iaLabel.label}
                  </p>
                  <p className="score-interpretation" style={{ fontSize: '0.9rem', marginTop: '0' }}>
                    {iaLabel.message}
                  </p>
                </div>
              );
            })()}
            
            <div className="score-details">
              <h4 className="details-title">Détail par axe (maturité)</h4>
              {ia.details && (
                <div className="details-list">
                  {Object.entries(ia.details).map(([key, value]) => {
                    // Le score est déjà entre 0 et 1.0 (maxScore: 1.0)
                    // On le convertit en pourcentage, en s'assurant qu'il ne dépasse pas 100%
                    let scoreValue = value.score !== undefined ? value.score : 0;
                    // S'assurer que le score est bien entre 0 et 1.0
                    scoreValue = Math.max(0, Math.min(1.0, scoreValue));
                    const scorePercent = Math.round(scoreValue * 100);
                    return (
                      <div 
                        key={key} 
                        className="detail-item"
                        title={iaAxisDefinitions[key] || ''}
                        style={{ cursor: 'help' }}
                      >
                        <span className="detail-label">{iaAxisLabels[key] || key}:</span>
                        <span className="detail-score">{scorePercent}%</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {siteType && (
        <div className="score-card" style={{ gridColumn: '1 / -1', background: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)', color: '#FFFFFF', border: 'none' }}>
          <div className="score-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 className="score-label" style={{ color: '#FFFFFF', margin: 0 }}>Type de site détecté</h3>
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#FFFFFF' }}>
              {siteType.type === 'blog' ? '📝 Blog / Média' : 
               siteType.type === 'ecommerce' ? '🛒 E-commerce' :
               siteType.type === 'saas' ? '💼 SaaS / Produit B2B' :
               siteType.type === 'vitrine' ? '🎨 Vitrine / One-page' :
               siteType.type === 'local' ? '📍 Local Business' :
               '❓ Type inconnu'}
            </div>
          </div>
          <p style={{ color: 'rgba(255, 255, 255, 0.9)', marginTop: '12px' }}>
            Confiance : {siteType.confidence}% • Le scoring a été adapté selon ce type de site
          </p>
        </div>
      )}
      {orientation && seo && ia && (
        <div className="orientation-card">
          <h3 className="orientation-title">Orientation stratégique</h3>
          <div className="orientation-badge" data-orientation={orientation}>
            {orientation}
          </div>
          <p className="orientation-text">{getOrientationText()}</p>
        </div>
      )}

      {crawlData && crawlData.pagesAnalyzed > 0 && (
        <div className="crawl-data-section">
          <h3 className="crawl-title">📊 Données analysées de votre site</h3>
          <p className="crawl-subtitle">Ces informations prouvent que votre site a été réellement analysé</p>
          
          <div className="crawl-stats-grid">
            <div className="stat-card">
              <div className="stat-value">{crawlData.pagesAnalyzed || 0}</div>
              <div className="stat-label">Pages analysées</div>
            </div>
            {crawlData.statistics && (
              <>
                <div className="stat-card">
                  <div className="stat-value">{(crawlData.statistics.totalWords || 0).toLocaleString('fr-FR')}</div>
                  <div className="stat-label">Mots au total</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">{crawlData.statistics.averageWordsPerPage || 0}</div>
                  <div className="stat-label">Mots par page (moy.)</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">{crawlData.statistics.totalInternalLinks || 0}</div>
                  <div className="stat-label">Liens internes</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">{crawlData.statistics.totalExternalLinks || 0}</div>
                  <div className="stat-label">Liens externes</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">{(crawlData.statistics.pagesWithMetaDesc || 0)}/{crawlData.pagesAnalyzed || 0}</div>
                  <div className="stat-label">Pages avec meta description</div>
                </div>
              </>
            )}
          </div>

          {crawlData.pagesDetails && crawlData.pagesDetails.length > 0 && (
            <div className="pages-analyzed-section">
              <h4 className="pages-title">Pages analysées en détail</h4>
              <div className="pages-list">
                {crawlData.pagesDetails
                  .filter(page => page && page.url && page.url !== 'URL non disponible')
                  .slice(0, 20)
                  .map((page, index) => (
                    <div key={index} className="page-item">
                      <div className="page-header">
                        <a 
                          href={page.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="page-url"
                        >
                          {page.url}
                        </a>
                      </div>
                      <div className="page-details">
                        <span className="page-title">📄 {page.title || 'Sans titre'}</span>
                        <div className="page-metrics">
                          <span className="metric">{page.wordCount || 0} mots</span>
                          <span className="metric">{page.h1Count || 0} titre(s) H1</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              {crawlData.pagesAnalyzed > 20 && (
                <p className="pages-note">
                  + {crawlData.pagesAnalyzed - 20} autre(s) page(s) analysée(s)
                </p>
              )}
            </div>
          )}

          <div className="technical-info-section">
            <h4 className="technical-title">Informations techniques détectées</h4>
            <div className="technical-grid">
              <div className="technical-item">
                <span className="technical-label">Protocole:</span>
                <span className="technical-value">
                  {crawlData.protocol === 'HTTPS' ? (
                    <span style={{ color: '#4CAF50' }}>✅ {crawlData.protocol}</span>
                  ) : (
                    <span style={{ color: '#FF6B6B' }}>⚠️ {crawlData.protocol}</span>
                  )}
                </span>
              </div>
              <div className="technical-item">
                <span className="technical-label">robots.txt:</span>
                <span className="technical-value">
                  {crawlData.robotsTxt.present ? (
                    <span style={{ color: '#4CAF50' }}>✅ Présent</span>
                  ) : (
                    <span style={{ color: '#FF6B6B' }}>❌ Absent</span>
                  )}
                </span>
              </div>
              <div className="technical-item">
                <span className="technical-label">sitemap.xml:</span>
                <span className="technical-value">
                  {crawlData.sitemap.present ? (
                    <span style={{ color: '#4CAF50' }}>✅ Présent</span>
                  ) : (
                    <span style={{ color: '#FF6B6B' }}>❌ Absent</span>
                  )}
                </span>
              </div>
              <div className="technical-item">
                <span className="technical-label">Données structurées:</span>
                <span className="technical-value">
                  {crawlData.statistics.pagesWithSchema > 0 ? (
                    <span style={{ color: '#4CAF50' }}>✅ {crawlData.statistics.pagesWithSchema} page(s)</span>
                  ) : (
                    <span style={{ color: '#FF6B6B' }}>❌ Aucune</span>
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Principal - Plus visible et central */}
      <div className="cta-hero-section">
        <div className="cta-hero-content">
          <h3 className="cta-hero-title">🚀 Prêt à améliorer votre visibilité ?</h3>
          <p className="cta-hero-description">
            Découvrez comment optimiser votre site pour les moteurs de recherche classiques et les moteurs conversationnels
          </p>
          <button
            onClick={onOpenCalendly}
            className="cta-hero-button"
          >
            <span className="cta-button-text">Réserver un appel gratuit</span>
            <span className="cta-button-icon">→</span>
          </button>
          <p className="cta-hero-hint">Sans engagement • 30 minutes • Diagnostic personnalisé</p>
        </div>
      </div>
    </div>
  );
}

export default Results;

