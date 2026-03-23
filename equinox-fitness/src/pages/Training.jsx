import React from 'react';
import { Dumbbell, User, Zap, ArrowUpRight } from 'lucide-react';

export const Training = () => {
  const protocols = [
    {
      id: 'gym',
      title: 'THE WEIGHTROOM',
      subtitle: 'Protocol 01',
      desc: 'Hipertrofie structurală și forță brută. Proiectat pentru performanță maximă fără compromisuri.',
      icon: Dumbbell,
      color: 'blue',
      gradient: 'from-blue-500/20 to-transparent'
    },
    {
      id: 'calisthenics',
      title: 'BODY MASTERY',
      subtitle: 'Protocol 02',
      desc: 'Stăpânește fizica propriei greutăți. Dezvoltă skill-uri de la începător la nivel de elită absolută.',
      icon: User,
      color: 'purple',
      gradient: 'from-purple-500/20 to-transparent'
    },
    {
      id: 'hybrid',
      title: 'HYBRID ENGINE',
      subtitle: 'Protocol 03',
      desc: 'Unde forța explozivă întâlnește rezistența infinită. Programul complet pentru atletul total.',
      icon: Zap,
      color: 'rose',
      gradient: 'from-rose-500/20 to-transparent'
    }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* BACKGROUND AMBIENT LIGHTS */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden bg-[#F5F5F7]">
        <div className="absolute top-[5%] left-[10%] w-[45%] h-[45%] bg-blue-400/20 rounded-full blur-[100px] animate-mesh" style={{ animationDuration: '9s' }}></div>
        <div className="absolute bottom-[20%] right-[-5%] w-[40%] h-[40%] bg-purple-400/20 rounded-full blur-[120px] animate-mesh" style={{ animationDuration: '8s', animationDelay: '-3s' }}></div>
      </div>

      <div className="pt-44 pb-20 max-w-6xl mx-auto px-6">
        {/* HEADER */}
        <div className="text-center mb-16 card-animate">
          <div className="inline-flex items-center gap-2.5 bg-black/[0.03] border border-black/[0.05] px-5 py-2 rounded-full mb-6">
            <Zap size={12} className="text-apple-blue" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-black/40">Selectează parcursul</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-6">
            Choose your <span className="font-serif-italic font-normal text-black/70">path</span>.
          </h2>
          <p className="text-lg md:text-xl text-black/40 font-medium max-w-2xl mx-auto leading-relaxed">
            Fiecare protocol este optimizat pentru a elibera un tip diferit de performanță umană. Alege-ți armura.
          </p>
        </div>

        {/* 3 CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {protocols.map((protocol, i) => (
            <div 
              key={protocol.id} 
              className={`apple-card relative overflow-hidden group cursor-pointer card-animate min-h-[420px] flex flex-col justify-between p-10 hover:shadow-2xl hover:shadow-${protocol.color}-500/10 transition-all duration-500`}
              style={{ animationDelay: `${0.1 + i * 0.15}s` }}
            >
              {/* Subtle accent background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${protocol.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0`}></div>
              
              <div className="relative z-10">
                <div className={`w-16 h-16 rounded-2xl bg-black/5 flex items-center justify-center mb-8 group-hover:bg-${protocol.color}-500 group-hover:text-white transition-all duration-500 shadow-sm`}>
                  <protocol.icon size={28} className={`text-black/40 group-hover:text-white transition-colors duration-500`} />
                </div>
                
                <span className={`text-[10px] font-black uppercase tracking-[0.3em] text-black/30 mb-4 block group-hover:text-${protocol.color}-500 transition-colors`}>
                  {protocol.subtitle}
                </span>
                
                <h3 className="text-3xl font-black mb-4 tracking-tighter break-words">
                  {protocol.title}
                </h3>
                
                <p className="text-black/50 text-sm leading-relaxed mb-8 font-medium">
                  {protocol.desc}
                </p>
              </div>

              {/* Bottom CTA Arrow */}
              <div className="relative z-10 flex items-center justify-between mt-auto border-t border-black/5 pt-6 group-hover:border-black/10 transition-colors">
                <span className="text-[11px] font-black uppercase tracking-widest text-black/40 group-hover:text-black transition-colors">
                  Accesează
                </span>
                <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-300 transform group-hover:scale-110">
                  <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
