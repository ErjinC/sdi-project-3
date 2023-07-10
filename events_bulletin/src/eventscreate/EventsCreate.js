import React from 'react'
import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import {Link} from 'react-router-dom';
import './EventsCreate.css'




const EventsCreate = () => {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventDetails, setEventDetails] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [orgId, setOrgId] = useState('');
  const [eventGenre, setEventGenre] = useState('');


  return (
    <>
      <div className="flexcontainercreate">
        <form className="eventforms">
          <div>What is the name of your event?</div>
          <input type="text" placeholder="Event Name" onChange={e => {setEventName(e.target.value); console.log(eventName)}} maxlength='50'></input>
        </form>

        <form className="eventforms">
          <div>On what day is your event taking place?</div>
          <input type="date" placeholder="Event Date" onChange={e => setEventDate(e.target.value)}></input>
        </form>

        <form className="eventforms">
          <div>What is your organizer ID?</div>
          <input type="text" placeholder="Organizer Id" onChange={e => setOrgId(e.target.value)} maxlength='50'></input>
        </form>

        <form className="eventforms">
          <div>What are the details of your event?</div>
          <textarea className='eventdetailsform' type="text" placeholder="Event Info" onChange={e => setEventDetails(e.target.value)} maxlength='512'></textarea>
        </form>

        {/* <form>
          <div>What are the minimum/maximum # of participants?</div>
          <input type="text" placeholder="Minimum # of Participants"></input>
          <input type="text" placeholder="Maximum # of Participants"></input>
        </form> */}

{/* Should this be dynamic, updating based on the database of event types/genres? */}
        <div className="eventforms">
          <div>What type of event is it? (Genre ID)</div>
          <select name='type' onChange={e => setEventGenre(e.target.value)}>
            <div>What type of event is it?</div>
            <option value='0'>Select an Option</option>
            <option value='1'>Basketball</option>
            <option value='2'>Settlers of Catan</option>
            <option value='3'>Drinks</option>
            <option value='4'>Soccer</option>
            <option value='5'>Risk</option>
            <option value='6'>Swimming</option>
          </select>
        </div>

        <form className="eventforms" onChange={e => setEventLocation(e.target.value)} maxlength='128'>
          <div>Location of the event?</div>
          <input type="text" placeholder="Event Location"></input>
        </form>

        <form className="eventforms">
          <div>What time will the event take place?</div>
          <input type="time" placeholder="Event Time" onChange={e => setEventTime(e.target.value)}></input>
        </form>

        <form className="eventforms">
          <input type="button" value="Create Event" onClick={() => {

            let resBody = [{
                "name": eventName,
                "location": eventLocation,
                "details": eventDetails,
                "date": eventDate,
                "time": eventTime,
                "genre_id": eventGenre,
                "organizer_id": orgId
              }]

             // create fetch init object
            const init = {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify(resBody)
            };

            fetch('http://localhost:8081/events', init)
              // .then(response => response.json())
              .then(data => console.log(data))
              .catch((error) => console.error('Error:', error))

          }}>
          </input>
        </form>
      </div>
    </>
  )
}

export default EventsCreate