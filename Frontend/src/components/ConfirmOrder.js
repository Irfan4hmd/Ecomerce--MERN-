import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import StripeCheckout from 'react-stripe-checkout'
import { Link, useParams } from "react-router-dom";
import Loader from "./Loader";
import { CardElement,useStripe,useElements } from "@stripe/react-stripe-js";
import { Cartget } from '../actions/CartAction';
import { LoadUser } from "../actions/UsreAction";
import { loadStripe } from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js'
import Order from "./Order";
import { useHistory } from "react-router-dom";
const stripePromise = loadStripe('pk_test_51JlZDpSI6KymPWWBelIm14dnNbNqRsE9NOPMrIO0VR5pPiLPg7p636ZS75fAnOxFYmYk4FLQqr0AGQHvZId9BezT004V8Wp7Qd');

const ConfirmOrder = () => {

  const [load, setLoad] = useState(true);
  const disptach=useDispatch();
  const {loading,cart}=useSelector(state=>state.cart)
  const {user}= useSelector(state=> state.auth)
  const [shippingInfo,setShippingInfo]=useState({
    address:"",
    city:"",
    phoneNo:"",
    postalcode:"",
    country:"",
    
})

useEffect(async () => {
  disptach(Cartget())

  
  if(!loading){
      setLoad(false)
  }
}, [disptach])
let tot=0;
for(let i=0;i<cart.length;i++){
  tot=tot+((cart[i].orderItems[0].price)*(cart[i].orderItems[0].quantity))
} 

const stripe=useStripe();
const elements= useElements();
const [clientsecret,setClientsecret]=useState(true)
const [processing,setProcessing]=useState(false)
const [succeded,setSucceded]=useState(false)

const history=useHistory();

 
useEffect(() => {
  
  let total=0;
  for(let i=0;i<cart.length;i++){
    total=total+((cart[i].orderItems[0].price)*(cart[i].orderItems[0].quantity))
  }   
  total=total+25;
  console.log(total)
const  getClientSecret =async() => {
    const response= await axios.post(`/payments/create?total=${total*100}`)
    setClientsecret(response.data.clientsecret)  
}
  getClientSecret();
 
}, [])

const {address,city,phoneNo,postalcode,country}=shippingInfo
const onsubmit=async(e)=>{
    e.preventDefault();
      setProcessing(true);
        const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
       
        const payload =await stripe.confirmCardPayment(clientsecret,{
            payment_method:{
                card: elements.getElement(CardElement)
            }
        }).then(async({paymentIntent})=>{
          let paymentstat
            if(paymentIntent.status==="succeeded"){
              paymentstat="Paid"
              }else{
              paymentstat="Not Paid"
              }
            console.log(paymentIntent);
            setSucceded(true);
            setError(null);
            setProcessing(false);
            const body={
              shippingInfo,
              paymentstat
            }
              const {data}=await axios.post('/api/v1/order/new',body,config)
              if(paymentIntent.status==="succeeded"){
                history.replace(`/orderDetails/${data.order._id}`);
                }else{
                paymentstat="Not Paid"
                }
            console.log(data)
            
        })
      
}
const onchange=(e)=>{
    setShippingInfo({...shippingInfo,[e.target.name]:e.target.value})
}
const [disabled,setDisabled]=useState(true);
const [error,setError]=useState(null);
const HandleChange=(e)=>{
    setDisabled(e.empty);
    setError(e.error?e.error.message:"");
}


 
 
  return (
    <div>
      {load ? (
        <Loader />
      ) : (
        <div className="container container-fluid">
          <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8 mt-5 order-confirm">
              
             { user? <p>
              <b>Name:</b> {user&&user.name} 
              </p>:(<p> nmkdsncxk</p>)
}
             

              <hr />
              <h4 className="mt-4">Your Cart Items:</h4>

              <hr />
              {cart.map((items) => (
                <div className="cart-item my-1">
                  <div className="row">
                    <div className="col-4 col-lg-2">
                      <img
                        src={items.orderItems[0].images ? items.orderItems[0].images.url : "dck"}
                        alt="No image"
                        height="45"
                        width="65"
                      />
                    </div>

                    <div className="col-5 col-lg-6">
                      <a href="#">{items.orderItems[0].name}</a>
                    </div>

                    <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                      <p>
                        {items.orderItems[0].quantity} x ${items.orderItems[0].price} ={" "}
                        <b>${items.orderItems[0].price * items.orderItems[0].quantity}</b>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              <hr />
            </div>

            <div className="col-12 col-lg-3 my-4">
              <div id="order_summary">
                <h4>Order Summary</h4>
                <hr />
                <p>
                  Subtotal:{" "}
                  <span className="order-summary-values">
                    ${tot}
                  </span>
                </p>
                <p>
                  Shipping: <span className="order-summary-values">$25</span>
                </p>
                <p>
                  Tax: <span className="order-summary-values">$0</span>
                </p>

                <hr />

                <p>
                  Total:{" "}
                  <span className="order-summary-values">
                    ${tot+25+0}
                  </span>
                </p>

                <hr />
            
              </div>
            </div>
          </div>
        </div>
      )}
       <div >
         <div className="row wrapper">
                <div className="col-10 col-lg-15">
                    <form className="shadow-lg" onSubmit={onsubmit} >
                        <h1 className="mb-4">Shipping Info</h1>
                        <div className="form-group" style={{margin:"25px"}}>
                            <label htmlFor="address_field">Address</label>
                            <input
                                type="text"
                                onChange={onchange}
                                id="address_field"
                                className="form-control"
                                value={address}
                                name='address'
                                required
                            />
                        </div>

                        <div className="form-group" style={{margin:"25px"}}>
                            <label htmlFor="city_field">City</label>
                            <input
                                type="text"
                                id="city_field"
                                className="form-control"
                                onChange={onchange}
                                value={city}
                                name='city'
                                required
                            />
                        </div>
                        
                        <div className="form-group" style={{margin:"25px"}}>
                            <label htmlFor="phone_field">Phone No</label>
                            <input
                                type="phone"
                                id="phone_field"
                                className="form-control"
                                onChange={onchange}
                                name='phoneNo'
                                value={phoneNo}
                                required
                            />
                        </div>

                        <div className="form-group" style={{margin:"25px"}}>
                            <label htmlFor="postal_code_field">Postal Code</label>
                            <input
                                type="number"
                                id="postal_code_field"
                                className="form-control"
                                name='postalcode'
                                value={postalcode}
                                onChange={onchange}

                                required
                            />
                        </div>

                        <div className="form-group" style={{margin:"25px"}}>
                            <label htmlFor="country_field">Country</label>
                            <input
                                id="country_field"
                                className="form-control"
                                name='country'
                                value={country}
                                onChange={onchange}
                                required
                            />
                        </div>
                        <div className="form-group" style={{flex:0.8,margin:"50px"}}>
                        <label htmlFor="country_field">Payment</label>
                            <CardElement onChange={HandleChange}/>
                        </div>
                        {error&& <div style={{color:"red"}}>{error}</div>}
                        
                        <button
                            id="shipping_btn"
                            type="submit"
                            class="btn btn-block py-3"
                            disabled={disabled||processing}
                        >
                             <span>{processing?'Proceesing':'Buy Now'}</span>
                            </button>
    
              </form>
      
			  </div>
        </div>
    </div>
    
    </div>
  );
};

export default ConfirmOrder;
