import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { ChevronDown, Check, ArrowLeft, Zap } from 'lucide-react';
import { useSupabase } from '../hooks/useSupabase';
import { getSupabaseClient } from '../lib/supabase';

export const PPLProgram = () => {
  const { id, programId } = useParams();
  const navigate = useNavigate();
  const { user, isLoaded: userLoaded } = useUser();
  const getSupabase = useSupabase();
  
  const [workouts, setWorkouts] = useState([]);
  const [exercises, setExercises] = useState({});
  const [userProgress, setUserProgress] = useState({});
  const [expandedDay, setExpandedDay] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!userLoaded) return;

      try {
        console.log('Fetching PPL program:', programId);

        // Get Supabase client: either authenticated or guest
        let supabase;
        if (getSupabase) {
          supabase = await getSupabase();
        } else {
          // Guest client
          supabase = getSupabaseClient();
        }

        // Fetch workouts
        const { data: workoutData, error: workoutError } = await supabase
          .from('workouts')
          .select('*')
          .eq('program_id', programId)
          .order('day_number', { ascending: true });

        if (workoutError) throw workoutError;
        setWorkouts(workoutData || []);

        // Fetch exercises for each workout
        const exerciseMap = {};
        for (const workout of workoutData || []) {
          const { data: exData, error: exError } = await supabase
            .from('exercises')
            .select('*')
            .eq('workout_id', workout.id)
            .order('order_index', { ascending: true });

          if (!exError) {
            exerciseMap[workout.id] = exData || [];
          }
        }
        setExercises(exerciseMap);

        // Fetch user progress if logged in
        if (user?.id) {
          const { data: progressData } = await supabase
            .from('user_progress')
            .select('workout_id, completed')
            .eq('user_id', user.id);

          const progressMap = {};
          (progressData || []).forEach(p => {
            progressMap[p.workout_id] = p.completed;
          });
          setUserProgress(progressMap);
        }

        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [programId, user?.id, userLoaded, getSupabase]);

  const toggleWorkoutCompletion = async (workoutId) => {
    if (!user?.id) {
      alert('Te rugăm să te autentifici ca să îți urmărești progresul');
      return;
    }

    const isCompleted = userProgress[workoutId];
    
    try {
      const supabaseAccessToken = await user.getIdToken({ template: 'supabase' });
      const supabase = getSupabaseClient(supabaseAccessToken);

      if (isCompleted) {
        const { error } = await supabase
          .from('user_progress')
          .delete()
          .eq('user_id', user.id)
          .eq('workout_id', workoutId);
        
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('user_progress')
          .upsert({
            user_id: user.id,
            workout_id: workoutId,
            completed: true,
            completed_at: new Date().toISOString()
          });
        
        if (error) throw error;
      }

      setUserProgress(prev => ({
        ...prev,
        [workoutId]: !isCompleted
      }));
    } catch (error) {
      console.error('Error updating progress:', error);
      alert('Eroare la actualizarea progresului');
    }
  };

  if (loading) {
    return <div className="pt-44 text-center text-black/40">Se încarcă programul...</div>;
  }

  if (error) {
    return <div className="pt-44 text-center text-red-500">Eroare: {error}</div>;
  }

  if (workouts.length === 0) {
    return (
      <div className="pt-44 text-center">
        <p className="text-black/40 mb-4">Nu am găsit antrenamente pentru programul: <span className="font-mono text-black">{programId}</span></p>
        <button onClick={() => navigate(-1)} className="btn-primary">Înapoi</button>
      </div>
    );
  }

  return (
    <div className="pt-32 md:pt-44 pb-20 px-4 md:px-6 max-w-4xl mx-auto min-h-screen">
      <button 
        onClick={() => navigate(`/training/${id}`)}
        className="inline-flex items-center gap-2 text-black/40 hover:text-apple-blue mb-8 transition-colors font-black uppercase tracking-[0.2em] text-[10px]"
      >
        <ArrowLeft size={14} /> Înapoi la Specializări
      </button>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 bg-apple-blue/10 text-apple-blue px-3 py-1 rounded-full mb-3">
            <Zap size={12} fill="currentColor" />
            <span className="text-[10px] font-black uppercase tracking-widest">Forță și hipertrofie</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-2">PPL - Push/Pull/Legs</h1>
          <p className="text-black/40 font-medium tracking-tight">Săptămâna 1 - setează ritmul antrenamentului tău</p>
        </div>
        <div className="bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-white/50 shadow-sm">
          <p className="text-[9px] font-black uppercase tracking-widest text-black/30 mb-1">Status Progres</p>
          <p className="text-2xl font-black tracking-tighter">
            {Object.values(userProgress).filter(Boolean).length} / {workouts.length} Finalizate
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {workouts.map(workout => (
          <div key={workout.id} className="border border-black/5 rounded-2xl overflow-hidden bg-white/40 backdrop-blur-sm hover:bg-white/60 transition-all">
            <button
              onClick={() => setExpandedDay(expandedDay === workout.id ? null : workout.id)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-black/[0.02] transition-colors"
            >
              <div className="flex-1">
                <p className="text-[12px] font-black uppercase tracking-[0.2em] text-black/30">{`Ziua ${workout.day_number}`}</p>
                <p className="text-sm font-bold text-black/80 mt-1">{workout.name}</p>
              </div>

              <div className="flex items-center gap-2 ml-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWorkoutCompletion(workout.id);
                  }}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    userProgress[workout.id]
                      ? 'bg-apple-blue border-apple-blue'
                      : 'border-black/20 hover:border-apple-blue'
                  }`}
                >
                  {userProgress[workout.id] && <Check size={14} className="text-white" />}
                </button>
                <ChevronDown 
                  size={16} 
                  className={`text-black/30 transition-transform ${expandedDay === workout.id ? 'rotate-180' : ''}`}
                />
              </div>
            </button>

            {expandedDay === workout.id && (
              <div className="border-t border-black/5 bg-black/[0.02] p-4">
                <div className="space-y-2">
                  {exercises[workout.id]?.length > 0 ? (
                    exercises[workout.id].map((exercise, idx) => (
                      <div key={exercise.id} className="text-[13px] grid grid-cols-12 gap-3 py-2 border-b border-black/[0.03] last:border-b-0">
                        <p className="col-span-5 font-medium text-black/80">{exercise.name}</p>
                        <p className="col-span-2 text-black/50 text-center">{exercise.sets}x{exercise.reps}</p>
                        <p className="col-span-2 text-black/50 text-center">{exercise.rest_time}</p>
                        <p className="col-span-3 text-black/40 text-right text-[11px]">#{idx + 1}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-black/40 text-center py-4">Încă nu există exerciții</p>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};