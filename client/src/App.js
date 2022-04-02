import React, { useState, useEffect } from 'react';
import Map, { Marker } from 'react-map-gl';
import { listLogEntries } from './API'


function App() {
    const [logEntries, setLogEntries] = useState([]);
    const [viewState, setViewState] = useState({
        longitude: -100,
        latitude: 40,
        zoom: 3
    });

    useEffect(() => {
        (async () => {
            const logEntries = await listLogEntries();
            setLogEntries(logEntries)
        })();
    }, []);

    return <Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/1wayoranother/cl1h4gn5t001g15nq1z4gcqa0"
        style={{ width: "95vw", height: "100vh", margin: "auto" }}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
    >
        {
            logEntries.map(entry => {
                <Marker
                    key={entry._id}
                    longitude={entry.longitude}
                    latitude={entry.latitude}
                    anchor="bottom" >
                    <img src="./pin.png" />
                    <div>{entry.title}</div>
                </Marker>
            })
        }
    </Map>
}
export default App
