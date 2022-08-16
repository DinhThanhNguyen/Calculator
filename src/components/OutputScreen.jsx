import React, { useContext } from 'react'
import { Textfit } from 'react-textfit';
import { CalcContext } from '../context/CalcContext'


export default function OutputScreen() {
  const { calc } = useContext(CalcContext)

  return (
    <Textfit className="output" mode='single' max={70}>{calc.num ? calc.num.toLocaleString() : calc.res.toLocaleString()}</Textfit>
  )
}
