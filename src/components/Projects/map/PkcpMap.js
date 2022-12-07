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
import { layerCheck } from "../../../utils/map_util";
import { useParams } from "react-router-dom";




const location = 'pkcp';

const PkcpMap = ({ mapData }) => {
  const myContext = GetContext();
  const [map, setMap] = useState();
  const mapElement = useRef();
  const pname = useParams().id
  // console.log(mapData.acLayers[1].pf)


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

  let kalaparaUpzB;
  let kalaparaPauB;
  let kalaparaUniB;
  let amtoliUpzB;
  let amtoliPauB;
  let taltaliUpzB;
  let amtoliUniB;
  let kalaparaPauUB;
  let taltoliUniB;
  let kuakataPauB;
  let pkcpUniB;
  let pkcpWallB;
  let surveyGrid;

  let majoLayers; // layer Group 
  let landUse;


  let physicalFeature; // layer Group 
  let structureUse;
  let otherStructure;
  let selectedArea;

  let facilities; // layer Group 
  let administrative;
  let educationalInst;
  let helthService;
  let utilityFeatures;
  let growthCenter;

  let janina;  // layer Group 
  let waterBody;
  let roadLine;
  let roadPoly;
  let drain;
  let bridgeCulvert;


  let AllLayers; // Legend layer Group 

  useEffect(() => {
    viewProps = new View({
      zoom: 13.5,
      projection: 'EPSG:4326',
      maxZoom: 21,
      center: [90.16056172080056, 21.909885565088118]
    });

    // Import All Boundary Layers 
    kalaparaUpzB = new TileLayer({
      title: 'Kalapara Upazilla',
      description: `${pname}_${location}_kalapara_upazila_boundary`,
      source: new TileWMS({
        url: 'http://118.179.197.118:8080/geoserver/wms',
        params: { 'LAYERS': `${pname}_${location}_kalapara_upazila_boundary`, 'TILED': true },
        serverType: 'geoserver',
        transition: 0,
      }),
      visible: false,
    });

    kalaparaPauB = new TileLayer({
      title: 'Kalapara Paurashava',
      description: `${pname}_${location}_kalapara_paurashava_boundary`,
      source: new TileWMS({
        url: 'http://118.179.197.118:8080/geoserver/wms',
        params: { 'LAYERS': `${pname}_${location}_kalapara_paurashava_boundary`, 'TILED': true },
        serverType: 'geoserver',
        transition: 0,
      }),
      visible: false,
    });

    kalaparaUniB = new TileLayer({
      title: 'Kalapara Union',
      description: `${pname}_${location}_kalapara_union_boundary`,
      source: new TileWMS({
        url: 'http://118.179.197.118:8080/geoserver/wms',
        params: { 'LAYERS': `${pname}_${location}_kalapara_union_boundary`, 'TILED': true },
        serverType: 'geoserver',
        transition: 0,
      }),
      visible: false,
    });

    kalaparaPauUB = new TileLayer({
      title: 'Kalapara Paurashava Ward',
      description: `${pname}_${location}_kalapara_paurashava_ward_boundary`,
      source: new TileWMS({
        url: 'http://118.179.197.118:8080/geoserver/wms',
        params: { 'LAYERS': `${pname}_${location}_kalapara_paurashava_ward_boundary`, 'TILED': true },
        serverType: 'geoserver',
        transition: 0,
      }),
      visible: false,
    });

    amtoliUpzB = new TileLayer({
      title: 'Amtali Upazila',
      description: `${pname}_${location}_amtali_upazila_boundary`,
      source: new TileWMS({
        url: 'http://118.179.197.118:8080/geoserver/wms',
        params: { 'LAYERS': `${pname}_${location}_amtali_upazila_boundary`, 'TILED': true },
        serverType: 'geoserver',
        transition: 0,
      }),
      visible: false,
    });

    amtoliPauB = new TileLayer({
      title: 'Amtali Paurashava',
      description: `${pname}_${location}_amtali_paurashava_boundary`,
      source: new TileWMS({
        url: 'http://118.179.197.118:8080/geoserver/wms',
        params: { 'LAYERS': `${pname}_${location}_amtali_paurashava_boundary`, 'TILED': true },
        serverType: 'geoserver',
        transition: 0,
      }),
      visible: false,
    });

    taltaliUpzB = new TileLayer({
      title: 'Taltali Upazila',
      description: `${pname}_${location}_taltalii_upazila_boundary`,
      source: new TileWMS({
        url: 'http://118.179.197.118:8080/geoserver/wms',
        params: { 'LAYERS': `${pname}_${location}_taltalii_upazila_boundary`, 'TILED': true },
        serverType: 'geoserver',
        transition: 0,
      }),
      visible: false,
    });
    amtoliUniB = new TileLayer({
      title: 'Amtali Union',
      description: `${pname}_${location}_amtali_union_boundary`,
      source: new TileWMS({
        url: 'http://118.179.197.118:8080/geoserver/wms',
        params: { 'LAYERS': `${pname}_${location}_amtali_union_boundary`, 'TILED': true },
        serverType: 'geoserver',
        transition: 0,
      }),
      visible: false,
    });



    taltoliUniB = new TileLayer({
      title: 'Taltali Union Boundary',
      description: `${pname}_${location}_taltali_union_boundary`,
      source: new TileWMS({
        url: 'http://118.179.197.118:8080/geoserver/wms',
        params: { 'LAYERS': `${pname}_${location}_taltali_union_boundary`, 'TILED': true },
        serverType: 'geoserver',
        transition: 0,
      }),
      visible: false,
    });


    kuakataPauB = new TileLayer({
      title: 'Kuakata paurashava Ward',
      description: `${pname}_${location}_kuakata_paurashava_ward_boundary`,
      source: new TileWMS({
        url: 'http://118.179.197.118:8080/geoserver/wms',
        params: { 'LAYERS': `${pname}_${location}_kuakata_paurashava_ward_boundary`, 'TILED': true },
        serverType: 'geoserver',
        transition: 0,
      }),
      visible: false,
    });

    pkcpUniB = new TileLayer({
      title: 'All Union',
      description: `${pname}_${location}_union_boundary`,
      source: new TileWMS({
        url: 'http://118.179.197.118:8080/geoserver/wms',
        params: { 'LAYERS': `${pname}_${location}_union_boundary`, 'TILED': true },
        serverType: 'geoserver',
        transition: 0,
      }),
      visible: false,
    });

    pkcpWallB = new TileLayer({
      title: 'Wall',
      description: `${pname}_${location}_wall_boundary`,
      source: new TileWMS({
        url: 'http://118.179.197.118:8080/geoserver/wms',
        params: { 'LAYERS': `${pname}_${location}_wall_boundary`, 'TILED': true },
        serverType: 'geoserver',
        transition: 0,
      }),
      visible: false,
    });

    surveyGrid = new TileLayer({
      title: 'Wall',
      description: `${pname}_${location}_survey_grid`,
      source: new TileWMS({
        url: 'http://118.179.197.118:8080/geoserver/wms',
        params: { 'LAYERS': `${pname}_${location}_survey_grid`, 'TILED': true },
        serverType: 'geoserver',
        transition: 0,
      }),
      visible: false,
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
      opacity: 0.6
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
      opacity: 1,
      minZoom: 17.5,
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
      minZoom: 17.5,
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
      // minZoom: 18,
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

    utilityFeatures = new TileLayer({
      title: 'Utility Features',
      description: `${pname}_${location}_utility_features`,
      source: new TileWMS({
        url: 'http://118.179.197.118:8080/geoserver/wms',
        params: { 'LAYERS': `${pname}_${location}_utility_features`, 'TILED': true },
        serverType: 'geoserver',
        // Countries have transparency, so do not fade tiles:
        transition: 0,
      }),
      minZoom: 18,
    });

    growthCenter = new TileLayer({
      title: 'Growth Center',
      description: `${pname}_${location}_growth_center`,
      source: new TileWMS({
        url: 'http://118.179.197.118:8080/geoserver/wms',
        params: { 'LAYERS': `${pname}_${location}_growth_center`, 'TILED': true },
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

    bridgeCulvert = new TileLayer({
      title: 'Bridge Culvert',
      description: `${pname}_${location}_bridge_culvert`,
      source: new TileWMS({
        url: 'http://118.179.197.118:8080/geoserver/wms',
        params: { 'LAYERS': `${pname}_${location}_bridge_culvert`, 'TILED': true },
        serverType: 'geoserver',
        // Countries have transparency, so do not fade tiles:
        transition: 0,
      }),
      minZoom: 17,
    });


    //All Layer Groups 

    boundaryLayers = new LayerGroup({
      title: 'Admin Boundary',
      fold: 'close',
      layers: [
        new LayerGroup({
          title: 'Upazilla',
          fold: 'close',
          layers: [kalaparaUpzB, amtoliUpzB, taltaliUpzB]
        }),
        new LayerGroup({
          title: 'Pauroshova',
          fold: 'close',
          layers: [kalaparaPauB, amtoliPauB]
        }),
        new LayerGroup({
          title: 'Union',
          fold: 'close',
          layers: [kalaparaUniB, amtoliUniB, taltoliUniB, pkcpUniB]
          //  layers: [kalaparaUpzB]
        }),
        new LayerGroup({
          title: 'Ward',
          fold: 'close',
          layers: [kalaparaPauUB, kuakataPauB]

        }),
        pkcpWallB,
        surveyGrid
      ]
    });

    majoLayers = new LayerGroup({
      title: 'Major',
      fold: 'close',
      layers: [landUse]
    });

    physicalFeature = new LayerGroup({
      title: 'Physical Feature',
      fold: 'close',
      layers: [administrative, selectedArea, structureUse, otherStructure, bridgeCulvert, waterBody, roadLine, roadPoly, drain] 
    });

    facilities = new LayerGroup({
      title: 'Facilities',
      fold: 'close',
      layers: [educationalInst, helthService, utilityFeatures, growthCenter,]
    });

    janina = new LayerGroup({
      title: 'Jani Na Ki Hobe',
      fold: 'close',
      layers: [waterBody, roadLine, roadPoly, drain, bridgeCulvert],
    });


    // Layer Group for Legend  

    AllLayers = new LayerGroup({
      layers: [landUse, structureUse, otherStructure, administrative, waterBody, roadLine, drain, educationalInst, helthService, pkcpUniB, utilityFeatures, growthCenter, bridgeCulvert, selectedArea]
    });
  }, [])




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
      const dupElement = element.cloneNode(true);
      dupElement.style.display = 'block';
      overlay.setElement(dupElement);
      overlay.setPosition(coordinates);

      // Structure use information
      const structueUseInfo = structureUse.getSource().getFeatureInfoUrl(
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
              const shownData = `
              <b>Structure Name</b>: ${html.features[0].properties.str_name ? html.features[0].properties.str_name : 'Not Found'} 
              <br> <b>Structure Type</b>: ${html.features[0].properties.str_typ ? html.features[0].properties.str_typ : 'Not Found'} 
              <br><b>Number of Floor</b>:${html.features[0].properties.floor_no ? html.features[0].properties.floor_no : 'Not Found'} 
              <br><b>First Use</b>: ${html.features[0].properties.use_1st ? html.features[0].properties.use_1st : 'Not Found'} 
              <br><b>Second Use</b>: ${html.features[0].properties.use_2nd ? html.features[0].properties.use_2nd : 'Not Found'} 
              <br><b>Third Use</b>: ${html.features[0].properties.use_3rd ? html.features[0].properties.use_3rd : 'Not Found'}
              <br><b>Ward No </b>:${html.features[0].properties.Ward_No ? html.features[0].properties.Ward_No : 'Not Found'} 
              <br><b>Municipality </b>:${html.features[0].properties.Municipality ? html.features[0].properties.Municipality : 'Not Found'} 
              <br><b>Upazila </b>:${html.features[0].properties.Upazila ? html.features[0].properties.Upazila : 'Not Found'} `;
              dupElement.innerHTML = shownData;
              if (olmap.getView().getZoom() > 14) {
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
    legend();
  }, []);

  return (
    <div className="mapRow">
      <div ref={mapElement} className="map-container" id="map" style={{ width: '100%', height: '100vh' }} ></div>

      <div id="legend"></div>
      <button onClick={toggleLegend} id="legendButton"><i className="fa fa-th-list"></i></button>

      <div id="info">&nbsp;</div>
    </div>
  );
}

export default PkcpMap;
