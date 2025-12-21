import React from 'react'
import './Templates.css'

export default function Templates({allMemes,setMemeTemplate}){
  React.useRef(null)


  return(
    <div 
    className="templatesDiv">
      <h3>Popular Memes</h3>
      <div className="memes" 
        onWheel={e=>e.currentTarget.scrollLeft += e.deltaY}
      >
        {allMemes.map((meme)=>{return(<img src={meme.url} alt='meme' onClick={()=>setMemeTemplate(meme.url)}></img>)})}
      </div>
    </div>
  )
}