import React, { useState, useRef } from 'react';
import Supercluster from 'supercluster';
import GoogleMapReact from 'google-map-react';
import Plot from './Plot';
import EventInfo from './EventInfo';




function Map({ center, eventsData }) {

    //map setup
    const[zoom, setZoom] = useState(1);
    const mapRef = useRef();
    const [bounds, setBounds] = useState(null);


    //redner info box
    const[infoEvent, setInfo] = useState(null);

    //events Ids
    const eventIds = {
        8: "Wildfires",
        10: "Severe Storms",
        12: "Volcanoes",
        15: "Sea and Lake Ice"
    }



    console.log(eventsData);

    const plotEvents = eventsData.map( e => {
        if(e.categories[0].id){
            return <Plot 
                lat={ e.geometries[0].coordinates[1]} 
                lng={ e.geometries[0].coordinates[0]}
                id= {e.categories[0].id}
                onClick={()=> setInfo({ title: e.title,
                    id: e.id, 
                    date: e.geometries[0].date, 
                    source: e.sources[0].url})}
                />
        }
        
        return null;
    })

    

    return (
        <div className="map-1">
            <GoogleMapReact
                bootstrapURLKeys={{
                    key: process.env.REACT_APP_GOOGLE_API_KEY  }}
                    center = { center }
                    zoom = { zoom }
                    onClick={() => {setInfo(null)}}>
                { plotEvents }
            </GoogleMapReact>
            {infoEvent && <EventInfo info={infoEvent} />}
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