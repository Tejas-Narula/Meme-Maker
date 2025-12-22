import './Builder.css'
import Button from './Elements/Button'
import React from 'react'
import Inputs from './Inputs'

export default function Builder({allMemes,setMemeTemplate,downloadMeme,setTextBoxes,textBoxes,GenrateRandomMemeTemplate,inputRefs}){

  function addTextBox(value="Text Box", pos={x:50,y:100},font="Impact", fontSize="12"){
    setTextBoxes((prevTextBoxes) =>{
      const id = prevTextBoxes.length+1
      return [...prevTextBoxes, {value, id, key: id, pos, font,fontSize}]
    })
  }

  React.useEffect(()=>{
    if(allMemes.length != 0){
      addTextBox("I created a MeMé maker",{x:16,y:27},"Impact",14)
      addTextBox("you mean 'meme' right?",{x:182,y:14},"Impact",14)
      addTextBox('MeMé',{x:60,y:180},"Impact",24);
      addTextBox("ow",{x:284,y:300},"Impact",12);
      setMemeTemplate(allMemes[12].url);}
  },[allMemes])

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