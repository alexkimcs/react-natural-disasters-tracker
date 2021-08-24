import React from 'react';

function EventInfo({info}) {
 
    // <p>Date: {info.geometries.date[0]}</p>
    return (
        <div className="event-info">
            <h2>{info.title}</h2>
            <p> ID: {info.id}</p>
            <p> Date: {info.date}</p>
            <p> Source: {info.source}</p>

        </div>
    );
}

export default EventInfo;