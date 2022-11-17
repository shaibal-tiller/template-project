import React, { useEffect } from 'react'
import { useHref } from 'react-router'
import Header from '../../shared/Header'
import Footer from '../../shared/Footer'
import SideBoard from '../../shared/SideBoard'
import { setInitMap } from '../../utils/map_util'
import allProjects from '../../utils/project_util'

const Projects = () => {
  
  const projectName = useHref().slice(1)
  const pDetails = allProjects[projectName]
  const showMap = () => {
    const olmap = setInitMap();
    while (olmap.getControls().array_.length > 0)
      olmap.removeControl(olmap.getControls().array_[0])

    const mapElement = document.getElementById('map');

    if (mapElement.childElementCount > 0)
      mapElement.removeChild(mapElement.firstElementChild)
    olmap.setTarget("map")
    return olmap;
  }
  useEffect(() => {
    const x = showMap()
  }, [])
  return (
    <div className='h-[100vh]'>
      <Header Title={pDetails.name.toUpperCase()} Sub={pDetails.sub.toUpperCase()} />
      <div className='grid grid-cols-12 overflow -24'>

        <div className="map-container col-span-9  ">
          <div id='map' className='' style={{  height: '100vh', width: '100%' }} >
          </div>
         {/*  <Footer /> */}
        </div>
        <div className='  sideboard-container col-span-3'>
          <SideBoard pDetails={pDetails} />
        </div>
      </div>
      
    </div>
  )
}

export default Projects