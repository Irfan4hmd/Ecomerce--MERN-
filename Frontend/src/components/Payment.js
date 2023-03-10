import axios from 'axios'
import React from 'react'
import { useState,useEffect } from 'react'
import StripeCheckout from 'react-stripe-checkout'
import { loadStripe } from '@stripe/stripe-js';
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51JlZDpSI6KymPWWBelIm14dnNbNqRsE9NOPMrIO0VR5pPiLPg7p636ZS75fAnOxFYmYk4FLQqr0AGQHvZId9BezT004V8Wp7Qd');
const Payment = () => {
    const [product,setProduct]=useState({
        name:"Achaar",
        price:10,
        productBy:"Chicha"
    })
    const handleClick = async (event) => {
      // When the customer clicks on the button, redirect them to Checkout.
      const body={
        
        amount: 1000
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const {data}= await axios.post('/api/v1/payment1',body,config)
      if(data.success){
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        lineItems: [{
          price: data.price.id, // Replace with the ID of your price
          quantity: 1,
        }],
        mode: 'payment',
        successUrl: 'https://example.com/success',
        cancelUrl: 'https://example.com/cancel',
      });
    }
    }
    const makePayment= async(token)=>{
      
       
        console.log(token)
        try {
          const body={
            token,
            product
          }
          const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
          const res = await axios.post('/api/v1/payment',
           body
          ,config)
          console.log(res.data)
        } catch (error) {
          console.log(error)
        }
      
    
        
    }
  
    
  return (
    <div>
       <button role="link" onClick={handleClick}>
      Checkout
    </button>
       
    </div>
  )
}

export default Payment