import React from 'react'
import { useNavigate } from 'react-router-dom'

const Card = ({ details }) => {
const navigate= useNavigate()
  const handleClick=(e)=>{
    navigate(`/${e.target.classList[0].toLowerCase()}`)
  }
  return (
    <div className={`${details.name} hover:cursor-pointer overflow-clip  sm:h-80   w-[60%] gap-y-2 sm:w-[15%] rounded-xl relative bg-stone-600 bg-opacity-40 p-4  `} onClick={handleClick}>
      <div className={`${details.name}  right-5 absolute text-5xl sm:text-7xl text-[#162003] text-opacity-30`}>
        {details.id}
      </div>
      <img className={`${details.name} hidden sm:block rounded-xl h-20 w-full' src='/card-bg.jpg`} src='/card-bg.jpg' />

      <h2 className={`${details.name} text-left text-3xl font-semibold tracking-wide`}>
        {details.name}
      </h2>
      <p className={`${details.name} mt-2 text-left`}>
        {details.description}
      </p>
    </div>
  )
}

export default Card