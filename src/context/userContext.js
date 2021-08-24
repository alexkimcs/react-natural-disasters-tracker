import React, { useState, useContext, createContext } from 'react';


// const getContext = React.createContext();

// //access values in context provider
// export function Context(){
//     return useContext(getContext);
// }

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const [render, setRender] = useState(null);
    
    const value = {render, setRender}

    return(
        <UserContext.Provider value={ value }>
            {children}
        </UserContext.Provider>
    )
}

// export function ContextEvents({ ev }){
//     const [eventData, setEventData] = useState([]);
//     const [getEvent, setEvent] = useState(null);
//     const [render, setRender] = useState(null);

//     const val = {
//         eventData,
//         setEventData,
//         getEvent,
//         setEvent,
//         render,
//         setRender
//     }

// }
