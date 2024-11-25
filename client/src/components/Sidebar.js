import React,{useState,useEffect} from 'react'
//import "./css/Sidebar.css";
import QuoraBox from './QuoraBox';
import Post from './Post';
import SidebarOptions from './SidebarOptions';

function Sidebar() {
  const [posts,setPosts]=useState([]);
  useEffect(()=>{
    let extra=JSON.parse(localStorage.getItem('extras'));
    console.log(extra);
    setPosts(extra);
 console.log(extra);
  },[])
  
  
  return (
    <div>
     <QuoraBox />
     <SidebarOptions post={posts}/>
    </div>
  )
}

export default Sidebar
