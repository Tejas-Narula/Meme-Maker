import './Builder.css'
import Button from './Button'
import React from 'react'
import Inputs from './Inputs'

export default function Builder({setTextBoxes,textBoxes,GenrateRandomMemeTemplate}){

  function addTextBox(){
    setTextBoxes((prevTextBoxes) =>{
      const id = prevTextBoxes.length+1
      return [...prevTextBoxes, {value :"Example", id: id, key: id, pos:[400,200]}]
    })
  }

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
        <Button text="Add Text Box" func={addTextBox}/>
        <Button text="Change Image" func={GenrateRandomMemeTemplate}/>
      </div>
      
    </div>

  )
}