import Map, { Marker, Source, Layer } from 'react-map-gl';
import { useAppSelector } from '../../hooks/redux.hook';

import styles from './MapComponent.module.css';

const MapComponent = (props) => {
    const configSlice = useAppSelector(store => store.configReducer);

    return (
        <Map
            {...props}
            initialViewState={{
                longitude: 104.298234,
                latitude: 52.262757,
                zoom: 14
            }}
            zoom={14}
            scrollZoom={false}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            mapboxAccessToken={"pk.eyJ1IjoiZGFuc3ciLCJhIjoiY2wyMGMyZzhuMHV3MDNjbWt5ajRuNHY2cSJ9.VQGluZCuS2Y1RclO0FuRTQ"}
        ></Map>
    )
}

export default MapComponent;