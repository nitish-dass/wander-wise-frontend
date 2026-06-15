import React from 'react'
import { useNavigate } from 'react-router-dom'

const CustomButton = ({text, color, link}) => {
  
  const navigate = useNavigate();

  const handleClick = () => {
    if(link) {
      navigate(link);
    }
  }
  
  return (
    <button onClick={handleClick} className='bg-blue-700 px-5 py-1.5 rounded-sm text-white cursor-pointer hover:bg-blue-400'>
        {text}
    </button>
  )
}

export default CustomButton