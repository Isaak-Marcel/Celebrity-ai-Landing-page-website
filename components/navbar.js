import Link from "next/link";
import ThemeChanger from "./DarkSwitch";
import Image from "next/image"
import { Disclosure } from "@headlessui/react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth, signOut } from "firebase/auth";
import { AuthContext } from './AuthContext';
import { useContext, useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import {app} from '../firebase'
import { getFunctions, httpsCallable } from "firebase/functions";



import SubButton from "./SubButton";



const Navbar = ({ss,setSs,sl,setSl}) => {
  const [user,loading,error] = useAuthState(auth)
  const { currentUser, subscriptionStatus } = useContext(AuthContext);
  

  const customerPortal = async () => {
    const functions = getFunctions(app);
    const createPortalLink = httpsCallable(
      functions,
      "ext-firestore-stripe-payments-createPortalLink"
    );

    try {
      const { data } = await createPortalLink({
        returnUrl: window.location.origin,
        locale: "auto",
      });

      window.location.assign(data.url);
    } catch (error) {
      console.error("Error creating customer portal link:", error);
    }
  };
  
  const navigation = [
    "Product",
    // "Features",
    "Pricing",
    "Tutorial",
  ];
  console.log(`this is the user${user}`)

  const hLogOut = () =>{
    signOut(auth).then(() => {
      // Sign-out successful.
      console.log(user)
      }).catch((error) => {
      // An error happened.
      console.log(error)
    });
  }
  const close = (x)=>{
      setSl(false)
      setSs(false)
      if(x ==='login'){
          setSl(true)
      }else if(x ==='signup'){
          setSs(true)
      }
  }
  console.log(`user subspction ${subscriptionStatus}`)

  return (
    <>
    <div className="w-full fixed bg-white dark:dark:bg-trueGray-900 z-10 top-0 ">
      <nav className="container relative flex flex-wrap items-center justify-between p-4 mx-auto lg:justify-between xl:px-0">
        
        {/* Logo  */}
        <Disclosure>
          {({ open }) => (
            <>
              <div className="flex flex-wrap  items-center justify-between w-full lg:w-auto">
                <Link href="/">
                  <span className="flex items-center space-x-2 text-2xl font-medium text-black dark:text-gray-100">
                    <span>
                      <Image
                        src="/img/png only leopard fit 822x362.png"
                        alt="N"
                        width="822"
                        height="362"
                        className="w-32"
                      />
                    </span>
                    <span>Celerity-AI</span>
                  </span>
                </Link>

                <Disclosure.Button
                  aria-label="Toggle Menu"
                  className="px-2 py-1 ml-auto text-gray-500 rounded-md lg:hidden hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:text-gray-300 dark:focus:bg-trueGray-700">
                  <svg
                    className="w-6 h-6 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24">
                    {open && (
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                      />
                    )}
                    {!open && (
                      <path
                        fillRule="evenodd"
                        d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                      />
                    )}
                  </svg>
                </Disclosure.Button>

                <Disclosure.Panel className="flex flex-wrap w-full my-5 lg:hidden">
                  <>
                    {navigation.map((item, index) => (
                      <Link key={index} href="/" className="w-full px-4 py-2 -ml-4 text-gray-500 rounded-md dark:text-gray-300 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 dark:focus:bg-gray-800 focus:outline-none">
                          {item}
                      </Link>
                    ))}
                    <Link href="/" className="w-full px-6 py-2 mt-3 text-center text-white bg-indigo-600 rounded-md lg:ml-5">         
                        Get Started
                    </Link>
                    
                    
                  </>
                </Disclosure.Panel>
              </div>
            </>
          )}
        </Disclosure>

        {/* menu  */}
        <div className="hidden text-center lg:flex xlg:pl-20 .g:items-center">
          <ul className="items-center justify-end flex-1 pt-6 list-none lg:pt-0 lg:flex">
            {navigation.map((menu, index) => (
              <li className="mr-3 xl:pr-8 nav__item" key={index}>
                <Link href="/" className="inline-block px-4 py-2 text-lg font-normal text-gray-800 no-underline rounded-md dark:text-gray-200 dark:hover:text-orange-300 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:focus:bg-gray-800">
                    {menu}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-center items-center ">
          {currentUser && <h1> {`${currentUser.email} ${subscriptionStatus ? '🐆':'' }`} </h1>}
          {currentUser && 
        <button onClick={()=> customerPortal()} className=" ml-3 w-40 h-6 flex justify-center items-center dark:hover:text-orange-300 ">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
                       settings
            </button>}
                
        </div>
        <div className="hidden mr-3 space-x-4 lg:flex nav__item">
          
          {!subscriptionStatus && <SubButton plan={'paid'}/>}
          {subscriptionStatus && <SubButton text="Manage Account" send="toPortal"/>}
          <button className="    rounded pr-2 pl-2 dark:hover:text-orange-300 "
            onClick={() => {if(currentUser){hLogOut()}else{setSl(true)} }}>
             
            {currentUser &&  <h3>Log out</h3> }
            {!currentUser && <h3>Log in / Sign up</h3>}
             
            
          </button>
          

          <ThemeChanger />
        </div>
      </nav>
    </div>
    </>
  );
}




export default Navbar;
