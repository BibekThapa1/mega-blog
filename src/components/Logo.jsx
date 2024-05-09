import React from 'react'
import logo from "../images/logo.png"

const Logo = ({width = "100px"}) => {
  return (
    <div className='font-bold border-none inline-block m-auto '>
      <img src={logo}  className='h-14 rounded-full object-contain' alt="" />
    </div>
  )
}

export default Logo