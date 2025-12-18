import React, { useState, useEffect } from 'react';
import './Loading.css';

function Loading({ url }) {
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    { text: 'Connexion au site...', icon: '🔗' },
    { text: 'Analyse de la page d\'accueil...', icon: '🏠' },
    { text: 'Découverte des pages importantes...', icon: '🔍' },
    { text: 'Crawl des pages détectées...', icon: '📄' },
    { text: 'Extraction des données SEO...', icon: '📊' },
    { text: 'Extraction des données IA...', icon: '🤖' },
    { text: 'Calcul des scores...', icon: '📈' },
    { text: 'Finalisation de l\'analyse...', icon: '✅' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 800);

    return () => clearInterval(interval);
  }, []);

  const currentStepData = steps[currentStep];

  return (
    <div className="loading-container">
      <div className="loading-card">
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
        <h3 className="loading-title">Analyse en cours</h3>
        <p className="loading-url">{url}</p>
        
        <div className="loading-steps">
          <div 
            key={currentStep}
            className="loading-step active"
            style={{ animation: 'fadeIn 0.3s ease-out' }}
          >
            <span className="step-icon">{currentStepData.icon}</span>
            <span className="step-text">{currentStepData.text}</span>
          </div>
        </div>

        <div className="loading-progress">
          <div 
            className="loading-progress-bar" 
            style={{ width: `${Math.min(((currentStep + 1) / steps.length) * 100, 95)}%` }}
          ></div>
        </div>
        <p className="loading-hint">⏱️ Cette analyse peut prendre jusqu'à 5 minutes pour un crawl complet...</p>
      </div>
    </div>
  );
}

export default Loading;

