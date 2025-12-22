import './Builder.css'
import Button from './Elements/Button'
import React from 'react'
import Inputs from './Inputs'

export default function Builder({downloadMeme,setTextBoxes,textBoxes,GenrateRandomMemeTemplate,inputRefs}){

  function addTextBox(value="Text Box", pos={x:400,y:100}){
    setTextBoxes((prevTextBoxes) =>{
      const id = prevTextBoxes.length+1
      return [...prevTextBoxes, {value, id, key: id, pos}]
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
      <Inputs textBoxes={textBoxes} handleChange={handleChange} setTextBoxes={setTextBoxes} inputRefs={inputRefs}/>
      
      <div className="options">
        <Button text="Add Text" func={()=>addTextBox()}/>
        <Button text="Random Meme" func={GenrateRandomMemeTemplate}/>
        <Button text="Save" func={()=>downloadMeme(textBoxes)}/>
      </div>
      
    </div>

  )
}