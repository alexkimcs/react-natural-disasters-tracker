import Map from './components/Map';
import MapCluster from './components/MapCluster';
import HeaderBar from './components/Header'
import React, { useState, useEffect } from 'react';

function App() {

  const [eventsData, setEventsData] = useState([]);
  // const [isLoading, setLoading] = useState(false);
  //Fetch NASA Events data
  useEffect(() => {
    const fetchData = async () => {
      // setLoading(true);
      const res = await fetch("https://eonet.sci.gsfc.nasa.gov/api/v2.1/events")
      //pulls events only
      const { events } = await res.json();
      
      setEventsData(events);
      // setLoading(false);
      console.log(eventsData);
    }
    fetchData();
    
  }, [])


  return (
    <div>
      <HeaderBar />
      <Map eventsData={eventsData} />

    </div>
  );
}

export default App;
 