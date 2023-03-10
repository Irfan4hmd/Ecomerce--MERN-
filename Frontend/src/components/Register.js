import React,{Fragment, useEffect,useState} from 'react'
import { useAlert } from 'react-alert';

import MetaData from './MetaData';
import { useHistory } from 'react-router-dom';

import { useDispatch,useSelector } from 'react-redux'

import { RegisterUser,clearErrors } from '../actions/UsreAction';


const Register = () => {
  const disptach=useDispatch();
  const history=useHistory();
  const alert=useAlert();
  
  const [user,setUser]=useState({
    name:'',
    email:'',
    password:''
  })
  const {name,email,password}=user
  const [avatar,setAvatar]=useState('');
  const [avatarprev,setAvatarprev]=useState('');
  const {loading ,isAuthenticated,error} =useSelector(state=> state.auth);
  useEffect(() => {
     
    if(isAuthenticated){
      history.push('/')
  }

      if(error){
          alert.error(error);
          disptach(clearErrors());
      }
  }, [disptach,isAuthenticated,alert,clearErrors(),error,history,loading])
  
  const submitHandler=(e)=>{
     e.preventDefault()
      
     const userData={name,email,password,avatar}
     console.log(userData)
      disptach(RegisterUser(userData))
  }
  const onChange=(e)=>{
    if(e.target.name==='avatar'){
      const reader=new FileReader();
      reader.onload=()=>{
        if(reader.readyState===2){
          setAvatarprev(reader.result);
          setAvatar(reader.result)

        }
      }
        reader.readAsDataURL(e.target.files[0])
      
    }else{
      setUser({...user, [e.target.name]: e.target.value })
      
    }
  }
  
    return (
        <Fragment>
          <MetaData title={'Register User'}/>
                <div className="container container-fluid">
        <div className="row wrapper">
		<div className="col-10 col-lg-5">
        <form className="shadow-lg" encType='multipart/form-data' onSubmit={submitHandler}>
            <h1 className="mb-3">Register</h1>

          <div className="form-group">
            <label htmlFor="email_field">Name</label>
            <input 
            type="name" 
            id="name_field"
            className="form-control"
            name='name'
            value={name} 
            onChange={onChange}
            />
          </div>

            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                name='email'
                value={email} 
                onChange={onChange}
              />
            </div>
  
            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                name='password'
                value={password} 
                onChange={onChange}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='avatar_upload'>Avatar</label>
              <div className='d-flex align-items-center'>
                  <div>
                      <figure className='avatar mr-3 item-rtl'>
                          <img
                              src={avatarprev}
                              className='rounded-circle'
                              alt='Avatar Preview'
                          />
                      </figure>
                  </div>
                  <div className='custom-file'>
                  <label className='custom-file-label' htmlFor='customFile'>
                          Choose Avatar
                      </label>
                      <input
                          type='file'
                          className='custom-file-input'
                          id='customFile'
                          name='avatar'
                          accept="images/*"
                          onChange={onChange}
                      />
                      
                  </div>
              </div>
          </div>
  
            <button
              id="register_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading? true: false}
            >
              REGISTER
            </button>
          </form>
		  </div>
    </div>
</div>
        </Fragment>
    )
}

export default Register
