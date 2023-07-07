import './EventDetails.css'
import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'

const EventDetails = () => {

    const { id } = useParams();
    const [eventInfo, setEventInfo] = useState([]);

    useEffect(()=> {
        fetch(`http://localhost:8081/events/${id}`)
            .then(res => res.json())
            .then(data => setEventInfo(data[0]))
    },[id])

        if(eventInfo.name) {
            return (
                <>
                    <div id="eventInfoContainer">
                        <div id="eventInfo">
                            <p>Event Name: <span>{eventInfo.name}</span></p>
                            <p>Organizer: <span>{eventInfo.organizer_name}</span></p>
                            <p>Location: <span>{eventInfo.location}</span></p>
                            <p>Date: <span>{eventInfo.date.substring(0, 10)}</span></p>
                            <p>Time: <span>{eventInfo.time}</span></p>
                            <p>Attendees: <span>{eventInfo.attendees.split(',').length}</span></p>
                        </div>
                        <div id="eventImage">
                            <img alt="some image here"/><br/>
                            <div id="idButtons">
                                <button>Sign Me Up!</button>
                                <button>Contact Organizer</button>
                            </div>
                        </div>
                    </div>
                </>
            )
        }
}

export default EventDetails;