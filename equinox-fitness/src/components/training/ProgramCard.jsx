import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Clock, BarChart, Zap } from 'lucide-react';

export const ProgramCard = ({ program, featured = false }) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/training/${program.protocolId}/${program.id}`)}
      className={`relative overflow-hidden bg-white border border-zinc-200/60 p-6 md:p-8 group cursor-pointer premium-hover flex flex-col h-full asymmetric-card performance-stripe ${
        featured ? 'md:border-apple-blue/10 md:bg-zinc-50/30' : ''
      }`}
    >
      <div className={`flex justify-between items-start mb-6 ${featured ? 'md:mb-8' : 'mb-6'}`}>
        <div className="flex flex-col">
          <span className={`text-[9px] font-black uppercase tracking-[0.3em] mb-1 opacity-40 group-hover:text-apple-blue transition-colors`}>
            P.{program.id.slice(0, 2).toUpperCase()} / {program.protocolId.toUpperCase()}
          </span>
          <h3 className={`font-black tracking-tighter group-hover:translate-x-1 transition-transform ${
            featured ? 'text-2xl md:text-3xl' : 'text-xl'
          }`}>{program.name}</h3>
        </div>
        <div className="flex flex-col items-end gap-1.5 pt-1">
          <div className="flex items-center gap-1 bg-zinc-50 px-2 py-0.5 rounded-full border border-zinc-100">
            <BarChart size={10} className="text-zinc-400" />
            <span className="text-[9px] font-bold text-zinc-500 uppercase">{program.difficulty}</span>
          </div>
        </div>
      </div>

      <p className={`text-black/55 text-sm leading-relaxed mb-8 flex-grow ${featured ? 'md:max-w-md' : ''}`}>
        {program.desc}
      </p>

      <div className="flex items-center justify-between pt-6 border-t border-zinc-100 mt-auto">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <Clock size={12} className="text-black/30" />
            <span className="text-[10px] font-bold text-black/40">{program.duration}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Zap size={10} className="text-black/30" />
            <span className="text-[10px] font-bold text-black/40 uppercase tracking-tighter">{program.intensity}</span>
          </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-zinc-50 flex items-center justify-center group-hover:bg-apple-blue group-hover:text-white transition-all duration-300">
          <program.icon size={14} />
        </div>
      </div>
    </div>
  );
};
