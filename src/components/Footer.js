import React from 'react';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h4 className="footer-title">Visibility Strategy Score</h4>
            <p className="footer-description">
              Évaluez le potentiel de visibilité de votre site web sur les moteurs de recherche classiques et les moteurs conversationnels.
            </p>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Liens</h4>
            <ul className="footer-links">
              <li>
                <a 
                  href="https://www.linkedin.com/in/arezki-djerbi/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  <span className="footer-link-icon">💼</span>
                  LinkedIn
                </a>
              </li>
              <li>
                <a 
                  href="http://arezkidjerbi.fr/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  <span className="footer-link-icon">🌐</span>
                  Site Web
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Légal</h4>
            <ul className="footer-links">
              <li>
                <a href="#conditions" className="footer-link" onClick={(e) => {
                  e.preventDefault();
                  const event = new CustomEvent('openLegalModal', { detail: 'conditions' });
                  window.dispatchEvent(event);
                }}>
                  <span className="footer-link-icon">📋</span>
                  Conditions d'utilisation
                </a>
              </li>
              <li>
                <a href="#confidentialite" className="footer-link" onClick={(e) => {
                  e.preventDefault();
                  const event = new CustomEvent('openLegalModal', { detail: 'mentions' });
                  window.dispatchEvent(event);
                }}>
                  <span className="footer-link-icon">🔒</span>
                  Politique de confidentialité
                </a>
              </li>
              <li>
                <a href="#mentions" className="footer-link" onClick={(e) => {
                  e.preventDefault();
                  const event = new CustomEvent('openLegalModal', { detail: 'mentions' });
                  window.dispatchEvent(event);
                }}>
                  <span className="footer-link-icon">⚖️</span>
                  Mentions légales
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} Visibility Strategy Score. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

