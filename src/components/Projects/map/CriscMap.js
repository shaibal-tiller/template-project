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
import { getOverlayContent, layerCheck } from "../../../utils/map_util";
import { useParams } from "react-router-dom";




// const location = `sirajganj`;

const CriscMap = ({ mapData }) => {
  const myContext = GetContext();
  const [map, setMap] = useState();
  const mapElement = useRef();
  const pname = useParams().id
  // console.log("hello crisc")
  // console.log(mapData);
  const location = myContext.sbData.location;
  let viewProps;
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

  let boundaryLayers; // layer Group 
  let wardBoundary;
  let municipalBoundary;

  let majoLayers; // layer Group 
  let landUse;
  let orthophoto;
  let mouza;


  let physicalFeature; // layer Group 
  let structureUse;
  let otherStructure;
  let selectedArea;

  let facilities; // layer Group 
  let administrative;
  let educationalInst;
  let helthService;
  let utilityWash;
  let religiousPlace;

  let janina;  // layer Group 
  let waterBody;
  let roadLine;
  let roadPoly;
  let drain;
  let floodWorks;


  let AllLayers; // Legend layer Group 

  useEffect(() => {
    viewProps = new View({
      //  zoom: 13.5,
      projection: 'EPSG:4326',
      maxZoom: 21,
    });

    if (location == 'satkhira') {
      viewProps.setCenter([89.06775876918024, 22.70869722796283]);
    } else viewProps.setCenter([89.694200286309, 24.443035173482207]);


    // Import All Boundary Layers 

    mouza = new TileLayer({
      title: 'Mouza',
      description: `${pname}_${location}_mouza`,
      source: new TileWMS({
        url: 'http://118.179.197.118:8080/geoserver/wms',
        params: { 'LAYERS': `${pname}_${location}_mouza`, 'TILED': true },
        serverType: 'geoserver',
        // Countries have transparency, so do not fade tiles:
        transition: 0,
      }),
      opacity: 1,
      minZoom: 17,
    });



    wardBoundary = new TileLayer({
      title: 'Ward Boundary',
      description: `${pname}_${location}_ward_boundary`,
      source: new TileWMS({
        url: 'http://118.179.197.118:8080/geoserver/wms',
        params: { 'LAYERS': `${pname}_${location}_ward_boundary`, 'TILED': true },
        serverType: 'geoserver',
        // Countries have transparency, so do not fade tiles:
        transition: 0,
      }),
      opacity: .6,
      minZoom: 14.1,
      maxZoom: 16,
    });


    municipalBoundary = new TileLayer({
      title: 'Municipal Boundary',
      description: `${location}_municipal_boundary`,
      source: new TileWMS({
        url: 'http://118.179.197.118:8080/geoserver/wms',
        params: { 'LAYERS': `${pname}_${location}_municipal_boundary`, 'TILED': true },
        serverType: 'geoserver',
        // Countries have transparency, so do not fade tiles:
        transition: 0,

      }),
      maxZoom: 14,
      opacity: .9,

      // maxZoom: 16,
    });


    // Import All Mejo Layers 

    landUse = new TileLayer({
      title: 'Landuse',
      description: `${pname}_${location}_landuse`,
      source: new TileWMS({
        url: 'http://118.179.197.118:8080/geoserver/wms',
        params: { 'LAYERS': `${pname}_${location}_landuse`, 'TILED': true },
        serverType: 'geoserver',
        // Countries have transparency, so do not fade tiles:
        transition: 0,
      }),
      opacity: 0.5
    });

    orthophoto = new TileLayer({
      title: 'Orthophoto',
      description: 'district_accessibility',
      source: new TileWMS({
        url: 'http://118.179.197.118:8080/geoserver/wms',
        params: { 'LAYERS': `${pname}_${location}_orthophoto`, 'TILED': true },
        serverType: 'geoserver',
        // Countries have transparency, so do not fade tiles:
        transition: 0,
      }),

    });

    // Import All Physical Layers 

    selectedArea = new TileLayer({
      title: 'Area',
      description: `${pname}_${location}_area`,
      source: new TileWMS({
        url: 'http://118.179.197.118:8080/geoserver/wms',
        params: { 'LAYERS': `${pname}_${location}_area`, 'TILED': true },
        serverType: 'geoserver',
        // Countries have transparency, so do not fade tiles:
        transition: 0,
      }),
      minZoom: 17,
    });

    structureUse = new TileLayer({
      title: 'Structure Use',
      description: `${pname}_${location}_structure`,
      source: new TileWMS({
        url: 'http://118.179.197.118:8080/geoserver/wms',
        params: { 'LAYERS': `${pname}_${location}_structure`, 'TILED': true },
        serverType: 'geoserver',
        // Countries have transparency, so do not fade tiles:
        transition: 0,
      }),
      opacity: 0.7,
      minZoom: 18.5,
    });

    otherStructure = new TileLayer({
      title: 'Other Structure',
      description: `${pname}_${location}_other_structure`,
      source: new TileWMS({
        url: 'http://118.179.197.118:8080/geoserver/wms',
        params: { 'LAYERS': `${pname}_${location}_other_structure`, 'TILED': true },
        serverType: 'geoserver',
        // Countries have transparency, so do not fade tiles:
        transition: 0,
      }),
      opacity: 0.7,
      minZoom: 18.5,
    });

    // Import All Facilities Layers 

    administrative = new TileLayer({
      title: 'Administrative',
      description: `${pname}_${location}_administrative`,
      source: new TileWMS({
        url: 'http://118.179.197.118:8080/geoserver/wms',
        params: { 'LAYERS': `${pname}_${location}_administrative`, 'TILED': true },
        serverType: 'geoserver',
        // Countries have transparency, so do not fade tiles:
        transition: 0,
      }),
      //  minZoom: 18,
    });

    educationalInst = new TileLayer({
      title: 'Educational institutes',
      description: `${pname}_${location}_educational_institutes`,
      source: new TileWMS({
        url: 'http://118.179.197.118:8080/geoserver/wms',
        params: { 'LAYERS': `${pname}_${location}_educational_institutes`, 'TILED': true },
        serverType: 'geoserver',
        // Countries have transparency, so do not fade tiles:
        transition: 0,
      }),
      minZoom: 17,
    });

    helthService = new TileLayer({
      title: 'Helth Service',
      description: `${pname}_${location}_health_service`,
      source: new TileWMS({
        url: 'http://118.179.197.118:8080/geoserver/wms',
        params: { 'LAYERS': `${pname}_${location}_health_service`, 'TILED': true },
        serverType: 'geoserver',
        // Countries have transparency, so do not fade tiles:
        transition: 0,
      }),
      minZoom: 17,
    });

    utilityWash = new TileLayer({
      title: 'Utility Wash',
      description: `${pname}_${location}_utility_wash`,
      source: new TileWMS({
        url: 'http://118.179.197.118:8080/geoserver/wms',
        params: { 'LAYERS': `${pname}_${location}_utility_wash`, 'TILED': true },
        serverType: 'geoserver',
        // Countries have transparency, so do not fade tiles:
        transition: 0,
      }),
      minZoom: 18,
    });

    religiousPlace = new TileLayer({
      title: 'Religious',
      description: `${pname}_${location}_religious`,
      source: new TileWMS({
        url: 'http://118.179.197.118:8080/geoserver/wms',
        params: { 'LAYERS': `${pname}_${location}_religious`, 'TILED': true },
        serverType: 'geoserver',
        // Countries have transparency, so do not fade tiles:
        transition: 0,
      }),
      minZoom: 17,
    });

    // Import All JaniNaKiHobe Layers 

    waterBody = new TileLayer({
      title: 'Waterbody',
      description: `${pname}_${location}_waterbody`,
      source: new TileWMS({
        url: 'http://118.179.197.118:8080/geoserver/wms',
        params: { 'LAYERS': `${pname}_${location}_waterbody`, 'TILED': true },
        serverType: 'geoserver',
        // Countries have transparency, so do not fade tiles:
        transition: 0,
      }),
      minZoom: 16.5,
    });

    roadLine = new TileLayer({
      title: 'Road Line',
      description: `${pname}_${location}_road`,
      source: new TileWMS({
        url: 'http://118.179.197.118:8080/geoserver/wms',
        params: { 'LAYERS': `${pname}_${location}_road`, 'TILED': true },
        serverType: 'geoserver',
        // Countries have transparency, so do not fade tiles:
        transition: 0,
      }),
      minZoom: 17,
    });

    roadPoly = new TileLayer({
      title: 'Road Poly',
      description: `${pname}_${location}_road_poly`,
      source: new TileWMS({
        url: 'http://118.179.197.118:8080/geoserver/wms',
        params: { 'LAYERS': `${pname}_${location}_road_poly`, 'TILED': true },
        serverType: 'geoserver',
        // Countries have transparency, so do not fade tiles:
        transition: 0,
      }),
      minZoom: 17,
    });

    drain = new TileLayer({
      title: 'Drain',
      description: `${pname}_${location}_drain`,
      source: new TileWMS({
        url: 'http://118.179.197.118:8080/geoserver/wms',
        params: { 'LAYERS': `${pname}_${location}_drain`, 'TILED': true },
        serverType: 'geoserver',
        // Countries have transparency, so do not fade tiles:
        transition: 0,
      }),
      minZoom: 17,
    });

    floodWorks = new TileLayer({
      title: 'Flood Works',
      description: `${pname}_${location}_flood_works`,
      source: new TileWMS({
        url: 'http://118.179.197.118:8080/geoserver/wms',
        params: { 'LAYERS': `${pname}_${location}_flood_works`, 'TILED': true },
        serverType: 'geoserver',
        // Countries have transparency, so do not fade tiles:
        transition: 0,
      }),
      minZoom: 17,
    });


    //All Layer Groups 

    boundaryLayers = new LayerGroup({
      title: 'All Boundary',
      fold: 'close',
      layers: [wardBoundary, municipalBoundary]
    });

    majoLayers = new LayerGroup({
      title: 'Major',
      fold: 'close',
      layers: [orthophoto, landUse, mouza]
    });

    physicalFeature = new LayerGroup({
      title: 'Physical Feature',
      fold: 'close',
      layers: [selectedArea, structureUse, otherStructure, floodWorks, waterBody, roadLine, roadPoly, drain,]
    });

    facilities = new LayerGroup({
      title: 'Facilities',
      fold: 'close',
      layers: [administrative, otherStructure, educationalInst, helthService, utilityWash, religiousPlace,]
    });

    janina = new LayerGroup({
      title: 'Jani Na Ki Hobe',
      fold: 'close',
      layers: [waterBody, roadLine, roadPoly, drain, floodWorks],
    });


    // Layer Group for Legend  

    AllLayers = new LayerGroup({
      layers: [landUse, structureUse, otherStructure, administrative, waterBody, roadLine, drain, educationalInst, helthService, wardBoundary, utilityWash, religiousPlace, municipalBoundary, floodWorks, selectedArea]
    });
  }, [myContext.sbData.location])




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

        majoLayers,
        boundaryLayers,
        physicalFeature,
        facilities,
        //  janina

      ],
      view: viewProps,
    });
    setMap(olmap);
    let viewResolution;



    const overlay = new Overlay({
      positioning: 'bottom-center',
    });
  
    olmap.on('singleclick', (event) => {
      viewResolution = /** @type {number} */(viewProps.getResolution());
      const coordinates = event.coordinate;
      const element = document.getElementById('info');
      element.innerHTML=""
      const dupElement = element.cloneNode(true);
      dupElement.style.display = 'block';
      overlay.setElement(dupElement);
      overlay.setPosition(coordinates);

      // Structure use information
      const structueUseInfo = mouza.getSource().getFeatureInfoUrl(
        coordinates,
        viewResolution,
        'EPSG:4326',
        { INFO_FORMAT: 'application/json' },
      );
      if (structueUseInfo) {
        fetch(structueUseInfo)
          .then(response => response.json())
          .then((html) => {
            if (html.features.length > 0) {

              const items = ['district', 'upazila', 'union_name', 'mouza_name', 'sheet_no', 'jl_no', 'plot_no', 'plot_no', 'landuse', 'plot_type']

              // const shownData = `
              // <b>Structure Name</b>: ${html.features[0].properties.str_name ? html.features[0].properties.str_name : 'Not Found'} 
              // <br> <b>Structure Type</b>: ${html.features[0].properties.str_typ ? html.features[0].properties.str_typ : 'Not Found'} 
              // <br><b>Number of Floor</b>:${html.features[0].properties.floor_no ? html.features[0].properties.floor_no : 'Not Found'} 
              // <br><b>First Use</b>: ${html.features[0].properties.use_1st ? html.features[0].properties.use_1st : 'Not Found'} 
              // <br><b>Second Use</b>: ${html.features[0].properties.use_2nd ? html.features[0].properties.use_2nd : 'Not Found'} 
              // <br><b>Third Use</b>: ${html.features[0].properties.use_3rd ? html.features[0].properties.use_3rd : 'Not Found'}
              // <br><b>Ward No </b>:${html.features[0].properties.Ward_No ? html.features[0].properties.Ward_No : 'Not Found'} 
              // <br><b>Municipality </b>:${html.features[0].properties.Municipality ? html.features[0].properties.Municipality : 'Not Found'} 
              // <br><b>Upazila </b>:${html.features[0].properties.Upazila ? html.features[0].properties.Upazila : 'Not Found'} `;
              const shownData = getOverlayContent(html.features[0].properties, items)
              
              dupElement.appendChild (shownData);
              if (olmap.getView().getZoom() > 17) {
                olmap.addOverlay(overlay);
              }
            } else {
              olmap.removeOverlay(overlay);
            }
          });
      }



    });

    layerCheck(olmap, `${pname}_${location}_administrative`)
  }, [myContext.sbData.location]);



  /* *********** Layer Switcher ********** */
  const layerSwitcher = new LayerSwitcher();
  if (map != null || map != undefined) {
    map.addControl(layerSwitcher);
  }


  /*************OnClick ************/








  const showMap = () => {
    const mapElement = document.getElementById('map');
    if (mapElement.childElementCount) {
      while (mapElement.childElementCount > 1) {
        mapElement.removeChild(mapElement.firstElementChild);
      }
    }
  }

  function legend() {
    if (document.getElementById("legend")) {
      document.getElementById("legend").innerHTML = " ";
    }
    var no_layers = AllLayers.getLayers().get('length');

    var head = document.createElement("h4");


    var legend_title = document.createTextNode("legend");

    head.appendChild(legend_title);
    var element = document.getElementById("legend");
    element.appendChild(head);
    var ar = [];
    var i;
    for (i = 0; i < no_layers; i++) {
      const getImg = "http://118.179.197.118:8080/geoserver/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&FORMAT=image%2Fpng&LAYER=" + AllLayers.getLayers().item(i).get('description')
      ar.push(getImg);

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


      img.addEventListener('error', function handleError() {
        img.onerror = `${this.style.display = 'none'}`
      });

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


  useEffect(() => {
    showMap();
    if (location !== undefined)
      legend();
  }, [myContext.sbData.location]);

  return (
    <div className="mapRow">
      <div ref={mapElement} className="map-container" id="map" style={{ width: '100%', height: '100vh' }} ></div>

      <div id="legend"></div>
      <button onClick={toggleLegend} id="legendButton"><i className="fa fa-th-list"></i></button>

      <div id="info">&nbsp;</div>
    </div>
  );
}

export default CriscMap;
