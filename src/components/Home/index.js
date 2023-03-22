import React from 'react'
import Footer from '../../shared/Footer'
import Header from '../../shared/Header'
import ProjectList from './ProjectList/index'

const Home = () => {
    return (
        <div className='h-[100vh]'>
            <div className=''><Header Title='TILLER PROJECTS' /></div>
            <img className=' absolute 
             left-[8%] sm:left-[14%] md:left-[20%] lg:left-[25%] xl:left-[30%] top-[10%] opacity-10' src='/logo.png' />
            <ProjectList  />
            <Footer  />
        </div>
    )
}

export default Home