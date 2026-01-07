
import React, { useState } from 'react';
import MobileHome from './components/MobileHome';
import StationDisplay from './components/StationDisplay';
import { Monitor, Smartphone } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<'mobile' | 'station'>('mobile');

  return (
    <div className="min-h-screen bg-slate-50">
      {/* View Toggle - Sticky Floating Button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
        <button
          onClick={() => setView('mobile')}
          className={`p-4 rounded-full shadow-lg transition-all ${
            view === 'mobile' ? 'bg-emerald-600 text-white scale-110' : 'bg-white text-slate-600'
          }`}
          title="Switch to Mobile View"
        >
          <Smartphone size={24} />
        </button>
        <button
          onClick={() => setView('station')}
          className={`p-4 rounded-full shadow-lg transition-all ${
            view === 'station' ? 'bg-amber-500 text-white scale-110' : 'bg-white text-slate-600'
          }`}
          title="Switch to Station Display"
        >
          <Monitor size={24} />
        </button>
      </div>

      <main className="h-screen overflow-hidden">
        {view === 'mobile' ? (
          <div className="max-w-md mx-auto h-full bg-white shadow-2xl relative">
            <MobileHome />
          </div>
        ) : (
          <div className="w-full h-full bg-slate-900">
            <StationDisplay />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
