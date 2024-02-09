import { useState } from 'react';
import style from './auth.module.css';
import SignUp from '../../components/SignUp/SignUp';
import Login from '../../components/Login/Login';

const Auth = () => {
  const [authType, setAuthType] = useState<"login" | "signUp">("login");
  return (
    <div className={style.container}>
      {authType === "login" ?
        (<Login setAuthType={setAuthType}/>) :
        (<SignUp setAuthType={setAuthType}/>)
      }
    </div>
  )
}

export default Auth;