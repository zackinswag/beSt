import { useUser } from '@clerk/clerk-react';
import { ArrowLeft, CheckCircle2, Circle, Clock, Info, ChevronRight, Lock } from 'lucide-react';
import { useSupabase } from '../hooks/useSupabase';

export const WorkoutSession = () => {
  const { id, programId } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const getSupabase = useSupabase();
  
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(true);
  const [workout, setWorkout] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [completedExercises, setCompletedExercises] = useState(new Set());
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    const checkAccessAndFetch = async () => {
      if (!user || !getSupabase) return;
      
      try {
        const supabase = await getSupabase();

        // 1. Check User Subscription
        const { data: userData } = await supabase
          .from('users')
          .select('subscription_tier, trial_start_date')
          .eq('clerk_id', user.id)
          .single();

        if (userData) {
          const trialStart = new Date(userData.trial_start_date);
          const now = new Date();
          const diffDays = Math.ceil((now - trialStart) / (1000 * 60 * 60 * 24));
          const trialActive = diffDays <= 30;
          
          const isPremiumProgram = programId.startsWith('calisthenics_skills');
          const isUserEligible = userData.subscription_tier !== 'free' || trialActive || !isPremiumProgram;

          if (!isUserEligible) {
            navigate('/pricing');
            return;
          }
          setHasAccess(true);
        }
        setAuthLoading(false);

        // 2. Fetch current workout for this program
        const { data: workoutData, error: wError } = await supabase
          .from('workouts')
          .select('*')
          .eq('program_id', programId)
          .order('day_number', { ascending: true })
          .limit(1)
          .single();
          
        if (wError) throw wError;
        setWorkout(workoutData);

        // 3. Fetch exercises for this workout
        const { data: exData, error: exError } = await supabase
          .from('exercises')
          .select('*')
          .eq('workout_id', workoutData.id)
          .order('order_index', { ascending: true });
          
        if (exError) throw exError;
        setExercises(exData);
      } catch (err) {
        console.error("Error loading workout session:", err);
      } finally {
        setLoading(false);
      }
    };

    checkAccessAndFetch();
  }, [programId, getSupabase, user, navigate]);

  const toggleComplete = (id) => {
    const newSet = new Set(completedExercises);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setCompletedExercises(newSet);
  };

  const progress = exercises.length > 0 
    ? Math.round((completedExercises.size / exercises.length) * 100) 
    : 0;

  if (authLoading || loading) {
    return (
      <div className="pt-32 md:pt-44 text-center animate-pulse">
        <p className="text-black/20 font-black uppercase tracking-widest text-xs">Verificăm accesul...</p>
      </div>
    );
  }

  if (!workout) {
    return (
      <div className="pt-44 text-center">
        <h2 className="text-2xl font-black mb-4">Antrenament negăsit</h2>
        <button onClick={() => navigate(-1)} className="btn-primary px-8 py-3">Înapoi</button>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#F5F5F7] pb-32">
      {/* HEADER OVERLAY */}
      <div className="fixed top-0 left-0 w-full h-80 bg-gradient-to-b from-blue-500/10 to-transparent -z-10" />

      <div className="pt-32 md:pt-44 max-w-3xl mx-auto px-6">
        {/* BACK & HEADER */}
        <div className="mb-12">
          <button 
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-black/40 hover:text-black mb-6 transition-colors font-bold uppercase tracking-widest text-[10px]"
          >
            <ArrowLeft size={14} /> Înapoi la selecție
          </button>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-2 leading-none">{workout.name}</h1>
              <p className="text-black/40 font-bold tracking-[0.2em] uppercase text-[10px]">{id} • Protocol {programId}</p>
            </div>
            <div className="bg-white/60 backdrop-blur-xl border border-white/40 px-6 py-4 rounded-3xl flex items-center gap-4 shadow-sm min-w-[160px]">
              <div className="text-right">
                <p className="text-[10px] font-black uppercase tracking-widest text-black/30">Progres</p>
                <p className="text-xl font-black text-apple-blue">{progress}%</p>
              </div>
              <div className="w-12 h-12 relative flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 48 48">
                  {/* Track Circle */}
                  <circle 
                    cx="24" cy="24" r="20" 
                    fill="transparent" 
                    stroke="currentColor" 
                    strokeWidth="4"
                    className="text-black/[0.05]"
                  />
                  {/* Progress Circle */}
                  <circle 
                    cx="24" cy="24" r="20" 
                    fill="transparent" 
                    stroke="currentColor" 
                    strokeWidth="4"
                    strokeLinecap="round"
                    className="text-apple-blue"
                    strokeDasharray={126}
                    strokeDashoffset={126 - (126 * progress) / 100}
                    style={{ transition: 'stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1)' }}
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* EXERCISES LIST */}
        <div className="flex flex-col gap-4">
          {exercises.map((ex, i) => (
            <div 
              key={ex.id}
              onClick={() => toggleComplete(ex.id)}
              className={`apple-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 group cursor-pointer transition-all duration-300 ${
                completedExercises.has(ex.id) ? 'bg-emerald-500/5 border-emerald-500/20' : ''
              }`}
            >
              <div className="flex items-center gap-6">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                  completedExercises.has(ex.id) ? 'bg-emerald-500 text-white' : 'bg-black/5 text-black/20'
                }`}>
                  {completedExercises.has(ex.id) ? <CheckCircle2 size={24} /> : <span className="font-black text-lg">{i + 1}</span>}
                </div>
                
                <div>
                  <h3 className={`text-xl font-bold tracking-tight transition-colors ${
                    completedExercises.has(ex.id) ? 'text-emerald-700 opacity-50' : ''
                  }`}>
                    {ex.name}
                  </h3>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-black/30">
                      <ChevronRight size={10} className="text-apple-blue" /> {ex.sets} SETS
                    </span>
                    <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-black/30">
                       <ChevronRight size={10} className="text-apple-blue" /> {ex.reps} REPS
                    </span>
                    {ex.rest_time && (
                      <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-black/30">
                        <Clock size={10} className="text-apple-blue" /> {ex.rest_time} REST
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end md:self-center">
                 <button className="w-10 h-10 rounded-full bg-black/[0.03] flex items-center justify-center text-black/20 hover:bg-black/10 hover:text-black transition-all">
                   <Info size={16} />
                 </button>
                 {completedExercises.has(ex.id) ? (
                   <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 px-4 py-2 bg-emerald-100 rounded-full">Finalizat</span>
                 ) : (
                   <button className="btn-primary py-2.5 px-6 text-[10px] uppercase font-black tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Bifează</button>
                 )}
              </div>
            </div>
          ))}
        </div>
        
        {/* SESSION FOOTER */}
        {progress === 100 && (
          <div className="mt-12 text-center animate-in zoom-in duration-500">
             <div className="inline-block p-12 bg-white rounded-[40px] shadow-2xl shadow-emerald-500/10 border border-emerald-500/10">
                <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center text-white mx-auto mb-6 shadow-xl shadow-emerald-500/30">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-3xl font-black tracking-tighter mb-2">Bravo, Elite!</h3>
                <p className="text-black/40 font-medium mb-8">Ai completat sesiunea de antrenatment de astăzi.</p>
                <button 
                  onClick={() => navigate('/training')}
                  className="btn-primary w-full py-4 uppercase font-black tracking-widest text-xs"
                >
                  Încheie Antrenamentul
                </button>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};
