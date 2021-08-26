import Map from './components/Map';
import MapC from './components/MapC';
import HeaderBar from './components/Header'
import Filter from './components/Filter';
import Spinner from './components/Spinner';
import React, { useState, useEffect } from 'react';

function App() {

  const [eventsData, setEventsData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  //Fetch NASA Events data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await fetch("https://eonet.sci.gsfc.nasa.gov/api/v2.1/events")
      //pulls events only
      const { events } = await res.json();
      // setLoading(false);
      setEventsData(events);
      setLoading(false);
      // console.log(eventsData);
    }
    fetchData();
    
  },[])
// {/* <MapC eventsData={eventsData} /> */}

  return (
    <div>
      <HeaderBar />

      <MapC eventsData={eventsData} />

    </div>
  );
}

export default App;
 