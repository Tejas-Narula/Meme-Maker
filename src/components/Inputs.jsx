import './Inputs.css'
import trashIcon from '../assets/trash-can.png'

export default function Inputs({textBoxes,handleChange,setTextBoxes,inputRefs}) {
  function deleteTextBox(textBoxId){
    setTextBoxes(prevTextBoxes=>
      prevTextBoxes.filter(Box=>Box.id!==textBoxId))}
  
  
  return (
    <div className="inputs">
      {/* All the inputes */}
      {textBoxes.map((textBox, index) => {
        return (
        <div className="InputElem" key={textBox.id}>
          <input 
            ref={el=>(inputRefs.current[textBox.id]=el)}
            id={textBox.id}
            value={textBox.value}
            type="text" 
            placeholder={`Text #${index + 1}`} 
            onChange={handleChange}
          />

          {/* trash icon */}
          <img src={trashIcon} alt="trash" className='trashIcon' onClick={()=>deleteTextBox(textBox.id)}/>
        </div>
      )
      })}

    

    </div>
  )
}