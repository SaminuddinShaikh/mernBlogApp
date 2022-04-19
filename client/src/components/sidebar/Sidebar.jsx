import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { axiosInstance } from '../../config';
import './sidebar.css';

export default function Sidebar() {
  const [cats, setCats]= useState([]);

  useEffect(()=>{
    const getCats = async ()=>{
      const res = await axiosInstance.get("/categories")
      setCats(res.data)
    }
    getCats();
  },[])
  return (
    <div className='sidebar'>
      <div className="sidebar-item">
        <span className="sidebar-title">ABOUT ME</span>
        <img src="/images/sidebar-aboutMe.jpg" alt="aboutMe" />
        <p className='about-me'>I am a self-taught Software Engineer and a tech enthusiast. I'm pursuing my passion to acquire as much tech knowledge as I can and use my skills to build great software that people would love to use.</p>
      </div>
      <div className="sidebar-item">
      {/* <span className="sidebar-title">CATEGORIES</span>
      <ul className="sidebar-list">
        {cats.map((cat)=>(
          <Link className='link' to={`/?${cat.name}`}><li className="sidebar-listItem">{cat.name}</li></Link>
        ))}
      </ul> */}
      </div>
      <div className="sidebar-item">
      <span className="sidebar-title">FOLLOW US</span>
      <div className="sidebar-social">
         <i className=" sidebar-icon fa-brands fa-facebook-square"></i>
         <i className=" sidebar-icon fa-brands fa-twitter-square"></i>
         <i className=" sidebar-icon fa-brands fa-pinterest-square"></i>
         <i className=" sidebar-icon fa-brands fa-instagram-square"></i>
      </div>
      </div>
    </div>
  )
}
