import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Shield, Zap, Calendar, Settings, LogOut, ChevronRight, Award, Trophy, Target } from 'lucide-react';
import { useSupabase } from '../hooks/useSupabase';
import { getTrialActive } from '../utils/subscription';

export const Profile = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const navigate = useNavigate();
  const getSupabase = useSupabase();

  const [dbUser, setDbUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user || !getSupabase) return;
      
      try {
        const supabase = await getSupabase();
        const { data } = await supabase
          .from('users')
          .select('*')
          .eq('clerk_id', user.id)
          .single();
        
        if (data) setDbUser(data);
      } catch (err) {
        console.error("Error fetching user data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (isLoaded && isSignedIn) {
      fetchUserData();
    } else if (isLoaded && !isSignedIn) {
      navigate('/');
    }
  }, [user, isLoaded, isSignedIn, getSupabase, navigate]);

  if (!isLoaded || loading) {
    return (
      <div className="pt-44 flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-apple-blue/20 border-t-apple-blue rounded-full animate-spin mb-4"></div>
        <p className="text-black/40 font-bold uppercase tracking-widest text-[10px]">Încărcăm profilul...</p>
      </div>
    );
  }

  const trialDaysRemaining = () => {
    if (!dbUser?.trial_start_date) return 0;
    const start = new Date(dbUser.trial_start_date);
    const now = new Date();
    const diff = Math.ceil((now - start) / (1000 * 60 * 60 * 24));
    return Math.max(0, 30 - diff);
  };
  const isTrialActive = getTrialActive(dbUser?.trial_start_date);

  const getTierColor = (tier) => {
    switch(tier) {
      case 'pro': return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
      case 'premium': return 'text-apple-blue bg-apple-blue/10 border-apple-blue/20';
      default: return 'text-black/40 bg-black/5 border-black/10';
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden pb-32">
      <div className="pt-32 md:pt-40 pb-24 max-w-5xl mx-auto px-6">
        
        {/* PREMIUM LIGHT SIGNATURE HEADER */}
        <div className="relative mb-12">
          <div className="bg-white rounded-[40px] border border-zinc-200/60 shadow-xl shadow-black/[0.02] p-8 md:p-14 flex flex-col md:flex-row items-center gap-10 relative overflow-hidden">
            {/* Subtle background accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-apple-blue/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
            
            <div className="relative z-10 shrink-0">
              <div className="absolute -inset-4 border border-apple-blue/10 rounded-[48px]"></div>
              <div className="w-36 h-36 rounded-[36px] overflow-hidden border-4 border-white shadow-2xl relative z-10">
                <img src={user?.imageUrl} alt={user?.fullName} className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-11 h-11 bg-black text-white rounded-2xl flex items-center justify-center shadow-xl transform hover:scale-110 transition-all cursor-pointer z-20 border-4 border-white">
                <Settings size={20} />
              </div>
            </div>

            <div className="text-center md:text-left flex-grow relative z-10">
              <div className="inline-flex items-center gap-2 bg-zinc-100 px-3 py-1 rounded-full mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-black/40">Status: Activ</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-black mb-3 leading-none">
                {user?.fullName?.split(' ')[0] || 'Utilizator'} <span className="text-black/20 italic font-medium">{user?.fullName?.split(' ').slice(1).join(' ')}</span>
              </h1>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-6">
                <div className={`px-5 py-2.5 rounded-2xl border text-[10px] font-black uppercase tracking-[0.2em] shadow-sm ${getTierColor(dbUser?.subscription_tier)}`}>
                  {dbUser?.subscription_tier === 'pro' ? 'Perspectivă Atletică' : 
                   dbUser?.subscription_tier === 'premium' ? 'Membru premium' : 'Utilizator esențial'}
                </div>
                <div className="text-black/30 text-xs font-bold tracking-tight">
                  Membru ID: <span className="text-black/60">{user?.id.slice(0, 8)}</span>
                </div>
              </div>
            </div>

            <div className="hidden lg:flex flex-col items-end gap-2 pr-4 relative z-10">
              <div className="text-right">
                <p className="text-[10px] font-black uppercase tracking-widest text-black/20 mb-1">Nivel Atletic</p>
                <p className="text-5xl font-black text-black italic tracking-tighter">BASE <span className="text-apple-blue">01</span></p>
              </div>
            </div>
          </div>
        </div>

        {/* PERFORMANCE METRICS GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: 'Antrenamente', value: '0', icon: Calendar, color: 'text-blue-500', bg: 'bg-blue-500/5' },
            { label: 'Recorduri Personal', value: '0', icon: Trophy, color: 'text-amber-500', bg: 'bg-amber-500/5' },
            { label: 'Zile Active', value: '0', icon: Zap, color: 'text-purple-500', bg: 'bg-purple-500/5' },
            { label: 'Consistency Score', value: '0%', icon: Shield, color: 'text-emerald-500', bg: 'bg-emerald-500/5' },
          ].map((stat, i) => (
            <div key={i} className="bg-white border border-zinc-200/60 p-6 rounded-[32px] hover:shadow-xl hover:shadow-black/5 transition-all duration-500 card-animate" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className={`w-10 h-10 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mb-6`}>
                <stat.icon size={18} />
              </div>
              <div className="text-3xl font-black tracking-tighter mb-1">{stat.value}</div>
              <div className="text-[9px] font-black uppercase tracking-[0.2em] text-black/30">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* MAIN CONTENT LEFT */}
          <div className="md:col-span-2 space-y-8">
            {/* MEMBERSHIP CARD SECTION */}
            <div className="bg-white rounded-[40px] border border-zinc-200/60 p-8 md:p-12 hover:shadow-2xl transition-all duration-500">
              <div className="flex justify-between items-center mb-10">
                <div>
                  <h3 className="text-2xl font-black tracking-tighter mb-1">Status Abonament</h3>
                  <p className="text-xs text-black/40 font-medium">Gestionează accesul tău la protocoale</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-apple-blue/5 flex items-center justify-center text-apple-blue">
                  <Zap size={22} />
                </div>
              </div>

              {/* ELITE LIGHT MEMBERSHIP CARD */}
              <div className="relative group mb-10">
                <div className="absolute inset-0 bg-zinc-100 rounded-[32px] transform group-hover:rotate-1 transition-transform duration-500"></div>
                <div className="relative bg-white p-8 rounded-[32px] border border-zinc-200 shadow-xl shadow-black/[0.02] overflow-hidden">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-zinc-50 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                  
                  <div className="flex justify-between items-start mb-14 relative z-10">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-black/20 mb-3">Membership Type</p>
                      <p className="text-2xl font-black text-black tracking-widest uppercase italic leading-none">
                        {dbUser?.subscription_tier === 'pro' ? 'Perspectivă Atletică' : 
                         dbUser?.subscription_tier === 'premium' ? 'Premium Elite' : 'Basic Member'}
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-300">
                      <Shield size={22} />
                    </div>
                  </div>

                  <div className="flex justify-between items-end relative z-10">
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-widest text-black/20 mb-1">Active Since</p>
                      <p className="text-sm font-bold text-black/60">{new Date(dbUser?.created_at || Date.now()).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-apple-blue/5 rounded-full border border-apple-blue/10">
                        <span className="w-1.5 h-1.5 rounded-full bg-apple-blue animate-pulse"></span>
                        <span className="text-[9px] font-bold text-apple-blue uppercase tracking-widest italic">Verified Athlete</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {dbUser?.subscription_tier === 'free' && isTrialActive && (
                <div className="bg-zinc-50 p-6 rounded-[24px] border border-zinc-200/60 mb-10">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-black uppercase tracking-widest text-black/40 italic">Perioadă de probă activă</span>
                    <span className="text-xs font-black text-apple-blue">{trialDaysRemaining()} zile rămase</span>
                  </div>
                  <div className="w-full h-3 bg-black/5 rounded-full overflow-hidden">
                    <div className="h-full bg-apple-blue transition-all duration-1000" style={{ width: `${(trialDaysRemaining() / 30) * 100}%` }}></div>
                  </div>
                </div>
              )}

              <Link to="/pricing" className="flex items-center justify-between bg-apple-blue text-white p-6 rounded-[24px] group hover:bg-apple-blue/90 transition-all shadow-xl shadow-apple-blue/20">
                <span className="text-[11px] font-black uppercase tracking-widest ml-2">Update Performance Level</span>
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform mr-2" />
              </Link>
            </div>

            {/* RECENT ACTIVITY FEED */}
            <div className="bg-white rounded-[40px] border border-zinc-200/60 p-8 md:p-12 hover:shadow-2xl transition-all duration-500">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-black tracking-tighter">Activitate Recentă</h3>
                <Award size={20} className="text-purple-500" />
              </div>
              <div className="space-y-4">
                {[
                  { title: 'Cont creat', desc: 'Bun venit în platforma Equinox!', time: 'Recent', icon: Shield, color: 'text-emerald-500', bg: 'bg-emerald-50' },
                  { title: 'Goal setat', desc: 'Ai ales să te concentrezi pe forță și estetică.', time: 'Recent', icon: Target, color: 'text-blue-500', bg: 'bg-blue-50' },
                  { title: 'Primul pas', desc: 'Accesat catalogul de antrenamente.', time: 'Acum', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-50' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 hover:bg-zinc-50 rounded-2xl transition-all cursor-default border border-transparent hover:border-zinc-100">
                    <div className={`w-10 h-10 rounded-xl ${item.bg} ${item.color} flex items-center justify-center shrink-0`}>
                      <item.icon size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-black tracking-tight">{item.title}</h4>
                      <p className="text-xs text-black/40 font-medium">{item.desc}</p>
                    </div>
                    <div className="ml-auto text-[9px] font-bold text-black/20 uppercase pt-1">{item.time}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SIDEBAR RIGHT */}
          <div className="space-y-6">
            <div className="bg-white rounded-[40px] border border-zinc-200/60 p-8 md:p-10 space-y-2">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-black/30 mb-6 px-2">Account Ops</h4>
              {[
                { icon: User, label: 'Editează profilul', color: 'text-blue-500', bg: 'bg-blue-50' },
                { icon: Settings, label: 'Preferințe Dash', color: 'text-purple-500', bg: 'bg-purple-50' },
              ].map((op, i) => (
                <button key={i} className="w-full flex items-center justify-between p-4 hover:bg-zinc-50 rounded-[20px] transition-all group">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl ${op.bg} ${op.color} flex items-center justify-center`}>
                      <op.icon size={18} />
                    </div>
                    <span className="text-sm font-black tracking-tight group-hover:translate-x-1 transition-transform">{op.label}</span>
                  </div>
                  <ChevronRight size={16} className="text-black/10" />
                </button>
              ))}
              <div className="pt-6 mt-6 border-t border-black/5">
                <button className="w-full flex items-center gap-4 p-4 text-rose-500 hover:bg-rose-50 rounded-[20px] transition-all group">
                  <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
                  <span className="text-sm font-black tracking-tight">Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
