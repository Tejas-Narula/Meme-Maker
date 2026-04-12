import React from "react"
import './select.css'

const sizes = [6,8,10,12,14,16,24,32]

export default function FontSizePicker({ id,value, onChange }) {
  return (
    <select
      className="select"
      value={value}
      style={{width: '60px' }}
      onChange={e => onChange(e,id)}
    >
      {sizes.map(size => (
        <option
          key={size}
          value={size}
          style={{fontSize:`${size}px`}}
        >
          {`${size}px`}
        </option>
      ))}
    </select>
  )
}

