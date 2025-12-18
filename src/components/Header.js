import React from 'react';
import './Header.css';
import Counter from './Counter';

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <h1 className="header-title">🔍 Visibility Strategy Score</h1>
        <p className="header-subtitle">Évaluez le potentiel de visibilité de votre site web sur les moteurs de recherche classiques (SEO) et les moteurs conversationnels (IA)</p>
        <Counter />
      </div>
    </header>
  );
}

export default Header;

