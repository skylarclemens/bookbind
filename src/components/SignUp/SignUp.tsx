import style from './signup.module.css';
import React, { useState } from 'react';
import { supabase } from '../../supabaseClient';

const SignUp = ({ setAuthType }: { setAuthType: React.Dispatch<React.SetStateAction<"login" | "signUp">> }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [displayName, setDisplayName] = useState<string>('');
  const [username, setUsername] = useState<string>('');

  const [message, setMessage] = useState<string>('');

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            username: username,
            display_name: displayName
          }
        }
      });

      if (error) throw error;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setMessage(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={style.container}>
      <form className={style.formContainer} onSubmit={handleSignUp}>
        <div className={style.inputContainer}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          className={style.input}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        </div>
        <div className={style.inputContainer}>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          className={style.input}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        </div>
        <div className={style.inputContainer}>
        <label htmlFor="email">Username</label>
        <input
          id="username"
          className={style.input}
          type="text"
          placeholder="@"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        </div>
        <div className={style.inputContainer}>
        <label htmlFor="display-name">Display name</label>
        <input
          id="display-name"
          className={style.input}
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
        </div>
        <button disabled={loading} type="submit">{loading ? 'Loading...' : 'Sign up'}</button>
      </form>
      <span>Already have an account? <button onClick={() => setAuthType("login")}>Sign in</button></span>
      <span>{message}</span>
    </div>
  )
}

export default SignUp;