import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Dumbbell, User, Zap, Trophy, Users, Target, ArrowUpRight } from 'lucide-react';
import { useAuth, SignedIn, SignUpButton } from "@clerk/clerk-react";

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
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden bg-[#F5F5F7]">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-400/30 rounded-full blur-[100px] animate-mesh" style={{ animationDuration: '8s' }}></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-400/30 rounded-full blur-[100px] animate-mesh" style={{ animationDuration: '7s', animationDelay: '-2s' }}></div>
        <div className="absolute top-[30%] left-[50%] w-[50%] h-[50%] bg-pink-400/20 rounded-full blur-[120px] animate-mesh" style={{ animationDuration: '9s', animationDelay: '-4s' }}></div>
        <div className="absolute bottom-[20%] left-[-10%] w-[40%] h-[40%] bg-indigo-400/20 rounded-full blur-[100px] animate-mesh" style={{ animationDuration: '6s', animationDelay: '-3s' }}></div>
      </div>

      {/* HERO SECTION */}
      <section className="pt-44 pb-16 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2.5 bg-black/[0.03] border border-black/[0.05] px-5 py-2 rounded-full mb-10 card-animate">
            <Sparkles size={12} className="text-apple-blue" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-black/40">Sistem de elită activat</span>
          </div>
          
          <h1 className="text-6xl md:text-[7rem] font-black tracking-tighter mb-8 leading-[0.85]">
            <span className="text-shimmer">Train with</span>
            <br />
            <span className="font-serif-italic font-normal text-5xl md:text-7xl text-black/70">intelligence.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-black/40 font-medium mb-14 max-w-xl mx-auto leading-relaxed tracking-tight">
            Fuziunea rafinată între forța brută a sălii, măiestria calisthenics-ului și longevitatea atletică.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-6">
            <Link 
              to="/training" 
              className="btn-primary btn-glow px-14 py-5 text-sm shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50"
            >
              {isSignedIn ? 'DASHBOARD ANTRENAMENT' : 'ÎNCEPE TRANSFORMAREA'}
            </Link>
            <div className="flex items-center -space-x-3">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center overflow-hidden shadow-sm">
                  <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user" className="w-full h-full object-cover" />
                </div>
              ))}
              <div className="pl-6 text-left">
                <div className="text-sm font-black leading-none italic">4.9/5</div>
                <div className="text-[10px] font-bold uppercase opacity-30 tracking-widest">User Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* METRICS STRIP */}
      <section className="max-w-4xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Users, value: 2847, suffix: '+', label: 'Active Members' },
            { icon: Target, value: 42, suffix: '', label: 'Elite Programs' },
            { icon: Trophy, value: 97, suffix: '%', label: 'Success Rate' },
          ].map((metric, i) => (
            <div key={i} className="metric-item text-center py-8 px-6 rounded-2xl bg-white/40 backdrop-blur-sm border border-white/60">
              <metric.icon size={20} className="mx-auto mb-3 text-apple-blue/60" />
              <div className="text-4xl md:text-4xl font-black tracking-tighter mb-1">
                <AnimatedCounter end={metric.value} suffix={metric.suffix} />
              </div>
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/30">{metric.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* BENTO GRID - PROGRAMS */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Gym - Main Card */}
          <div className="md:col-span-8 apple-card p-12 group overflow-hidden relative min-h-[400px] flex flex-col justify-end card-animate">
            <Dumbbell className="absolute top-10 right-10 text-black/[0.03] w-48 h-48 -rotate-12 group-hover:text-apple-blue/10 group-hover:rotate-0 transition-all duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-apple-blue mb-4 block">Protocol 01</span>
              <h3 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter italic">THE WEIGHTROOM</h3>
              <p className="text-black/50 max-w-md text-sm leading-relaxed mb-8">Hipertrofie structurală și forță brută. Proiectat pentru performanță maximă fără compromisuri.</p>
              <Link to="/training" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest group/link hover:text-apple-blue transition-colors">
                Explorează <ArrowUpRight size={14} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Stats Card - Dark Dashboard */}
          <div className="md:col-span-4 bg-gradient-to-br from-black via-gray-900 to-black text-white rounded-[32px] p-10 flex flex-col justify-between shadow-2xl shadow-black/30 card-animate relative overflow-hidden">
            {/* Subtle grid pattern */}
            <div className="absolute inset-0 opacity-5" style={{
              backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}></div>
            <div className="space-y-8 relative z-10">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">System Efficiency</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-xs font-bold opacity-60">Power</span>
                  <span className="text-2xl font-light italic tracking-tighter">98.2%</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-blue-400 w-[98%] shadow-[0_0_12px_#3b82f6] rounded-full"></div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-xs font-bold opacity-60">Mobility</span>
                  <span className="text-2xl font-light italic tracking-tighter">85.4%</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-white/40 to-white/60 w-[85%] rounded-full"></div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-xs font-bold opacity-60">Recovery</span>
                  <span className="text-2xl font-light italic tracking-tighter">91.7%</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 w-[92%] shadow-[0_0_12px_#10b981] rounded-full"></div>
                </div>
              </div>
            </div>
            <p className="text-[9px] font-bold uppercase tracking-[0.3em] opacity-30 leading-relaxed relative z-10 mt-6">Optimization Active: <br />Equinox Intelligence</p>
          </div>

          {/* Body Mastery - with gradient overlay */}
          <div className="md:col-span-6 apple-card p-12 group relative overflow-hidden card-animate">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="relative z-10">
              <User className="text-apple-blue/20 mb-8 group-hover:text-apple-blue group-hover:scale-110 transition-all duration-500" size={32} />
              <h3 className="text-3xl font-black mb-4 tracking-tighter italic">BODY MASTERY</h3>
              <p className="text-black/50 text-sm leading-relaxed mb-8">Stăpânește fizica propriei greutăți. Skill-uri de la începător la nivel de elită.</p>
              <Link to="/training" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest hover:text-apple-blue transition-colors">
                Protocol <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>

          {/* Hybrid */}
          <div className="md:col-span-6 apple-card p-12 group relative overflow-hidden card-animate">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-50/30 via-transparent to-rose-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="relative z-10">
              <Zap className="text-apple-blue/20 mb-8 group-hover:text-apple-blue group-hover:scale-110 transition-all duration-500" size={32} />
              <h3 className="text-3xl font-black mb-4 tracking-tighter italic">HYBRID ENGINE</h3>
              <p className="text-black/50 text-sm leading-relaxed mb-8">Unde forța explozivă întâlnește rezistența infinită. Atletul total.</p>
              <Link to="/training" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest hover:text-apple-blue transition-colors">
                Protocol <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
