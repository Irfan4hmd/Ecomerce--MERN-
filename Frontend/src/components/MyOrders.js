import axios from 'axios'
import React from 'react'
import { useState,useEffect } from 'react'
import {Link} from 'react-router-dom'
const MyOrders =() => {
    const [orders,setOrders]=useState([])
    const [ordersCount,setOrdersCount]=useState(0)
    useEffect(async() => {
      const {data}=await axios.get('/api/v1/order/myorders');
      
      setOrders(data.orders.reverse())
      console.log(data);
      setOrdersCount(data.orderCount)
      
    }, [])
   
  return (
    <div>
            
            <div className="container container-fluid">
        <h2 className="mt-5">Your Orders: <b>{ordersCount}</b></h2>
        
        <div className="row d-flex justify-content-between">
            <div className="col-18 col-lg-10">
                <hr />
                {
                    orders.map((order)=>(

                        
                <div className="cart-item">
              
              <br />
                    <div className="row">
                    <span><h5><strong> Order Id</strong>:<small> {order._id}</small></h5> </span> 
                      
                       

                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                           <strong>Total:</strong> <p id="card_item_price">${order.totalPrice}</p>
                        </div>

                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                            <p id="card_item_price">Quantiy: {order.orderItems.length} </p>
                        </div>
                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                      <span className="my-4">Order Status:
                        <p className={order.orderStatus==="Delivered"?'greenColor':'redColor'} ><b>{order.orderStatus}</b></p>
                        </span>
                        
                        </div>
                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                            
                        <Link to={`/orderDetails/${order._id}`} className='button-28'>View Details <i className="fas fa-arrow-right"></i></Link>
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

export default MyOrders;