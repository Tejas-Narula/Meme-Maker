import './Inputs.css'

export default function Inputs(props) {
  return (
    <div className="inputs">
      {props.textBoxes.map((textBox, index) => {
        return (<input key={textBox.key} type="text" placeholder={`Text #${index + 1}`} />)
      })}
    </div>
  )
}