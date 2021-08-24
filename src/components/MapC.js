import React, { useState, useRef } from 'react';
import useSuperCluster from 'use-supercluster';
import GoogleMapReact from 'google-map-react';
import Plot from './Plot';
import EventInfo from './EventInfo';



// const fetcher = (...args) => fetch(...args).then(res => res.json());
const Marker = ({children}) => children;

function Map({ center, eventsData }) {

    //map setup
    const[zoom, setZoom] = useState(2);
    const mapRef = useRef();
    const [bounds, setBounds] = useState(null);

    const[infoEvent, setInfo] = useState(null);

    //events Ids
    const eventIds = {
        8: "Wildfires",
        10: "Severe Storms",
        12: "Volcanoes",
        15: "Sea and Lake Ice"
    }

    
    // const url = 'https://eonet.sci.gsfc.nasa.gov/api/v2.1/events'
    // const {data, error} = useSWR(url, fetcher);
    // const nasa = data && !error? data: [];


    console.log(eventsData);


    // const plotEvents = eventsData.map( e => {
    //     if(e.categories[0].id){
    //         return <Plot 
    //             lat={ e.geometries[0].coordinates[1]} 
    //             lng={ e.geometries[0].coordinates[0]}
    //             id= {e.categories[0].id}
    //             onClick={()=> setInfo({ title: e.title,
    //                 id: e.id, 
    //                 date: e.geometries[0].date, 
    //                 source: e.sources[0].url})}
    //             />
    //     }
        
    //     return null;
    // })

    const points = eventsData.map(event => ({
        "type": "Feature",
        "properties": {
            "cluster": false,
            "eventId": event.id,
            "eventTitle": event.title,
            "eventCategory": event.categories[0].id,
            "eventDate": event.geometries[0].date,
            "eventUrl": event.sources[0].url

        },
        "geometry": {
            "type": "Point", 
            "coordinates": [event.geometries[0].coordinates[0], event.geometries[0].coordinates[1]]}
    }))

    const { clusters, supercluster } = useSuperCluster({
        points,
        bounds,
        zoom,
        options: {radius: 75, maxZoom: 20}
    });
    

    return (
        <div className="map-1">
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
                    onClick={() => {setInfo(null)}}
                    onDrag={() => {setInfo(null)}}
                    >
                    {clusters.map( cluster => {
                        const [longitude, latitude] = cluster.geometry.coordinates;
                        const {
                            cluster: isCluster, 
                            point_count: pointCount
                        }=cluster.properties;
                        const clusterIcon = cluster.properties.eventCategory;
                        
                        if(isCluster){
                            return(

                                <Marker 
                                    key={cluster.properties.eventCategory}
                                    id={clusterIcon}
                                    lat={latitude} 
                                    lng={longitude}
                                >
                                    <div
                                        className="events-marker"
                                        style={{
                                            width: `${10 + (pointCount / points.length) * 20}px`,
                                            height: `${10 + (pointCount / points.length) * 20}px`
                                        }}
                                        onClick={() => {
                                            const expansionZoom = Math.min(
                                              supercluster.getClusterExpansionZoom(cluster.id),
                                              20
                                            );
                                            mapRef.current.setZoom(expansionZoom);
                                            mapRef.current.panTo({ lat: latitude, lng: longitude });
                                          }}
                                        
                                        >
                                            
                                            {pointCount}
                                        </div>
                                </Marker>
                            );}
                            return(

                                <Plot
                                    id={clusterIcon}
                                    lat={latitude} 
                                    lng={longitude}
                                    onClick={()=> setInfo({ title: cluster.properties.eventTitle,
                                        id: cluster.properties.eventId, 
                                        date: cluster.properties.eventDate, 
                                        source: cluster.properties.eventUrl})}
                                >
                        
                
                                </Plot>
                            )


                    })}
                    

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