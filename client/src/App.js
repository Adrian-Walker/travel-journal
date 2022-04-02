import React, { useState, useEffect } from 'react';
import Map from 'react-map-gl';


function App() {
    const [viewState, setViewState] = useState({
        longitude: -100,
        latitude: 40,
        zoom: 15
    });

    useEffect(() => {

    }, []);

    return <Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/1wayoranother/cl1h4gn5t001g15nq1z4gcqa0"
        style={{ width: "95vw", height: "100vh", margin: "auto" }}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
    />;
}
export default App
