import React from 'react';
import Auth from './user-auth';
import { useReducer } from 'react';

const Login = () => {
    const auth =Auth();
    
    return (
        <div>
            <h1>hi this is log</h1>
           { auth.user ?<button onClick={auth.signOut}> sign out</button> :
           <button onClick={auth.signInWithGoogle}>sign in please</button>}
        </div>
    );
};

export default Login;