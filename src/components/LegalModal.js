import React from 'react';
import './LegalModal.css';

function LegalModal({ isOpen, onClose, type }) {
  if (!isOpen) return null;

  const content = type === 'conditions' ? {
    title: 'Conditions d\'utilisation',
    content: `
      <h3>1. Acceptation des conditions</h3>
      <p>En utilisant ce service, vous acceptez les présentes conditions d'utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser ce service.</p>

      <h3>2. Description du service</h3>
      <p>Visibility Strategy Score est un outil d'évaluation qui analyse la préparation de votre site web pour les moteurs de recherche classiques (SEO) et les moteurs conversationnels (IA).</p>

      <h3>3. Utilisation du service</h3>
      <p>Vous vous engagez à utiliser ce service uniquement à des fins légales et conformément à ces conditions. Vous ne devez pas utiliser le service pour analyser des sites web sans autorisation.</p>

      <h3>4. Données personnelles</h3>
      <p>Les données collectées (URL, email, secteur, offre) sont utilisées uniquement pour générer l'analyse et peuvent être partagées avec l'administrateur du service pour vous contacter concernant votre demande.</p>
      <p>En cochant la case d'acceptation, vous consentez explicitement au traitement de vos données conformément à notre <a href="#" onclick="window.dispatchEvent(new CustomEvent('openLegalModal', { detail: 'mentions' })); return false;">politique de confidentialité</a>.</p>

      <h3>5. Limitation de responsabilité</h3>
      <p>Ce service est fourni "tel quel" sans garantie d'aucune sorte. Les résultats de l'analyse sont indicatifs et ne garantissent pas de résultats en termes de classement ou de visibilité.</p>

      <h3>6. Propriété intellectuelle</h3>
      <p>Tous les contenus de ce service sont protégés par les lois sur la propriété intellectuelle. Vous ne pouvez pas reproduire, modifier ou distribuer ces contenus sans autorisation.</p>

      <h3>7. Modifications</h3>
      <p>Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications prendront effet dès leur publication.</p>

      <h3>8. Contact</h3>
      <p>Pour toute question concernant ces conditions, veuillez nous contacter via les coordonnées fournies dans les mentions légales.</p>
    `
  } : {
    title: 'Politique de confidentialité',
    content: `
      <h3>1. Responsable du traitement</h3>
      <p><strong>Visibility Strategy Score</strong><br/>
      Contact : <a href="mailto:contact@arezkidjerbi.fr">contact@arezkidjerbi.fr</a><br/>
      Site web : <a href="http://arezkidjerbi.fr" target="_blank">arezkidjerbi.fr</a></p>

      <h3>2. Données collectées</h3>
      <p>Conformément au RGPD, nous collectons les données suivantes lors de l'utilisation de ce service gratuit :</p>
      <ul>
        <li><strong>URL du site analysé</strong> : nécessaire pour effectuer l'analyse technique</li>
        <li><strong>Adresse email</strong> : obligatoire, utilisée uniquement pour vous envoyer les résultats et vous contacter si vous prenez rendez-vous</li>
        <li><strong>Secteur d'activité</strong> : optionnel, permet d'améliorer la pertinence de l'analyse</li>
        <li><strong>Offre principale</strong> : optionnel, permet d'améliorer la pertinence de l'analyse</li>
        <li><strong>Données techniques du crawl</strong> : collectées automatiquement lors de l'analyse de votre site</li>
      </ul>

      <h3>3. Finalités du traitement</h3>
      <p>Vos données sont utilisées exclusivement pour :</p>
      <ul>
        <li>Générer votre rapport d'analyse de visibilité SEO & IA</li>
        <li>Vous permettre de prendre rendez-vous pour un audit approfondi (via Calendly)</li>
        <li>Vous contacter concernant votre demande si nécessaire</li>
        <li>Améliorer la qualité du service (analyse statistique anonymisée)</li>
      </ul>
      <p><strong>Nous ne vendons, ne louons, ni ne partageons vos données avec des tiers à des fins commerciales.</strong></p>

      <h3>4. Base légale</h3>
      <p>Le traitement de vos données repose sur :</p>
      <ul>
        <li><strong>Votre consentement</strong> : en utilisant ce service, vous acceptez explicitement le traitement de vos données</li>
        <li><strong>L'exécution d'un contrat</strong> : fourniture du service d'analyse demandé</li>
      </ul>

      <h3>5. Durée de conservation</h3>
      <p>Vos données sont conservées :</p>
      <ul>
        <li><strong>Données d'analyse</strong> : 12 mois maximum</li>
        <li><strong>Données de contact</strong> : jusqu'à votre demande de suppression</li>
        <li><strong>Données statistiques anonymisées</strong> : conservées indéfiniment pour améliorer le service</li>
      </ul>

      <h3>6. Vos droits RGPD</h3>
      <p>Conformément au RGPD, vous disposez des droits suivants :</p>
      <ul>
        <li><strong>Droit d'accès</strong> : obtenir une copie de vos données personnelles</li>
        <li><strong>Droit de rectification</strong> : corriger vos données inexactes</li>
        <li><strong>Droit à l'effacement</strong> : demander la suppression de vos données</li>
        <li><strong>Droit à la portabilité</strong> : récupérer vos données dans un format structuré</li>
        <li><strong>Droit d'opposition</strong> : vous opposer au traitement de vos données</li>
        <li><strong>Droit de limitation</strong> : limiter le traitement de vos données</li>
      </ul>
      <p>Pour exercer ces droits, contactez-nous à : <a href="mailto:contact@arezkidjerbi.fr">contact@arezkidjerbi.fr</a></p>

      <h3>7. Sécurité des données</h3>
      <p>Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé, perte ou destruction.</p>

      <h3>8. Cookies</h3>
      <p>Ce service utilise uniquement des cookies techniques strictement nécessaires au fonctionnement du service. Aucun cookie de suivi publicitaire ou de profilage n'est utilisé.</p>

      <h3>9. Transfert de données</h3>
      <p>Vos données sont stockées et traitées au sein de l'Union Européenne. Aucun transfert de données hors UE n'est effectué.</p>

      <h3>10. Réclamation</h3>
      <p>Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation auprès de la CNIL : <a href="https://www.cnil.fr" target="_blank">www.cnil.fr</a></p>

      <h3>11. Contact</h3>
      <p>Pour toute question concernant vos données personnelles :<br/>
      Email : <a href="mailto:contact@arezkidjerbi.fr">contact@arezkidjerbi.fr</a><br/>
      Site web : <a href="http://arezkidjerbi.fr" target="_blank">arezkidjerbi.fr</a></p>
    `
  };

  return (
    <div className="legal-modal-overlay" onClick={onClose}>
      <div className="legal-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="legal-modal-close" onClick={onClose}>
          ×
        </button>
        <h2 className="legal-modal-title">{content.title}</h2>
        <div 
          className="legal-modal-body"
          dangerouslySetInnerHTML={{ __html: content.content }}
        />
      </div>
    </div>
  );
}

export default LegalModal;

