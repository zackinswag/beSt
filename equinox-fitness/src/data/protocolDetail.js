import { Dumbbell, Shield, Flame, Battery, Zap, Layers, User } from 'lucide-react';

export const SPLITS = [
  {
    id: 'ppl',
    name: 'PPL (Push, Pull, Legs)',
    desc: 'Împarte antrenamentul în mișcări de împingere, tragere și picioare.',
    why: 'Permite o frecvență ridicată pentru fiecare grupă musculară și recuperare optimă.',
    icon: Zap,
    color: 'blue',
  },
  {
    id: 'bro_split',
    name: 'SPLIT PE GRUPE',
    desc: 'O grupă musculară pe zi. Focus clar pe hipertrofie.',
    why: 'Ideal pentru cei care vor să dedice timp maxim fiecărei grupe în parte.',
    icon: Dumbbell,
    color: 'purple',
  },
  {
    id: 'upper_lower',
    name: 'U/L (Superior - Inferior)',
    desc: 'Antrenamente alternative între partea superioară și cea inferioară.',
    why: 'Echilibru perfect între frecvență și volum, foarte versatil.',
    icon: Layers,
    color: 'emerald',
  },
  {
    id: 'full_body',
    name: 'TOT CORPUL',
    desc: 'Antrenează tot corpul în fiecare sesiune.',
    why: 'Maxim de eficiență pentru cei cu program încărcat, stimulează sinteza proteică frecvent.',
    icon: User,
    color: 'rose',
  },
];

const GYM_SUB_PROTOCOLS = [
  {
    id: 'gym_strength',
    name: 'Strict Forță',
    desc: 'Focus pe bază și intensitate maximă. 3-5 repetări, pauze lungi, forță brută.',
    icon: Shield,
    color: 'blue',
    tier: 'free',
  },
  {
    id: 'gym_maintenance',
    name: 'Menținere',
    desc: 'Echilibru între volum și intensitate. Ideal pentru păstrarea masei musculare.',
    icon: Battery,
    color: 'emerald',
    tier: 'free',
  },
  {
    id: 'gym_shred',
    name: 'Fibrare',
    desc: 'Volum ridicat, densitate mare. Proiectat pentru definire maximă și anduranță.',
    icon: Flame,
    color: 'rose',
    tier: 'free',
  },
];

const CALISTHENICS_SUB_PROTOCOLS = [
  {
    id: 'calisthenics_classic',
    name: 'Clasic',
    desc: 'Bază solidă (tracțiuni, dips etc.). Esențial pentru a construi forța brută necesară skill-urilor avansate.',
    icon: User,
    color: 'blue',
    tier: 'free',
  },
  {
    id: 'calisthenics_skills',
    name: 'Skill-uri',
    desc: 'Măiestrie (Front Lever, Planche etc.). Antrenamentul pe skill-uri dezvoltă forță relativă și mobilitate superioară prin integrare sistemică.',
    icon: Zap,
    color: 'purple',
    tier: 'premium',
  },
];

export const getSubProtocolsByType = (protocolType) => {
  if (protocolType === 'gym') return GYM_SUB_PROTOCOLS;
  if (protocolType === 'calisthenics') return CALISTHENICS_SUB_PROTOCOLS;
  return [];
};
