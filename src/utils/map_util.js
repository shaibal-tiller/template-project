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
