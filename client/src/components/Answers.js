import QuoraHeader from './QuoraHeader'
import React ,{useEffect, useState} from 'react'
import "./css/Post.css";
import {Avatar} from "@material-ui/core"
import ArrowUpwardOutlined from '@material-ui/icons/ArrowUpward';
import ArrowDownwardOutlined from '@material-ui/icons/ArrowDownward';
import {RepeatOneOutlined,ChatBubbleOutlined, ShareOutlined, MoreHorizOutlined, Http} from "@material-ui/icons";
import {Modal} from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import CloseIcon from '@material-ui/icons/Close';
import ReactTimeAgo from 'react-time-ago';
import RecatQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import ReactHtmlParser from 'html-react-parser'
import {Link,useParams} from 'react-router-dom';
//import Feed from './Feed';
function LastSeen({ date }) {
  return (
    <div>
      <ReactTimeAgo date={date} locale="en-US" timeStyle="round"/>
    </div>
  )
}
const Answers = () => {
  const {id}=useParams();
  const[isModalOpen,setIsModalOpen]=useState(false);
  const[answers,setAnswers]=useState("");
  const[posts,setPosts]=useState([]);
  const[name,setName]=useState([]);
  const Close=<CloseIcon/>
  const handleQuill=(value)=>{
      setAnswers(value);
  }
 
  useEffect(()=>{
    axios.get('/api/questions/'+id).then((res)=>{
      console.log(res.data);
      setPosts(res.data);
    }).catch((e)=>{    
      console.log(e);
    })
  },[])
  useEffect(()=>{
    axios.get('/api/answers/'+id).then((res)=>{
      console.log(res.data.reverse());
      setName(res.data)
    }).catch((e)=>{    
      console.log(e);
    })
  },[])
  const handleSubmit = async()=>{

       if(id && answers!==""){
      const config={
        headers:{ 
          "content-type":"application/json"
        }
      }
      const ids=localStorage.getItem('name');
        const body={
          answer:answers,
          questionId:id,
          user_id:ids,
        }
        await axios.post('/api/answers',body ,config).then((res)=>{
          console.log(res.data)
          setIsModalOpen(false)
          alert("Answer added Sucesfully")
          window.location.href=`/quora/${id}`
        }).catch((e)=>{
          console.log(e);
        })
       }
  }

  return (
    <div>
      {/* <QuoraHeader/> */}
      {/* <Feed/>     */}
      <div>
      <div className='post__info'>
           <Avatar style={{backgroundColor:"darkred"}}>{}</Avatar>
           <h4>{posts.user_id}</h4>
           <span></span>
      </div>
      <div className='post__body'>
        <div className='post__question'>
            <p>
         {posts.questionName}
           </p>
           
           <button onClick={()=>setIsModalOpen(true)} className='post__btnAnswer'>Answer</button>
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
              <h1>{posts.questionName}</h1>
              <p>Asked By <span className='name'></span>{" "}on{" "}<span className='name'>{new Date(posts.createdAt).toLocaleString()}</span></p>
            </div>
            <div className='modal__answer'>
              <RecatQuill value={answers} onChange={handleQuill} placeholder ="enter your answer" />
            </div>
            <br></br><br></br> <br></br>
            <div className='modal__buttons'>
            <br></br>
              <button  onClick={handleSubmit} className='add' > 
                  Add Answer
               </button>
               <button className='add' onClick={()=>setIsModalOpen(false)}> 
           cancel
            </button>
            </div>
          </Modal>
      </div>
      </div>
      <div className='post__footer'>
      <div className='post__footerAction'>
        <ArrowUpwardOutlined />
        <ArrowDownwardOutlined />
         </div>
         <RepeatOneOutlined/>
         <ChatBubbleOutlined/>
         <div className='post__footerLeft'>
          <ShareOutlined />
          <MoreHorizOutlined /> 
         </div>
      </div>
      <p style={{
        color:"rgba(0,0,0,0,5)",
        fontsize:"12px",
        fontweight:"bold",
        margin:"10px,0"
       }}>
       
       </p>
      <div style={{margin:"5px,0px,0px,0px",
                  padding: "5px,0pxx,0px,20px",
                  borderTop:"1px solid lightgray"

    }} className='post__answer'>
        <div style={{
        display:"flex",
        flexDirection:"column",
        width:"100%",
        padding:"10px,5px",
        borderTop:"1px solid lightgray"}} className='post-answer-container'>
     {
        name.map((_a)=>(<>
          <div style={{
            display:"flex",
            alignItems:"center",
            marginBottom:"10px",
            fontsize:"12px",
            fontWeight:600,
            color:"black",
    
           }} className='post-answered'>
               <Avatar style={{backgroundColor:"darkred"}}>{_a.user_id}</Avatar>
               <div style={{ margin:"0px,10px"}}
               className='post-info'>
                <p>  
                   {_a.user_id}                    </p>
                <span><LastSeen date={_a?.createdAt} /></span>
               </div>
           </div>
           <div className='post-answer'>{ReactHtmlParser(_a?.answer)}</div>
        </>))
      }
        </div>
         </div>
      </div>
    </div>
  )
}

export default Answers
