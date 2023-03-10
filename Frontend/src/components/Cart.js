import React from 'react'
import { useEffect,useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import axios from 'axios';
import Loader from './Loader';
import { Cartget } from '../actions/CartAction';
import { Link, useHistory } from 'react-router-dom';

const Cart = () => {
    
    const disptach=useDispatch();
    const {loading,cart}=useSelector(state=>state.cart)
    const [load,setLoad] = useState(true)
   
    useEffect(async() => {
        
        disptach(Cartget())

      
       if(!loading){
           setLoad(false)
       }
    }, [disptach])
    let tot=0;
    for(let i=0;i<cart.length;i++){
        tot=tot+((cart[i].orderItems[0].price)*(cart[i].orderItems[0].quantity))
    }
    console.log(cart)
    const deleteItem=async(id)=>{
        const { data } = await axios.delete(`/api/v1/cart/${id}`);
        if(data.success){
        const newCart = cart.filter(cartItem=> cartItem._id!=id);
        disptach({
            type: 'DEL_CART_SUCCESS',
            payload: newCart   
        })
        }
    }
    const history=useHistory();
  
  return (
      
    <div>
    {load?<Loader/>:(
     <div className="container container-fluid">
     <h2 className="mt-5">Your Cart: <b>{cart&&cart.length} items</b></h2>
    {cart&&cart.map((cart)=>(
 
<div className="container container-fluid">

    <div className="row d-flex justify-content-between">
        <div className="col-12 col-lg-8">
            <hr />
            <div className="cart-item">
                <div className="row">
                    <div className="col-4 col-lg-3">
                        <img src={cart.orderItems[0].images?cart.orderItems[0].images.url:"dck"} alt="No image" height="90" width="115"/>
                    </div>

                    <div className="col-5 col-lg-3">
                        
                    <h5 className="card-title" style={{padding:"20px"}}>
                         <Link to={`/product/${cart.orderItems[0].product}`} >{cart.orderItems[0].name}</Link>
                    </h5>
                    </div>

                   
                    <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                        <p id="card_item_price">${cart.orderItems[0].price*cart.orderItems[0].quantity}</p>
                    </div>

                    <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                        <div className="stockCounter d-inline">
                            
                            <span>
                           Quantity: {cart.orderItems[0].quantity}
                            </span>

          
                        </div>
                    </div>

                    <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                        
                        <button className='btn btn-primary btn-block' onClick={()=>deleteItem(cart._id)}>Delete</button>
                    </div>

                </div>
            </div>
            <hr />
        </div>
        </div> 
        </div>
        ))}
        <div className="col-12 col-lg-3 my-4">
            <div id="order_summary">
                <h4>Order Summary</h4>
                <hr />
                <p>Subtotal:  <span className="order-summary-values">{cart&&cart.length} (Units)</span></p>
                <p>Est. total: <span className="order-summary-values">${tot}</span></p>


                <hr />
               
                <Link to='/confirmOrder' id="checkout_btn" variant="primary"  className="btn btn-primary btn-block">Check out</Link>
                
            </div>
        </div>
    </div>
    

    )}
</div>

  )
}

export default Cart