'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function AdPopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Vérifier si la popup a déjà été vue dans cette session
    const hasSeenPopup = sessionStorage.getItem('hasSeenAdPopup');
    
    if (!hasSeenPopup) {
      // Afficher la popup après un court délai
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // Marquer comme vue pour cette session
    sessionStorage.setItem('hasSeenAdPopup', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pt-20">
      {/* Overlay sombre qui couvre aussi le header */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9998]"
        onClick={handleClose}
      />
      
      {/* Contenu de la popup */}
      <div className="relative max-w-2xl w-full animate-fade-in z-[9999]">
        {/* Bouton fermer */}
        <button
          onClick={handleClose}
          className="absolute -top-2 -right-2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
          aria-label="Fermer"
        >
          <X className="h-6 w-6 text-gray-700" />
        </button>
        
        {/* Image */}
        <div className="relative rounded-lg overflow-hidden shadow-2xl bg-white">
          <img
            src="/pub.jpg"
            alt="Publicité"
            className="w-full h-auto object-contain max-h-[80vh]"
            onClick={handleClose}
          />
        </div>
      </div>
    </div>
  );
}