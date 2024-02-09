import React from 'react';
import style from './login.module.css';
import { Auth as SupabaseAuth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../../supabaseClient';

const Login = ({ setAuthType }: { setAuthType: React.Dispatch<React.SetStateAction<"login" | "signUp">> }) => {

  return (
    <div className={style.container}>
      <SupabaseAuth supabaseClient={supabase} showLinks={false} appearance={{ theme: ThemeSupa}} providers={[]} />
      <span>Need an account? <button onClick={() => setAuthType("signUp")}>Sign up</button></span>
    </div>
  )
}

export default Login;