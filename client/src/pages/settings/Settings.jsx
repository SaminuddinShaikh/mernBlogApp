import './settings.css';
import React, { useContext, useState } from 'react';import Sidebar from '../../components/sidebar/Sidebar';
import './settings.css';
import { Context } from '../../context/Context';
import { axiosInstance } from '../../config';

export default function Settings() {
  const {user, dispatch} = useContext(Context);
  const [file, setFile]= useState(null);
  const [username, setUsername]= useState("");
  const [email, setEmail]= useState("");
  const [password, setPassword]= useState("");
  const [success, setSuccess]= useState(false);

  const documentFolder = "https://samindevblog.herokuapp.com/images/"

  const handleSubmit = async (e)=>{
    e.preventDefault();
    dispatch({type:"UPDATE_START"});
    const updatedUser = {
      userId:user._id,
      username,
      email,
      password
    };
    if(file){
      const data = new FormData();
      const filename = Date.now() + file.name; //to prevent uploading same image with diff or same name
      data.append("name",filename);
      data.append("file",file);
      updatedUser.profilePic = filename;
      try {
        await axiosInstance.post("/upload", data) //after , data to send or to recive
      } catch (err) {
        console.log(err);
      }
      // setUsername("");
      // setEmail("");
      // setPassword("");
    }
    try {
      const res = await axiosInstance.put("/users/" + user._id, updatedUser);
      setSuccess(true);
      dispatch({type:"UPDATE_SUCCESS", payload:res.data});
      // window.location.replace("/")
    } catch (err) {
      // console.log(err);
      dispatch({type:"UPDATE_FAILURE"});
    }
  }

  const handleDelete = async () =>{
    try {
      await axiosInstance.delete(`/users/${user._id}`,{data:{userId:user._id}})
      dispatch({type:"LOGOUT"});
      window.location.replace("/");
    } catch (err) {}
  }

  const allInputFilled = (username!="") && (email!="") && (password!="")

  return (
    <div className='settings'>
      <div className="settings-wrapper">
              <div className="settings-tittle">
                <span className="settings-updateTitle">Edit Your Account</span>
                <span className="settings-deleteTitle" onClick={handleDelete}>Delete Your Account</span>
              </div>
              <form className="settings-form" onSubmit={handleSubmit}>
                  <label className='update-label'>Profile Picture</label>
                  <div className="settings-ProfPic">
                      <img src={file ? URL.createObjectURL(file) : documentFolder + user.profilePic} alt="Profile"/>
                      <label htmlFor="file-input">
                      <i className="settings-profPicIcon fa-solid fa-user-pen"></i>
                      </label>
                      <input type="file" id='file-input' style={{display:"none"}} onChange={(e)=>setFile(e.target.files[0])}/>
                  </div>
                  <label className='update-label'>New Username</label>
                  <input type="text" value={username} placeholder={`Current username: ${user.username}`} onChange={(e)=>setUsername(e.target.value)}/>
                  <label className='update-label'>New Email</label>
                  <input type="email" value={email} placeholder={`Current Email: ${user.email}`} onChange={(e)=>setEmail(e.target.value)}/>
                  <label className='update-label'>New Password</label>
                  <input type="Password" placeholder="Enter new password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                  <button className="settings-submitBtn" type='submit' disabled={!allInputFilled}>Update</button>
                  {success && <span style={{color:"green", textAlign:"center",margin:"20px"}}> Profile has been updated...</span>}
              </form>
      </div>
      <Sidebar />
    </div>
  )
}
