import axios from 'axios';
import React,{useEffect} from 'react'
import { useParams } from 'react-router-dom'

const ConfirmPayment = () => {
  const {status,id}=useParams();
  const stat=status==="success"?"Paid":"Not Paid"
  useEffect(async() => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body={
      status:stat
    }
   const {data}=await axios.put(`/api/v1/order/${id}`,body,config)
   console.log(data);
  }, [])
  
  return (
    <div>
   <h2>
   {status==="success" ? "Your Order is successfully placed":"Your payment was not successfull"}
    </h2>
    </div>
  )
}

export default ConfirmPayment