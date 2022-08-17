import Map, { Marker, Source, Layer } from 'react-map-gl';
import { useAppSelector } from '../../hooks/redux.hook';

import styles from './MapComponent.module.css';

const MapComponent = () => {
    const configSlice = useAppSelector(store => store.configReducer);

    return (
        <Map
            initialViewState={{
                longitude: 104.298234,
                latitude: 52.262757,
                zoom: 14
            }}
            zoom={14}
            scrollZoom={false}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            mapboxAccessToken={configSlice.mapbox_access_token}
        ></Map>
    )
}

export default MapComponent;