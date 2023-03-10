import React from 'react'
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_51JlZDpSI6KymPWWBelIm14dnNbNqRsE9NOPMrIO0VR5pPiLPg7p636ZS75fAnOxFYmYk4FLQqr0AGQHvZId9BezT004V8Wp7Qd');

export const AdminOrderDets = () => {
    const [order,setOrder]=useState();
    
    const {id}=useParams();
    const {user,loading}= useSelector(state=> state.auth)
    useEffect(async() => {
      const {data}=await axios.get(`/api/v1/order/${id}`);
      setOrder(data.order)
    }, [setOrder])
    
    let status=order&&order.orderStatus
   const  [orderStat,setOrderStat]=useState("Processing");
   const submitHandler=async(e)=>{
       e.preventDefault();
       try{
       const body={
           status: orderStat
       }
    
       const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
       const {data}= await axios.put(`/api/v1/order/updateorders/${id}`,body,config)
       if(data.success){
           window.location.reload()
       }
       console.log(data);
      }catch(error){
           console.log(error.response.data.message)
       }
   }
    
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
                    <p><b>Phone:</b> 111 111 1111</p>
                    <p class="mb-4"><b>Address:</b>{order&&order.shippingInfo.address}</p>
                    <p><b>Amount:</b> ${order&&order.totalPrice}</p>

                    <hr />

                    <h4 class="my-4">Payment</h4>
                   <p class={order&&order.paymentInfo.status==="Paid"?"greenColor":"redColor"} ><b>{order&&order.paymentInfo.status}</b></p>

                    <span className="my-4">Order Status:
                 <p className={order&&order.orderStatus==="Delivered"?'greenColor':'redColor'} ><b>{order&&order.orderStatus}</b></p>
  </span>
  <form onSubmit={submitHandler} >
  <select name="orderStatus" onChange={(e)=>{
      setOrderStat(e.target.value)
      
  }}  id="djnci">
      <option value="Processing">Processing</option>
      <option value="Delivered">Delivered</option>
      
      <option value="Cancelled">Cancelled</option>
  </select>
  <button type='submit'>Change the Order Status</button>
  </form>
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
                   
                </div>
            </div>
    
</div>
    </div>
  )
}
export default AdminOrderDets;