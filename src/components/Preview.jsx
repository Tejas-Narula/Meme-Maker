import React from 'react'
import './Preview.css'
export default function Preview(props){

  const [selected, setSelected] = React.useState({hold: false, id: ""})


  //Mouce Up handler
  React.useEffect(() => {
  function handleMouseUp(){
    setSelected(prevSelected => ({
      ...prevSelected,
      hold: false
    }))
  }

  window.addEventListener('mouseup', handleMouseUp)
  return () => {
    window.removeEventListener('mouseup', handleMouseUp)
  }
  }, [])

  React.useEffect(() => {
    if (!selected.hold) return

    props.setTextBoxes(prevTextBoxes =>
      prevTextBoxes.map(textBox => {
        const left = props.mousePos.x
        const top = props.mousePos.y

        console.log(left,top)

        return textBox.id !== selected.id
          ? textBox
          : { ...textBox, pos: [left, top] }
      })
    )
  }, [props.mousePos])


  return(
    
    <div className="meme">
      <img src={props.memeTemplate} alt="" />
      
      {/* Text booxes on preview */}
      {props.textBoxes.map((textBox)=>{
        const isSelected = selected.id == textBox.id
        const isheld = isSelected && selected.hold

        return(
          <span 
            key={textBox.key} 
            style={{top:`${textBox.pos[1]}px`, left:`${textBox.pos[0]}px`}} >
              
              <p onMouseDown={()=>{
                setSelected({hold:true, id:textBox.id})
                }}
                
                // onMouseUp={()=>{
                //   setSelected({hold:false, id:textBox.id})
                // }}
                
                className={`${isSelected ? "selected-text" : ""} ${isheld ? "held" : ""}`}
                
              >
                {textBox.value}
              </p>
          </span>)
      })}
    </div>
    
  )
}