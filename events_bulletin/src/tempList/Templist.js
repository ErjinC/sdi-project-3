import './Templist.css'
import React, {useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom';

const Templist = () => {
    const [eventList, setEventList] = useState([]);
    const { day } = useParams();
    let monthAdjust = day.split('-')
    monthAdjust[1] -= 1;
    const date = monthAdjust.join('-')
    const navigate = useNavigate();

    useEffect(()=> {
        fetch(`http://localhost:8081/calendar/${date}`)
            .then(res => res.json())
            .then(data => setEventList(data))
    },[date])

    if(eventList.length > 0) {
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
    } else {
        return <h1>No Events Found</h1>
    }
}

export default Templist;