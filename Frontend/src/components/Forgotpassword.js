import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { Modal,Button } from 'react-bootstrap'

const Forgotpassword = () => {
    const[email,setEmail]=useState('')
    const[resettoken,setResettoken]=useState('')
    const [passwordbd,setPasswordbd]=useState({
        password:"",
        confirmpassword:""
    })
    const {password,confirmpassword}=passwordbd
    const[succ,setSucc]=useState(false)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (e) => {
        e.preventDefault()
        
        setShow(true);
    
    }
    const onchange=(e)=>{
        setEmail(e.target.value)
    }
    const HandleChange=(e)=>{
        if(e.target.name==="resettoken"){
            setResettoken(e.target.value)
        }
        else{
        setPasswordbd({...passwordbd,[e.target.name]:e.target.value})
        }
    }
    const SubmitHandler=async(e)=>{
        e.preventDefault();
      try{  
          
          const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
          const body={
              email: email
          }
        const {data}= await axios.post('/api/v1/password/forget',body,config)
        setSucc(data.success)
       setShow(data.success)
        console.log(data)
      }catch(err){
          console.log(err)
    }
    }
    const submitHandler1=async(e)=>{
        e.preventDefault();
        try{  
          
            const config = {
              headers: {
                "Content-Type": "application/json",
              },
            };
            const body={
                password,
                confirmpassword
            }
          const {data}= await axios.put(`/api/v1/password/reset/${resettoken}`,body,config)
          console.log(data)
        }catch(err){
            console.log(err)
      }
    }
  
  return (
    <div className="container-container-fluid">
    <div className="row wrapper">
            <div className="col-10 col-lg-5">
                <form className="shadow-lg" onSubmit={SubmitHandler} >
                    <h1 className="mb-3">Forgot Password</h1>
                    <div className="form-group">
                        <label for="email_field">Enter Email</label>
                        <input
                            type="email"
                            id="email_field"
                            name='email'
                            className="form-control"
                            onChange={onchange}
                            value={email}
                        />
                    </div>

                    <button
                        id="forgot_password_button"
                        type="submit"
                        disabled={succ}
                       
                        className="btn btn-block py-3"
                        >
                        
                        Send Email
                </button>

                </form>
              

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="container-container-fluid">
            
            
		<div className="row wrapper">
            <div className="col-10 col-lg-15">
                <form className="shadow-lg"  onSubmit={submitHandler1}>
                <h3 className="mb-3">Enter The Reset Token</h3>
                <input type="text" onChange={HandleChange} className="form-control" value={resettoken} name="resettoken" id="dcn" />
                    <h1 className="mb-3" >New Password</h1>

                    <div className="form-group">
                        <label for="password_field">Password</label>
                        <input
                            type="password"
                            id="password_field"
                            className="form-control"
                            name="password"
                            value={password}
                            onChange={HandleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label for="confirm_password_field">Confirm Password</label>
                        <input
                            type="password"
                            id="confirm_password_field"
                            className="form-control"
                            name='confirmpassword'
                            value={confirmpassword}
                            onChange={HandleChange}
                        />
                    </div>
                    <button
                        id="new_password_button"
                        type="submit"
                        className="btn btn-block py-3">
                        Set Password
                    </button>
                    </form>
                    </div>
                    </div>
</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          
        </Modal.Footer>
      </Modal>
            </div>
        </div>
    
</div>
  )
}

export default Forgotpassword