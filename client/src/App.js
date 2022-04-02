import React from 'react';
// import * as React from 'react';
import Map from 'react-map-gl';

function App() {
    const [viewState, setViewState] = React.useState({
        longitude: -100,
        latitude: 40,
        zoom: 2.5
    });
    console.log(process.env.REACT_APP_MAPBOX_TOKEN)

    return <Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        style={{width: "80vw", height: "80vh", margin: "auto"}}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
    />;
}
export default App
