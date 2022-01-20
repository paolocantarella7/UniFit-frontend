import React, { useState } from "react"
import DatePicker from "react-multi-date-picker"

export default function MultipleDatePicker() {




  const [values, setValues] = useState([])


  return (

      <DatePicker 
        multiple
        value={values} 
        onChange={setValues}
      />

  )
}