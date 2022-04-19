import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../../config';
import './signUp.css';

export default function SignUp() {
  const [username, setUsername] = useState(""); 
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [error, setError]=useState(false);
  const allInputFilled = (username!="") && (email!="") && (password!="")

const handleSubmit = async (e)=>{
  e.preventDefault();
  setError(false);
  try {
    const res = await axiosInstance.post("/authentication/signUp",{
      username,
      email,
      password
    });
    res.data && window.location.replace("/login"); 
  } catch (err) {
    console.log(err);
    setError(true);
  }
  // console.log(res);
  setUsername("");
  setEmail("");
  setPassword("");
}

  return (
    <div className='signUp'>
        <span className="signUp-title">Sign up</span>
     <form className="signUp-from" onSubmit={handleSubmit}>
       <label>Username</label>
       <input className='signUp-fromInputs' type="text" placeholder='Enter your username'
       value={username}
       onChange={(e)=>setUsername(e.target.value)}
       />
       <label>Email</label>
       <input className='signUp-fromInputs' type="text" placeholder='Enter your Email'
       value={email}
       onChange={(e)=>setEmail(e.target.value)}
       />
       <label>Password</label>
       <input className='signUp-fromInputs' type="password" placeholder='Enter your password'
       value={password}
       onChange={(e)=>setPassword(e.target.value)}
       />
       <button className="signUp-button" type='submit' disabled={!allInputFilled}>Sign up</button>
     </form>
     <button className="login-btn"><Link className='link' to="/login">Log In</Link></button>
     {error && <span style={{color : "red", marginTop : "10px"}}>Some Thing went wrong, May be user already exists. </span>}
    </div>
  )
}
