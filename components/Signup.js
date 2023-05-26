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
    <div >
       <div className='sign-div'>
          <h2>Sign Up</h2>
          <form className='signForm'>
            <input  type='email' placeholder="Email" onChange={(e)=> setNewUser( {...newUser, email: e.target.value} )}/>
            <input  type='password' placeholder="Password" onChange={(e)=> setNewUser( {...newUser, password: e.target.value})}/>
            <button  onClick={(e) => submitSignUp(e)}>Sign Up</button>
          </form>
          <div style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column', alignItems: 'center'}} className='buttons-under'>
            <button >Have an account, Login in?</button>
            <button  className='close-button' onClick={()=>close()} >Close</button>
          </div>
        </div>
    </div>
  ) 
}

export default Signup