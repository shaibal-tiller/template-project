import React, { useEffect, useState, useRef } from 'react';
import 'ol/ol.css';
import OlMap from 'ol/Map';
import OlSourceOSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import OlView from 'ol/View';
import TileWMS from 'ol/source/TileWMS';
import LayerGroup from 'ol/layer/Group';
import LayerSwitcher from 'ol-layerswitcher';
import 'ol-layerswitcher/src/ol-layerswitcher.css';
import SatelliteMap from 'ol/source/XYZ';
import { Button } from '@mui/material';
// import Stroke from 'ol/style/Stroke';
import { useNavigate } from "react-router";
import XYZ from 'ol/source/XYZ';
import AppContext from "../../../App/Context/AppContext";
import { useContext } from "react";
import BaseButton from './BaseButton';
import '../index.css'

const RiverLayerSrc = new TileWMS({
    params: { LAYERS: 'river_bd', TILED: true },
    url: `http://${process.env.REACT_APP_GEOSERVER_IP}/geoserver/wms`,
    serverType: 'geoserver',
    style: {
        format: 'geojson',
    },
    crossOrigin: 'anonymous',
});



const RiverLayer = new TileLayer({
    title: 'River',
    name: 'river_bd',
    source: RiverLayerSrc,
    visible: false,
});

const PublicMap = () => {
    const myContext = useContext(AppContext);
    const [selectedBase, setSelectedBase] = useState();
    const [map, setMap] = useState();
    const [baseSelectedLayer, setSelectedBaseLayer] = useState();

    const navigate = useNavigate();
    const mapRef = useRef();
    mapRef.current = map;

    /* *********** Main Map view ********** */
    const viewProps = new OlView({
        center: [90.45607886403209, 23.10099061856948],
        zoom: 7.4,
        projection: 'EPSG:4326',
    });



    /* *********** ALL Layer Source ********** */
    const RoadLayerSrc = new TileWMS({
        url: `http://${process.env.REACT_APP_GEOSERVER_IP}/geoserver/wms`,
        params: { LAYERS: 'roads_line', TILED: true },
        serverType: 'geoserver',
        crossOrigin: 'anonymous',
    });

    const HatBazarSrc = new TileWMS({
        params: { LAYERS: 'hatbazar_bd', TILED: true },
        url: `http://${process.env.REACT_APP_GEOSERVER_IP}/geoserver/wms`,
        serverType: 'geoserver',
        crossOrigin: 'anonymous',
        ratio: 1,
    });

    const GoogleMapSrc = new XYZ({
        url: 'http://mt0.google.com/vt/lyrs=p&hl=en&x={x}&y={y}&z={z}',
        //  url: 'https://khms1.googleapis.com/kh?v=152&hl=es-ES&x={x}&y={y}&z={z}'
    });
    const GoogleMap = new TileLayer({

        //     type: 'base',
        source: GoogleMapSrc
        //    visible: false
    });
    const RoadLayer = new TileLayer({
        title: 'Road',
        name: 'roads_line',
        source: RoadLayerSrc,
        // minZoom: '15',
        visible: false,
    });
    const HatbazarLayer = new TileLayer({
        title: 'HatBazar',
        name: 'hatbazar_bd',
        source: HatBazarSrc,
        opacity: 0.5,
        //  maxZoom: '15',
        visible: false,
    });
    const WaterbodyLayer = new TileLayer({
        title: 'Waterbody',
        name: 'waterbodies_bd',
        source: new TileWMS({
            params: { LAYERS: 'waterbodies_bd', TILED: true },
            url: `http://${process.env.REACT_APP_GEOSERVER_IP}/geoserver/wms`,
            serverType: 'geoserver',
            crossOrigin: 'anonymous',
            ratio: 1,
        }),
        opacity: 0.5,
        //  maxZoom: '15',
    });
    const soilMoistureLayer = new TileLayer({
        title: 'Soil Moisture',
        name: 'soil_moisture_bd',
        source: new TileWMS({
            params: { LAYERS: 'soil_moisture_bd', TILED: true },
            url: `http://${process.env.REACT_APP_GEOSERVER_IP}/geoserver/wms`,
            serverType: 'geoserver',
            crossOrigin: 'anonymous',
            ratio: 1,
        }),
        opacity: 0.5,
        //  maxZoom: '15',

    });

    //  const BaseMap = GoogleMap //, USGSMap, OsmBase, SatelliteMap;

    /* *********** Main Map ********** */
    useEffect(() => {
        const baseLayer = GoogleMap;

        const olmap = new OlMap({
            target: mapRef.current,
            layers: [
                baseLayer,
                //    GoogleMap,
                new LayerGroup({
                    title: 'Select Layer',
                    fold: 'close',
                    name: 'Others',
                    layers: [
                        RoadLayer,
                        RiverLayer,
                        HatbazarLayer,
                        WaterbodyLayer,
                        soilMoistureLayer,
                    ],
                }),
            ],
            view: viewProps,
        });
        setMap(olmap);
        setSelectedBaseLayer(baseLayer);

    }, []);

    /* *********** Layer Switcher ********** */
    const layerSwitcher = new LayerSwitcher();
    if (map != null || map != undefined) {
        map.addControl(layerSwitcher);
    }

    /* *********** Onclick Event ********** */






    /* Remove Extra Rendered Map */
    const showMap = () => {
        if (map != null || map != undefined) {
            const mapElement = document.getElementById('map');

            if (mapElement.childElementCount) {
                while (mapElement.childElementCount > 1) {
                    mapElement.removeChild(mapElement.firstElementChild);
                }
            }
        }

    }
    useEffect(() => {
        showMap();

    }, [map]);


    return (

        <>

            <div ref={mapRef} id="map" style={{ width: '100%', height: '100vh', position: 'absolute' }} >
            </div>
        </>
    );
}



export default PublicMap;
