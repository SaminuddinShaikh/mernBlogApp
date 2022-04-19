import React, { useEffect, useState } from 'react';
import Header from '../../components/header/Header';
import Posts from '../../components/posts/Posts';
import Sidebar from '../../components/sidebar/Sidebar';
import './home.css';
import { useLocation } from 'react-router-dom';
import { axiosInstance } from '../../config';

export default function Home() {
  const [posts, setPosts] = useState([]);
  // const location = useLocation();
  // console.log(location);
  const {search} = useLocation();

  useEffect(()=>{
    const fetchPosts = async ()=>{
      const response = await axiosInstance.get("/post" + search);  //search query in home page posts eg username ot categories
      // console.log(response);
      setPosts(response.data)
    } 
    fetchPosts();
  },[search]);
  

  return (
    <>
      <Header/>
    <div className='home'>
      <Posts posts={posts}/>
      <Sidebar />
    </div>
    </>
  )
}
