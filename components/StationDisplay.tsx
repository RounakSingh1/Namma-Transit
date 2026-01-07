
import React, { useState, useEffect } from 'react';
import { MOCK_BUSES } from '../constants';
import { Bus, CrowdLevel } from '../types';
import { Clock, Users, ArrowRight, Bus as BusIcon, Info } from 'lucide-react';
import CrowdBadge from './CrowdBadge';

const StationDisplay: React.FC = () => {
  const [buses, setBuses] = useState<Bus[]>(MOCK_BUSES);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentBoarding, setCurrentBoarding] = useState({
    bus: MOCK_BUSES[0],
    queueStart: 101,
    queueEnd: 115
  });

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    const busTimer = setInterval(() => {
      setBuses(prev => {
        const sorted = [...prev].map(b => ({ ...b, eta: Math.max(0, b.eta - 1) }));
        // Cycle the boarding bus if ETA is 0
        if (sorted[0].eta === 0) {
          const finished = sorted.shift();
          if (finished) {
            finished.eta = 25;
            sorted.push(finished);
            setCurrentBoarding({
              bus: sorted[0],
              queueStart: Math.floor(Math.random() * 50) + 120,
              queueEnd: Math.floor(Math.random() * 50) + 170
            });
          }
        }
        return sorted;
      });
    }, 30000);

    return () => {
      clearInterval(timer);
      clearInterval(busTimer);
    };
  }, []);

  return (
    <div className="w-full h-full p-8 flex flex-col font-sans">
      {/* Station Header */}
      <header className="flex justify-between items-end mb-10 border-b-2 border-slate-800 pb-6">
        <div>
          <h1 className="text-amber-400 text-6xl font-black uppercase tracking-tighter italic">Silk Board Junction</h1>
          <p className="text-slate-400 text-xl font-bold mt-2">Namma Transit • Smart Commute Hub</p>
        </div>
        <div className="text-right">
          <p className="text-emerald-400 text-7xl font-mono font-medium">
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </p>
          <p className="text-slate-400 text-xl uppercase tracking-widest mt-2">{currentTime.toLocaleDateString([], { weekday: 'long', day: 'numeric', month: 'long' })}</p>
        </div>
      </header>

      {/* Main Grid */}
      <div className="flex-1 grid grid-cols-12 gap-10 overflow-hidden">
        
        {/* Left: Upcoming List */}
        <div className="col-span-8 flex flex-col">
          <div className="flex items-center gap-4 mb-6">
            <Clock className="text-slate-500" size={32} />
            <h2 className="text-slate-100 text-3xl font-bold uppercase">Upcoming Arrivals</h2>
          </div>
          
          <div className="flex-1 space-y-4">
            {buses.slice(1).map((bus, idx) => (
              <div key={bus.id} className="bg-slate-800/50 border-l-8 border-emerald-500 rounded-r-2xl p-6 flex items-center justify-between group hover:bg-slate-800 transition-all">
                <div className="flex items-center gap-8">
                  <div className="text-emerald-500 bg-slate-900 px-6 py-4 rounded-xl font-black text-4xl shadow-lg border border-slate-700">
                    {bus.number}
                  </div>
                  <div>
                    <h3 className="text-slate-100 text-4xl font-bold tracking-tight">{bus.destination}</h3>
                    <div className="flex items-center gap-4 mt-2">
                       <span className="text-slate-400 text-xl">Platform {bus.platform}</span>
                       <span className="text-slate-600 text-xl">•</span>
                       <CrowdBadge level={bus.crowd} large />
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className={`text-6xl font-black ${bus.isDelayed ? 'text-amber-500' : 'text-emerald-400'}`}>
                    {bus.eta} <span className="text-2xl font-bold text-slate-500">MIN</span>
                  </div>
                  {bus.isDelayed && (
                    <div className="text-amber-500 font-bold uppercase tracking-widest text-lg mt-1 animate-pulse">Delayed</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Boarding Status */}
        <div className="col-span-4 flex flex-col gap-6">
          <div className="bg-amber-500 rounded-3xl p-8 flex-1 flex flex-col justify-between shadow-2xl shadow-amber-500/10">
            <div>
              <div className="flex items-center gap-3 mb-6 bg-amber-600/30 w-fit px-4 py-2 rounded-full text-amber-900 font-bold uppercase tracking-widest text-sm">
                <BusIcon size={18} />
                Now Boarding
              </div>
              <h3 className="text-slate-900 text-7xl font-black tracking-tighter mb-2">{currentBoarding.bus.number}</h3>
              <p className="text-slate-800 text-3xl font-medium">To {currentBoarding.bus.destination}</p>
            </div>

            <div className="bg-slate-900/90 rounded-2xl p-8 text-center border-b-4 border-slate-950">
               <p className="text-amber-500 uppercase text-lg font-black tracking-widest mb-4">Queue Range</p>
               <div className="flex items-center justify-center gap-6">
                  <span className="text-white text-7xl font-black font-mono">{currentBoarding.queueStart}</span>
                  <ArrowRight className="text-amber-500" size={48} />
                  <span className="text-white text-7xl font-black font-mono">{currentBoarding.queueEnd}</span>
               </div>
            </div>

            <div className="space-y-4">
              <div className="h-4 bg-amber-600/30 rounded-full overflow-hidden">
                <div className="h-full bg-slate-900 w-2/3 animate-pulse"></div>
              </div>
              <p className="text-slate-900 font-bold text-center uppercase tracking-widest text-lg">Next in line: {currentBoarding.queueEnd + 1}+</p>
            </div>
          </div>

          <div className="bg-sky-600 rounded-3xl p-8 flex flex-col justify-center gap-4 text-white">
             <div className="flex items-start gap-4">
                <Info size={32} className="shrink-0 text-sky-200" />
                <div>
                   <h4 className="text-2xl font-black mb-2 uppercase">Platform Notice</h4>
                   <p className="text-sky-100 text-xl leading-snug">
                     Please stay behind the yellow line. Use the Namma Transit app to generate your boarding QR code.
                   </p>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Ticker Tape */}
      <footer className="h-16 bg-slate-800 -mx-8 -mb-8 mt-10 overflow-hidden flex items-center">
        <div className="animate-marquee whitespace-nowrap flex items-center">
           {[1,2,3].map(i => (
             <React.Fragment key={i}>
                <span className="text-amber-400 font-black text-2xl mx-10 uppercase italic">Green for Low Crowd • Yellow for Medium • Red for High</span>
                <span className="text-slate-400 font-bold text-2xl mx-10">BENGALURU BUS TRANSPORT INFORMATION SYSTEM (BBTIS)</span>
                <span className="text-emerald-400 font-black text-2xl mx-10 uppercase">Orderly boarding is happy boarding!</span>
             </React.Fragment>
           ))}
        </div>
      </footer>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default StationDisplay;
