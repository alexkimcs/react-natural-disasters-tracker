import { Icon } from '@iconify/react';
import fireIcon from '@iconify/icons-emojione/fire';
import stormIcon from '@iconify/icons-emojione/cloud-with-lightning-and-rain';
import volcanoIcon from '@iconify/icons-emojione/volcano';
import iceIcon from '@iconify/icons-emojione/snowflake';

function Plot({ lat, lng, id, onClick }){
    // 8: "Wildfires",
    // 10: "Severe Storms",
    // 12: "Volcanoes",
    // 15: "Sea and Lake Ice"
    
    let setIcon = null;

    if(id === 8){
        setIcon = fireIcon;
    }
    else if(id === 10){
        setIcon = stormIcon;
    }
    else if(id === 12){
        setIcon = volcanoIcon;
    }
    else if(id === 15){
        setIcon = iceIcon;
    }
  //<Icon icon={ fireIcon } className="location-icon"/>
    return (
        <div className="marker" onClick={ onClick }>
            
            <Icon icon={ setIcon } className="location-icon"/>
        </div>
    );
}

export default Plot;