import React from 'react'
import { useContext, useState, useEffect } from 'react';
import { db } from '../firebase'
import { collection, addDoc, getDocs, getDoc,} from "firebase/firestore"
import { onSnapshot } from 'firebase/firestore';
import { loadStripe } from '@stripe/stripe-js';
import { useAuthState } from 'react-firebase-hooks/auth';
import {auth} from '../firebase'
import Signup from './Signup';
import Login from './Login';
import { getFunctions, httpsCallable } from "firebase/functions";
import { fireFunction } from '../firebase';
import Spinner from './Spinner';


function SubButton({plan='paid',text='Subscribe', send='checkOut' , style} ) {
    const [loading, setLoading] = useState(false);
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
            // console.log(products)
            // console.log(sProducts)
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
            setLoading(true)
            // console.log(priceId)
            console.log('check out should start')
            const docRef = await addDoc(collection(db, "customers", user.uid, "checkout_sessions"), {
            price: priceId,
            success_url: 'https://celerity-ai.com/',
            cancel_url: 'https://celerity-ai.com/',
            });


            onSnapshot(docRef, async (snap) => {
            const { error, sessionId } = snap.data();
                if (error) {
                    alert(error.message);
                    console.log('eroor'+error)
                    setLoading(false);
                }
                if(sessionId){
                    console.log('sesstion id true 1')
                    const stripe = await loadStripe("pk_live_51LdzdtHtWj5EzN1VKRGp7c7KdswVvwGPYZ7qOVd6Zsh764y6ZoebRUXR4Hhx2lU8cnuaGruYJZtg4Ny77cM5dPxW00nIF93bAN")
                    setLoading(false);
                    stripe.redirectToCheckout({ sessionId: sessionId });
                    console.log('sesstion id true')
                }
                // console.log('it seems to have worked?')
            })
        }
        catch (error) {
            console.error("Error creating checkout session:", error);
            setLoading(false);
        }
    }
    const customerPortal = async () => {
        setLoading(true)
        const functions = fireFunction;
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

    const handleSubscribe = () =>{
        
        console.log(send)
        if(send==='toPortal'){
            console.log('send to portal')
            customerPortal()
            .catch((error) => {
                console.log(error)
            }).finally(() => setLoading(false))
        }
        else if(user){
            console.log('should ehck out')
            if(plan === 'paid'){
            checkOut('price_1NDZxoHtWj5EzN1VuF0nzK3c').catch((er)=>{console.log(er)})
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
            <button style={style} className=" logButton rounded bg-orange-600 p-3 text-black " onClick={() => handleSubscribe()}>{text} </button>
            {loading ?  <Spinner/> :''}
           
          
            
           
        </>
  )
}

export default SubButton