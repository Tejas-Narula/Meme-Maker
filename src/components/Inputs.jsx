import './Inputs.css'
import trashIcon from '../assets/trash-can.png'
import FontPicker from './Elements/FontPicker'
import FontSizePicker from './Elements/FontSizePicker'

export default function Inputs({textBoxes,handleChange,setTextBoxes,inputRefs}) {
  function deleteTextBox(textBoxId){
    setTextBoxes(prevTextBoxes=>
      prevTextBoxes.filter(Box=>Box.id!==textBoxId))
  }

  function changeFont(event,id){
    const font = event.target.value

    setTextBoxes(prevTextBoxes=>
      prevTextBoxes.map(textBox=>{
          return (textBox.id != id ? textBox : {...textBox, font:font})
  })
    )
  }

  function changeFontSize(event,id){
    console.log(id)
    const fontSize = event.target.value

    setTextBoxes(prevTextBoxes=>
      prevTextBoxes.map(textBox=>{
          return (textBox.id != id ? textBox : {...textBox, fontSize:fontSize})
  })
    )
  }
  
  
  return (
    <div className="inputs">
      {/* All the inputes */}
      {textBoxes.map((textBox, index) => {
        return (
        <div className="InputElem" key={textBox.id}>
          {/* Input */}
          <input 
            ref={el=>(inputRefs.current[textBox.id]=el)}
            id={textBox.id}
            value={textBox.value}
            type="text" 
            placeholder={`Text #${index + 1}`} 
            onChange={handleChange}
          />

          {/* Font Family */}
          <FontPicker value={textBox.font} onChange={(e,id)=>changeFont(e,id)} id={textBox.id}/>

          {/* Font Size */}
          <FontSizePicker onChange={(e,id)=>changeFontSize(e,id)} id={textBox.id} value={textBox.fontSize}/>

          {/* trash icon */}
          <img src={trashIcon} alt="trash" className='trashIcon' onClick={()=>deleteTextBox(textBox.id)}/>
        </div>
      )
      })}

    

    </div>
  )
}