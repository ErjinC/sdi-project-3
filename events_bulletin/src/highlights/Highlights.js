import React, {useState, useEffect} from 'react'
import './Highlights.css'
import {useNavigate} from 'react-router-dom'
import Slide from '@mui/material/Slide';
// import '@emotion/styled'
// import '@emotion/react'

const Highlights = () => {
    const [eventList, setEventList] = useState([]);
    const [curIndex, setCurIndex] = useState(0);
    const [activeEvent, setActiveEvent] = useState([]);
    const navigate = useNavigate();

    useEffect(()=> {
        fetch(`http://localhost:8081/events`)
            .then(res => res.json())
            .then(data => setEventList(data))
    },[])

    useEffect(() => {
        //Implementing the setInterval method
        const interval = setInterval(() => {
            if(curIndex < eventList.length - 1) {
                setActiveEvent(eventList[curIndex]);
                setCurIndex(curIndex + 1);
            } else {
                setActiveEvent(eventList[curIndex]);
                setCurIndex(0);
            }
        }, 5000);
        //Clearing the interval
        return () => clearInterval(interval);
    }, [eventList, curIndex]);

    function truncate(str){
        return (str.length > 250) ? str.slice(0, 250-1) + `...` : str;
    };

    if (activeEvent.attendees) {
        return (
                <div key={activeEvent.id} id="highlightContainer" onClick={()=>{
                    navigate(`/events/${activeEvent.id}`)
                }}>
                        <p>{activeEvent.name}</p>
                        <p>{activeEvent.location}</p>
                        <p>Attendees: {activeEvent.attendees.split(',').length}</p>
                        <p>Details: {activeEvent.details.length > 250 ? truncate(activeEvent.details) : activeEvent.details}</p>
                </div>
        )
    } else {
        return (
            <div id="highlightContainer">
                <h1>Event Loading...</h1>
            </div>
        )
    }
}

export default Highlights