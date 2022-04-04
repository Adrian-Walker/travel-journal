import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import { listLogEntries } from './API'


function App() {
    const [logEntries, setLogEntries] = useState([]);
    const [showPopup, setShowPopup] = useState({})
    const [viewState, setViewState] = useState({
        longitude: -100,
        latitude: 40,
        zoom: 3
    });

    useEffect(() => {
        // (async () => {
        //     const logEntries = await listLogEntries();
        //     setLogEntries(logEntries)
        //     console.log(logEntries)
        // })();
        axios.get('http://localhost:1337/api/logs')
            .then(res => {
                setLogEntries(res.data)
            })
    }, []);

    return <Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/1wayoranother/cl1h4gn5t001g15nq1z4gcqa0"
        style={{ width: "95vw", height: "100vh", margin: "auto" }}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
    >
        {
            logEntries.map(entry => (
                <div>
                    <Marker
                        key={entry._id}
                        longitude={entry.longitude}
                        latitude={entry.latitude}
                        anchor="bottom" >
                        <div
                            onClick={() => setShowPopup({
                                // ...showPopup,
                                [entry._id]: true,
                            })}
                        >
                            <svg
                                viewBox="0 0 24 24"
                                style={{
                                    width: '10px',
                                    height: '10px',
                                }}
                                width="52" height="52"
                                stroke="red"
                                className='marker'
                                stroke-width="1.5"
                                fill="none"
                                stroke-linecap="round"
                                stroke-linejoin="round" >
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                        </div>
                    </Marker>
                    {
                        showPopup[entry._id] ? (
                            <Popup
                                latitude={entry.latitude}
                                longitude={entry.longitude}
                                closeButton={true}
                                closeOnClick={false}
                                dynamicPosition={true}
                                onClose={() => setShowPopup({})}
                                anchor="top" >
                                <div className="popup">
                                    <h3>{entry.title}</h3>
                                    <p>{entry.comments}</p>
                                    <small>Visited on: {new Date(entry.visitDate).toLocaleDateString()}</small>
                                    {entry.image && <img src={entry.image} alt={entry.title} />}
                                </div>
                            </Popup>
                        ) : null
                    }
                </div>
            ))
        }
    </Map>
}
export default App
