/* Libraries */
import React, { useState, useEffect, useRef, useCallback } from "react";
import Map, { Marker, Source, Layer } from 'react-map-gl';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

/* Context */
import { useAppSelector } from '../../hooks/redux.hook';

/* Components */
import ButtonGreenComponent from '../ui/buttons/ButtonGreenComponent';
import ButtonWhiteComponent from '../ui/buttons/ButtonWhiteComponent';

/* Constants */
import cities from "src/data/russian-cities.json";

/* Styles */
import styles from './MapSelectComponent.module.css';

/* Component for selectiong a marker on the map  */
const MapSelectComponent = ({ city, style, setActive, setLatLng }) => {
    // States
    const [zoom, setZoom] = useState(14);
    const [markerLatLng, setMarkerLatLng] = useState({
        longitude: parseFloat(city.coords.lon),
        latitude: parseFloat(city.coords.lat),
    });
    const [clickMarker, setClickMarker] = useState(false);

    // Updating the coordinates of the marker when it is moved
    useEffect(() => {
        setMarkerLatLng({
            longitude: parseFloat(city.coords.lon),
            latitude: parseFloat(city.coords.lat),
        });
    }, [city]);

    return (
        <div className={styles['map-wrapper']}>
            <div className={styles['block-coord']}>
                <span className='span__text__black'>Поставьте точку на карте</span>
                <span className='span__text__black' style={{
                    display: 'grid',
                    justifyContent: 'flex-end'
                }}>Координаты метки: {markerLatLng.latitude.toFixed(4)};{markerLatLng.longitude.toFixed(4)}</span>
            </div>
            <Map
                initialViewState={{
                    longitude: parseFloat(city.coords.lon),
                    latitude: parseFloat(city.coords.lat),
                    zoom: zoom
                }}
                style={{
                    width: '100%',
                    height: '80%',
                    marginTop: '24px'
                }}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                mapboxAccessToken={"pk.eyJ1IjoiZGFuc3ciLCJhIjoiY2wyMGMyZzhuMHV3MDNjbWt5ajRuNHY2cSJ9.VQGluZCuS2Y1RclO0FuRTQ"}
                onDblClick={(e) => {
                }}
                onMouseMove={(e) => {
                    if (clickMarker) {
                        setMarkerLatLng({
                            latitude: e.lngLat.lat,
                            longitude: e.lngLat.lng,
                        })
                    }
                }}
            >
                {
                    !clickMarker && <Marker
                        latitude={markerLatLng.latitude}
                        longitude={markerLatLng.longitude}
                        color={"#FF0000"}
                        onClick={(e) => {
                            setClickMarker(!clickMarker);
                        }}
                    />
                }
                {
                    clickMarker && <Marker
                        latitude={markerLatLng.latitude}
                        longitude={markerLatLng.longitude}
                        color={"#0000FF"}
                        onClick={(e) => {
                            setClickMarker(!clickMarker);
                        }}
                    />
                }
            </Map>
            <div className={styles['block-btn']}>
                <ButtonWhiteComponent
                    title={"Отмена"}
                    clickHandler={() => {
                        setActive(false);
                    }}
                />
                <div
                    style={{
                        display: 'grid',
                        justifyContent: 'flex-end'
                    }}
                >
                    <ButtonGreenComponent
                        title={"Добавить координаты"}
                        clickHandler={() => {
                            setLatLng({
                                lat: markerLatLng.latitude,
                                lng: markerLatLng.longitude
                            })
                            setActive(false);
                        }}
                    />
                </div>
            </div>
        </div >
    )
}

export default MapSelectComponent;