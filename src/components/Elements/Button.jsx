import './Button.css'
export default function Button(props){
  return(
    <button 
      className='buttonElem' 
      onClick={props.func}
      style={{marginBottom:`${props.marginB}`}}

    >{props.text}  
    </button>
  )
}