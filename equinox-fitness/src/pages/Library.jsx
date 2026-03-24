import React, { useState } from 'react';
import { PlayCircle, ChevronRight, Search, ArrowUpRight } from 'lucide-react';

export const Library = () => {
  const [filter, setFilter] = useState('All');
  const exercises = [
    { id: 1, name: 'Barbell Squat', cat: 'Gym', level: 'Advanced', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop' },
    { id: 2, name: 'Muscle Up', cat: 'Calisthenics', level: 'Elite', img: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=1469&auto=format&fit=crop' },
    { id: 3, name: 'Burpee Over Bar', cat: 'Hybrid', level: 'Intermediate', img: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1470&auto=format&fit=crop' },
    { id: 4, name: 'Planche Lean', cat: 'Calisthenics', level: 'Pro', img: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1469&auto=format&fit=crop' },
    { id: 5, name: 'Deadlift', cat: 'Gym', level: 'Advanced', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop' },
    { id: 6, name: 'Box Jumps', cat: 'Hybrid', level: 'Intermediate', img: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1470&auto=format&fit=crop' }
  ];

  const filtered = filter === 'All' ? exercises : exercises.filter(ex => ex.cat === filter);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* BACKGROUND AMBIENT LIGHTS */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden bg-[#F5F5F7]">
        <div className="absolute top-[10%] left-[60%] w-[45%] h-[45%] bg-blue-300/20 rounded-full blur-[100px] animate-mesh" style={{ animationDuration: '8s' }}></div>
        <div className="absolute bottom-[20%] left-[-5%] w-[40%] h-[40%] bg-indigo-300/20 rounded-full blur-[120px] animate-mesh" style={{ animationDuration: '7s', animationDelay: '-2s' }}></div>
      </div>

      <div className="pt-44 pb-20 max-w-6xl mx-auto px-6">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16 card-animate">
          <div className="text-left">
            <div className="inline-flex items-center gap-2.5 bg-black/[0.03] border border-black/[0.05] px-5 py-2 rounded-full mb-6">
              <PlayCircle size={12} className="text-apple-blue" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-black/40">Knowledge Base</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-2">The <span className="font-serif-italic font-normal text-black/70">Vault</span>.</h2>
            <p className="text-black/40 font-bold tracking-widest text-xs uppercase">Movement Standards & Technical Mastery</p>
          </div>
          
          {/* FILTER PILLS - Improved for Mobile */}
          <div className="flex w-full md:w-auto items-center overflow-x-auto no-scrollbar pb-2 md:pb-0">
            <div className="flex gap-2 p-1.5 rounded-full md:rounded-full bg-black/[0.03] border border-black/[0.05] backdrop-blur-md whitespace-nowrap">
              {['All', 'Gym', 'Calisthenics', 'Hybrid'].map(cat => (
                <button 
                  key={cat} 
                  onClick={() => setFilter(cat)} 
                  className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                    filter === cat 
                      ? 'bg-white shadow-[0_4px_12px_rgba(0,0,0,0.05)] text-apple-blue' 
                      : 'text-black/40 hover:text-black hover:bg-black/5'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* LIBRARY GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((ex, i) => (
            <div 
              key={ex.id} 
              className="apple-card overflow-hidden group cursor-pointer transition-all duration-500 hover:shadow-2xl hover:shadow-black/10 card-animate"
              style={{ animationDelay: `${0.1 + i * 0.1}s` }}
            >
              {/* IMAGE THUMBNAIL */}
              <div className="aspect-video relative overflow-hidden bg-black/5">
                <img 
                  src={ex.img} 
                  alt={ex.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 group-hover:rotate-1 opacity-70 group-hover:opacity-100"
                />
                
                {/* DARK GRADIENT OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 shadow-[0_0_30px_rgba(0,0,0,0.3)]">
                    <PlayCircle size={24} className="ml-1" />
                  </div>
                </div>
                
                {/* FLOATING BADGE */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest text-apple-blue shadow-sm">
                  {ex.cat}
                </div>
              </div>
              
              {/* CARD CONTENT */}
              <div className="p-6 md:p-8 flex justify-between items-center bg-white/60">
                <div>
                  <h4 className="font-extrabold text-lg mb-1 group-hover:text-apple-blue transition-colors">{ex.name}</h4>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-apple-blue/50"></div>
                    <p className="text-[10px] font-black text-black/30 tracking-widest uppercase">{ex.level} Level</p>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-black/[0.03] group-hover:bg-apple-blue group-hover:text-white transition-all duration-300">
                  <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* EMPTY STATE */}
        {filtered.length === 0 && (
          <div className="text-center py-20 opacity-50">
             <Search size={48} className="mx-auto mb-4 text-black/20" />
             <p className="font-medium">Nu am găsit exerciții pentru categoria selectată.</p>
          </div>
        )}
      </div>
    </div>
  );
};
