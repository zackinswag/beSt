import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { ArrowLeft, Dumbbell, Shield, Flame, Battery, ArrowRight, Zap, Layers, User, Lock } from 'lucide-react';
import { useSupabase } from '../hooks/useSupabase';

export const ProtocolDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isLoaded, isSignedIn } = useUser();
  const getSupabase = useSupabase();

  const [selectedSubProtocol, setSelectedSubProtocol] = useState(null);
  const [userAccess, setUserAccess] = useState({ tier: 'free', trialActive: false, loading: true });
  const [showComingSoon, setShowComingSoon] = useState(false);

  useEffect(() => {
    const fetchAccess = async () => {
      if (!isLoaded || !isSignedIn || !getSupabase) {
        setUserAccess({ tier: 'free', trialActive: false, loading: false });
        return;
      }
      try {
        const supabase = await getSupabase();
        const { data, error } = await supabase
          .from('users')
          .select('subscription_tier, trial_start_date')
          .eq('clerk_id', user.id)
          .single();

        if (data) {
          const trialStart = new Date(data.trial_start_date);
          const now = new Date();
          const diffDays = Math.ceil((now - trialStart) / (1000 * 60 * 60 * 24));
          const trialActive = diffDays <= 30;
          
          setUserAccess({ 
            tier: data.subscription_tier, 
            trialActive, 
            loading: false 
          });
        } else {
          setUserAccess({ tier: 'free', trialActive: false, loading: false });
        }
      } catch (err) {
        console.error("Error fetching access:", err);
        setUserAccess(prev => ({ ...prev, loading: false }));
      }
    };
    fetchAccess();
  }, [user, getSupabase]);

  const splits = [
    {
      id: 'ppl',
      name: 'PPL (Push, Pull, Legs)',
      desc: 'Împarte antrenamentul în mișcări de împingere, tragere și picioare.',
      why: 'Permite o frecvență ridicată pentru fiecare grupă musculară și recuperare optimă.',
      icon: Zap,
      color: 'blue'
    },
    {
      id: 'bro_split',
      name: 'SPLIT PE GRUPE',
      desc: 'O grupă musculară pe zi. Focus clar pe hipertrofie.',
      why: 'Ideal pentru cei care vor să dedice timp maxim fiecărei grupe în parte.',
      icon: Dumbbell,
      color: 'purple'
    },
    {
      id: 'upper_lower',
      name: 'U/L (Superior - Inferior)',
      desc: 'Antrenamente alternative între partea superioară și cea inferioară.',
      why: 'Echilibru perfect între frecvență și volum, foarte versatil.',
      icon: Layers,
      color: 'emerald'
    },
    {
      id: 'full_body',
      name: 'TOT CORPUL',
      desc: 'Antrenează tot corpul în fiecare sesiune.',
      why: 'Maxim de eficiență pentru cei cu program încărcat, stimulează sinteza proteică frecvent.',
      icon: User,
      color: 'rose'
    }
  ];

  const gymSubProtocols = [
    {
      id: 'gym_strength',
      name: 'Strict Forță',
      desc: 'Focus pe bază și intensitate maximă. 3-5 repetări, pauze lungi, forță brută.',
      icon: Shield,
      color: 'blue',
      tier: 'free'
    },
    {
      id: 'gym_maintenance',
      name: 'Menținere',
      desc: 'Echilibru între volum și intensitate. Ideal pentru păstrarea masei musculare.',
      icon: Battery,
      color: 'emerald',
      tier: 'free'
    },
    {
      id: 'gym_shred',
      name: 'Fibrare',
      desc: 'Volum ridicat, densitate mare. Proiectat pentru definire maximă și anduranță.',
      icon: Flame,
      color: 'rose',
      tier: 'free'
    }
  ];

  const calisthenicsSubProtocols = [
    {
      id: 'calisthenics_classic',
      name: 'Clasic',
      desc: 'Bază solidă (tracțiuni, dips etc.). Esențial pentru a construi forța brută necesară skill-urilor avansate.',
      icon: User,
      color: 'blue',
      tier: 'free'
    },
    {
      id: 'calisthenics_skills',
      name: 'Skill-uri',
      desc: 'Măiestrie (Front Lever, Planche etc.). Antrenamentul pe skill-uri dezvoltă forță relativă și mobilitate superioară prin integrare sistemică.',
      icon: Zap,
      color: 'purple',
      tier: 'premium'
    }
  ];

  const subProtocols = id === 'gym' ? gymSubProtocols : id === 'calisthenics' ? calisthenicsSubProtocols : [];
  if (!['gym', 'calisthenics'].includes(id)) {
    return (
      <div className="pt-44 pb-20 max-w-4xl mx-auto px-6 text-center">
        <button 
          onClick={() => navigate('/training')}
          className="inline-flex items-center gap-2 text-black/40 hover:text-black mb-12 transition-colors font-bold uppercase tracking-widest text-[10px]"
        >
          <ArrowLeft size={14} /> Înapoi
        </button>
        <h2 className="text-4xl font-black tracking-tighter mb-4">În curând</h2>
        <p className="text-black/55">Lucrăm la acest protocol ({id}). Revino curând!</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* COMING SOON TOAST */}
      {showComingSoon && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="bg-black text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/10">
            <Zap size={18} className="text-apple-blue animate-pulse" />
            <span className="font-black uppercase tracking-widest text-[10px]">Modulul de antrenament vine curând!</span>
          </div>
        </div>
      )}

      {/* BACKGROUND AMBIENT */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden bg-[#F5F5F7]">
        <div className="absolute top-[10%] right-[10%] w-[40%] h-[40%] bg-blue-400/10 rounded-full blur-[100px] animate-mesh"></div>
      </div>

      <div className="pt-32 md:pt-44 pb-20 max-w-6xl mx-auto px-6">
        {/* BACK & HEADER */}
        <div className="mb-16 card-animate">
          <button 
            onClick={() => {
              if (selectedSubProtocol) {
                setSelectedSubProtocol(null);
              } else {
                navigate('/training');
              }
            }}
            className="inline-flex items-center gap-2 text-black/40 hover:text-black mb-8 transition-colors font-bold uppercase tracking-widest text-[10px]"
          >
            <ArrowLeft size={14} /> {selectedSubProtocol ? 'Înapoi la specializări' : 'Înapoi la protocoale'}
          </button>
          
          <div className="flex items-center gap-4 md:gap-6 mb-6 text-left">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-black/5 flex items-center justify-center text-apple-blue shadow-sm shrink-0">
              {id === 'gym' ? <Dumbbell size={24} className="md:w-8 md:h-8" /> : <User size={24} className="md:w-8 md:h-8" />}
            </div>
            <div>
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter leading-none">
                {selectedSubProtocol ? selectedSubProtocol.name.toUpperCase() : (
                  id === 'gym' ? <>SALA DE <span className="font-serif-italic font-normal text-black/70">FORȚĂ</span></> : <>MĂIESTRIA <span className="font-serif-italic font-normal text-black/70">CORPULUI</span></>
                )}
              </h2>
              <p className="text-black/55 font-bold tracking-widest text-[10px] uppercase mt-1">
                {selectedSubProtocol ? 'Alege tipul de split pentru programul tău' : 'Alege specializarea programului'}
              </p>
            </div>
          </div>
        </div>

        {!selectedSubProtocol ? (
          /* SUB-PROTOCOLS GRID */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {subProtocols.map((sub, i) => (
              <div 
                key={sub.id}
                onClick={() => {
                  if (id === 'gym') {
                    setSelectedSubProtocol(sub);
                  } else {
                    setShowComingSoon(true);
                    setTimeout(() => setShowComingSoon(false), 3000);
                  }
                }}
                className={`apple-card p-10 group cursor-pointer hover:shadow-2xl hover:shadow-black/5 transition-all duration-500 card-animate ${
                  userAccess.tier === 'free' && !userAccess.trialActive && sub.tier !== 'free' ? 'opacity-60' : ''
                }`}
                style={{ animationDelay: `${0.1 + i * 0.1}s` }}
              >
                <div className="flex justify-between items-start mb-8">
                  <div className={`w-14 h-14 rounded-2xl bg-${sub.color}-500/10 flex items-center justify-center group-hover:bg-${sub.color}-500 group-hover:text-white transition-all duration-500`}>
                    <sub.icon size={24} className={`text-${sub.color}-500 group-hover:text-white transition-colors`} />
                  </div>
                  {sub.tier === 'premium' && userAccess.tier === 'free' && !userAccess.trialActive && (
                    <div className="bg-apple-blue/10 px-3 py-1 rounded-full flex items-center gap-1.5">
                      <Lock size={10} className="text-apple-blue" />
                      <span className="text-[9px] font-black uppercase tracking-widest text-apple-blue">Doar Elită</span>
                    </div>
                  )}
                </div>

                <h3 className="text-2xl font-black mb-4 tracking-tight">{sub.name}</h3>
                <p className="text-black/55 text-sm leading-relaxed mb-10 font-medium">
                  {sub.desc}
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-black/5">
                  <span className="text-[10px] font-black uppercase tracking-widest text-black/30 group-hover:text-black transition-colors">
                    {sub.id === 'gym_strength' || sub.id === 'gym_maintenance' || sub.id === 'gym_shred' ? 'Vezi variantele' : 'Începe programul'}
                  </span>
                  <ArrowRight size={16} className="text-black/20 group-hover:text-black group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* SPLITS SELECTION GRID */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 card-animate">
            {splits.map((split, i) => (
              <div 
                key={split.id}
                onClick={() => {
                  if (split.id === 'ppl') {
                    // mapăm split-ul ppl la id-ul 'gym_ppl' care există în baza de date
                    navigate(`/training/${id}/gym_ppl`);
                  } else {
                    setShowComingSoon(true);
                    setTimeout(() => setShowComingSoon(false), 3000);
                  }
                }}
                className="apple-card p-10 group cursor-pointer hover:shadow-2xl hover:shadow-black/5 transition-all duration-500 relative"
                style={{ animationDelay: `${0.1 + i * 0.1}s` }}
              >
                <div className="flex justify-between items-start mb-8">
                  <div className={`w-14 h-14 rounded-2xl bg-${split.color}-500/10 flex items-center justify-center group-hover:bg-${split.color}-500 group-hover:text-white transition-all duration-500`}>
                    <split.icon size={24} className={`text-${split.color}-500 group-hover:text-white transition-colors`} />
                  </div>
                  <div className="bg-black/[0.03] px-3 py-1 rounded-full">
                    <span className="text-[9px] font-black uppercase tracking-widest text-black/30">Opțiune Split</span>
                  </div>
                </div>

                <h3 className="text-3xl font-black mb-4 tracking-tighter">{split.name}</h3>
                
                <div className="space-y-4 mb-10">
                  <p className="text-black/50 text-sm leading-relaxed font-medium">
                    {split.desc}
                  </p>
                  <div className="p-4 bg-black/[0.02] border border-black/[0.05] rounded-2xl">
                    <p className="text-[10px] font-black uppercase tracking-widest text-black/30 mb-2">De ce să alegi asta?</p>
                    <p className="text-xs text-black/60 leading-relaxed italic">"{split.why}"</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-black/5">
                  <span className="text-[10px] font-black uppercase tracking-widest text-black/30 group-hover:text-black transition-colors">Alege acest split</span>
                  <ArrowRight size={16} className="text-black/20 group-hover:text-black group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
