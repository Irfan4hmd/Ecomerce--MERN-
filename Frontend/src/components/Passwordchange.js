import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { Alert } from 'react-bootstrap'
const Passwordchange = () => {
    const [pswd,setPswd]=useState({
        oldpassword:'',
        password:''
    })
    const {oldpassword,password}=pswd
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
const changehandler=(e)=>{
   setPswd({...pswd,[e.target.name]: e.target.value})
}
const [err, setErr] = useState('');
const submitHandler=async(e)=>{
    e.preventDefault();
   try{ const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.put(
        "/api/v1/password/updatePassword",
        pswd,
        config
      );
      console.log(data)
      setShow(data.succes)
   }catch(error){
       console.log(error.response.data.message)
       setErr(toString(error.response.data.message))
       setShow1(true)
   }
    
}
  return (
    <div>
      
           
      <Alert variant="success" show={show} onClose={()=>setShow(false)} dismissible>
        
        <p>
          Password successfully updated
        </p>
      </Alert>
            
      <Alert variant="danger" show={show1} onClose={()=>setShow1(false)} dismissible>
        
        <p>
          Password Incoorect
        </p>
      </Alert>
          <div className="container-container-fluid">
		<div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mt-2 mb-5">Update Password</h1>
                        <div className="form-group">
                        <label htmlFor="old_password_field">Old Password</label>
                            <input
                                type="password"
                                id="old_password_field"
                                name='oldpassword'
                                className="form-control"
                                value={oldpassword}
                                onChange={changehandler}
                            />
                        </div>

                        <div className="form-group">
                        <label htmlFor="new_password_field">New Password</label>
                            <input
                                type="password"
                                id="new_password_field"
                                className="form-control"
                                name='password'
                                value={password}
                                onChange={changehandler}
                            />
                        </div>

                        <button type="submit" className="btn update-btn btn-block mt-4 mb-3">Update Password</button>
                    </form>
                </div>
            </div>
        
    </div>
    </div>
  )
}

export default Passwordchange