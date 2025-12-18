import React, { useEffect, useState } from 'react';
import './CalendlyModal.css';
import analytics from '../services/analytics';

const CALENDLY_URL = 'https://calendly.com/djerbi/audit-gratuite-pour-evaluer-vos-besoins';
// URL de l'API backend (depuis variable d'environnement ou proxy en dev)
const API_BASE_URL = process.env.REACT_APP_API_URL || '';

function CalendlyModal({ isOpen, onClose, onEventScheduled, userData }) {
  const [isConfirmed, setIsConfirmed] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Charger le script Calendly si pas déjà chargé
      if (!window.Calendly) {
        const script = document.createElement('script');
        script.src = 'https://assets.calendly.com/assets/external/widget.js';
        script.async = true;
        document.body.appendChild(script);
      }

      // Attendre que Calendly soit chargé puis initialiser le widget
      const initCalendly = () => {
        if (window.Calendly) {
          window.Calendly.initInlineWidget({
            url: CALENDLY_URL,
            parentElement: document.querySelector('.calendly-inline-widget'),
          });
        } else {
          setTimeout(initCalendly, 100);
        }
      };

      setTimeout(initCalendly, 500);

      // Écouter les événements Calendly
      window.addEventListener('message', handleCalendlyEvent);
    }

    return () => {
      window.removeEventListener('message', handleCalendlyEvent);
    };
  }, [isOpen]);

  const handleCalendlyEvent = (e) => {
    if (e.data.event && e.data.event.indexOf('calendly') === 0) {
      if (e.data.event === 'calendly.event_scheduled') {
        setIsConfirmed(true);
        // Envoyer les données à l'API après un court délai pour laisser Calendly terminer
        setTimeout(async () => {
          if (onEventScheduled && userData) {
            try {
              await fetch(`${API_BASE_URL}/api/confirm-appointment`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  email: userData.email,
                  url: userData.url,
                  sector: userData.sector,
                  offer: userData.offer,
                  analysis_type: userData.analysis_type,
                  results: userData.results
                }),
              });
              onEventScheduled(userData);
            } catch (error) {
              console.error('Erreur lors de l\'envoi de la confirmation:', error);
            }
          }
        }, 2000);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="calendly-modal-overlay" onClick={onClose}>
      <div className="calendly-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="calendly-modal-close" onClick={onClose}>
          ×
        </button>
        
        {!isConfirmed ? (
          <>
            <div className="calendly-modal-header">
              <h2 className="calendly-modal-title">Réservez votre audit gratuit</h2>
              <p className="calendly-modal-subtitle">
                Choisissez un créneau qui vous convient pour discuter de vos résultats
              </p>
            </div>
            <div 
              className="calendly-inline-widget" 
              data-url={CALENDLY_URL}
              style={{ minWidth: '320px', height: '700px' }}
            />
          </>
        ) : (
          <div className="calendly-confirmation">
            <div className="confirmation-icon">✅</div>
            <h2 className="confirmation-title">Rendez-vous confirmé !</h2>
            <p className="confirmation-message">
              Merci ! Votre rendez-vous a été enregistré. Vous allez recevoir un email de confirmation de Calendly.
            </p>
            <p className="confirmation-message">
              Nous vous enverrons également un récapitulatif de votre analyse par email.
            </p>
            <button className="confirmation-button" onClick={onClose}>
              Fermer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CalendlyModal;

