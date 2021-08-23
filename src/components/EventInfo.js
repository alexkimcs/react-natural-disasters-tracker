import React from 'react';

function EventInfo({info}) {
    return (
        <div className="event-info">
            <h2>{info.title}</h2>
            <p>{info.id}</p>
        </div>
    );
}

export default EventInfo;