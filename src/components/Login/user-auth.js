import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebase.config";
import { useState } from "react";


firebase.initializeApp(firebaseConfig);
 const Auth=() =>{
    const [user , setUser]=useState(null)
    const signInWithGoogle=()=>{
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
        .then(res=>{
            const {displayName , email , photoURl}=res.user
            const signInUser ={name:displayName , email ,photo:photoURl}
            setUser(signInUser);
            return res.use;
            
        })
        .catch(err=>{
            console.log(err)
            setUser(null);
            return err.message;
        })
    }
    const signOut=()=>{
        firebase.auth().signOut().then(function() {
         setUser(null);
        }).catch(function(error) {
          // An error happened.
        });
    }
    
    return{
        user,
        signInWithGoogle,
        signOut
        

    }

 }

 export default Auth;

