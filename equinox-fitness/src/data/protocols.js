import { Dumbbell, User, Zap } from 'lucide-react';

export const TRAINING_PROTOCOLS = [
  {
    id: 'gym',
    title: 'SALĂ',
    subtitle: 'Protocolul 01',
    shortLabel: 'sală de forță',
    description:
      'Masă musculară și forță. Antrenament cu greutăți, fără scurtături.',
    icon: Dumbbell,
    color: 'blue',
    gradient: 'from-blue-500/20 to-transparent',
  },
  {
    id: 'calisthenics',
    title: 'CALISTHENICS',
    subtitle: 'Protocolul 02',
    shortLabel: 'calisthenics',
    description:
      'Învață să-ți controlezi corpul. Skill-uri, mobilitate și forță pură fără echipament.',
    icon: User,
    color: 'purple',
    gradient: 'from-purple-500/20 to-transparent',
  },
  {
    id: 'hybrid',
    title: 'HIBRID',
    subtitle: 'Protocolul 03',
    shortLabel: 'motor hibrid',
    description:
      'Echilibru între forță și condiție fizică. Pregătit pentru orice, oriunde.',
    icon: Zap,
    color: 'rose',
    gradient: 'from-rose-500/20 to-transparent',
  },
];
