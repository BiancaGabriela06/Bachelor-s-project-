import React, { useState } from "react";
import axios from 'axios'
import Navbar from "../Components/Navbar"
import {NavLink} from 'react-router-dom'

const ForgotPassword = () => {
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [error, setError] = useState("");
    const handleEmail = (e) => {setEmail(e.target.value)}

    const handleReset = (e) => {
      e.preventDefault();
      
      axios.post('http://localhost:3001/auth/forgetpassword', {email})
        .then(res => {
            if(res.data.Status === 'Success'){
                setMessage(res.data.Message);
            }
            if(res.data.Status === 'ErrorEmail'){
               setMessage(res.data.Message);
            }
            else{
                
                setError(res.data.Error)
            }
        })
        .catch(err => console.log(err))
    }
    return (
        <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="card text-center" style={{ width: '300px' }}>
        <div className="card-header h5 text-white bg-primary">Password Reset</div>
        <div className="card-body px-4">
          <p className="card-text py-2">
            Enter your email address, and we'll send you an email with instructions to reset your password.
          </p>
          <form>
            {message && message}
            {error && error}
            <div className="form-group">
              <label htmlFor="typeEmail">Email address</label>
              <input type="email" id="typeEmail" className="form-control" 
               onChange={handleEmail}/>
            </div>
            <button type="submit" className="btn btn-primary w-100 mt-3" 
             onClick={handleReset}>
              Reset Password
            </button>
          </form>
          <div className="d-flex justify-content-between mt-4">
               <span className="link-danger" ><NavLink to ="/login" className="register"> Login</NavLink></span>
               <span className="link-danger" ><NavLink to ="/register" className="register"> Register</NavLink></span>
          </div>
        </div>
      </div>
    </div>

);
}

export default ForgotPassword;