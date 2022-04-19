import Home from "./pages/home/Home";
import './app.css';
import SinglePostPage from "./pages/single-post-page/SinglePostPage";
import TopBar from "./components/topbar/TopBar";
import Write from "./pages/write/Write";
import Settings from "./pages/settings/Settings";
import Login from "./pages/loginPage/Login";
import SignUp from "./pages/signUpPage/SignUp";
import React, { useContext } from "react";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"
import { Context } from "./context/Context";

function App() {
  const  {user}= useContext(Context);
  return (
  <Router>
    <TopBar/>
    <Routes>
    <Route path="/" element={<Home />}/>
    <Route path="/signUp" element={user ? <Home/> : <SignUp/>} />
    <Route path="/login" element={user ? <Home/> : <Login/>} />
    <Route path="/settings" element={user ? <Settings/> :<SignUp/>} />
    <Route path="/write" element={user ? <Write/> : <SignUp/>} />
    <Route path="/post/:postId" element={<SinglePostPage/>} ></Route>
    </Routes>
  </Router>  
  );
}

export default App;
