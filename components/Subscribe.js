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
            currency: 'usd',
            price: priceId,
            success_url: 'https://folketskebab.se/',
            cancel_url: 'https://folketskebab.se/',
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

    
    
   const handleSubscribe = () =>{
        if(user){
            console.log('send to stirep')
        }else{
            console.log('show login true')
            setShowsignup(true)
        }
   }
   const hLogin = ()=>{
        if(user) {
        }else{
        setShowLogin(true)
        }
    }
    const close = ()=>{
        setShowLogin(false)
        setShowsignup(false)
    }
   
    
  return (
    <div className='container p-8 mx-auto xl:px-0 flex flex-wrap mb-20 lg:gap-10 lg:flex-nowrap'>
        {showLogin && <Login close={close} />}
        {showSignup && <Signup close={close}/>}
        <div className='flex justify-evenly w-full'>
            <div className='mr-96'>
                <h1>9 dollars a month: this is your profil:{ user && user.email}  </h1>
                {currentUser && <div >Welcome, {currentUser.email}!</div>}
            </div>
            <div className=''>
                <button
                        href="https://web3templates.com/templates/nextly-landing-page-template-for-startups"
                        target="_blank"
                        
                        rel="noopener"
                        onClick={()=> handleSubscribe()}
                        className="px-8 py-4 text-lg font-medium text-center text-white bg-indigo-600 rounded-md ">Subscribe
                </button>
                <button 
                    href="https://web3templates.com/templates/nextly-landing-page-template-for-startups"
                    target="_blank"
                    rel="noopener"
                    className="px-8 py-4 text-lg font-medium text-center text-white bg-indigo-600 rounded-md ml-11 "
                    onClick={()=>hLogin()}
                    >
                    Log in
                </button>
                {Object.entries(sProducts).map(([productId, productData])=>{
                    console.log(productData.prices.priceId)
                return (
                    <div className="outline-teal-100" key={productId}>
                        <div>{productData.name} - {productData.description}</div>
                        <button className="logButton bg-lime-500 " onClick={ () => checkOut(productData.prices.priceId) }>Subscribe stirpe</button>
                    </div>
                )
                })}
            </div>
        </div>
    </div>
  )
}

export default Subscribe