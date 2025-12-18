/**
 * Service d'analytics frontend
 * Compatible avec Google Analytics 4 et Plausible
 */

// Configuration (peut être passée via .env)
const GA_MEASUREMENT_ID = process.env.REACT_APP_GA_MEASUREMENT_ID || '';
const PLAUSIBLE_DOMAIN = process.env.REACT_APP_PLAUSIBLE_DOMAIN || '';

/**
 * Initialise Google Analytics si configuré
 */
function initGoogleAnalytics() {
  if (!GA_MEASUREMENT_ID) return;
  
  // Script Google Analytics
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script1);
  
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID, {
    page_path: window.location.pathname,
  });
  
  console.log('[ANALYTICS] Google Analytics initialisé');
}

/**
 * Initialise Plausible si configuré
 */
function initPlausible() {
  if (!PLAUSIBLE_DOMAIN) return;
  
  const script = document.createElement('script');
  script.defer = true;
  script.dataset.domain = PLAUSIBLE_DOMAIN;
  script.src = 'https://plausible.io/js/script.js';
  document.head.appendChild(script);
  
  console.log('[ANALYTICS] Plausible initialisé');
}

/**
 * Track un événement personnalisé
 */
function trackEvent(eventName, eventData = {}) {
  // Google Analytics 4
  if (window.gtag && GA_MEASUREMENT_ID) {
    window.gtag('event', eventName, eventData);
  }
  
  // Plausible
  if (window.plausible && PLAUSIBLE_DOMAIN) {
    window.plausible(eventName, { props: eventData });
  }
  
  // Log pour debugging
  console.log(`[ANALYTICS] Event: ${eventName}`, eventData);
}

/**
 * Track une page view
 */
function trackPageView(path) {
  // Google Analytics
  if (window.gtag && GA_MEASUREMENT_ID) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: path,
    });
  }
  
  // Plausible track automatiquement les page views
  console.log(`[ANALYTICS] Page view: ${path}`);
}

/**
 * Track le début d'une analyse
 */
function trackAnalysisStarted(url, analysisType) {
  trackEvent('analysis_started', {
    url: url,
    analysis_type: analysisType
  });
}

/**
 * Track la complétion d'une analyse
 */
function trackAnalysisCompleted(url, analysisType, seoScore, iaScore) {
  trackEvent('analysis_completed', {
    url: url,
    analysis_type: analysisType,
    seo_score: seoScore,
    ia_score: iaScore
  });
}

/**
 * Track l'ouverture de Calendly
 */
function trackCalendlyOpened() {
  trackEvent('calendly_opened');
}

/**
 * Track la confirmation d'un rendez-vous
 */
function trackAppointmentConfirmed() {
  trackEvent('appointment_confirmed');
}

// Initialiser au chargement
if (typeof window !== 'undefined') {
  initGoogleAnalytics();
  initPlausible();
}

export default {
  trackEvent,
  trackPageView,
  trackAnalysisStarted,
  trackAnalysisCompleted,
  trackCalendlyOpened,
  trackAppointmentConfirmed
};

