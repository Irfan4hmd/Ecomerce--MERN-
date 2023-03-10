import axios from 'axios'
import React from 'react'
import { useState,useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { CardElement,useStripe,useElements } from "@stripe/react-stripe-js";

import { LoadUser } from "../actions/UsreAction";
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_51LMx3DL1YzgC3DzG6LlsBkHEgHUNPmKgrHfquiwrDIJBlvE0Hrr9St7a6l8OKJ15h4w20qTgbs7YMliIHFbGiYNx00u2sWGH7d');

const Order = () => {
    const [shippingInfo,setShippingInfo]=useState({
        address:"",
        city:"",
        phoneNo:"",
        postalcode:"",
        country:"",
        
    })
    const stripe=useStripe();
  const elements= useElements();
  const [clientsecret,setClientsecret]=useState(true)
  const [processing,setProcessing]=useState(true)
  const [succeded,setSucceded]=useState(false) 
  const history=useHistory();
    useEffect(() => {
      
    
    const  getClientSecret =async() => {
        const response= await axios.post(`/payments/create?total=${100*100}`)
        setClientsecret(response.data.clientsecret)  
    }
      getClientSecret();
     
    }, [])
    
    const {address,city,phoneNo,postalcode,country}=shippingInfo
    const onsubmit=async(e)=>{
        e.preventDefault();
       
        
            const shippinginfo={shippingInfo}
            console.log(shippinginfo)
            const config = {
                headers: {
                  "Content-Type": "application/json",
                },
              };
            const {data}=await axios.post('/api/v1/order/new',shippinginfo,config)
           
            const payload =await stripe.confirmCardPayment(clientsecret,{
                payment_method:{
                    card: elements.getElement(CardElement)
                }
            }).then(({paymentIntent})=>{
                console.log(paymentIntent);
                setSucceded(true);
                setError(null);
                setProcessing(false);
              
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
                            disabled={disabled}
                        >
                            CONTINUE
                            </button>
    
              </form>
      
			  </div>
        </div>
    </div>
  )
}

export default Order