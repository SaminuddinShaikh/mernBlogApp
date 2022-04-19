import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';
import './topbar.css'

export default function TopBar() {

  const documentFolder = "https://samindevblog.herokuapp.com/images/"
  
  const {user, dispatch} = useContext(Context);
  const handleLogout = () =>{
    dispatch({type:"LOGOUT"});
  };
  return (
    <div className='top'>
       <div className="top-left">
         <i className=" top-icon fa-brands fa-facebook-square"></i>
         <i className=" top-icon fa-brands fa-twitter-square"></i>
         <i className=" top-icon fa-brands fa-pinterest-square"></i>
         <i className=" top-icon fa-brands fa-instagram-square"></i>
         </div>
       <div className="top-center">
       <ul className="top-list">
         <li className="top-list-items"><Link className='link' to="/">HOME</Link></li>
         <li className="top-list-items"><Link className='link' to="/">ABOUT</Link></li>
         <li className="top-list-items"><Link className='link' to="/">CONTACT</Link></li>
         <li className="top-list-items"><Link className='link' to="/write">WRITE</Link></li>
         <li className="top-list-items" onClick={handleLogout}>{user && "LOGOUT"}</li>
       </ul>
       </div>
       <div className="top-right">
         {
           user ? 
           (<Link to="/settings" className='link'> {user.profilePic ? <img className="prof-image" src={documentFolder + user.profilePic} alt='avatar'/> : <p className="top-list-items">Profile</p>} </Link>) 
           : (
            <ul className="top-list">
            <li className="top-list-items"><Link className='link' to="/login">LOG IN</Link></li>
            <li className="top-list-items"><Link className='link' to="/signUp">SIGN UP</Link></li>
            </ul>
           )
         }
         {/* <i className="search-icon fa-solid fa-magnifying-glass"></i> */}
       </div>
    </div>
  )
}
