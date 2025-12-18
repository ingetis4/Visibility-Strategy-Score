import React, { useState, useEffect } from 'react';
import './App.css';
import Form from './components/Form';
import Results from './components/Results';
import Loading from './components/Loading';
import Header from './components/Header';
import Footer from './components/Footer';
import CalendlyModal from './components/CalendlyModal';
import LegalModal from './components/LegalModal';
import analytics from './services/analytics';

// URL de l'API backend (depuis variable d'environnement ou proxy en dev)
const API_BASE_URL = process.env.REACT_APP_API_URL || '';

function App() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [analyzingUrl, setAnalyzingUrl] = useState(null);
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState('conditions');
  const [userData, setUserData] = useState(null);

  const handleAnalyze = async (formData) => {
    setLoading(true);
    setError(null);
    setResults(null);
    setAnalyzingUrl(formData.url);

    // Track le début de l'analyse
    analytics.trackAnalysisStarted(formData.url, formData.analysis_type);

    try {
      const response = await fetch(`${API_BASE_URL}/api/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        // Essayer de parser le JSON, sinon utiliser le texte
        let errorData;
        const contentType = response.headers.get('content-type');
        try {
          if (contentType && contentType.includes('application/json')) {
            errorData = await response.json();
          } else {
            const text = await response.text();
            // Si c'est du HTML ou du texte d'erreur, créer un objet d'erreur
            if (text.includes('Proxy') || text.includes('proxy') || text.includes('<html')) {
              throw new Error('Erreur de connexion au serveur. Vérifiez votre connexion réseau.');
            }
            throw new Error(text || `Erreur HTTP ${response.status}`);
          }
        } catch (parseError) {
          // Si le parsing JSON échoue, utiliser le message d'erreur
          if (parseError.message.includes('Proxy') || parseError.message.includes('proxy')) {
            throw new Error('Erreur de connexion au serveur. Vérifiez votre connexion réseau.');
          }
          throw parseError;
        }
        throw new Error(errorData.error || errorData.message || 'Erreur lors de l\'analyse');
      }

      // Vérifier que la réponse est bien du JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        if (text.includes('Proxy') || text.includes('proxy') || text.includes('<html')) {
          throw new Error('Erreur de connexion au serveur. Vérifiez votre connexion réseau.');
        }
        throw new Error('Réponse invalide du serveur');
      }

      const data = await response.json();
      setResults(data);
      
      // Track la complétion de l'analyse
      analytics.trackAnalysisCompleted(
        formData.url,
        formData.analysis_type,
        data.seo?.score,
        data.ia?.score
      );
      
      // Stocker les données utilisateur pour le modal Calendly
      setUserData({
        ...formData,
        results: data
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setAnalyzingUrl(null);
    }
  };

  const handleReset = () => {
    setResults(null);
    setError(null);
    setAnalyzingUrl(null);
    setUserData(null);
  };

  const handleOpenCalendly = (data) => {
    analytics.trackCalendlyOpened();
    setUserData(data);
    setIsCalendlyOpen(true);
  };

  const handleCalendlyClose = () => {
    setIsCalendlyOpen(false);
  };

  const handleEventScheduled = (data) => {
    // Track la confirmation du rendez-vous
    analytics.trackAppointmentConfirmed();
    // L'email est déjà envoyé depuis le modal Calendly
    console.log('Rendez-vous confirmé pour:', data.email);
  };

  useEffect(() => {
    const handleOpenLegalModal = (e) => {
      setLegalModalType(e.detail);
      setIsLegalModalOpen(true);
    };

    window.addEventListener('openLegalModal', handleOpenLegalModal);
    return () => {
      window.removeEventListener('openLegalModal', handleOpenLegalModal);
    };
  }, []);

  return (
    <div className="App">
      <Header />
      <main className={`main-content ${!results && !loading ? 'no-scroll' : ''}`}>
        {loading ? (
          <Loading url={analyzingUrl} />
        ) : !results ? (
          <div className="fade-in">
            <Form onSubmit={handleAnalyze} loading={loading} error={error} />
          </div>
        ) : (
          <div className="fade-in">
            <Results 
              data={results} 
              onReset={handleReset}
              onOpenCalendly={() => handleOpenCalendly(userData)}
            />
          </div>
        )}
      </main>
      <Footer />
      <CalendlyModal
        isOpen={isCalendlyOpen}
        onClose={handleCalendlyClose}
        onEventScheduled={handleEventScheduled}
        userData={userData}
      />
      <LegalModal
        isOpen={isLegalModalOpen}
        onClose={() => setIsLegalModalOpen(false)}
        type={legalModalType}
      />
    </div>
  );
}

export default App;

