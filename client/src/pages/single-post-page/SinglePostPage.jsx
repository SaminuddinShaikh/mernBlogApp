import React from 'react'
import './singlePostPage.css';
import Sidebar from '../../components/sidebar/Sidebar';
import SinglePost from '../../components/singlePost/SinglePost';

export default function SinglePostPage() {
  return (
    <div className='single-PostPage'>
      <SinglePost />
      <Sidebar />
    </div>
  )
}

