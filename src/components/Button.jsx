import './Button.css'
export default function Button(props){
  return(
    <button onClick={props.func}>{props.text}</button>
  )
}