import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Shield, Zap, Calendar, Settings, LogOut, ChevronRight, Award, Trophy } from 'lucide-react';
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
    <div className="relative min-h-screen overflow-hidden pb-20">
      {/* BACKGROUND AMBIENT */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden bg-transparent">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-400/5 rounded-full blur-[120px] animate-mesh" style={{ animationDuration: '12s' }}></div>
      </div>

      <div className="pt-32 md:pt-44 max-w-4xl mx-auto px-6">
        {/* PROFILE HEADER / HERO */}
        <div className="apple-card p-10 md:p-14 mb-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-apple-blue/10 to-transparent rounded-full -mr-20 -mt-20 blur-3xl group-hover:scale-110 transition-transform duration-1000"></div>
          
          <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
            <div className="relative">
              <div className="w-32 h-32 rounded-[32px] overflow-hidden border-4 border-white shadow-2xl relative z-10">
                <img src={user?.imageUrl} alt={user?.fullName} className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-black text-white rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-all cursor-pointer z-20">
                <Settings size={18} />
              </div>
            </div>

            <div className="text-center md:text-left flex-grow">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-3">
                <h1 className="text-4xl md:text-5xl font-black tracking-tighter">{user?.fullName}</h1>
                <div className={`px-4 py-1.5 rounded-full border text-[10px] font-semibold uppercase tracking-widest ${getTierColor(dbUser?.subscription_tier)}`}>
                  {dbUser?.subscription_tier === 'pro' ? 'Perspectivă Atletică' : 
                   dbUser?.subscription_tier === 'premium' ? 'Membru premium' : 'Utilizator esențial'}
                </div>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-4 text-black/55 font-medium text-sm">
                <div className="flex items-center gap-2">
                  <Mail size={14} />
                  {user?.primaryEmailAddress?.emailAddress}
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-black/10"></div>
                <div className="flex items-center gap-2">
                  <Shield size={14} />
                  ID: {user?.id.slice(0, 8)}...
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* SUBSCRIPTION CARD */}
          <div className="md:col-span-2 space-y-8">
            <div className="apple-card p-8 md:p-10 hover:shadow-2xl hover:shadow-black/5 transition-all duration-500">
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-xl font-bold tracking-tight">Status Abonament</h3>
                <Zap size={20} className="text-apple-blue" />
              </div>

              <div className="bg-zinc-50 p-8 rounded-2xl border border-zinc-200/60 mb-8 shadow-sm">
                <div className="flex justify-between items-end mb-6">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-black/30 mb-2">Plan Curent</p>
                    <p className="text-3xl font-black tracking-tighter">
                      {dbUser?.subscription_tier?.toUpperCase() || 'ESENȚIAL'}
                    </p>
                  </div>
                  <div className="text-right text-apple-blue font-semibold tracking-tighter">
                    {dbUser?.subscription_tier === 'free' ? '0€ / lună' : 'ÎN CURÂND'}
                  </div>
                </div>

                {dbUser?.subscription_tier === 'free' && isTrialActive && (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-[10px] font-semibold uppercase tracking-widest">
                      <span className="text-black/40">Probă gratuită: activă</span>
                      <span className="text-apple-blue">{trialDaysRemaining()} zile rămase</span>
                    </div>
                    <div className="w-full h-2.5 bg-black/5 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-apple-blue transition-all duration-1000" 
                        style={{ width: `${(trialDaysRemaining() / 30) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              <Link to="/pricing" className="btn-primary w-full py-5 flex items-center justify-center gap-3 group">
                <span className="text-sm">SCHIMBĂ SAU ACTUALIZEAZĂ PLANUL</span>
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* PROGRESS CARD (MOCK) */}
            <div className="apple-card p-8 md:p-10">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-bold tracking-tight">Antrenamentul tău</h3>
                <Award size={20} className="text-purple-500" />
              </div>
              <div className="grid grid-cols-3 gap-6">
                {[
                  { label: 'Antrenamente', value: '0', icon: Calendar },
                  { label: 'Recorduri', value: '0', icon: Trophy },
                  { label: 'Zile Active', value: '0', icon: Zap },
                ].map((stat, i) => (
                  <div key={i} className="text-center p-6 bg-zinc-50 rounded-2xl border border-zinc-200/60 shadow-sm">
                    <stat.icon size={16} className="mx-auto mb-3 text-black/20" />
                    <div className="text-2xl font-black mb-1 tracking-tighter">{stat.value}</div>
                    <div className="text-[8px] font-black uppercase tracking-[0.2em] text-black/30">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SIDEBAR / ACCOUNT OPS */}
          <div className="space-y-6">
            <div className="apple-card p-8 space-y-2">
              <h4 className="text-[10px] font-semibold uppercase tracking-widest text-black/30 mb-4 px-2">Opțiuni cont</h4>
              <button className="w-full flex items-center justify-between p-4 hover:bg-zinc-50 rounded-xl transition-all group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
                    <User size={18} />
                  </div>
                  <span className="text-sm font-bold tracking-tight group-hover:translate-x-1 transition-transform">Editează profilul</span>
                </div>
                <ChevronRight size={16} className="text-black/10" />
              </button>
              <button className="w-full flex items-center justify-between p-4 hover:bg-zinc-50 rounded-xl transition-all group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
                    <Settings size={18} />
                  </div>
                  <span className="text-sm font-bold tracking-tight group-hover:translate-x-1 transition-transform">Preferințe</span>
                </div>
                <ChevronRight size={16} className="text-black/10" />
              </button>
              <div className="pt-4 mt-4 border-t border-black/5">
                <button className="w-full flex items-center gap-4 p-4 text-rose-500 hover:bg-rose-500/5 rounded-2xl transition-all group">
                  <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
                  <span className="text-sm font-bold tracking-tight">Deconectare</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
