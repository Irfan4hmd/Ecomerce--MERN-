import React from 'react'
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_51JlZDpSI6KymPWWBelIm14dnNbNqRsE9NOPMrIO0VR5pPiLPg7p636ZS75fAnOxFYmYk4FLQqr0AGQHvZId9BezT004V8Wp7Qd');

export const OrderDeaitls = () => {
    const [order,setOrder]=useState();
    const {id}=useParams();
    const {user,loading}= useSelector(state=> state.auth)
    useEffect(async() => {
      const {data}=await axios.get(`/api/v1/order/${id}`);
      setOrder(data.order)
    }, [setOrder])
    console.log(order)
    const handleClick = async (event) => {
        // When the customer clicks on the button, redirect them to Checkout.
        const body={
          
          amount: order.totalPrice*100
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
          successUrl: `${window.location.origin}/paymentStatus/success/${id}`,
          cancelUrl: `${window.location.origin}/paymentStatus/cancel/${id}`
        });
      }
      }
  return (
    <div>
        <div class="container container-fluid">
	
    <div class="row d-flex justify-content-between">
                <div class="col-12 col-lg-8 mt-5 order-details">

                    <h1 class="my-5">Order # {id}</h1>

                    <h4 class="mb-4">Shipping Info</h4>
                    <p><b>Name:</b> {user&&user.name}</p>
                    <p><b>Phone:</b> {order&&order.shippingInfo&&order.shippingInfo.phoneNo}</p>
                    <p class="mb-4"><b>Address:</b>{order&&order.shippingInfo&&order.shippingInfo.address}</p>
                    <p><b>Amount:</b> ${order&&order.totalPrice}</p>

                    <hr />

                    <h4 class="my-4">Payment</h4>
                   <p class={order&&order.paymentInfo.status==="Paid"?"greenColor":"redColor"} ><b>{order&&order.paymentInfo.status}</b></p>

                    <span className="my-4">Order Status:
                 <p className={order&&order.orderStatus==="Delivered"?'greenColor':'redColor'} ><b>{order&&order.orderStatus}</b></p>
  </span>

                    <h4 class="my-4">Order Items:</h4>

                    <hr />
                    {
                       order&&order.orderItems.map((order)=>(

                       
                    <div class="cart-item my-1">
                                <div class="row my-5">
                                    

                                    <div class="col-5 col-lg-5">
                                        <a href="#">{order.name}</a>
                                    </div>


                                    <div class="col-4 col-lg-2 mt-4 mt-lg-0">
                                        <p>${order.price}</p>
                                    </div>

                                    <div class="col-4 col-lg-3 mt-4 mt-lg-0">
                                        <p>{order.quantity} Piece(s)</p>
                                    </div>
                                </div>
                    </div>
                     ))
                    }
                    <hr />
                    {
                        order&&order.paymentInfo.status!="Paid"&&<div><button classname='review-btn' id='checkout_btn' onClick={handleClick}>Complete Payment</button></div>
                    }
                </div>
            </div>
    
</div>
    </div>
  )
}

export default OrderDeaitls;