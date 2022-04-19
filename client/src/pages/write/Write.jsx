import React, { useContext, useState } from 'react';
import { axiosInstance } from '../../config';
import { Context } from '../../context/Context';
import './write.css';

export default function Write() {
  const[title, setTitle] = useState("");
  const[desc,setDesc] = useState("");
  const [file, setFile]= useState(null);
  const {user} = useContext(Context);


  const handleSubmit = async (e)=>{
    e.preventDefault();
    const newPost = {
      username:user.username,
      userID:user._id,
      title,
      desc
    };
    if(file){
      const data = new FormData();
      const filename = Date.now() + file.name; //to prevent uploading same image with diff or same name
      data.append("name",filename);
      data.append("file",file);
      newPost.photo = filename;
      try {
        await axiosInstance.post("/upload", data) //after , data to send or to recive
      } catch (err) {
        console.log(err);
      }
    }
    try {
      const res = await axiosInstance.post("/post", newPost);
      window.location.replace("/post/"+res.data._id)
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='write'>
      {file && 
        <img src={URL.createObjectURL(file)} alt="Blog" className="write-img" />
      }
      <form className='write-form' onSubmit={handleSubmit}>
          <div className="write-formGroup">
              <label htmlFor="file-input">
              <i className="add-fileIcon fa-solid fa-circle-plus"></i>
              </label>
              <input type="file" id='file-input' style={{display:"none"}} onChange={(e)=>setFile(e.target.files[0])}/>
              <input type="text" placeholder='Write Title' className='write-input' autoFocus={true} 
              onChange={(e)=>setTitle(e.target.value)}
              />
          </div>
          <div className="write-formGroup">
              <textarea placeholder='Write your story....' type="text" className='write-input write-text'
              onChange={(e)=>setDesc(e.target.value)}
              ></textarea>
          </div>
              <button className="write-submit" type="submit">Post</button>
      </form>
    </div>
  )
}
