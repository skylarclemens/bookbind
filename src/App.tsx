import { useEffect } from 'react';
import style from './app.module.css';
import Auth from './pages/Auth';
import { supabase } from './supabaseClient'
import { useState } from 'react';
import { useUserStore } from './data/useStore';
import { Session, User } from '@supabase/supabase-js';
import { Outlet } from 'react-router-dom';
import Nav from './components/Nav/Nav';

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const removeUser = useUserStore((state) => state.removeUser);

  useEffect(() => {
    const checkUser = async () => {
      if (user) return;
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.error(error);
        return;
      }

      setUser(data.user as User);
    }

    checkUser();

    supabase.auth.getSession().then(({ data: { session }}) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (_event === "SIGNED_IN" && session) setUser(session.user);
      if (_event === "SIGNED_OUT") removeUser();
    });

    return () => subscription.unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!session) {
    return <Auth />
  } else  {
    return (
      <div className={style.container}>
        <Nav />
        <Outlet />
      </div>
    )
  }
}

export default App
