import React from "react"
import './Select.css'

const fonts = [
  "Impact",
  "Arial",
  "Helvetica",
  "Times New Roman",
  "Georgia",
  "Comic Sans MS",
  "Courier New",
  "Verdana",
  "Inter",
  "Roboto",
  "BBH Bogle",
  "BBH Bartle",
  "Oswald",
  "Smooch Sans",
  "Playfair Display"

]

export default function FontSelect({ id,value, onChange }) {
  return (
    <select
      className="select"
      value={value}
      style={{ fontFamily: value }}
      onChange={e => onChange(e,id)}
    >
      {fonts.map(font => (
        <option
          key={font}
          value={font}
          style={{ fontFamily: font }}
        >
          {font}
        </option>
      ))}
    </select>
  )
}

