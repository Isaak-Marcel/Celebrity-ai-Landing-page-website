import React, { useState, useEffect } from 'react'
import {auth} from '../firebase'
import Login from './Login'
import Signup from './Signup'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { db } from '../firebase'
import { collection, addDoc, getDocs, getDoc,} from "firebase/firestore"
import { onSnapshot } from 'firebase/firestore';
import { loadStripe } from '@stripe/stripe-js';
import SubButton from './SubButton';




function Subscribe() {
    const [user, setUser] = useAuthState(auth)  

    const [showLogin, setShowLogin] = useState(false)
    const [showSignup, setShowsignup] = useState(false)
    const { currentUser, subscriptionStatus } = useContext(AuthContext);
    const [sProducts, setProducts] = useState([])


    let products  = []
    useEffect(() => {
    const fetchProducts = async () => {
        try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        querySnapshot.forEach(async (doc) => {
            const data = doc.data();
            if (data) {
                products[doc.id] = data
                console.log(products);
                const priceSnapshot = await getDocs(collection(doc.ref, 'prices'))
                priceSnapshot.forEach(priceDoc=>{
                    products[doc.id].prices = {
                        priceId: priceDoc.id,
                        priceData: priceDoc.data
                    }
                })
            }
            setProducts(products)
            console.log(products)
            console.log(sProducts)
        });
        } catch (error) {
        console.error('Error fetching products:', error);
        }
    };
    fetchProducts();
    }, []);
    useEffect(() => {
        console.log(sProducts);
    }, [sProducts]);
    const checkOut = async (priceId) => {
        try {
            console.log(priceId)
            console.log('check out should start')
            const docRef = await addDoc(collection(db, "customers", user.uid, "checkout_sessions"), {
            price: priceId,
            success_url: 'https://folketskebab.se/',
            cancel_url: 'https://youtubethumbnailtester.com/',
            });


            onSnapshot(docRef, async (snap) => {
            const { error, sessionId } = snap.data();
                if (error) {
                alert(error.message);
                console.log('eroor'+error)
                }
                if(sessionId){
                    console.log('sesstion id true 1')
                    const stripe = await loadStripe("pk_test_51LdzdtHtWj5EzN1V0rBhWmxZqutL5rANYloS28yMQjljP36Yu9LzLhbEIuM3Jb2JlAkjOX9dwZC1iWoSIhV5IX3500J2sW5Uqv")
                    stripe.redirectToCheckout({ sessionId: sessionId });
                    console.log('sesstion id true')
                }
                console.log('it seems to have worked?')
            })
        }
        catch (error) {
            console.error("Error creating checkout session:", error);
        }
    }

    
    

    const close = (x)=>{
        setShowLogin(false)
        setShowsignup(false)
        if(x ==='login'){
            setShowLogin(true)
            console.log('showed show login')
        }else if(x ==='signup'){
            setShowsignup(true)
        }
    }
   
    
  return (
    <>
    { (showSignup || showLogin) && <div className={`flex z-10 justify-center top-0 items-center fixed w-full h-screen ${showSignup || showLogin ? 'blur-background' : ''}`}>
                        {showLogin && <Login close={close} />}
                        {showSignup && <Signup close={close} />}
         </div>  }
        
    
    <div id="pricing" className='container p-8 mx-auto xl:px-0 mb-20 lg:gap-10 flex justify-center '>
        
        <div style={{height: '542px'}} className='flex md:w-4/5  justify-between bg-my-orange dark:bg-orange-950 rounded-lg lg:w-5/12 flex-col items-center ' >   
          
                    <h1 className='text-4xl font-bold text-center pt-5'>Subscribe</h1>
                    <div className='p-4 flex-col items-center flex'> 
                        <div className='pb-7 xl:pr-32 xl:pl-32'>
                        <h1 className='text-center text-xl pb-10'>You get all of the Celerity-AI text enhancer Featuers For 9$ a Month{/* user && user.email*/}  </h1>
                        <ul className='max-w-md space-y-1 text'>
                            <li className='flex items-center'> <svg class="w-8 h-8 mr-1 text-orange-500  flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                                Imporve Text </li>
                            <li className='flex items-center'> <svg class="w-8 h-8 mr-1 text-orange-500  flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                                Fix Spelling </li>
                            <li className='flex items-center'> <svg class="w-8 h-8 mr-1 text-orange-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                                Contiune Text </li>
                            <li className='flex items-center'> <svg class="w-8 h-8 mr-1 text-orange-500  flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                                Find synonyms and best fits </li>
                        </ul>
                        </div>
                        <div class=" border-2 border-gray-950 p-2 rounded mb-5 dark:hover:text-orange-400 hover:hover:text-orange-800 font-semibold  transition-transform duration-500 ease-in-out hover:translate-x-1">
                            <a
                                href="https://github.com/web3templates/nextly-template/"
                                target="_blank"
                                rel="noopener"
                                className="flex items-center space-x-2 transition-colors duration-500 ease-in-out ">
                                <span className=" transition-transform duration-500 ease-in-out hover:translate-x-1"> Link to the chrome extension </span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 transition-transform duration-500 hover:text-orange-400  ease-in-out hover:translate-x-1">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg >
                            </a>
                        </div>
                        <div className="flex flex-col pb-4 w-full font-semibold">
                            {!subscriptionStatus && <SubButton style={ {width:'100%', height: '100%'}} plan={'paid'}/>}
                            {subscriptionStatus && <SubButton style={ {width:'100%', height: '100%'}} text="You are Subscibed, Manage Subscription here" send="toPortal"/>}
                       </div>
                        
                    </div>
               
            </div>
    </div>
    
    </>
  )
}

export default Subscribe