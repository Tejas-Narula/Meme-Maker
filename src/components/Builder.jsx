import './Builder.css'
import Button from './Button'
import React from 'react'
import Inputs from './Inputs'

export default function Builder(props){

  function addTextBox(){
    props.setTextBoxes((prevTextBoxes) =>{
      const id = prevTextBoxes.length+1
      return [...prevTextBoxes, {value :"", id: id, key: id}]
    })
  }

  function handleChange(event){
    const value = event.currentTarget.value
    const id = event.currentTarget.id

    props.setTextBoxes(prevTextBoxes=>
      prevTextBoxes.map(textBox=>
            (textBox.id != id ? textBox : {...textBox, value:value})
          )
    )
    
    
  }

  return(
    <div className='Builder'>
      <Inputs textBoxes={props.textBoxes} handleChange={handleChange}/>
      
      <div className="options">
        <Button text="Add Text Box" func={addTextBox}/>
        <Button text="Change Image"/>
      </div>
      
    </div>

  )
}