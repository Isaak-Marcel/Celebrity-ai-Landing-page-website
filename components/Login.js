import React, { useState } from 'react'
import {signInWithEmailAndPassword, sendPasswordResetEmail} from 'firebase/auth';
import {auth} from '../firebase'

function Login({close}) {
  const [errorMessage, setErrorMessage] = useState('');
  const [loginUser,setloginUser] = useState({
        email: '',
        password: ''
    })
  const [showForgotEmail,setShowForgotEmail] = useState(false)
    
    const submitSignIn = (e)=>{
      e.preventDefault()
        
        signInWithEmailAndPassword(auth, loginUser.email, loginUser.password)
        .then((userCredential) =>{
            close()
        })
        .catch((error) =>{
         const errorMsg = error.message;
         const cleanedErrorMsg = errorMsg.slice(errorMsg.indexOf(":") + 2, );
          setErrorMessage(cleanedErrorMsg);
  
        })
        
    }

    const sendResetEmail = (e) => {
      e.preventDefault();

      sendPasswordResetEmail(auth, loginUser.email)
      .then(() => {
          console.log("Password reset email sent.");
          setShowForgotEmail(false);
      })
      .catch((error) => {
          const errorMsg = error.message;
          const cleanedErrorMsg = errorMsg.slice(errorMsg.indexOf(":") + 2, );
          setErrorMessage(cleanedErrorMsg);
      });
    }
 
  return (
    <div className='popup flex justify-center'>
      {showForgotEmail ? (
        <div class="flex flex-col ">
          <h2 className='text-center'>Reset Password</h2>
          {errorMessage && <p className=" text-red-300 text-center text-sl pl-20 pr-20 ">{errorMessage}</p>} 
          <form className='flex flex-col'>
            <input  type='email' placeholder="Email" onChange={(e) => setloginUser({...loginUser, email: e.target.value})} />
            <button className='w-full p-2 mt-4 text-white bg-orange-500 rounded-md hover:bg-orange-600' onClick={sendResetEmail}>Send Reset Email</button>
          </form>
          <div className='buttons-under' >
            <button onClick={ () => setShowForgotEmail(false)}>Back to Login</button>
          </div>
        </div>
      ): (
      <div class="flex flex-col popup">
          <h2 className='text-center'>Login</h2>
          {errorMessage && <p className=" text-red-300 text-center text-sl pl-20 pr-20 ">{errorMessage}</p>} 
          <form className='flex flex-col'>
            <input  type='email' placeholder="Email" onChange={(e) => setloginUser({...loginUser, email: e.target.value})} />
            <input  type='password' placeholder="Password" onChange={(e) => setloginUser({...loginUser, password: e.target.value})} />
            <button className='w-full p-2 mt-4 text-white bg-orange-500 rounded-md hover:bg-orange-600' onClick={(e) => submitSignIn(e)}>Login</button>
          </form>
          <div className='buttons-under' >
            <button onClick={ () =>close('signup')}>Don't have an account? Sign Up</button>
            <button className='close-button' onClick={() => close()}>Close</button>
            <button onClick={ () => setShowForgotEmail(true)}>Forgot Password?</button>
          </div>
        </div> )
      }
    </div>
  )
}

export default Login
