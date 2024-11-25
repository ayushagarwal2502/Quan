import React ,{useState} from 'react'
import "./css/Post.css";
import {Avatar} from "@material-ui/core";
import {Modal} from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import CloseIcon from '@material-ui/icons/Close';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ReactTimeAgo from 'react-time-ago';
import axios from 'axios';
import ReactHtmlParser from 'html-react-parser';
import {Link} from 'react-router-dom';
import image1 from '.././images/quora2.png';

function LastSeen({ date }) {
  return (
    <div>
      <ReactTimeAgo date={date} locale="en-US" timeStyle="round"/>
    </div>
  )
}

function Post({post}) {
  const namee=localStorage.getItem('name');
 const n=namee[0];
  const[isModalOpen,setIsModalOpen]=useState(false);
  const[answer,setAnswer]=useState("");
  const Close=<CloseIcon/>
  const handleQuill=(value)=>{
      setAnswer(value);
  }
  //console.log(answer);
  const handleSubmit = async()=>{

       if(post?._id && answer!==""){
      const config={
        headers:{ 
          "content-type":"application/json"
        }
      }
      const id=localStorage.getItem('name');
        const body={
          answer:answer,
          questionId:post?._id,
          user_id:id
        }
        await axios.post('/api/answers',body ,config).then((res)=>{
          console.log(res.data)
          setIsModalOpen(false)
          alert("Answer added Sucesfully")
          window.location.href='/quora'
        }).catch((e)=>{
          console.log(e);
        })
       }
  }
                                        
  
  return (
    <div className='post'>
       <div className='post__info'>
           <Avatar style={{backgroundColor:"darkred"}}>{n}</Avatar>
           <h4>{post?.user_id}</h4>
           <small><LastSeen date={post?.createdAt} /></small>
      </div>
      <div className='post__body'>
        <div className='post__question'>
            <p  style={{ backgroundImage: `url(${post?.questionUrl})`}}>
          {ReactHtmlParser(post?.questionName)}
        {
         post?.questionUrl && <img src={post?.questionUrl} alt=" "/>
         
         }
          
           </p>
           
          <Modal
          open={isModalOpen}
          closeIcon={Close} onClose={()=>setIsModalOpen(false)}
          closeOnEsc
          center
          closeOnOverlayClick={false}
          styles={{
           overlay:{
             height:"auto",
           }
          }}>
            <div className='modal__question'>
              <h1>{ReactHtmlParser(post?.questionName)}</h1>
              <p>Asked <span className='name'></span>{" "}on{" "}<span className='name'>{new Date(post?.createdAt).toLocaleString()}</span></p>
            </div>
            <div className='modal__answer'>
              <ReactQuill value={answer} onChange={handleQuill} placeholder ="enter your answer" />
            </div>
            <br></br><br></br> <br></br>
            <div className='modal__buttons'>
            <br></br>
              <button  onClick={handleSubmit} className='add' > 
                  Add Answer
               </button>
               <button className='add' onClick={()=>setIsModalOpen(false)}> 
           Cancel
            </button>
            </div>
          </Modal>
      </div>
      </div>
      <div className='post__footer'>
     
       
      </div>
      <p style={{
        color:"rgba(0,0,0,0,5)",
        fontsize:"12px",
        fontweight:"bold",
        margin:"10px,0"
       }}>
       <Link to={`/quora/${post?._id}`}>{post?.allAnswers.length} Answers</Link>
       <div className='post__body'>
       <div className='post__question'>
       <button onClick={()=>setIsModalOpen(true)} className='post__btnAnswer'>Type your Comment</button>
       </div>
       </div>
       </p>
      
    </div>
  )
}

export default Post
