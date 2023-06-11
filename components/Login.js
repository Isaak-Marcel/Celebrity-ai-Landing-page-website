import React, { useState } from 'react'
import {signInWithEmailAndPassword, sendPasswordResetEmail} from 'firebase/auth';
import {auth} from '../firebase'

function Login({close}) {
  const [errorMessage, setErrorMessage] = useState('');
  const [emailHasBeenSent, setEmailHasBeenSent] = useState('')
  const [loginUser,setloginUser] = useState({
        email: '',
        password: ''
    })
  const [showForgotEmail,setShowForgotEmail] = useState(false)
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false)
    
    const submitSignIn = (e)=>{
      e.preventDefault()
        setEmailHasBeenSent(false)
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
          // setShowForgotEmail(false);
          setEmailHasBeenSent(true)
          setEmailHasBeenSent(loginUser.email) // Update this line
          setErrorMessage(false)
      })
      .catch((error) => {
          const errorMsg = error.message;
          const cleanedErrorMsg = errorMsg.slice(errorMsg.indexOf(":") + 2, );
          setErrorMessage(cleanedErrorMsg);
          setEmailHasBeenSent(false)
      });
    }
    const handleClose = () =>{
      setEmailHasBeenSent('') // Update this line
      close()
    }    
 
  return (
    <div className="popup flex justify-center">
      {showForgotEmail ? (
        <div class="flex flex-col ">
          <h2 className="text-center">Reset Password</h2>
          {emailHasBeenSent && (
            <p className=" text-green-500">
              Email has been sent to {emailHasBeenSent}
            </p>
          )}
          {errorMessage && (
            <p className=" text-red-300 text-center text-sl pl-20 pr-20 ">
              {errorMessage}
            </p>
          )}
          <form className="flex flex-col">
          <div className="floating-label">
              <input
                className="floating-input"
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                type="email"
                onChange={(e) =>
                  setloginUser({ ...loginUser, email: e.target.value })
                }
           
              />
              <label
                htmlFor="email"
                className={`placeholder ${
                 loginUser.email || emailFocused ? "focused" : ""
                }`}
              >
                Email
              </label>
            </div>
            <button
              className="w-full p-2 mt-4 text-white bg-orange-500 rounded-md hover:bg-orange-600"
              onClick={sendResetEmail}
            >
              Send Reset Email
            </button>
          </form>
          <div className="buttons-under">
            <button onClick={() => setShowForgotEmail(false)}>
              Back to Login
            </button>
            <button onClick={handleClose}>close</button>
          </div>
        </div>
      ) : (
        <div class="flex flex-col popup">
          <h2 className="text-center">Login</h2>
          {errorMessage && (
            <p className=" text-red-300 text-center text-sl pl-20 pr-20 ">
              {errorMessage}
            </p>
          )}
          <form className="flex flex-col">
            <div className="floating-label">
              <input
                id="email"
                type="email"
                className="floating-input"
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                onChange={(e) =>
                  setloginUser({ ...loginUser, email: e.target.value })
                }
              />
              <label
                htmlFor="email"
                className={`placeholder ${
                  emailFocused || loginUser.email ? "focused" : ""
                }`}
              >
                Email
              </label>
            </div>

            <div className="floating-label">
              <input
                id="password"
                type="password"
                className="floating-input"
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                onChange={(e) =>
                  setloginUser({ ...loginUser, password: e.target.value })
                }
              />
              <label
                htmlFor="password"
                className={`placeholder ${
                  passwordFocused || loginUser.password ? "focused" : ""
                }`}
              >
                Password
              </label>
            </div>

            <button
              className="w-full p-2 mt-4 text-white bg-orange-500 rounded-md hover:bg-orange-600"
              onClick={(e) => submitSignIn(e)}
            >
              Login
            </button>
          </form>
          <div className="buttons-under">
            <button onClick={() => close("signup")}>
              Don't have an account? Sign Up
            </button>
            <button className="close-button" onClick={() => handleClose()}>
              Close
            </button>
            {errorMessage && (
              <button
                onClick={() => {
                  setShowForgotEmail(true);
                  setErrorMessage(false);
                  setEmailFocused(false);
                  setPasswordFocused(false)
                }}
              >
                Forgot Password?
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Login
