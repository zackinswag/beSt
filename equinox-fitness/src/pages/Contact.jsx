import React, { useState } from 'react';
import { Mail, MessageCircle, MapPin, Clock, CheckCircle2 } from 'lucide-react';
import { SectionBadge } from '../components/ui/SectionBadge';

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

      <div className="pt-40 md:pt-44 pb-20 max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 card-animate">
          <SectionBadge icon={MessageCircle} text="Contactează-ne" className="mb-8" />
          <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-4">
            Hai să <span className="font-serif-italic font-normal text-black/70">ne conectăm.</span>
          </h2>
          <p className="text-lg text-black/55 font-medium max-w-lg mx-auto">
            Spune-ne ce obiectiv ai, iar noi te ajutăm să alegi direcția potrivită.
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
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/30 mb-1">{item.title}</p>
                  <p className="font-bold text-sm">{item.detail}</p>
                  <p className="text-xs text-black/55 mt-0.5">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT — Form */}
          <div className="lg:col-span-3 card-animate" style={{ animationDelay: '0.15s' }}>
            <div className="apple-card p-10 md:p-12 relative overflow-hidden">
              {/* Success overlay */}
              {formSent && (
                <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-20 flex flex-col items-center justify-center animate-in fade-in duration-300">
                  <CheckCircle2 size={48} className="text-green-500 mb-4" />
                  <h3 className="text-xl font-bold mb-1">Mesaj trimis!</h3>
                  <p className="text-black/55 text-sm">Revenim în cel mai scurt timp.</p>
                </div>
              )}

              <h3 className="text-xl font-bold tracking-tight mb-1">Trimite un mesaj</h3>
              <p className="text-xs text-black/55 mb-8">Completează formularul și revenim rapid cu un răspuns.</p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="group">
                    <label className="text-[10px] font-semibold uppercase tracking-[0.15em] text-black/30 mb-2 block">Prenume</label>
                    <input 
                      required
                      placeholder="Alexandru" 
                      className="w-full bg-black/[0.03] border border-black/[0.06] p-4 rounded-2xl outline-none focus:ring-2 ring-apple-blue/20 focus:border-apple-blue/30 transition-all text-sm placeholder:text-black/20" 
                    />
                  </div>
                  <div className="group">
                    <label className="text-[10px] font-semibold uppercase tracking-[0.15em] text-black/30 mb-2 block">Nume</label>
                    <input 
                      required
                      placeholder="Popescu" 
                      className="w-full bg-black/[0.03] border border-black/[0.06] p-4 rounded-2xl outline-none focus:ring-2 ring-apple-blue/20 focus:border-apple-blue/30 transition-all text-sm placeholder:text-black/20" 
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-semibold uppercase tracking-[0.15em] text-black/30 mb-2 block">Email</label>
                  <input 
                    type="email"
                    required
                    placeholder="alex@exemplu.ro" 
                    className="w-full bg-black/[0.03] border border-black/[0.06] p-4 rounded-2xl outline-none focus:ring-2 ring-apple-blue/20 focus:border-apple-blue/30 transition-all text-sm placeholder:text-black/20" 
                  />
                </div>

                <div>
                  <label className="text-[10px] font-semibold uppercase tracking-[0.15em] text-black/30 mb-2 block">Subiect</label>
                  <select className="w-full bg-black/[0.03] border border-black/[0.06] p-4 rounded-2xl outline-none focus:ring-2 ring-apple-blue/20 focus:border-apple-blue/30 transition-all text-sm text-black/60 appearance-none cursor-pointer">
                    <option>Vreau să mă înscriu</option>
                    <option>Întrebare despre programe</option>
                    <option>Colaborare</option>
                    <option>Altele</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-semibold uppercase tracking-[0.15em] text-black/30 mb-2 block">Mesaj</label>
                  <textarea 
                    required
                    placeholder="Spune-ne cum te putem ajuta..." 
                    className="w-full bg-black/[0.03] border border-black/[0.06] p-4 rounded-2xl h-36 outline-none focus:ring-2 ring-apple-blue/20 focus:border-apple-blue/30 resize-none transition-all text-sm placeholder:text-black/20"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="btn-primary btn-glow w-full py-4 text-xs font-semibold uppercase tracking-widest shadow-lg shadow-blue-500/10"
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
