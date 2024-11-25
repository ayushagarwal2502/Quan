import React,{useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './register.css';
const Register = () => {
  const navigate=useNavigate();
    const[name,setName]=useState("");
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");

const handleSubmit=(e)=>{
        if(name!==""&&email!=="" && password!==""){
          e.preventDefault();
            axios.post("http://localhost:80/create",{name,email,password})
            .then((result)=>{
                   console.log(result);
                   localStorage.setItem('name',result.data.name);
                navigate('/quora');
            }).catch((error)=>{
              console.log(error);
            })
        }
}

  return (
    <div>
       <div className='formss'>
              <label>Name</label>
              <input type="text"  placeholder='Enter Name '   onChange={(e)=>setName(e.target.value)}/>
              <label>Email</label>
              <input type="email"  placeholder='Enter Email '  onChange={(e)=>setEmail(e.target.value)}/>
              <br/><br/>
              <label>Password</label>
              <input type="password" placeholder='Enter Password'  onChange={(e)=>setPassword(e.target.value)}/>
              <br/><br/>
              <button className='buttons' onClick={handleSubmit}>Register</button>  
              <button className='buttons' onClick={()=>{navigate("/")}}>Login</button>
              <br/><br/>
              </div>
    </div>
  )
}

export default Register
