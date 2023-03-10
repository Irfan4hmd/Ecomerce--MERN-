import React,{Fragment} from 'react'
import {Link} from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import '../App.css';
import Navbar from "./Navbar"
import Search from './Search';
import { LoadUser, logout } from '../actions/UsreAction';
import { useEffect } from 'react';
import axios from 'axios';
import { Cartget } from '../actions/CartAction';
import store from '../store';
const Header = () => {
  const alert= useAlert();
  const disptach=useDispatch();
  const {user,loading}= useSelector(state=> state.auth)
  const {cart}= useSelector(state=> state.cart)
  const logoutHandler=()=>{
    disptach(logout());
    alert.success('Logged out successfully')
  }
useEffect(() => {
  disptach(LoadUser())
  disptach(Cartget())
}, [])

  
    return (
        <Fragment>

        <div className="Header">
          
             <nav className="navbar row" >
      
      <div className="" >
        <Link to='/cart' aria-disabled={user&&cart?true:false} style={{textDecoration:'none',float:"right",paddingTop:"7px"}}>
        <i className="fa fa-shopping-cart" style={{fontSize:"23px",color:"black"}} aria-hidden="true"></i>
    
        <span className="ml-2" id="cart_count">{cart?cart.length:0}</span>
        </Link>
        {user?(
          <div className="ml-4 dropright d-inline"  >
            
            
      
    
            <figure className='avatar avatar-nav'>
              <img src={user.avatar && user.avatar.url} alt={user && user.name}
              className='rounded-circle'
              />
            </figure>
           
            <span >{user&& user.name}</span>
            <Link to='#' className='btn dropdown-toggle'  type='button' id='dropDownMenuButton' data-bs-toggle="dropdown"  aria-haspopup='true' aria-expanded='false'>
            
            </Link>
            <div className="dropdown-menu" aria-labelledby='dropDownMenuButton'>
              {
                user&&user.role==='admin'?(
                  <Link className='dropdown-item ' to='/dashboard'>
               Dashboard
              </Link>
                  
                ):
                <Link className='dropdown-item ' to='/order'>
              Orders
            </Link>
              }
              <Link className='dropdown-item ' to='/userProfile'>
              Profile
            </Link>
            <Link className='dropdown-item ' to='/myOrders'>
              My Orders
            </Link>
            <Link className='dropdown-item text-danger' onClick={logoutHandler} to='#'>
              Logout
            </Link>
            
            </div>
          </div>

        ):<Link className="btn" to='/login' id="login_btn">Login</Link>
        }
        

        
      </div>
    </nav>
        
        <Navbar/>
        </div>
        </Fragment>
    )
}

export default Header
