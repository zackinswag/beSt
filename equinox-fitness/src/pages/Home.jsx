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
      {/* BACKGROUND AMBIENT LIGHTS */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden bg-transparent">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-400/25 rounded-full blur-[100px] animate-mesh" style={{ animationDuration: '10s' }}></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-400/20 rounded-full blur-[100px] animate-mesh" style={{ animationDuration: '11s', animationDelay: '-2s' }}></div>
      </div>

      {/* HERO SECTION */}
      <section className="pt-40 md:pt-44 pb-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <SectionBadge icon={Sparkles} text="Sistem de antrenament structurat" className="mb-10 card-animate" />
          
          <h1 className="text-6xl md:text-[7rem] font-black tracking-tighter mb-8 leading-[0.85]">
            <span className="text-shimmer">Antrenează-te cu</span>
            <br />
            <span className="font-serif-italic font-normal text-5xl md:text-7xl text-black/70">inteligență.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-black/55 font-medium mb-14 max-w-xl mx-auto leading-relaxed tracking-tight">
            Combină forța din sală, controlul din calisthenics și un ritm sustenabil pe termen lung.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-6">
            <Link 
              to="/training" 
              className="btn-primary btn-glow px-14 py-5 text-sm shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50"
            >
              {isSignedIn ? 'VEZI ANTRENAMENTELE' : 'ÎNCEPE ACUM'}
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-apple-blue/10 flex items-center justify-center">
                <Target size={18} className="text-apple-blue" />
              </div>
              <div className="text-left">
                <div className="text-sm font-black leading-none italic uppercase">Construit pentru consistență</div>
                <div className="text-[10px] font-semibold uppercase opacity-30 tracking-widest">Fără scurtături inutile</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* METRICS STRIP */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Users, value: 3, suffix: '', label: 'Protocoale de bază' },
            { icon: Target, value: 100, suffix: '+', label: 'Exerciții filtrate' },
            { icon: Trophy, value: 100, suffix: '%', label: 'Progres sustenabil' },
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
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-apple-blue mb-3">Protocoale</p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter">Alege-ți direcția.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { 
              num: '01', 
              icon: Dumbbell,
              title: TRAINING_PROTOCOLS[0].title, 
              desc: TRAINING_PROTOCOLS[0].description,
              accent: 'bg-blue-50 border-blue-100',
              iconColor: 'text-blue-500 bg-blue-100',
              numColor: 'text-blue-500'
            },
            { 
              num: '02', 
              icon: User,
              title: TRAINING_PROTOCOLS[1].title, 
              desc: TRAINING_PROTOCOLS[1].description,
              accent: 'bg-emerald-50 border-emerald-100',
              iconColor: 'text-emerald-600 bg-emerald-100',
              numColor: 'text-emerald-600'
            },
            { 
              num: '03', 
              icon: Zap,
              title: TRAINING_PROTOCOLS[2].title, 
              desc: TRAINING_PROTOCOLS[2].description,
              accent: 'bg-amber-50 border-amber-100',
              iconColor: 'text-amber-600 bg-amber-100',
              numColor: 'text-amber-600'
            }
          ].map((p) => (
            <Link to="/training" key={p.num} className={`rounded-2xl ${p.accent} border p-8 group hover:shadow-lg transition-all duration-300 block`}>
              <div className="flex items-center justify-between mb-6">
                <div className={`w-11 h-11 rounded-xl ${p.iconColor} flex items-center justify-center`}>
                  <p.icon size={20} />
                </div>
                <span className={`text-3xl font-black tracking-tighter ${p.numColor} opacity-30`}>{p.num}</span>
              </div>
              <h3 className="text-xl font-black tracking-tight mb-2">{p.title}</h3>
              <p className="text-black/50 text-sm leading-relaxed mb-6">{p.desc}</p>
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-black/40 group-hover:text-black transition-colors">
                Descoperă <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};
