import React from 'react';
import './post.css';
import { Link } from 'react-router-dom';

export default function Post({post}) {
  const documentFolder = "https://samindevblog.herokuapp.com/images/"

  return (
    <div  className='post'>
      {post.photo &&(
        <img className='post-img' src={documentFolder + post.photo} alt="Post" />  // then index server add path libr npn
        )}
      <div className="post-info">
          {/* <div className="post-cats">
            {post.categories.map((cat)=>(
              <span className="post-cat">{cat.name}</span>
            ))}
          </div> */}
          <span className="post-title"><Link className='link' to={`/post/${post._id}`}>{post.title}</Link></span>
          <hr />
          <span className="post-date">{new Date(post.createdAt).toDateString()}</span>
      </div>
      <p className='post-disc'>{post.desc}</p>
    </div>
  )
}
