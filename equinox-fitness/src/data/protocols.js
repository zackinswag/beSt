import { Dumbbell, User, Zap } from 'lucide-react';

export const TRAINING_PROTOCOLS = [
  {
    id: 'gym',
    title: 'SALA DE FORȚĂ',
    subtitle: 'Protocolul 01',
    shortLabel: 'sală de forță',
    description:
      'Pentru masă musculară și forță, cu progres clar de la săptămână la săptămână.',
    icon: Dumbbell,
    color: 'blue',
    gradient: 'from-blue-500/20 to-transparent',
  },
  {
    id: 'calisthenics',
    title: 'MĂIESTRIA CORPULUI',
    subtitle: 'Protocolul 02',
    shortLabel: 'măiestria corpului',
    description:
      'Pentru control corporal, mobilitate și skill-uri progresive, de la bază la avansat.',
    icon: User,
    color: 'purple',
    gradient: 'from-purple-500/20 to-transparent',
  },
  {
    id: 'hybrid',
    title: 'MOTOR HIBRID',
    subtitle: 'Protocolul 03',
    shortLabel: 'motor hibrid',
    description:
      'Pentru echilibru între forță, condiție fizică și rezistență pe termen lung.',
    icon: Zap,
    color: 'rose',
    gradient: 'from-rose-500/20 to-transparent',
  },
];
