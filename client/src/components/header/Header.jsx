import React from 'react';
import './header.css';

export default function Header() {
  return (
    <div className='header'>
      <div className="header-titles">
        <span className='header-titleSm'>Hello World & Code</span>
        <span className='header-titleLg'>Blog</span>
      </div>
      <img src="/images/headerImg.jpg" alt="header background" className="header-img" />
    </div>
  )
}
