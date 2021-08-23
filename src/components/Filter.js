import React, {useState, useRef} from 'react';

function Filter(props) {
    const[select, setSelect] = useState('ALL');
    const filterEvents = useRef();
    return (
        <div className="selector">
            <p>
                Event Category:
            </p>
            <select ref={filterEvents} onChange={() => {setSelect(filterEvents.current.value)}}>
                <option value="All">All</option>
                <option value="Wildfires">Wildfirea</option>
                <option value="Volcanoes">Volcanoes</option>
                <option value="Severe Storms">Severe Storms</option>
            </select>
        </div>
    );
}

export default Filter;