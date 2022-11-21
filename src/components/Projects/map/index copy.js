import React, { useState, useEffect, useRef } from "react";
import OlMap from 'ol/Map';
import View from 'ol/View';
import TileLayer from "ol/layer/Tile";
import TileWMS from 'ol/source/TileWMS';
import LayerGroup from 'ol/layer/Group';
import LayerSwitcher from 'ol-layerswitcher';
import 'ol-layerswitcher/src/ol-layerswitcher.css';
import SatelliteMap from 'ol/source/XYZ';
// import Stroke from 'ol/style/Stroke';
import XYZ from 'ol/source/XYZ';
import Overlay from 'ol/Overlay';
import { GetContext } from "../../App/Context";




// const location = `sirajganj`;

const ProjecMap = () => {
  const myContext = GetContext();
  const [map, setMap] = useState();
  const mapElement = useRef();
  const [location, setLocation] = useState('sirajganj');
 


  // useEffect(() => {
  //   setLocation(myContext.sbData.location);
  // }, [myContext.sbData.location])


  const viewProps = new View({
    //  center: [89.0705, 22.7185], 
    center: [89.6916, 24.4526],
    //  zoom: 16.2, //satkhira
    zoom: 14,
    projection: 'EPSG:4326',
    maxZoom: 21,
  });


  /*  ***************All Base Layers***************** */

  const GoogleMap = new TileLayer({
    title: 'Google',
    type: 'base',
    source: new XYZ({
      url: 'http://mt0.google.com/vt/lyrs=p&hl=en&x={x}&y={y}&z={z}',
      //  url: 'https://khms1.googleapis.com/kh?v=152&hl=es-ES&x={x}&y={y}&z={z}'
    })
  });
  const SatelliteMapp = new TileLayer({
    title: 'Satellite',
    type: 'base',

    source: new SatelliteMap({
      // attributions: ['Powered by Esri'],
      // attributionsCollapsible: false,
      url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      maxZoom: 23,
    }),
    visible: false,

  });

  /*  ***************All  Layers***************** */


  const landUse = new TileLayer({
    title: 'Landuse',
    description: `crisc_${location}_landuse`,
    source: new TileWMS({
      url: 'http://118.179.197.118:8080/geoserver/wms',
      params: { 'LAYERS': `crisc_${location}_landuse`, 'TILED': true },
      serverType: 'geoserver',
      // Countries have transparency, so do not fade tiles:
      transition: 0,
    }),
    opacity: 0.5
  });

  const structureUse = new TileLayer({
    title: 'Structure Use',
    description: `crisc_${location}_structure`,
    source: new TileWMS({
      url: 'http://118.179.197.118:8080/geoserver/wms',
      params: { 'LAYERS': `crisc_${location}_structure`, 'TILED': true },
      serverType: 'geoserver',
      // Countries have transparency, so do not fade tiles:
      transition: 0,
    }),
    opacity: 1,
    minZoom: 17.5,
  });

  const orthophoto = new TileLayer({
    title: 'Orthophoto',
    description: 'district_accessibility',
    source: new TileWMS({
      url: 'http://118.179.197.118:8080/geoserver/wms',
      params: { 'LAYERS': `crisc_${location}_orthophoto`, 'TILED': true },
      serverType: 'geoserver',
      // Countries have transparency, so do not fade tiles:
      transition: 0,
    }),

  });

  const otherStructure = new TileLayer({
    title: 'Other Structure',
    description: `crisc_${location}_other_structure`,
    source: new TileWMS({
      url: 'http://118.179.197.118:8080/geoserver/wms',
      params: { 'LAYERS': `crisc_${location}_other_structure`, 'TILED': true },
      serverType: 'geoserver',
      // Countries have transparency, so do not fade tiles:
      transition: 0,
    }),
    minZoom: 17.5,
  });

  const administrative = new TileLayer({
    title: 'Administrative',
    description: `crisc_${location}_administrative`,
    source: new TileWMS({
      url: 'http://118.179.197.118:8080/geoserver/wms',
      params: { 'LAYERS': `crisc_${location}_administrative`, 'TILED': true },
      serverType: 'geoserver',
      // Countries have transparency, so do not fade tiles:
      transition: 0,
    }),
    minZoom: 18,
  });

  const waterBody = new TileLayer({
    title: 'Waterbody',
    description: `crisc_${location}_waterbody`,
    source: new TileWMS({
      url: 'http://118.179.197.118:8080/geoserver/wms',
      params: { 'LAYERS': `crisc_${location}_waterbody`, 'TILED': true },
      serverType: 'geoserver',
      // Countries have transparency, so do not fade tiles:
      transition: 0,
    }),
    minZoom: 16.5,
  });

  const roadLine = new TileLayer({
    title: 'Road Line',
    description: `crisc_${location}_road`,
    source: new TileWMS({
      url: 'http://118.179.197.118:8080/geoserver/wms',
      params: { 'LAYERS': `crisc_${location}_road`, 'TILED': true },
      serverType: 'geoserver',
      // Countries have transparency, so do not fade tiles:
      transition: 0,
    }),
    minZoom: 17,
  });

  const roadPoly = new TileLayer({
    title: 'Road Poly',
    description: `crisc_${location}_road_poly`,
    source: new TileWMS({
      url: 'http://118.179.197.118:8080/geoserver/wms',
      params: { 'LAYERS': `crisc_${location}_road_poly`, 'TILED': true },
      serverType: 'geoserver',
      // Countries have transparency, so do not fade tiles:
      transition: 0,
    }),
    minZoom: 17,
  });

  const drain = new TileLayer({
    title: 'Drain',
    description: `crisc_${location}_drain`,
    source: new TileWMS({
      url: 'http://118.179.197.118:8080/geoserver/wms',
      params: { 'LAYERS': `crisc_${location}_drain`, 'TILED': true },
      serverType: 'geoserver',
      // Countries have transparency, so do not fade tiles:
      transition: 0,
    }),
    minZoom: 17,
  });

  const educationalInst = new TileLayer({
    title: 'Educational institutes',
    description: `crisc_${location}_educational_institutes`,
    source: new TileWMS({
      url: 'http://118.179.197.118:8080/geoserver/wms',
      params: { 'LAYERS': `crisc_${location}_educational_institutes`, 'TILED': true },
      serverType: 'geoserver',
      // Countries have transparency, so do not fade tiles:
      transition: 0,
    }),
    minZoom: 17,
  });

  const helthService = new TileLayer({
    title: 'Helth Service',
    description: `crisc_${location}_health_service`,
    source: new TileWMS({
      url: 'http://118.179.197.118:8080/geoserver/wms',
      params: { 'LAYERS': `crisc_${location}_health_service`, 'TILED': true },
      serverType: 'geoserver',
      // Countries have transparency, so do not fade tiles:
      transition: 0,
    }),
    minZoom: 17,
  });

  const wardBoundary = new TileLayer({
    title: 'Ward Boundary',
    description: `crisc_${location}_ward_boundary`,
    source: new TileWMS({
      url: 'http://118.179.197.118:8080/geoserver/wms',
      params: { 'LAYERS': `crisc_${location}_ward_boundary`, 'TILED': true },
      serverType: 'geoserver',
      // Countries have transparency, so do not fade tiles:
      transition: 0,
    }),
    opacity: .6,
    minZoom: 14.1,
    maxZoom: 16,
  });

  const utilityWash = new TileLayer({
    title: 'Utility Wash',
    description: `crisc_${location}_utility_wash`,
    source: new TileWMS({
      url: 'http://118.179.197.118:8080/geoserver/wms',
      params: { 'LAYERS': `crisc_${location}_utility_wash`, 'TILED': true },
      serverType: 'geoserver',
      // Countries have transparency, so do not fade tiles:
      transition: 0,
    }),
    minZoom: 18,
  });

  const religiousPlace = new TileLayer({
    title: 'Religious',
    description: `crisc_${location}_religious`,
    source: new TileWMS({
      url: 'http://118.179.197.118:8080/geoserver/wms',
      params: { 'LAYERS': `crisc_${location}_religious`, 'TILED': true },
      serverType: 'geoserver',
      // Countries have transparency, so do not fade tiles:
      transition: 0,
    }),
    minZoom: 17,
  });

  const municipalBoundary = new TileLayer({
    title: 'Municipal Boundary',
    description: `crisc_${location}_municipal_boundary`,
    source: new TileWMS({
      url: 'http://118.179.197.118:8080/geoserver/wms',
      params: { 'LAYERS': `crisc_${location}_municipal_boundary`, 'TILED': true },
      serverType: 'geoserver',
      // Countries have transparency, so do not fade tiles:
      transition: 0,

    }),
    maxZoom: 14,
    opacity: .9,

    // maxZoom: 16,
  });

  const floodWorks = new TileLayer({
    title: 'Flood Works',
    description: `crisc_${location}_flood_works`,
    source: new TileWMS({
      url: 'http://118.179.197.118:8080/geoserver/wms',
      params: { 'LAYERS': `crisc_${location}_flood_works`, 'TILED': true },
      serverType: 'geoserver',
      // Countries have transparency, so do not fade tiles:
      transition: 0,
    }),
    minZoom: 17,
  });

  const selectedArea = new TileLayer({
    title: 'Area',
    description: `crisc_${location}_area`,
    source: new TileWMS({
      url: 'http://118.179.197.118:8080/geoserver/wms',
      params: { 'LAYERS': `crisc_${location}_area`, 'TILED': true },
      serverType: 'geoserver',
      // Countries have transparency, so do not fade tiles:
      transition: 0,
    }),
    minZoom: 17,
  });


  const boundaryLayers = new LayerGroup({
    title: 'All Boundary',
    fold: 'close',
    layers: [wardBoundary, municipalBoundary]
  });

  const mejoLayers = new LayerGroup({
    title: 'Mejor',
    fold: 'close',
    layers: [orthophoto, landUse]
  });

  const physicalFeature = new LayerGroup({
    title: 'Physical Feature',
    fold: 'close',
    layers: [selectedArea, structureUse, otherStructure]
  });

  const facilities = new LayerGroup({
    title: 'Facilities',
    fold: 'close',
    layers: [administrative, otherStructure, educationalInst, helthService, utilityWash, religiousPlace,]
  });


  const AllLayers = new LayerGroup({
    layers: [landUse, structureUse, otherStructure, administrative, waterBody, roadLine, drain, educationalInst, helthService, wardBoundary, utilityWash, religiousPlace, municipalBoundary, floodWorks, selectedArea]
  });


  useEffect(() => {


    const olmap = new OlMap({
      target: mapElement.current,
      layers: [
        new LayerGroup({
          title: 'Base Map',
          name: 'Base',
          fold: 'close',
          layers: [SatelliteMapp, GoogleMap],
        }),

        mejoLayers,
        boundaryLayers,
        physicalFeature,
        facilities,

        new LayerGroup({
          title: 'Jani Na Ki Hobe',
          fold: 'close',
          layers: [waterBody, roadLine, roadPoly, drain, floodWorks],
        }),

      ],
      view: viewProps,
    });
    setMap(olmap);
  }, []);



  /* *********** Layer Switcher ********** */
  const layerSwitcher = new LayerSwitcher();
  if (map != null || map != undefined) {
    map.addControl(layerSwitcher);
  }




  const showMap = () => {
    const mapElement = document.getElementById('map');
    if (mapElement.childElementCount) {
      while (mapElement.childElementCount > 1) {
        mapElement.removeChild(mapElement.firstElementChild);
      }
    }
  }

  function legend() {

    var no_layers = AllLayers.getLayers().get('length');

    var head = document.createElement("h4");


    var legend_title = document.createTextNode("Legend");



    head.appendChild(legend_title);
    var element = document.getElementById("legend");

    element.appendChild(head);
    var ar = [];
    var i;
    for (i = 0; i < no_layers; i++) {
      ar.push("http://118.179.197.118:8080/geoserver/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&FORMAT=image%2Fpng&LAYER=" + AllLayers.getLayers().item(i).get('description'));

      var head = document.createElement("p");


      var find_layer_title = AllLayers.getLayers().item(i).get('title');

      // var remove_under = find_layer_title.replace(/_/g, " ");

      // var capita_layer_title = remove_under.replace(/\b\w/g, l => l.toUpperCase())


      var all_layer_title = document.createTextNode(find_layer_title);

      //alert(txt[i]);
      head.appendChild(all_layer_title);
      // var element = document.getElementById("legend");
      element.appendChild(head);
      var img = new Image();
      img.src = ar[i];

      var src = document.getElementById("legend");

      src.appendChild(img);

    }

  }


  function toggleLegend() {
    // get the Panel
    var legendPanel = document.getElementById('legend');

    // get the current value of the Panel's display property
    var displaySetting = legendPanel.style.display;

    // also get the Panel button, so we can change what it says
    // var legendButton = document.getElementById('legendButton');

    // now toggle the clock and the button text, depending on current state
    if (displaySetting == 'block') {
      // Panel is visible. hide it
      legendPanel.style.display = 'none';
      // change button text
      // legendButton.innerHTML = 'Show Panel';
    }
    else {
      // Panel is hidden. show it
      legendPanel.style.display = 'block';
      // change button text
      // legendButton.innerHTML = 'Hide Panel';
    }
  }

  // useEffect(() => {
  //   if (map != null) {
  //     legend();
  //   }

  // }, [map]);


  useEffect(() => {
    showMap(); 
    legend();
  }, []);

  return (
    <div className="mapRow">
      <div ref={mapElement} className="map-container" id="map" style={{ width: '100%', height: '100vh' }} ></div>

      <div id="legend"></div>
      <button onClick={toggleLegend} id="legendButton"><i className="fa fa-th-list"></i></button>


    </div>
  );
}

export default ProjecMap;
