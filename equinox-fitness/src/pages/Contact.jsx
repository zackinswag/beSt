import React, { useState } from 'react';
import { Mail, MessageCircle, MapPin, Clock, Sparkles, CheckCircle2 } from 'lucide-react';

export const Contact = () => {
  const [formSent, setFormSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => setFormSent(false), 3000);
  };

  const contactInfo = [
    {
      icon: <div className="w-10 h-10 rounded-xl bg-apple-blue/10 flex items-center justify-center"><MapPin size={18} className="text-apple-blue" /></div>,
      title: 'Locație',
      detail: 'Oradea, România',
      sub: 'Zona Rogerius'
    },
    {
      icon: <div className="w-10 h-10 rounded-xl bg-apple-blue/10 flex items-center justify-center"><Mail size={18} className="text-apple-blue" /></div>,
      title: 'Email',
      detail: 'contact@equinox.ro',
      sub: 'Răspundem în 24h'
    },
    {
      icon: <div className="w-10 h-10 rounded-xl bg-apple-blue/10 flex items-center justify-center"><Clock size={18} className="text-apple-blue" /></div>,
      title: 'Program',
      detail: 'Luni - Vineri',
      sub: '06:00 — 22:00'
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Ambient background */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden bg-[#F5F5F7]">
        <div className="absolute top-[10%] right-[-5%] w-[50%] h-[50%] bg-blue-400/30 rounded-full blur-[100px] animate-mesh" style={{ animationDuration: '8s' }}></div>
        <div className="absolute bottom-[20%] left-[-10%] w-[45%] h-[45%] bg-purple-400/30 rounded-full blur-[100px] animate-mesh" style={{ animationDuration: '7s', animationDelay: '-3s' }}></div>
        <div className="absolute top-[40%] left-[30%] w-[40%] h-[40%] bg-pink-300/20 rounded-full blur-[120px] animate-mesh" style={{ animationDuration: '9s', animationDelay: '-5s' }}></div>
      </div>

      <div className="pt-44 pb-20 max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 card-animate">
          <div className="inline-flex items-center gap-2.5 bg-black/[0.03] border border-black/[0.05] px-5 py-2 rounded-full mb-8">
            <MessageCircle size={12} className="text-apple-blue" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-black/40">Contactează-ne</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-4">
            Hai să <span className="font-serif-italic font-normal text-black/70">conectăm.</span>
          </h2>
          <p className="text-lg text-black/40 font-medium max-w-lg mx-auto">
            Echipa noastră de elită este gata să te asiste în călătoria ta spre performanță maximă.
          </p>
        </div>

        {/* Split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* LEFT — Info Cards */}
          <div className="lg:col-span-2 space-y-5">
            {contactInfo.map((item, i) => (
              <div key={i} className="apple-card p-6 flex items-start gap-5 card-animate" style={{ animationDelay: `${i * 0.1}s` }}>
                {item.icon}
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-black/30 mb-1">{item.title}</p>
                  <p className="font-bold text-sm">{item.detail}</p>
                  <p className="text-xs text-black/40 mt-0.5">{item.sub}</p>
                </div>
              </div>
            ))}

            {/* Quick FAQ / trust strip */}
            <div className="bg-gradient-to-br from-black via-gray-900 to-black rounded-[28px] p-8 text-white relative overflow-hidden card-animate" style={{ animationDelay: '0.3s' }}>
              <div className="absolute inset-0 opacity-5" style={{
                backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                backgroundSize: '16px 16px'
              }}></div>
              <div className="relative z-10">
                <Sparkles size={16} className="text-blue-400 mb-4" />
                <h4 className="font-bold text-sm mb-2">Răspuns Garantat</h4>
                <p className="text-white/50 text-xs leading-relaxed">
                  Fiecare mesaj primește răspuns personalizat în maxim 24 de ore de la un specialist Equinox.
                </p>
                <div className="flex items-center gap-3 mt-5">
                  <div className="flex -space-x-2">
                    {[1,2,3].map(i => (
                      <div key={i} className="w-7 h-7 rounded-full border-2 border-black bg-gray-700 overflow-hidden">
                        <img src={`https://i.pravatar.cc/60?img=${i+20}`} alt="coach" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">3 antrenori online</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — Form */}
          <div className="lg:col-span-3 card-animate" style={{ animationDelay: '0.15s' }}>
            <div className="apple-card p-10 md:p-12 relative overflow-hidden">
              {/* Success overlay */}
              {formSent && (
                <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-20 flex flex-col items-center justify-center animate-in fade-in duration-300">
                  <CheckCircle2 size={48} className="text-green-500 mb-4" />
                  <h3 className="text-xl font-bold mb-1">Mesaj trimis!</h3>
                  <p className="text-black/40 text-sm">Revenim în cel mai scurt timp.</p>
                </div>
              )}

              <h3 className="text-xl font-bold tracking-tight mb-1">Trimite un mesaj</h3>
              <p className="text-xs text-black/40 mb-8">Completează formularul și te contactăm noi.</p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="group">
                    <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-black/30 mb-2 block">Prenume</label>
                    <input 
                      required
                      placeholder="Alexandru" 
                      className="w-full bg-black/[0.03] border border-black/[0.06] p-4 rounded-2xl outline-none focus:ring-2 ring-apple-blue/20 focus:border-apple-blue/30 transition-all text-sm placeholder:text-black/20" 
                    />
                  </div>
                  <div className="group">
                    <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-black/30 mb-2 block">Nume</label>
                    <input 
                      required
                      placeholder="Popescu" 
                      className="w-full bg-black/[0.03] border border-black/[0.06] p-4 rounded-2xl outline-none focus:ring-2 ring-apple-blue/20 focus:border-apple-blue/30 transition-all text-sm placeholder:text-black/20" 
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-black/30 mb-2 block">Email</label>
                  <input 
                    type="email"
                    required
                    placeholder="alex@exemplu.ro" 
                    className="w-full bg-black/[0.03] border border-black/[0.06] p-4 rounded-2xl outline-none focus:ring-2 ring-apple-blue/20 focus:border-apple-blue/30 transition-all text-sm placeholder:text-black/20" 
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-black/30 mb-2 block">Subiect</label>
                  <select className="w-full bg-black/[0.03] border border-black/[0.06] p-4 rounded-2xl outline-none focus:ring-2 ring-apple-blue/20 focus:border-apple-blue/30 transition-all text-sm text-black/60 appearance-none cursor-pointer">
                    <option>Vreau să mă înscriu</option>
                    <option>Întrebare despre programe</option>
                    <option>Colaborare</option>
                    <option>Altele</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-black/30 mb-2 block">Mesaj</label>
                  <textarea 
                    required
                    placeholder="Spune-ne cum te putem ajuta..." 
                    className="w-full bg-black/[0.03] border border-black/[0.06] p-4 rounded-2xl h-36 outline-none focus:ring-2 ring-apple-blue/20 focus:border-apple-blue/30 resize-none transition-all text-sm placeholder:text-black/20"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="btn-primary btn-glow w-full py-4 text-xs font-bold uppercase tracking-widest shadow-lg shadow-blue-500/10"
                >
                  Trimite Mesajul
                </button>

                <p className="text-[10px] text-center text-black/25 font-medium">
                  🔒 Datele tale sunt protejate și nu vor fi partajate.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
