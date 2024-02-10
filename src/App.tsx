import { useEffect } from 'react';
import style from './app.module.css';
import Auth from './pages/Auth';
import { supabase } from './supabaseClient'
import { useState } from 'react';
import { useUserStore } from './data/useStore';
import { Session } from '@supabase/supabase-js';
import { Outlet } from 'react-router-dom';
import Nav from './components/Nav/Nav';

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const setUser = useUserStore((state) => state.setUser);
  const removeUser = useUserStore((state) => state.removeUser);

  useEffect(() => {
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
