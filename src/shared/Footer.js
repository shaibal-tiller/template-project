import React from 'react'

const Footer = () => {
  return (
    <footer className=' fixed bottom-0 flex items-center justify-center w-full bg-opacity-30 bg-[#03151F]'>
    <div className='flex items-center'>
      <p className=''>Powered By</p>
      <a className='' href="https://tiller.com.bd/" >   <span className='ml-2 font-semibold flex items-center'>Tiller<img className=' ml-2 w-12' alt='logo' src='/logo.png' /> </span></a>
    </div>
    <span className='copyright '>Copyright ©️ 2022 Tiller Ltd. All rights reserved.</span>
  </footer>
  )
}

export default Footer