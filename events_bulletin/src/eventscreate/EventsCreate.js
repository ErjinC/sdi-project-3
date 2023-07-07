import React from 'react'
import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import {Link} from 'react-router-dom';
import './EventsCreate.css'

function createResponse() {
  setResponseBody()
}

const EventsCreate = () => {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventDetails, setEventDetails] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventTime, setEventTime] = useState('');
  // Make context later
  const [responeBody, setResponseBody] = useState([]);


  return (
    <>
      <div className="flexcontainercreate">
        <form className="eventforms">
          <div>What is the name of your event?</div>
          <input type="text" placeholder="Event Name" onChange={e => setEventName(e.target.value)}></input>
        </form>

        <form className="eventforms">
          <div>On what day is your event taking place?</div>
          <input type="date" placeholder="Event Date" onChange={e => setEventDate(e.target.value)}></input>
        </form>

        <form className="eventforms">
          <div>What are the details of your event?</div>
          <textarea className='eventdetailsform' type="text" placeholder="Event Info" onChange={e => setEventDetails(e.target.value)}></textarea>
        </form>

        {/* <form>
          <div>What are the minimum/maximum # of participants?</div>
          <input type="text" placeholder="Minimum # of Participants"></input>
          <input type="text" placeholder="Maximum # of Participants"></input>
        </form> */}

{/* Should this be dynamic, updating based on the database of event types/genres? */}
        <div className="eventforms">
          <div>What type of event is it?</div>
          <select name='type'>
            <div>What type of event is it?</div>
            <option value='food'>Food</option>
            <option value='official'>Official</option>
            <option value='gaming'>Gaming</option>
          </select>
        </div>

        <form className="eventforms" onChange={e => setEventLocation(e.target.value)}>
          <div>Location of the event?</div>
          <input type="text" placeholder="Event Location"></input>
        </form>

        <form className="eventforms">
          <div>What time will the event take place?</div>
          <input type="time" placeholder="Event Time" onChange={e => setEventTime(e.target.value)}></input>
        </form>

        <form className="eventforms">
          <input type="button" value="Create Event" onclick={createResponse()}></input>
        </form>
      </div>
    </>
  )
}

export default EventsCreate