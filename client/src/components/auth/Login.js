import React, { useState } from 'react';
import "./Login.css";
import {signInWithPopup} from 'firebase/auth';
import axios from 'axios';
import {auth,provider}  from '../../firebase';
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from 'react-router-dom';
const Login = () => {
  const navigate=useNavigate();
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const handleSubmit= async () =>{
          await signInWithPopup(auth,provider).then((result)=>{
            console.log(result);
            sessionStorage.setItem('name',result.user.displayName);
            console.log(result.user.displayName);
            navigate('/quora');
          })
          .catch((error)=>{
               console.log(error)
          });
  }
  const handleLogin=(e)=>{
    if(email!=="" && password!==""){
      e.preventDefault();
      axios.post('http://localhost:80/login',{email,password})
      .then(result=>{
        localStorage.setItem('token',result.data);
        const token=localStorage.getItem('token');
        console.log(result);
        const user=jwtDecode(token);
       // const manee=   sessionStorage.setItem('nam'+user.name);
       console.log(user);
       localStorage.setItem('name',user.name);
      //  const name=sessionStorage.getItem('name');
      //  localStorage.setItem('id',user.email);
      // console.log(name);
        if(user!==""){
          navigate('/quora');
          localStorage.removeItem('token');
        //  console.log(manee)
        }
      }).catch((err)=>{
        console.log(err);
      })
    }
  }
  return (
    <div className='login-container'>
        
          <div className='image'>
               <div className='forms'>
              
               <label>Email</label>
               <input type="email" placeholder="Enter Email"  onChange={(e)=>setEmail(e.target.value)} />
               <br/><br/>
               <label>Password</label>
               <input type="password"  placeholder="Enter Password" onChange={(e)=>setPassword(e.target.value)} />
               <br/><br/>
               <button className='buttons' onClick={handleLogin}>Login</button>  
               <br/><br/> 
               {/* <input type="checkbox" checked="" /> Remember me    */}
                
                <button className='buttons' onClick={()=>{navigate("/register")}}>Register</button>
                <Link>Forget Password</Link>
               </div>
               <br/><br/> 
               <button onClick={handleSubmit} className='buttons'>Login From Google</button>
               </div>     
              
    </div>
  )
}

export default Login
