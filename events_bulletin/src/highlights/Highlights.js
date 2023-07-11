import React, {useState, useEffect, useRef} from 'react'
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
    const didMount = useRef(false);

    useEffect(()=> {
        fetch(`http://localhost:8081/events`)
            .then(res => res.json())
            .then(data => setEventList(data))
    },[])

    useEffect(() => {
        if (!didMount.current) {
            didMount.current = true;
        }
        eventList.sort((a, b) => b.attendees.split(',').length - a.attendees.split(',').length)
    }, [eventList])

    if(eventList.length > 5) {
        setEventList(eventList.slice(0, 5));
    }

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
                        <p><span>Name: </span>{activeEvent.name}</p>
                        <p><span>Location: </span>{activeEvent.location}</p>
                        <p><span>Attendees: </span>{activeEvent.attendees.split(',').length}</p>
                        <p><span>Details: </span>{activeEvent.details.length > 250 ? truncate(activeEvent.details) : activeEvent.details}</p>
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