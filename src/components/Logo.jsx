import React from 'react'
import logo from "../images/logo.png"


const Logo = ({width = "100px"},) => {
  return (
    <div className={`font-bold  inline-block m-auto ${width}`}>
      <img src={logo} alt="" className='rounded-full  h-12'/>
    </div>
  )
}

export default Logo