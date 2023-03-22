import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import View from 'ol/View';
import WMSCapabilities from 'ol/format/WMSCapabilities';


const view = {
  lon: 90.41607886403209,
  lat: 23.82399061856948,
  zoom: 12.70,
  projection: 'EPSG:4326'
}

const gridSrc = new TileWMS({
  url: 'http://118.179.197.118:8080/geoserver/wms',
  params: { LAYERS: `grid_${'9up_chandpur'}`, TILED: true },
  serverType: 'geoserver',
  crossOrigin: 'anonymous',
});
const layer = new TileLayer({
  title: 'DNCC Building',
  visible: true,
  source: gridSrc
})

export const setInitMap = () => {

  const olmap = new Map({
    target: '',
    view: new View({
      center: [view['lon'], view['lat']],
      zoom: view['zoom'],
      projection: view.projection,
    })

  });
  //basemap
  olmap.addLayer(new TileLayer({
    source: new OSM(),
  }))

  olmap.addLayer(layer)

  // const layerSwitcher = new LayerSwitcher()
  // olmap.addControl(layerSwitcher);
  return olmap
}


export const getOverlayContent = (data, items) => {
  if (data && items && items.length) {
    
    const container = document.createElement('div')
    container.style.position = 'relative'
    const closebtn = document.createElement('p')
    closebtn.innerHTML = 'x'
    closebtn.className = 'absolute w-8 h-8 top-0 text-end right-0 hover:scale-105 hover:cursor-pointer hover:text-red-500 text-sm'
    closebtn.onclick = () => {
      document.getElementById('info').style.display= 'none'
    }
    container.appendChild(closebtn)

    const content = document.createElement('div')

    content.innerHTML = `${items.map(el => {
      return '<div><b>' + el.split('_').map(e=>
        e[0].toUpperCase()+e.slice(1,e.length)).join(' ') + '</b>: ' + data[el] + '</div>'
    }).join('\n')}`
    container.appendChild(content)
    return container
  }
}


export const layerCheck = (mainMapName, lName) => {
  var parser = new WMSCapabilities();

  fetch('http://118.179.197.118:8080/geoserver/wms?service=WMS&version=1.1.1&request=GetCapabilities').then(function (response) {
    return response.text();
  }).then(function (text) {
    var result = parser.read(text);

    console.log(searchLayer(result.Capability.Layer, lName));
  });

  function searchLayer(layer, name) {
    var found = false;
    if (layer.Title === name) {
      found = true;
      mainMapName.getView().fit(layer.BoundingBox[0].extent);
    }
    if (layer.Layer) {

      layer.Layer.forEach(function (layer) {
        found = found || searchLayer(layer, name)
      })
    }
    return found;
  }
}
