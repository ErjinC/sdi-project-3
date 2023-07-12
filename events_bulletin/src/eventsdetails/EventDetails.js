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
console.log(eventInfo)
    if(eventInfo !== undefined && eventInfo.name) {
        return (
            <>
                <div id="eventInfoContainer">
                    <div id="eventInfo">
                        <div id="eventPoints">
                            <p>Event Name:<br></br><span>{eventInfo.name}</span></p>
                            <p>Organizer:<br></br><span>{eventInfo.organizer_name}</span></p>
                            <p>Location:<br></br><span>{eventInfo.location}</span></p>
                            <p>Date:<br></br><span>{eventInfo.date.substring(0, 10)}</span></p>
                            <p>Time:<br></br><span>{eventInfo.time}</span></p>
                            <p>Attendees:<br></br><span>{eventInfo.attendees.split(',').length}</span></p>
                        </div>

                        <div id="eventPoints">
                            <p>Event Details:<br></br><span>{eventInfo.details}</span></p>
                        </div>
                    </div>

                    <div id="eventImage">
                        {console.log(eventInfo.imgPath)}

                        <img src={eventInfo.imgPath} alt="logo here"/><br/>

                        <div>
                            <input type="button" value="Sign Up for This Event!" onClick={() => {

                                let resBody = [{
                                    'user_id': document.getElementById('user_id').value,
                                    'event_id': id
                                }]
                                const init = {
                                    method: 'POST',
                                    headers: {'Content-Type': 'application/json'},
                                    body: JSON.stringify(resBody)
                                };

                                fetch('http://localhost:8081/users_events', init)
                                    // .then(response => response.json())
                                    .then(data => console.log(data))
                                    .catch((error) => console.error('Error:', error))

                                window.location.href=window.location.href;

                            }}></input>
                            <input id='user_id' type="text" placeholder="PLS ADD USER (CRASH)"></input>
                            {/* <button>Contact Organizer</button> */}
                        </div>

                        <div id="modifyButtons">
                            <input type="button" value="Edit Event" onClick={() => {
                            window.location=`http://localhost:3000/events/edit/${id}`
                            }}></input>

                            <input type="button" value="Delete Event" onClick={() => { //DELETE EVENT

                            fetch(`http://localhost:8081/events/${window.location.href.slice(-1)}`, { method: 'DELETE' })
                                .then(() => console.log('Deleted!'))
                                .catch((error) => console.error('Error:', error));
                            }}></input>

                        </div>
                    </div>

                </div>
            </>
        )
    } else {
        return <h1 style={{marginLeft: '1rem'}}>This page does not exist.</h1>
    }
}

export default EventDetails;