import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../../config';
import { Context } from '../../context/Context';
import './login.css';

export default function Login() {
  
  const [username, setUsername]=useState("");
  const [password, setPassword] = useState("");
  const [failed, setFailed]= useState(false);
  const {user, dispatch, isFetching} = useContext(Context);
  const allInputFilled = (username!="") && (password!="")

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({type:"LOGIN_START"});
    try {
      const res = await axiosInstance.post("/authentication/login",{
        username:username,
        password:password
      });
      dispatch({type:"LOGIN_SUCCESS", payload: res.data});
    } catch (err) {
      dispatch({type:"LOGIN_FAILURE"});
      setFailed(true);
    }
  };


  return (
    <div className='login'>
        <span className="login-title">Login</span>
     <form className="login-from" onSubmit={handleSubmit}>
       <label>Username</label>
       <input className='login-fromInputs' type="text" placeholder='Enter your username...' onChange={(e)=>setUsername(e.target.value)}/>
       <label>Password</label>
       <input className='login-fromInputs' type="password" placeholder='Enter your password' onChange={(e)=>setPassword(e.target.value)}  />
       <button className="login-button" type="submit" disabled={isFetching || !allInputFilled}>Login</button>  {/*disabled is if iffecthing*/}
     </form>
       {failed && <span style={{color:"tomato", textAlign:"center",margin:"10px"}}>Invalid username or password!</span>}
     <button className="signUp-btn"><Link className='link' to="/signUp">Sign Up</Link></button>
    </div>
  )
}
