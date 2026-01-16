import './css/Inputs.css'
import trashIcon from '../assets/trash-can.png'
import FontPicker from './Elements/FontPicker'
import FontSizePicker from './Elements/FontSizePicker'

export default function Inputs({textBoxes,handleChange,setTextBoxes,inputRefs, imgRef}) {
  // delete TextBox
  function deleteTextBox(textBoxId){
    setTextBoxes(prevTextBoxes=>
      prevTextBoxes.filter(Box=>Box.id!==textBoxId))
  }

  //Change Font
  function changeFont(event,id){
    const font = event.target.value

    setTextBoxes(prevTextBoxes=>
      prevTextBoxes.map(textBox=>{
          return (textBox.id != id ? textBox : {...textBox, font:font})
  })
    )
  }

  // Change Font Size
  function changeFontSize(event,id){
    // console.log(id)
    const fontSize = event.target.value

    setTextBoxes(prevTextBoxes=>
      prevTextBoxes.map(textBox=>{
          return (textBox.id != id ? textBox : {...textBox, fontSizeP:fontSize/imgRef.current.clientHeight})
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