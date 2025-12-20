import './Preview.css'
export default function Preview(props){
  return(
    <div className="meme">
      <img src={props.memeTemplate} alt="" />
      
      {props.textBoxes.map((textBox)=>{
        return (<span key={textBox.key} style={{top:`${textBox.pos[1]}px`, left:`${textBox.pos[0]}px`}} ><p>{textBox.value}</p></span>)
      })
      }
    </div>
    
  )
}