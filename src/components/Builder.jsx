import './Builder.css'
import Button from './Elements/Button'
import React from 'react'
import Inputs from './Inputs'

export default function Builder({setTextBoxes,textBoxes,GenrateRandomMemeTemplate}){

  function addTextBox(value="Text Box", pos={x:400,y:100}){
    setTextBoxes((prevTextBoxes) =>{
      const id = prevTextBoxes.length+1
      return [...prevTextBoxes, {value, id, key: id, pos}]
    })
  }

  // React.useEffect(()=>{
  //   addTextBox("yo",{x:400,y:250})
  //   addTextBox()
    
  // },[])

  function handleChange(event){
    const value = event.currentTarget.value
    const id = event.currentTarget.id

    setTextBoxes(prevTextBoxes=>
      prevTextBoxes.map(textBox=>
          (textBox.id != id ? textBox : {...textBox, value:value})
        )
    )
  }

  return(
    <div className='Builder'>
      <Inputs textBoxes={textBoxes} handleChange={handleChange} setTextBoxes={setTextBoxes}/>
      
      <div className="options">
        <Button text="Add Text Box" func={()=>addTextBox()}/>
        <Button text="Change Image" func={GenrateRandomMemeTemplate}/>
      </div>
      
    </div>

  )
}