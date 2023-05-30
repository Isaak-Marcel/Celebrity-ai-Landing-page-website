import React, { useState } from 'react'
import {signInWithEmailAndPassword   } from 'firebase/auth';
import {auth} from '../firebase'

function Login({close}) {
  const [errorMessage, setErrorMessage] = useState(''); // new state variable for error messages
  const [loginUser,setloginUser] = useState({
        email: '',
        password: ''
    })
    
    const submitSignIn = (e)=>{
      e.preventDefault()
        
        signInWithEmailAndPassword(auth, loginUser.email, loginUser.password)
        .then((userCredential) =>{
            close(close)
        })
        .catch((error) =>{
         const errorMsg = error.message;
         const cleanedErrorMsg = errorMsg.slice(errorMsg.indexOf(":") + 2, ); // slice the string to exclude unwanted parts
          setErrorMessage(cleanedErrorMsg); // update the state with the error message
            // const errorCode = error.code;
            // const errorMessage = error.message;
        })

    }
 
  return (
    <div className='popup'>
      <h2>Login</h2>
      {errorMessage && <p className=" text-red-300 text-center text-sl pl-20 pr-20 ">{errorMessage}</p>} {/* Display the error message when it exists */}
      <form className='flex flex-col'>
        <input  type='email' placeholder="Email" onChange={(e) => setloginUser({...loginUser, email: e.target.value})} />
        <input  type='password' placeholder="Password" onChange={(e) => setloginUser({...loginUser, password: e.target.value})} />
        <button className='w-full p-2 mt-4 text-white bg-orange-500 rounded-md hover:bg-orange-600' onClick={(e) => submitSignIn(e)}>Login</button>
      </form>
      <div className='buttons-under' >
        <button onClick={ () =>close('signup')}>Don't have an account? Sign Up</button>
        <button className='close-button' onClick={() => close()}>Close</button>
      </div>
    </div>
  )
}

export default Login