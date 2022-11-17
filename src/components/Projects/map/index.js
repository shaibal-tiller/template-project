import React from 'react'
import { setInitMap } from '../../../utils/map_util'
import { useEffect } from 'react' 


const Map = () => {
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
    <div id='map' className='' style={{  height: '100vh', width: '100%' }} >
    </div>
  )
}

export default Map