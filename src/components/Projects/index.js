import React, { useEffect, useState } from 'react'
import { useHref } from 'react-router'
import Header from '../../shared/Header'
import Footer from '../../shared/Footer'
import SideBoard from '../../shared/SideBoard'
import Map from './map'
import allProjects from '../../utils/project_util'
import MenuOutlined from '@mui/icons-material/MenuOutlined'

const Projects = () => {

  const projectName = useHref().slice(1)
  const pDetails = allProjects[projectName]
  const [open, setOpen] = useState(false)

  return (
    <div className='h-[100vh]'>
      <Header Title={pDetails.name.toUpperCase()} Sub={pDetails.sub.toUpperCase()} />
      <div className={` block sm:grid grid-cols-12 overflow -24`}>
        <div onClick={() => { setOpen(!open) }} className='fixed md:hidden bg-slate-400 bg-opacity-40 p-1 ml-2 mt-2 hover:bg-slate-300 z-10'>
          <MenuOutlined />
        </div>
        <div className="map-container col-span-9  ">
          <Map />
        </div>
        { <div className='hidden sm:block sideboard-container col-span-3'>
          <SideBoard pDetails={pDetails} />
        </div>}
       
      </div>

    </div>
  )
}

export default Projects