import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Clock, BarChart, Zap } from 'lucide-react';

export const ProgramCard = ({ program }) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/training/${program.protocolId}/${program.id}`)}
      className="bg-white rounded-2xl border border-zinc-200 p-6 md:p-8 group cursor-pointer hover:shadow-xl hover:shadow-black/5 transition-all duration-500 card-animate flex flex-col h-full"
    >
      <div className="flex justify-between items-start mb-6">
        <div className={`w-12 h-12 rounded-xl bg-${program.color}-50 flex items-center justify-center text-${program.color}-600 group-hover:bg-${program.color}-600 group-hover:text-white transition-all duration-500`}>
          <program.icon size={22} />
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <span className="text-[9px] font-black uppercase tracking-widest text-black/20 group-hover:text-black/40 transition-colors">
            {program.goal}
          </span>
          <div className="flex items-center gap-1 bg-zinc-50 px-2 py-0.5 rounded-full border border-zinc-100">
            <BarChart size={10} className="text-zinc-400" />
            <span className="text-[9px] font-bold text-zinc-500 uppercase">{program.difficulty}</span>
          </div>
        </div>
      </div>

      <h3 className="text-xl font-black mb-3 tracking-tight group-hover:translate-x-1 transition-transform">{program.name}</h3>
      <p className="text-black/55 text-sm leading-relaxed mb-8 flex-grow">
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
        <div className="w-8 h-8 rounded-full bg-zinc-50 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-300">
          <ArrowRight size={14} />
        </div>
      </div>
    </div>
  );
};
