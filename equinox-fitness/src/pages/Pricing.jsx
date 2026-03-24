import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Zap, Sparkles, Trophy, ArrowLeft } from 'lucide-react';
import { SectionBadge } from '../components/ui/SectionBadge';
import { Toast } from '../components/ui/Toast';

export const Pricing = () => {
  const navigate = useNavigate();
  const [showComingSoon, setShowComingSoon] = useState(false);

  const tiers = [
    {
      id: 'free',
      name: 'Esențial',
      price: '0',
      desc: 'Tot ce ai nevoie ca să începi corect.',
      features: [
        'Acces la baza Calisthenics',
        'Bibliotecă de exerciții (limitată)',
        'Monitorizare progres de bază',
        'Fără suport tehnic'
      ],
      color: 'bg-black/5',
      textColor: 'text-black/40',
      buttonVariant: 'bg-black/5 hover:bg-black/10 text-black/60',
      icon: Zap
    },
    {
      id: 'premium',
      name: 'Experiență Completă',
      price: '19.99',
      desc: 'Pachetul complet pentru progres constant.',
      features: [
        'Toate protocoalele (Sală și Calisthenics)',
        'Toate tipurile de Split (PPL, Bro, U/L)',
        'Bibliotecă completă de exerciții',
        'Suport standard',
        'Analiza Video a execuției'
      ],
      recommended: true,
      color: 'bg-apple-blue/10',
      textColor: 'text-apple-blue',
      buttonVariant: 'btn-primary',
      icon: Sparkles
    },
    {
      id: 'pro',
      name: 'Optimizare Avansată',
      price: '29.99',
      desc: 'Optimizare completă: antrenament, nutriție și recuperare.',
      features: [
        'Tot din Premium',
        'Plan de Nutriție Personalizat',
        'Ghid de Recuperare & Mobilitate',
        'Sesiuni 1-on-1 lunare',
        'Suport prioritar VIP 24/7'
      ],
      color: 'bg-purple-500/10',
      textColor: 'text-purple-600',
      buttonVariant: 'bg-purple-600 text-white hover:bg-purple-700 shadow-lg shadow-purple-500/20',
      icon: Trophy
    }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden pb-32">
      {/* COMING SOON TOAST */}
      <Toast 
        isVisible={showComingSoon} 
        onClose={() => setShowComingSoon(false)} 
        message="Abonamentele vin curând!" 
        duration={3000} 
      />

      {/* BACKGROUND AMBIENT */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden bg-transparent">
        <div className="absolute top-[5%] right-[10%] w-[45%] h-[45%] bg-blue-400/10 rounded-full blur-[100px] animate-mesh" style={{ animationDuration: '12s' }}></div>
      </div>

      <div className="pt-32 md:pt-44 max-w-6xl mx-auto px-6 relative">
        {/* BACK BUTTON (Absolute for cleaner centering of titles) */}
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-32 md:top-44 left-6 inline-flex items-center gap-2 text-black/40 hover:text-black transition-colors font-bold uppercase tracking-widest text-[10px] z-20"
        >
          <ArrowLeft size={14} /> Înapoi
        </button>

        {/* HEADER */}
        <div className="text-center mb-16 md:mb-20 card-animate">
          <SectionBadge icon={Sparkles} text="Investește în tine" className="mb-8" />
          <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-6">
            Alege-ți <span className="font-serif-italic font-normal text-black/70">nivelul</span>.
          </h2>
          <p className="text-lg md:text-xl text-black/55 font-medium max-w-2xl mx-auto leading-relaxed">
            Testezi platforma cu o <span className="text-black font-black">perioadă de probă de 30 de zile</span>, apoi decizi ce plan ți se potrivește.
          </p>
        </div>

        <div className="apple-card p-6 md:p-8 mb-10 card-animate">
          <p className="text-sm md:text-base text-black/60">
            Toate planurile includ aceeași experiență de bază. Diferența o fac nivelul de personalizare și viteza cu care ajungi la rezultate.
          </p>
        </div>

        {/* PRICING GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, i) => (
            <div
              key={tier.id}
              className={`apple-card relative flex flex-col p-8 md:p-10 transition-all duration-500 hover:shadow-2xl card-animate ${tier.recommended ? 'border-apple-blue shadow-xl shadow-apple-blue/5 md:scale-105 z-10' : 'border-transparent'
                }`}
              style={{ animationDelay: `${0.1 + i * 0.1}s` }}
            >
              {tier.recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-apple-blue text-white text-[10px] font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                  Recomandat
                </div>
              )}

              <div className="mb-8">
                <div className={`w-14 h-14 rounded-2xl ${tier.color} flex items-center justify-center mb-6`}>
                  <tier.icon size={24} className={tier.textColor} />
                </div>
                <h3 className="text-2xl font-black tracking-tight mb-2">{tier.name}</h3>
                <p className="text-black/55 text-sm font-medium leading-relaxed">{tier.desc}</p>
              </div>

              <div className="mb-10">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black tracking-tighter">{tier.price}</span>
                  <span className="text-black/30 font-semibold uppercase tracking-widest text-xs">€/lună</span>
                </div>
              </div>

              <div className="flex-grow space-y-4 mb-10">
                {tier.features.map((feature, j) => (
                  <div key={j} className="flex items-start gap-3">
                    <div className="mt-1 w-4 h-4 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                      <Check size={10} className="text-emerald-500" strokeWidth={3} />
                    </div>
                    <span className="text-sm font-medium text-black/70 leading-tight">{feature}</span>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => setShowComingSoon(true)}
                className={`w-full py-4 rounded-2xl font-semibold uppercase tracking-widest text-xs transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 relative ${tier.buttonVariant}`}
              >
                {tier.id === 'free' ? 'Începe gratuit' : 'Începe proba de 30 zile'}
              </button>
            </div>
          ))}
        </div>

        {/* FOOTER NOTE */}
        <div className="mt-20 text-center max-w-2xl mx-auto">
          <p className="text-black/45 text-xs font-medium leading-relaxed">
            Anularea se poate face oricând din contul tău. Nu există contracte pe termen lung.
            Toate programele sunt create de experți Equinox și sunt actualizate constant.
          </p>
        </div>
      </div>
    </div>
  );
};
