import React from 'react'
import {Avatar, Badge} from "@material-ui/core"
import "./css/QuoraBox.css"

function QuoraBox(props) {
  return (
    <div className='quoraBox'>
        <div className='quoraBox__info'>
      <Badge style={{backgroundColor:'brown', border:"1px solid"
      ,borderRadius:"4px", color:"white",
       padding:'8px'
      }}>{props.x}</Badge>
       </div>
       <div className='quoraBox__quora'>
        <p> What is your Question  </p>
       </div>
    </div>
  )
}

export default QuoraBox
