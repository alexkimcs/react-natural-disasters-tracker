import React, { useState, useRef } from 'react';
import Supercluster from 'supercluster';
import GoogleMapReact from 'google-map-react';
import Plot from './Plot';




function Map({ center, eventsData }) {

    //map setup
    const[zoom, setZoom] = useState(1);
    const mapRef = useRef();
    const [bounds, setBounds] = useState(null);

    //Event info
    const[info, setInfo] = useState(null);

    //events Ids
    const eventIds = {
        8: "Wildfires",
        10: "Severe Storms",
        12: "Volcanoes",
        15: "Sea and Lake Ice"
    }
     //array of keysSS
     let eventIdx= Object.keys(eventIds);
     eventIdx = eventIdx.map(i => Number(i));
 
     //points of each data point
     const points = eventsData.map(event => ({
         "type": "Feature",
         "properties": {
             "cluster": false,
             "eventId": event.id,
             "eventTitle": event.title,
             "eventCategory": event.categories[0].id
         },
         "geometry": {
             "type": "Point", 
             "coordinates": [event.geometries[0].coordinates[0], event.geometries[0].coordinates[1]]}
     }))
     //fetch clusters from hook
     //destructed object arrray of clisters
     const { cluster, supercluster } = new Supercluster({
         points,
         bounds,
         zoom,
         options: {radius: 75, maxZoom: 20}
     });
 
    


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
        <div className="map-container">
            <GoogleMapReact
                bootstrapURLKeys={{
                    key: process.env.REACT_APP_GOOGLE_API_KEY  }}
                    center = { center}
                    zoom = { zoom }
                    
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({ map }) => {
                        mapRef.current = map;
                    }}
                    onChange = {({ zoom, bounds }) => {
                        setZoom(zoom);
                        setBounds([
                            bounds.nw.lng,
                            bounds.se.lat,
                            bounds.se.lng,
                            bounds.nw.lat
                        ]);
                    }}
                    >
                    {cluster.map( clusters => {
                        const [longitude, latitude] = clusters.geometry.coordinates;
                        const {
                            clusters: isCluster, 
                            point_count: pointCount
                        }=clusters.properties;
                        const cId = clusters.properties.eventCategory;
                        if(isCluster){
                            return(
                                <div className="cluster-marker"
                                    style={{
                                        width: `${10 + (pointCount / points.length) *30}px`,
                                        height: `${10 + (pointCount / points.length) *30}px`
                                    }}
                                    onClick={() => {
                                        const expansionZoom = Math.min(supercluster.getGetClusterExpansionZoom(clusters.id),
                                        20);
                                        mapRef.current.setZoom(expansionZoom);
                                        mapRef.current.panTo({ lat: latitude, lng: longitude});
                                    }}
                                >
                                    {pointCount}
                                </div>
                            )
                        }
                        if(eventIdx.indexOf(cId) !== -1 && clusters.geometry.coordinates.length ===2){
                            return(
                                <Plot 
                                    lat={latitude}
                                    lng={longitude}
                                    id={cId}
                                    key={clusters.properties.eventId}
                                />
                            )
                        }
                    })}
                
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