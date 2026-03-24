import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Zap } from 'lucide-react';
import { TRAINING_PROTOCOLS } from '../data/protocols';
import { MASTER_PROGRAMS } from '../data/masterPrograms';
import { SectionBadge } from '../components/ui/SectionBadge';
import { ProgramCard } from '../components/training/ProgramCard';

export const Training = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get('protocol') || 'all';

  const filteredPrograms = useMemo(() => {
    if (currentFilter === 'all') return MASTER_PROGRAMS;
    return MASTER_PROGRAMS.filter(p => p.protocolId === currentFilter);
  }, [currentFilter]);

  const handleFilterChange = (id) => {
    if (id === 'all') {
      searchParams.delete('protocol');
    } else {
      searchParams.set('protocol', id);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">


      <div className="pt-32 md:pt-40 pb-24 max-w-6xl mx-auto px-6">
        {/* HEADER */}
        <div className="mb-12 card-animate">
          <SectionBadge icon={Zap} text="Aici sunt toate programele" className="mb-6" />
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4 signature-dot">
            Ce antrenăm <span className="font-serif-italic font-normal text-black/70">astăzi</span>
          </h2>
          <p className="text-black/50 text-sm md:text-base font-medium max-w-xl leading-relaxed">
            Alege un program care are sens pentru tine. Fără jargon inutil, doar pași clari către obiectivul tău.
          </p>
        </div>

        {/* FILTER BAR */}
        <div className="flex flex-wrap items-center gap-2 mb-12 card-animate">
          <button 
            onClick={() => handleFilterChange('all')}
            className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 border ${
              currentFilter === 'all' 
                ? 'bg-black text-white border-black shadow-lg shadow-black/10' 
                : 'bg-white text-black/40 border-zinc-200 hover:border-black/20 hover:text-black'
            }`}
          >
            Toate
          </button>
          {TRAINING_PROTOCOLS.map((protocol) => (
            <button 
              key={protocol.id}
              onClick={() => handleFilterChange(protocol.id)}
              className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 border ${
                currentFilter === protocol.id 
                  ? 'bg-black text-white border-black shadow-lg shadow-black/10' 
                  : 'bg-white text-black/40 border-zinc-200 hover:border-black/20 hover:text-black'
              }`}
            >
              {protocol.title}
            </button>
          ))}
        </div>

        {/* PROGRAMS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredPrograms.length > 0 ? (
            filteredPrograms.map((program, i) => (
              <div 
                key={program.id} 
                style={{ animationDelay: `${i * 0.1}s` }} 
                className={`card-animate ${i === 0 && currentFilter === 'all' ? 'md:col-span-2' : ''}`}
              >
                <ProgramCard program={program} featured={i === 0 && currentFilter === 'all'} />
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center bg-white rounded-3xl border border-dashed border-zinc-200">
              <p className="text-black/30 font-bold uppercase tracking-widest text-[10px] italic">Încă nu am pus nimic pe aici.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
