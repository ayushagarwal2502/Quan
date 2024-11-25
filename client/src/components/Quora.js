import React from 'react'
import QuoraHeader from './QuoraHeader'
import "./css/Quora.css";

import Feed from './Feed';

function Quora() {
  const namee=localStorage.getItem('name');
  const n=namee[0];
  return (
    <div className='quora'>
      <QuoraHeader y={n}/>
      <div className='quora__contents'>
        <div className='quora__content'> 
            <Feed z={namee}/>
        </div>
      </div>
    </div>
  )
}

export default Quora
