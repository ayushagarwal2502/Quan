import React, { useState } from 'react'
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import {Button,Avatar} from '@material-ui/core';
import {Modal} from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import "./css/QuoraHeader.css";
import axios from 'axios';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { logout } from '../feature/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


function QuoraHeader(props) {
const navigate=useNavigate();
const[isModalOpen,setIsModalOpen]=useState(false);
const [inputUrl,setInputUrl ]=useState("");
const [searchs,setSearch]=useState("");
const[question,setQuestion]=useState(""); 
const handleQuill=(value)=>{
 
  setQuestion(value);
}
const dispatch=useDispatch();
const Close=(<CloseIcon/>)
 const handleLogout=()=>{
  if(window.confirm('Are You sure to Logout')){
   signOut(auth).then(()=>{
    dispatch(logout())
    sessionStorage.removeItem('name');
    navigate('/');
    console.log("Logged Out")
   }).catch((error)=>{
     console.log("error");
   })
  }
 }

async function handlesubmits(){

  if(question !==""){
    const config ={
      headers:{
        "content-type":"application/json"
      }
    }        
      
    const id=localStorage.getItem('name');
    console.log(question);
      const body ={
        questionName:question,
        questionUrl: inputUrl,
        user_id:id
      }
    
    await axios.post('/api/questions',body,config).then((res)=>{
      console.log(res.data)
      setIsModalOpen(false)
      alert(res.data.message)
      window.location.href="/quora";
    }).catch((e)=>{
      console.log(e);
      alert('Error in adding questions')
    })
  }
 }

 const handleSearch=async()=>{
  // alert(searchs);
  // console.log(searchs);
  // setSearch(' ');
  if(searchs!==""){
      const config={
        headers:{ 
          "content-type":"application/json"
        }
      }
      const body={
        questionName:searchs,
      }
      console.log(body);
      
      await axios.post('/api/questions/search',body ,config).then((res)=>{
        console.log(res.data);
        localStorage.setItem('extras',JSON.stringify(res.data));
        let extra=localStorage.getItem('extras');
        console.log(extra);
       window.location.href='/sidebar';
      }).catch((e)=>{
        console.log(e);
      })
     }
     setSearch(" ");
}

  return (
    <div className='qHeader'>
      <div className='qHeader-content'>

                    <div className='qHeader__icons'>
                      <h2 style={{color:"darkRed"}}>Quora</h2>
                     {/* <div className='qHeader__icon'><HomeIcon/></div>
                     <div className='qHeader__icon'><FeaturedPlayListIcon/></div>
                     <div className='qHeader__icon'><AssignmentTurnedInOutlined/></div>
                     <div className='qHeader__icon'><PeopleAltOutlined/></div>
                     <div className='qHeader__icon'><NotificationsOutlined/></div> */}
                    </div>
          
          <div className='qHeader__input'>
              <SearchIcon onClick={handleSearch}/>
              <input type="text" value={searchs} onChange={(e)=>setSearch(e.target.value)} placeholder="search questions" />
          </div>
          <div className='qHeader__Rem'>
            <span><Avatar onClick={handleLogout} style={{backgroundColor:"darkred"}}>{props.y}</Avatar></span>   
          </div>
          <Button onClick={()=>setIsModalOpen(true)} style={{backgroundColor:"darkRed" ,color:"white", marginLeft:"20px", borderRadius:"20px" ,width:"200px"}}>Add Question</Button>
          <Modal open={isModalOpen}
           closeIcon={Close} onClose={()=>setIsModalOpen(false)}
           closeOnEsc
           center
           closeOnOverlayClick={false}
           styles={{
            overlay:{
              height:"auto",
            }
           }}
          >
            <div className='modal__title'>
              <h5 >Add Question</h5>
            </div>
            <div className='modal__info'>
                  <Avatar style={{backgroundColor:"brown"}}>{props.y}</Avatar>
            </div>
            <div className='modal_answers'>
             
             <div className='quill'> 
              <ReactQuill value={question}  
             onChange={handleQuill} placeholder ="enter your question" />
            </div>
            </div>
             <br></br><br></br> <br></br>
             <div className='modal__Field'>
           
            <input value={inputUrl}
            onChange={(e)=>setInputUrl(e.target.value)} style={{
                 border:"1px solid lightgray",
          }} type="text" placeholder="Optional: include a link that given context"/>          
            </div>
            <div className='modal__button'>
            <button className='cancel' onClick={()=>setIsModalOpen(false)}> 
           Cancel
        </button>
        <button onClick={handlesubmits}   className="add" > 
           Add Question 
        </button>
            </div>
          </Modal>
      </div>
      </div>
  )
}

export default QuoraHeader
