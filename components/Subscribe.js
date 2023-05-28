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




function Subscribe() {
    const [user, setUser] = useAuthState(auth)  

    const [showLogin, setShowLogin] = useState(false)
    const [showSignup, setShowsignup] = useState(false)
    const { currentUser } = useContext(AuthContext);
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

    
    
   const handleSubscribe = (g) =>{
        if(user){
            checkOut(g)
        }else{
            console.log('show signUp true')
            setShowsignup(true)
            
        }
   }
   const hLogin = ()=>{
        if(user) {
        }else{
            console.log('fwafwa')
        setShowLogin(true)
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
        
    
    <div className='container p-8 mx-auto xl:px-0 mb-20 lg:gap-10 flex justify-center '>
        
        <div className=' bg-my-orange rounded-lg w-5/12 flex-col justify-center items-center ' >   
          
                    <h1 className='text-2xl font-bold text-center pt-5'>Subscribe</h1>
                    <div className='p-4 flex-col items-center flex'> 
                        <div>
                        <h1 className=''>All features For 9$ a Month{/* user && user.email*/}  </h1>
                        <ul className='max-w-md space-y-1 text'>
                            <li className='flex items-center'> <svg class="w-8 h-8 mr-1 text-orange-500 dark:text-aaaaa-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                                Imporve Text </li>
                            <li className='flex items-center'> <svg class="w-8 h-8 mr-1 text-orange-500 dark:text-orange-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                                Fix Spelling </li>
                            <li className='flex items-center'> <svg class="w-8 h-8 mr-1 text-orange-500 dark:text-orange-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                                Contiune Text </li>
                            <li className='flex items-center'> <svg class="w-8 h-8 mr-1 text-orange-500 dark:text-orange-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                                Find synonyms and best fits </li>
                        </ul>
                        </div>
                    </div>
                    <div className='pb-20 flex '>
                        {currentUser && <span >Welcome, {currentUser.email}!</span>} 
                        {Object.entries(sProducts).map(([productId, productData])=>{
                            console.log(productData.prices.priceId)
                            return (
                                <div className="outline-teal-100 mr-auto ml-auto flex flex-col" key={productId}>
                                    <div className=' pb-4'>{productData.name} - {productData.description}</div>
                                    <button className="logButton bg-orange-600 rounded p-3 " onClick={() => handleSubscribe(productData.prices.priceId)}>Subscribe for 9dollar/month</button>
                                </div>
                            )
                        })}                       
                    </div>  
            </div>
    </div>
    
    </>
  )
}

export default Subscribe