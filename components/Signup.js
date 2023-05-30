import React from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import { useEffect, useState } from 'react';

function Signup({close}) {
  

  
    const [newUser,setNewUser] = useState({
        email: '',
        password: ''
    })
    const submitSignUp = (e)=>{
      e.preventDefault()
      
      console.log('Made Account')
        
        createUserWithEmailAndPassword(auth, newUser.email, newUser.password)
        .then((userCredential) =>{
            // const user = userCredential.user
            close()
            console.log('success sign up')
        })
        .catch((error) =>{
           // const errorCode = error.code;
           // const errorMessage = error.message;
        })

    }
  return (
    <div className='popup'>
      <h2>Sign Up</h2>
      <form>
        <input type='email' placeholder="Email" onChange={(e) => setNewUser({...newUser, email: e.target.value})} />
        <input type='password' placeholder="Password" onChange={(e) => setNewUser({...newUser, password: e.target.value})} />
        <button className='w-full p-2 mt-4 text-white bg-orange-500 rounded-md hover:bg-orange-600 ;' onClick={(e) => submitSignUp(e)}>Sign Up</button>
      </form>
      <div className='buttons-under'>
        <button onClick={()=>{console.log('daw'); close('login')}}>Have an account? Login</button>
        <button className='close-button' onClick={() => close()}>Close</button>
      </div>
    </div>
  )
}

export default Signup