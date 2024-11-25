import { useDispatch } from 'react-redux';
import Login from './components/auth/Login';
import React, { useEffect } from 'react';
import './App.css';
import Quora from './components/Quora';
import {login } from './feature/userSlice';
import {auth} from './firebase'
import { onAuthStateChanged } from 'firebase/auth';
import {BrowserRouter, Routes,Route} from 'react-router-dom';
import Register from './components/auth/Register';
import Answers from './components/Answers';
import Sidebar from './components/Sidebar';

function App() {
 // const user=useSelector(selectUser);
  const dispatch=useDispatch();

  useEffect(()=>{
      onAuthStateChanged(auth,(authUser)=>{
        if(authUser){
          dispatch(
            login({
            userName:authUser.name,
            Photo:authUser.photoURL,
            email:authUser.email, 
            uid:authUser.uid,
          }))
          console.log("AuthUser",authUser);
        }
      } )
  },[dispatch])

  return (
    <div className="App">
      {/* <div>{user?<Quora/>:<Login/>
    }</div> */}
    <BrowserRouter>
    <Routes>
     <Route path='/register' element={<Register/>}></Route>
     <Route path='/quora' element={<Quora/>}/>
     <Route path='/' element={<Login/>}></Route>
     <Route path='/quora/:id' element={<Answers/>}></Route>
     <Route path='/sidebar' element={<Sidebar/>}></Route>
    </Routes>
    </BrowserRouter>
     </div>
  );
}

export default App; 
