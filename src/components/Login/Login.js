import React from 'react';
import Auth from './useAuth';
import { useReducer } from 'react';

const Login = () => {
    const auth =Auth();
    const handleSignIn=()=>{
        auth.signInWithGoogle()
        .then (res=>{
            window.location.pathname='/review';
        })
    }
     const handleSignOut =()=>{
        auth.signOut()
        .then (res=>{
            window.location.pathname='/';
        })
     }
    
    return (
        <div>
            <h1>hi this is log</h1>
           { auth.user ?<button onClick={handleSignOut}> sign out</button> :
           <button onClick={handleSignIn}>sign in please</button>}
        </div>
    );
};

export default Login;