import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { axiosInstance } from '../../config';
import { Context } from '../../context/Context';
import './singlePost.css';

export default function SinglePost() {
  const locateSelectedPost = useLocation();
  // console.log(locateSelectedPost);
  // console.log(locateSelectedPost.pathname.split("/")[2]);
  const path = locateSelectedPost.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const documentFolder = "https://samindevblog.herokuapp.com/images/";
  const {user} = useContext(Context);
  const[title, setTitle]= useState("");
  const[desc, setDesc]= useState("");
  const[updateMode, setUpdateMode]= useState(false);
  const allInputFilled = (title!="") && (desc!=="")

useEffect(()=>{
  const getOpenPost = async () => {
    const res = await axiosInstance.get("/post/" + path);
    // console.log(res);
    setPost(res.data);
    setTitle(res.data.title);
    setDesc(res.data.desc);
  }
  getOpenPost();
},[path]);
  
const handleDelete = async () =>{
  try {
    await axiosInstance.delete(`/post/${post._id}`, {data:{username:user.username}});
  window.location.replace("/");
  } catch (err) {}
}

const handleUpdate = async () =>{
  await axiosInstance.put("/post/" + path, {username:user.username, userID:user._id, title, desc}); //if eg title:title same so only title eng
  window.location.reload();
}

// const handleCancelUpdate = () =>{
//   window.location.reload();
// }

  return (
    <div className='single-post'>
      <div className="single-postWrapper">
        {post.photo && (
          <img src={documentFolder + post.photo} alt="" className="single-postImg" />
        )}{
          updateMode ? <div className='update-div'>
            <label className='update-label'>New Title</label>
            <input type="text" value={title} className="single-postTitleInput" autoFocus onChange={(e)=>setTitle(e.target.value)}/>
          </div>:(
            <h1 className='single-postTitle'>{post.title}
          {post.userID === user?._id && (
            <div className="single-postEdit">
            <i className="single-postIcon fa-solid fa-pen-to-square" onClick={()=>setUpdateMode(true)}></i>
            <i className="single-postIcon fa-solid fa-trash" onClick={handleDelete}></i>
           </div>
             )}
          </h1>
          )
        }     
          <div className="single-postInfo">
              <Link className='link' to={`/?user=${post.username}`}><span className='single-postAuthor'>Author: <b>{post.username}</b></span></Link>
              <span className='single-postDate'>{new Date(post.createdAt).toDateString()}</span>
          </div>
          {updateMode ? <div className='update-div'>
                          <label className='update-label'>New Discription</label>
                          <textarea className='single-postDiscInput' value={desc} onChange={(e)=>setDesc(e.target.value)}/>
                          <button className='post-updateBtn' onClick={handleUpdate} disabled={!allInputFilled}>UPDATE</button> 
                          <button className='cancel-updateBtn' onClick={()=>setUpdateMode(false)}>CANCEL</button> 
                        </div> :<p className="single-postDisc">{post.desc}</p>       
          }
      </div>
    </div>
  )
}
