import React, { useState } from 'react';
import Agenti from './AdminAgenti'; // Il tuo componente Agenti esistente
import UtentiAdmin from './AdminUtenti';  // Il nuovo componente che creeremo

const GestionePiattaforma = () => {
  // 'agents' è il valore di default, così vedi subito gli agenti
  const [activeTab, setActiveTab] = useState('agents');

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Gestione Piattaforma</h1>

      {/* --- SEZIONE TASTI (IL TOGGLE) --- */}
      <div className="flex gap-4 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('agents')}
          className={`pb-2 px-4 font-medium ${
            activeTab === 'agents' 
              ? 'border-b-2 border-blue-500 text-blue-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Gestione Agenti
        </button>

        <button
          onClick={() => setActiveTab('users')}
          className={`pb-2 px-4 font-medium ${
            activeTab === 'users' 
              ? 'border-b-2 border-blue-500 text-blue-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Gestione Utenti
        </button>
      </div>

      {/* --- RENDERING CONDIZIONALE --- */}
      <div className="bg-white shadow rounded-lg p-4">
        {activeTab === 'agents' && <Agenti/>}
        {activeTab === 'users' && <UtentiAdmin />}
      </div>
    </div>
  );
};

export default GestionePiattaforma;