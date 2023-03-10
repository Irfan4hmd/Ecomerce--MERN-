import React,{Fragment, useEffect,useState} from 'react'
import { useAlert } from 'react-alert';
import Loader from './Loader'
import MetaData from './MetaData';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux'

import { login,clearErrors } from '../actions/UsreAction';
const Login = () => {
    const disptach=useDispatch();
    const history=useHistory();
    const alert=useAlert();
    const [email,setEmail]=useState('');
    const [password,setPassword]= useState('')
    const {loading ,isAuthenticated,error} =useSelector(state=> state.auth);
    useEffect(() => {
       
      if(isAuthenticated){
        history.push('/')
    }

        if(error){
            alert.error(error);
            disptach(clearErrors);
        }
    }, [disptach,isAuthenticated,alert,clearErrors,error,history,loading])
    const submitHandler=async(e)=>{
        e.preventDefault();
        disptach(login(email,password))

      localStorage.setItem('email',email)
      localStorage.setItem('password',password)
    }
    return (
        <Fragment>
            {loading?<Loader/>:(
                <Fragment>
                    <MetaData title={'Login'}/>
        <div className="container container-fluid">
        <div className="row wrapper"> 
		<div className="col-10 col-lg-5">
        <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-3">Login</h1>
            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>
  
            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />
            </div>

            <Link to='/password/forgot' className="float-right mb-4">Forgot Password?</Link>
  
            <button
              id="login_button"
              type="submit"
              className="btn btn-block py-3"
            >
              LOGIN
            </button>

            <Link to="/register" className="float-right mt-7">New User?</Link>
          </form>
		  </div>
    </div>
</div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default Login
