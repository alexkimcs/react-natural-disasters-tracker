import React, { useState, useContext } from 'react';


const getContext = React.createContext();

//access values in context provider
export function Context(){
    return useContext(getContext);
}

export function ContextEvents({ ev }){
    const [eventData, setEventData] = useState([]);
    const [getEvent, setEvent] = useState(null);
    const [render, setRender] = useState(null);

    const val = {
        eventData,
        setEventData,
        getEvent,
        setEvent,
        render,
        setRender
    }

return(<getContext.Provider value={val}> {ev} </getContext.Provider>)
}
