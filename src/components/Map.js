import React, { useState, useRef } from 'react';
import Supercluster from 'supercluster';
import GoogleMapReact from 'google-map-react';
import Plot from './Plot';




function Map({ center, eventsData }) {

    //map setup
    const[zoom, setZoom] = useState(1);
    const mapRef = useRef();
    const [bounds, setBounds] = useState(null);

    //events Ids
    const eventIds = {
        8: "Wildfires",
        10: "Severe Storms",
        12: "Volcanoes",
        15: "Sea and Lake Ice"
    }

    


    console.log(eventsData);
    const plotEvents = eventsData.map( e => {
        if(e.categories[0].id === 8){
            return <Plot 
                lat={ e.geometries[0].coordinates[1]} 
                lng={ e.geometries[0].coordinates[0]}
                id= {e.id}
                />
        }
        
        return null;
    })

    

    return (
        <div className="map-1">
            <GoogleMapReact
                bootstrapURLKeys={{
                    key: process.env.REACT_APP_GOOGLE_API_KEY  }}
                    center = { center}
                    zoom = { zoom }>
                { plotEvents }
            </GoogleMapReact>
        </div>
    );
}

//test
Map.defaultProps = {
    center: {
        lat: 40.76988587647086,
        lng: -111.85908454624942
    },
    zoom: 6
}

export default Map;