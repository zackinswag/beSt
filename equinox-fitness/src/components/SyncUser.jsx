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
        
        // Verificăm dacă utilizatorul există deja
        const { data, error: fetchError } = await supabase
          .from('users')
          .select('clerk_id')
          .eq('clerk_id', user.id)
          .single();

        // Dacă avem o eroare de tip "nu s-a găsit niciun rând", inserăm utilizatorul.
        // Asta pentru că nu i-am dat Update policy, deci nu putem folosi upsert() la sigur.
        if (fetchError && fetchError.code === 'PGRST116') {
          const { error: insertError } = await supabase
            .from('users')
            .insert({ clerk_id: user.id });
            
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
