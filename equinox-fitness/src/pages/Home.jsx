import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Dumbbell, User, Zap, Trophy, Users, Target, ArrowUpRight } from 'lucide-react';
import { useAuth } from "@clerk/clerk-react";
import { SectionBadge } from '../components/ui/SectionBadge';
import { TRAINING_PROTOCOLS } from '../data/protocols';

const AnimatedCounter = ({ end, suffix = '', duration = 2000 }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end, duration]);
  
  return <span>{count.toLocaleString()}{suffix}</span>;
};

export const Home = () => {
  const { isSignedIn } = useAuth();

  return (
    <div className="relative overflow-hidden min-h-screen">


      {/* HERO SECTION */}
      <section className="pt-40 md:pt-44 pb-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <SectionBadge icon={Sparkles} text="Programe pe care chiar să le poți urma" className="mb-10 card-animate" />
          
          <h1 className="text-6xl md:text-[7rem] font-black tracking-tighter mb-8 leading-[0.85] signature-dot">
            <span className="text-shimmer">Antrenează-te cu</span>
            <br />
            <span className="font-serif-italic font-normal text-5xl md:text-7xl text-black/70">cap</span>
          </h1>
          
          <p className="text-lg md:text-xl text-black/55 font-medium mb-14 max-w-xl mx-auto leading-relaxed tracking-tight">
            Forță din sală, control din calisthenics și un program care să țină cu tine, nu împotriva ta.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-6">
            <Link 
              to="/training" 
              className="btn-primary btn-glow px-14 py-5 text-sm shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50"
            >
              {isSignedIn ? 'MERGI LA ANTRENAMENT' : 'VREAU SĂ ÎNCEP'}
            </Link>
            
            <Link 
              to="/pricing" 
              className="px-10 py-5 text-sm font-bold text-black/40 hover:text-black transition-all"
            >
              CÂT COSTĂ?
            </Link>
          </div>
          <div className="flex items-center gap-3 justify-center"> {/* Added justify-center to align with buttons */}
            <div className="w-10 h-10 rounded-2xl bg-apple-blue/10 flex items-center justify-center">
              <Target size={18} className="text-apple-blue" />
            </div>
            <div className="text-left">
              <div className="text-sm font-black leading-none italic uppercase">Fără scurtături.</div>
              <div className="text-[10px] font-semibold uppercase opacity-30 tracking-widest">Doar muncă bine gândită</div>
            </div>
          </div>
        </div>
      </section>

      {/* METRICS STRIP */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Users, value: 3, suffix: '', label: 'Programe de bază' },
            { icon: Target, value: 100, suffix: '+', label: 'Exerciții atent alese' },
            { icon: Trophy, value: 100, suffix: '%', label: 'Eficiență reală' },
          ].map((metric, i) => (
            <div key={i} className="metric-item text-center py-8 px-6 rounded-2xl bg-white border border-black/5 shadow-sm">
              <metric.icon size={20} className="mx-auto mb-3 text-apple-blue/60" />
              <div className="text-4xl md:text-4xl font-black tracking-tighter mb-1">
                <AnimatedCounter end={metric.value} suffix={metric.suffix} />
              </div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/30">{metric.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PROTOCOALE */}
      <section className="max-w-5xl mx-auto px-6 py-16 md:py-20">
        <div className="mb-12">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-apple-blue mb-3">Direcții</p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter signature-dot">Ce facem astăzi</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { 
              id: 'gym',
              num: '01', 
              icon: Dumbbell,
              title: TRAINING_PROTOCOLS[0].title, 
              desc: TRAINING_PROTOCOLS[0].description,
              accent: 'bg-blue-50 border-blue-100',
              iconColor: 'text-blue-500 bg-blue-100',
              numColor: 'text-blue-500'
            },
            { 
              id: 'calisthenics',
              num: '02', 
              icon: User,
              title: TRAINING_PROTOCOLS[1].title, 
              desc: TRAINING_PROTOCOLS[1].description,
              accent: 'bg-emerald-50 border-emerald-100',
              iconColor: 'text-emerald-600 bg-emerald-100',
              numColor: 'text-emerald-600'
            },
            { 
              id: 'hybrid',
              num: '03', 
              icon: Zap,
              title: TRAINING_PROTOCOLS[2].title, 
              desc: TRAINING_PROTOCOLS[2].description,
              accent: 'bg-amber-50 border-amber-100',
              iconColor: 'text-amber-600 bg-amber-100',
              numColor: 'text-amber-600'
            }
          ].map((p, idx) => (
            <Link 
              to={`/training?protocol=${p.id}`} 
              key={p.num} 
              className={`relative overflow-hidden bg-white border border-zinc-200/60 p-8 group premium-hover block ${
                idx === 1 ? 'md:translate-y-8' : ''
              } asymmetric-card`}
            >
              {/* GHOST NUMBER BACKGROUND */}
              <div className="absolute -right-4 -top-8 text-[120px] font-black text-black/[0.03] select-none group-hover:text-black/[0.05] transition-colors duration-500">
                {p.num}
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className={`${p.numColor} opacity-50`}>
                    <p.icon size={18} strokeWidth={2.5} />
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${p.numColor}`}>
                    Serial {p.num}
                  </span>
                </div>
                
                <h3 className="text-2xl font-black mb-1 tracking-tighter signature-dot group-hover:translate-x-1 transition-transform">{p.title}</h3>
                <p className="text-black/40 text-sm font-medium mb-10 max-w-[200px]">
                  {p.desc}
                </p>

                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-black/30 group-hover:text-apple-blue transition-colors">
                  <span>Vezi Protocol</span>
                  <ArrowUpRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};
