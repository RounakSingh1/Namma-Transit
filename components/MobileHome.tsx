
import React, { useState, useEffect } from 'react';
import { Home, Ticket, MapPin, User, Bell, Search, QrCode, Clock, ChevronRight, AlertCircle } from 'lucide-react';
import { MOCK_BUSES, MOCK_USER } from '../constants';
import { Bus, Ticket as TicketType, CrowdLevel } from '../types';
import CrowdBadge from './CrowdBadge';

const MobileHome: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'tickets' | 'track' | 'profile'>('home');
  const [buses, setBuses] = useState<Bus[]>(MOCK_BUSES);
  const [tickets, setTickets] = useState<TicketType[]>([]);
  const [showQR, setShowQR] = useState<TicketType | null>(null);

  // Simulate ETA updates
  useEffect(() => {
    const interval = setInterval(() => {
      setBuses(prev => prev.map(bus => ({
        ...bus,
        eta: Math.max(0, bus.eta - (Math.random() > 0.8 ? 1 : 0))
      })));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const generateTicket = (bus: Bus) => {
    const newTicket: TicketType = {
      id: `TKT-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      busId: bus.id,
      busNumber: bus.number,
      queueNumber: (Math.floor(Math.random() * 200) + 100).toString(),
      timestamp: new Date().toLocaleTimeString(),
      status: 'active',
      from: bus.origin,
      to: bus.destination
    };
    setTickets([newTicket, ...tickets]);
    setShowQR(newTicket);
    setActiveTab('tickets');
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <header className="px-6 pt-8 pb-4 bg-emerald-700 text-white shrink-0">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Namma Transit</h1>
            <p className="text-emerald-100 text-sm">Welcome back, {MOCK_USER.name.split(' ')[0]}</p>
          </div>
          <button className="relative p-2 bg-emerald-600 rounded-full">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-amber-400 rounded-full border-2 border-emerald-600"></span>
          </button>
        </div>
        
        {activeTab === 'home' && (
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-200" size={18} />
            <input 
              type="text" 
              placeholder="Search destination or bus number..."
              className="w-full bg-emerald-600 text-white placeholder-emerald-200 pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all"
            />
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto bg-slate-50 px-6 py-4">
        {activeTab === 'home' && (
          <div className="space-y-6">
            <section>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-slate-800">Nearby Buses</h2>
                <button className="text-emerald-600 text-sm font-semibold">View All</button>
              </div>
              <div className="space-y-4">
                {buses.map(bus => (
                  <div key={bus.id} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center font-black text-emerald-700">
                        {bus.number}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-800">{bus.destination}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <CrowdBadge level={bus.crowd} />
                          <span className="text-xs text-slate-400">• {bus.platform}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right flex flex-col items-end gap-2">
                      <div className="flex items-center gap-1 text-emerald-600">
                        <Clock size={14} />
                        <span className="text-sm font-bold">{bus.eta} min</span>
                      </div>
                      {bus.isDelayed && (
                        <div className="flex items-center gap-1 text-amber-500 text-[10px] font-bold uppercase tracking-wider">
                          <AlertCircle size={10} />
                          Delayed
                        </div>
                      )}
                      <button 
                        onClick={() => generateTicket(bus)}
                        className="bg-emerald-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-emerald-700 transition-colors"
                      >
                        Book
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-sky-50 p-5 rounded-2xl border border-sky-100">
              <h3 className="text-sky-900 font-bold mb-2">Transit Tip</h3>
              <p className="text-sm text-sky-700 leading-relaxed">
                Crowds are high at Silk Board junction. Consider taking route 270 if Majestic is your target destination.
              </p>
            </section>
          </div>
        )}

        {activeTab === 'tickets' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-800">My Tickets</h2>
            {tickets.length === 0 ? (
              <div className="text-center py-20">
                <div className="bg-slate-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Ticket size={40} className="text-slate-300" />
                </div>
                <p className="text-slate-500">No active tickets. Start commuting!</p>
              </div>
            ) : (
              tickets.map(tkt => (
                <div key={tkt.id} className="bg-white rounded-2xl shadow-md overflow-hidden border border-slate-100">
                  <div className="bg-emerald-600 p-4 text-white flex justify-between items-center">
                    <span className="text-xs font-bold tracking-widest opacity-80 uppercase">Active Ticket</span>
                    <span className="text-xs">{tkt.timestamp}</span>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <div className="text-center flex-1">
                        <p className="text-xs text-slate-400 uppercase tracking-tighter">Origin</p>
                        <p className="font-bold text-slate-800">{tkt.from}</p>
                      </div>
                      <div className="px-4">
                        <ChevronRight className="text-slate-300" />
                      </div>
                      <div className="text-center flex-1">
                        <p className="text-xs text-slate-400 uppercase tracking-tighter">Destination</p>
                        <p className="font-bold text-slate-800">{tkt.to}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-dashed border-slate-200 pt-6">
                      <div>
                        <p className="text-xs text-slate-400">BUS NO.</p>
                        <p className="font-black text-xl text-emerald-700">{tkt.busNumber}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-slate-400">QUEUE NO.</p>
                        <p className="font-black text-xl text-amber-500">{tkt.queueNumber}</p>
                      </div>
                    </div>

                    <button 
                      onClick={() => setShowQR(tkt)}
                      className="w-full mt-6 bg-slate-900 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-slate-800 transition-all"
                    >
                      <QrCode size={20} />
                      Show Boarding QR
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="space-y-6">
             <div className="text-center py-4">
                <div className="w-24 h-24 bg-amber-400 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-lg">
                  <span className="text-3xl font-black text-white">{MOCK_USER.name[0]}</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-800">{MOCK_USER.name}</h2>
                <p className="text-slate-500">{MOCK_USER.phone}</p>
             </div>

             <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex justify-between items-center">
                <div>
                  <p className="text-xs text-slate-400 uppercase">Current Balance</p>
                  <p className="text-2xl font-black text-emerald-600">₹{MOCK_USER.balance.toFixed(2)}</p>
                </div>
                <button className="bg-emerald-600 text-white px-4 py-2 rounded-xl font-bold text-sm">Top Up</button>
             </div>

             <div className="space-y-3">
                <h3 className="font-bold text-slate-800">Frequent Routes</h3>
                {MOCK_USER.frequentRoutes.map((route, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-sky-100 text-sky-600 rounded-lg flex items-center justify-center">
                        <MapPin size={16} />
                      </div>
                      <span className="text-sm text-slate-700">{route}</span>
                    </div>
                    <ChevronRight size={16} className="text-slate-300" />
                  </div>
                ))}
             </div>
          </div>
        )}
      </div>

      {/* QR Code Overlay */}
      {showQR && (
        <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden animate-in zoom-in duration-300">
            <div className="p-8 text-center">
              <h3 className="text-xl font-bold mb-2">Scan to Board</h3>
              <p className="text-slate-500 text-sm mb-8">Please present this QR at the validator as you board Bus {showQR.busNumber}</p>
              
              <div className="bg-slate-50 p-8 rounded-3xl border-2 border-slate-100 mb-8 aspect-square flex items-center justify-center relative">
                 <QrCode size={180} className="text-slate-800" />
                 <div className="absolute top-0 right-0 p-4">
                    <span className="bg-amber-400 text-white text-xs px-2 py-1 rounded font-bold uppercase">Ticket Active</span>
                 </div>
              </div>

              <div className="bg-emerald-50 py-3 px-6 rounded-2xl mb-8">
                <p className="text-emerald-700 font-bold">Queue Number: {showQR.queueNumber}</p>
              </div>

              <button 
                onClick={() => setShowQR(null)}
                className="text-slate-400 font-bold hover:text-slate-600"
              >
                Close Ticket
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="shrink-0 bg-white border-t border-slate-100 px-8 py-4 flex justify-between items-center">
        <NavButton active={activeTab === 'home'} onClick={() => setActiveTab('home')} icon={<Home />} label="Home" />
        <NavButton active={activeTab === 'track'} onClick={() => setActiveTab('track')} icon={<MapPin />} label="Track" />
        <NavButton active={activeTab === 'tickets'} onClick={() => setActiveTab('tickets')} icon={<Ticket />} label="Tickets" />
        <NavButton active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} icon={<User />} label="Profile" />
      </nav>
    </div>
  );
};

const NavButton: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string }> = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1 transition-all ${active ? 'text-emerald-600 scale-110' : 'text-slate-400'}`}
  >
    {React.cloneElement(icon as React.ReactElement, { size: 24, strokeWidth: active ? 2.5 : 2 })}
    <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
  </button>
);

export default MobileHome;
