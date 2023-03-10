import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import Loader from './Loader'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Fragment } from 'react'
import { Button,Modal } from 'react-bootstrap'

const Profile = () => {
    const {user,loading}= useSelector(state=> state.auth)

    const [updateUser,setUpdateUser]=useState({
        name: user?user.name:'',
        email: user?user.email:"",
        password: ''
      })
      const [loading1,setLoading1]=useState(false)

      const {name,email,password}=updateUser
      const [avatar,setAvatar]=useState('');
      const [avatarprev,setAvatarprev]=useState(user?user.avatar&&user.avatar.url:'');
    const [show, setShow] = useState(false);
    const [shown, setShown] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCloser = () => setShown(false);
    const handleShown = () => setShown(true);
    const submitHandler=async(e)=>{
        e.preventDefault()
        
        const userData={name,email,password,avatar}
        setLoading1(true)
        try {
            
            const config = {
              headers: {
                "Content-Type": "application/json",
              },
            };
        
            const { data } = await axios.put("/api/v1/updateuser", userData, config);
        
           console.log(data)
           
               
           
           if(data.success){
               window.location.reload()
               setLoading1(false)
           }
          } catch (error) {
           console.log(error.response.data.message)
            
          }
        
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
          setUpdateUser({...updateUser, [e.target.name]: e.target.value })
          
        }
      }
  return (
    
       <Fragment>
    <div>
   { loading1||loading ? (
        <Loader />
      ) : 
         <Fragment>
             {user?(
            <div className="container container-fluid">
            
      <h2 className="mt-5 ml-5">My Profile</h2>
        <div className="row justify-content-around mt-5 user-info">
            <div className="col-12 col-md-3">
                <figure className='avatar avatar-profile'>
                    <img className="rounded-circle img-fluid" src={user.avatar&&user.avatar.url} alt='No image' />
                </figure>
                <Button variant="primary" onClick={handleShow} id="edit_profile" className="btn btn-primary btn-block my-5">
                    Edit Profile
                </Button>
                <Modal show={show} onHide={handleClose} style={{color:"black"}}>
        <Modal.Header closeButton>
          <Modal.Title><h1 className="mt-2 mb-5">Update Profile</h1></Modal.Title>
        </Modal.Header>
        <form className="shadow-lg" onSubmit={submitHandler} >
        <Modal.Body>
        <div className="container-container-fluid">
       <div className="row wrapper">
                <div className="col-18 col-lg-15">
                    
                        

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
                                    <input
                                        type='file'
                                        name='avatar'
                                        className='custom-file-input'
                                        id='customFile'
                                        onChange={onChange}
                                    />
                                    <label className='custom-file-label' htmlFor='customFile'>
                                        Choose Avatar
                                </label>
                                </div>
                            </div>
                        </div>

                        
                    
                </div>
            </div>
        
    </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" style={{marginTop: "15px"}} onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" className="btn update-btn btn-block mt-4 mb-3" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
        </form>
      </Modal>
            </div>
     
            <div className="col-12 col-md-5">
                 <h4>Full Name</h4>
                 <p>{user&&user.name}</p>
     
                 <h4>Email Address</h4>
                 <p>{user&&user.email}</p>

                 <Link to="#" className="btn btn-danger btn-block mt-5">
                    My Orders
                </Link>
            
                <Link to='PwdChange' className="btn btn-primary btn-block mt-3">
                    Change Password
                </Link>
                
            </div>
            
        </div>

    </div>
        ):!loading&&<div>
                 user not logged in
             </div>
            }
    </Fragment>
    }
    </div>
    </Fragment>
  )
}

export default Profile