import { useEffect } from 'react';
import style from './app.module.css';
import Auth from './pages/Auth';
import { supabase } from './supabaseClient'
import { useState } from 'react';
import { useStore, useUserStore } from './data/useStore';
import { Session, User } from '@supabase/supabase-js';
import { Outlet } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import NavBottom from './components/NavBottom/NavBottom';
import { getUsersBooksData } from './services/bookService';

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const removeUser = useUserStore((state) => state.removeUser);
  const initializeBooks = useStore((state) => state.initializeBooks);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session }}) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) setUser(session.user as User);

      if (_event === "SIGNED_IN" && session) setUser(session.user);
      if (_event === "SIGNED_OUT") removeUser();
    });

    return () => subscription.unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const getUserBooks = async () => {
      const data = await getUsersBooksData();
      if (data) initializeBooks(data);
    }

    if (user) getUserBooks();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  if (!session) {
    return <Auth />
  } else  {
    return (
      <div className={style.container}>
        <Nav />
        <Outlet />
        <NavBottom />
      </div>
    )
  }
}

export default App
