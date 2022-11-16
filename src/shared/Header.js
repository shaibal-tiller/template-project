import React from 'react'

const Header = ({ Title = "",Sub="" }) => {

  
  return (
    <div className="header z-[20] h-24 bg-right-bottom   text-[#f2f2f2]  w-full ">
      <div className='w-[4.5rem] ml-4 mt-2.5 absolute '>
        <a href='/' className='inline-block  rounded-3xl bg-opacity-90 bg-white'>
          <img className='' src='/logo.png' alt='logo' />
        </a>
      </div>
      <div className='flex flex-col  h-full justify-center items-center'>
        <div className='  flex flex-col items-center'>
          <div className=' text-3xl font-semibold tracking-widest'>
            {Title}
          </div>
          <div className='tracking-widest bg-[#f2f2f2] px-2 rounded-lg bg-opacity-30'>
            <p >[{Sub}]</p>
          </div>
        </div>
        
      </div>

    </div>
  )
}

export default Header