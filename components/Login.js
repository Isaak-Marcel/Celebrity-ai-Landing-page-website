import React, { useState } from 'react'
import {signInWithEmailAndPassword   } from 'firebase/auth';
import {auth} from '../firebase'

function Login({close}) {
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
            // const errorCode = error.code;
            // const errorMessage = error.message;
        })

    }
 
return (
    <div className='flex fixed justify-center items-center left-2/4 top-1/4'>
      <div className=' '> 
          <h2 className='text-lg font-bold'>Login</h2>      
          <form className='flex flex-col'>
            <input className='mb-6 bg-slate-300'  type='email' placeholder="Email" onChange={(e)=> setloginUser( {...loginUser, email: e.target.value} )}/>
            <input type='password' placeholder="Password" onChange={(e)=> setloginUser( {...loginUser, password: e.target.value})}/>
            <button onClick={(e)=>submitSignIn(e)}>Login</button>
          </form>
          <div style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column', alignItems: 'center'}} >
            <button >Don't have an account, Sign Up?</button>
            <button onClick={()=>close()} >Close</button>   
          </div> 
        </div>
    </div>
  ) 
}

export default Login