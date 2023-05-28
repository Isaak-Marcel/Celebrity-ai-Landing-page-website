import React from 'react'
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { db } from '../firebase'
import { collection, addDoc, getDocs, getDoc,} from "firebase/firestore"
import { onSnapshot } from 'firebase/firestore';
import { loadStripe } from '@stripe/stripe-js';
import { useAuthState } from 'react-firebase-hooks/auth';
import {auth} from '../firebase'
import Signup from './Signup';
import Login from './Login';


function SubButton({plan,text='Subscribe'}) {
     const [user, setUser] = useAuthState(auth)  
    const [sProducts, setProducts] = useState([])

    const [showLogin, setShowLogin] = useState(false)
    const [showSignup, setShowsignup] = useState(false)
    


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

    const handleSubscribe = () =>{
        if(user){
            console.log('should ehck out')
            if(plan === 'paid'){
            checkOut('price_1NBkNQHtWj5EzN1VENuw7VIl') // paid plan id 
            }else if(plan === 'free'){
                console.log('checkOut free plan')
            }

        }else{
            console.log('show signUp true')
            setShowsignup(true)
            
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
        <> { (showSignup || showLogin) && <div className={`flex z-10 justify-center top-0 items-center fixed w-screen h-screen right-0 ${showSignup || showLogin ? 'blur-background' : ''}`}>
                        {showLogin && <Login close={close} />}
                        {showSignup && <Signup close={close} />}
         </div>  }
            <button className="logButton bg-orange-600 rounded p-3 " onClick={() => handleSubscribe()}>{text} </button>
        </>
  )
}

export default SubButton