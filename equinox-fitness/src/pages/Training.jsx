import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, ArrowUpRight } from 'lucide-react';
import { TRAINING_PROTOCOLS } from '../data/protocols';
import { SectionBadge } from '../components/ui/SectionBadge';

export const Training = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* BACKGROUND AMBIENT LIGHTS */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden bg-[#F5F5F7]">
        <div className="absolute top-[5%] left-[10%] w-[45%] h-[45%] bg-blue-400/15 rounded-full blur-[100px] animate-mesh" style={{ animationDuration: '11s' }}></div>
      </div>

      <div className="pt-32 md:pt-44 pb-20 max-w-6xl mx-auto px-6">
        {/* HEADER */}
        <div className="text-center mb-16 card-animate">
          <SectionBadge icon={Zap} text="Selectează parcursul" className="mb-6" />
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">
            Alege-ți <span className="font-serif-italic font-normal text-black/70">parcursul</span>.
          </h2>
          <p className="text-lg md:text-xl text-black/55 font-medium max-w-2xl mx-auto leading-relaxed">
            Fiecare protocol are un obiectiv clar. Alege-l pe cel potrivit nivelului și scopului tău.
          </p>
        </div>

        <div className="apple-card p-6 md:p-8 mb-10 card-animate">
          <h3 className="text-xl md:text-2xl font-black tracking-tight mb-2">Nu știi ce să alegi?</h3>
          <p className="text-sm md:text-base text-black/55">
            <span className="font-semibold text-black/80">Sală de forță</span> pentru masă și forță,{" "}
            <span className="font-semibold text-black/80">Măiestria corpului</span> pentru control și mobilitate,{" "}
            <span className="font-semibold text-black/80">Motor hibrid</span> pentru performanță completă.
          </p>
        </div>

        {/* 3 CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TRAINING_PROTOCOLS.map((protocol, i) => (
            <div 
              key={protocol.id} 
              onClick={() => navigate(`/training/${protocol.id}`)}
              className={`apple-card relative overflow-hidden group cursor-pointer card-animate min-h-[420px] flex flex-col justify-between p-10 hover:shadow-2xl hover:shadow-${protocol.color}-500/10 transition-all duration-500`}
              style={{ animationDelay: `${0.1 + i * 0.15}s` }}
            >
              {/* Subtle accent background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${protocol.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0`}></div>
              
              <div className="relative z-10">
                <div className={`w-16 h-16 rounded-2xl bg-black/5 flex items-center justify-center mb-8 group-hover:bg-${protocol.color}-500 group-hover:text-white transition-all duration-500 shadow-sm`}>
                  <protocol.icon size={28} className={`text-black/40 group-hover:text-white transition-colors duration-500`} />
                </div>
                
                <span className={`text-[10px] font-semibold uppercase tracking-[0.3em] text-black/30 mb-4 block group-hover:text-${protocol.color}-500 transition-colors`}>
                  {protocol.subtitle}
                </span>
                
                <h3 className="text-3xl font-black mb-4 tracking-tighter break-words">
                  {protocol.title}
                </h3>
                
                <p className="text-black/50 text-sm leading-relaxed mb-8 font-medium">
                  {protocol.description}
                </p>
              </div>

              {/* Bottom CTA Arrow */}
              <div className="relative z-10 flex items-center justify-between mt-auto border-t border-black/5 pt-6 group-hover:border-black/10 transition-colors">
                <span className="text-[11px] font-semibold uppercase tracking-widest text-black/40 group-hover:text-black transition-colors">
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
