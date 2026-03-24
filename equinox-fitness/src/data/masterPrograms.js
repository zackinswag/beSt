import { Dumbbell, Zap, User, Flame, Shield, Trophy } from 'lucide-react';

export const MASTER_PROGRAMS = [
  {
    id: 'gym_ppl',
    protocolId: 'gym',
    name: 'PPL Elite (Push/Pull/Legs)',
    desc: 'Baza oricărei transformări serioase. Împarte corpul pe funcții de mișcare pentru rezultate maxime.',
    duration: '6-12 Săptămâni',
    difficulty: 'Intermediar',
    intensity: 'Ridică',
    goal: 'Forță & Hipertrofie',
    icon: Dumbbell,
    color: 'blue'
  },
  {
    id: 'gym_bro_split',
    protocolId: 'gym',
    name: 'Bro Split (Modern Bodybuilding)',
    desc: 'Focus extrem pe fiecare grupă musculară în parte. Ideal pentru detalii și volum ridicat.',
    duration: '8 Săptămâni',
    difficulty: 'Avansat',
    intensity: 'Medie-Ridică',
    goal: 'Hipertrofie Maximă',
    icon: Flame,
    color: 'orange'
  },
  {
    id: 'calisthenics_classic',
    protocolId: 'calisthenics',
    name: 'Baza Calisthenics',
    desc: 'Tracțiuni, flotări și dips la un alt nivel. Construiește forța brută necesară pentru skill-uri.',
    duration: 'Continuu',
    difficulty: 'Începător-Intermediar',
    intensity: 'Medie',
    goal: 'Condiție Fizică',
    icon: User,
    color: 'emerald'
  },
  {
    id: 'calisthenics_skills',
    protocolId: 'calisthenics',
    name: 'Skill-uri Avansate',
    desc: 'Front Lever, Planche și Muscle-ups. Control absolut și forță funcțională la nivel ridicat.',
    duration: '12+ Săptămâni',
    difficulty: 'Avansat',
    intensity: 'Ridicată',
    goal: 'Skill Progresiv',
    icon: Shield,
    color: 'purple'
  },
  {
    id: 'hybrid_performance',
    protocolId: 'hybrid',
    name: 'Performanță Hibridă',
    desc: 'Combinația perfectă între forța din sală și anduranța metabolică.',
    duration: '10 Săptămâni',
    difficulty: 'Intermediar',
    intensity: 'Extremă',
    goal: 'Atheltic Performance',
    icon: Zap,
    color: 'amber'
  }
];
