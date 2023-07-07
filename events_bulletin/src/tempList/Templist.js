import './Templist.css'
import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom';

const EventDetails = () => {
    const [eventList, setEventList] = useState([]);
    const navigate = useNavigate();

    useEffect(()=> {
        fetch(`http://localhost:8081/events/`)
            .then(res => res.json())
            .then(data => setEventList(data))
    },[])

        return (
            <>
                {eventList.map(event => {
                    return (
                        <div key={event.id} className="eventListItem" onClick={()=>{
                            navigate(`/events/${event.id}`)
                        }}>
                            <p>{event.name}</p>
                            <p>{event.date.substring(0, 10)}</p>
                            <p>Attendees: {event.attendees.split(',').length}</p>
                        </div>
                    )
                })}
            </>
        )
}

export default EventDetails;