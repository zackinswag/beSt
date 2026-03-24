import { useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useSupabase } from '../hooks/useSupabase';

export const SyncUser = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const getSupabase = useSupabase();

  useEffect(() => {
    const sync = async () => {
      if (!isLoaded || !isSignedIn || !getSupabase) return;

      try {
        const supabase = await getSupabase();
        
        // Verificăm dacă utilizatorul există deja (și preluăm datele)
        const { data, error: fetchError } = await supabase
          .from('users')
          .select('clerk_id, subscription_tier, trial_start_date')
          .eq('clerk_id', user.id)
          .single();

        if (data) {
          console.log(`Sync: Utilizator găsit. Plan: ${data.subscription_tier}`);
        }

        // Dacă avem o eroare de tip "nu s-a găsit niciun rând", inserăm utilizatorul.
        if (fetchError && fetchError.code === 'PGRST116') {
          const { error: insertError } = await supabase
            .from('users')
            .insert({ 
              clerk_id: user.id,
              subscription_tier: 'free' // Trial-ul se calculează la runtime bazat pe trial_start_date
            });
            
          if (insertError) {
             console.error("Eroare la adăugarea utilizatorului în baza de date:", insertError);
          } else {
             console.log("Utilizator nou înregistrat cu succes în Supabase!");
          }
        }
      } catch (err) {
        console.error("Caught error during Supabase sync:", err);
      }
    };

    sync();
  }, [user, isSignedIn, isLoaded, getSupabase]);

  return null;
};
