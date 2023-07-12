import React from 'react'
import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import {Link} from 'react-router-dom';
import './EventsEdit.css'
import {useParams} from 'react-router-dom'




const EventsEdit = () => {
  const [eventInfo, setEventInfo] = useState('');
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventDetails, setEventDetails] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [orgId, setOrgId] = useState('');
  const [eventGenre, setEventGenre] = useState('');
  const [selectedImage, setSelectedImage] = useState('');

  const { id } = useParams();
  useEffect(()=> {
    console.log(eventName)
    if(!eventName || eventName === undefined) {
      fetch(`http://localhost:8081/events/${id}`)
        .then(res => res.json())
        .then(data => setEventInfo(data[0]))
        .then(console.log(eventInfo))
        .then(() => {
          if(eventInfo) {
            setEventName(eventInfo.name)
            setEventLocation(eventInfo.location)
            setEventDate(eventInfo.date.substring(0,10))
            setEventDetails(eventInfo.details)
            setEventTime(eventInfo.time)
            setSelectedImage(eventInfo.imgPath)
          }
        })
    }
  },[id, eventInfo, eventName])

  const handleImageChange = (event) => {
    setSelectedImage(event.target.value);
  };

  return (
    <>
      <div className="flexcontainercreate">

          <div className='header'>EVENT EDIT</div>

        <form className="eventforms">
          <div>What is the name of your event?</div>
          <input id='form' type="text" placeholder="Event Name" onChange={e => {setEventName(e.target.value); console.log(eventName)}} maxlength='50' value={eventName}></input>
        </form>

        <form className="eventforms">
          <div>On what day is your event taking place?</div>
          <input id='form' type="date" placeholder="Event Date" onChange={e => setEventDate(e.target.value)} value={eventDate}></input>
        </form>

        <form className="eventforms">
          <div>What are the details of your event?</div>
          <textarea id='form' className='eventdetailsform' type="text" placeholder="Event Info" onChange={e => setEventDetails(e.target.value) } maxlength='512' value={eventDetails}></textarea>
        </form>

        {/* <form>
          <div>What are the minimum/maximum # of participants?</div>
          <input type="text" placeholder="Minimum # of Participants"></input>
          <input type="text" placeholder="Maximum # of Participants"></input>
        </form> */}

    <form className="eventforms">
      <div>Do you want to include an image?</div>
      <input id='form' type="text" placeholder="Image URL" onChange={handleImageChange} value={selectedImage} />
    </form>

{/* Should this be dynamic, updating based on the database of event types/genres? */}
        <div className="eventforms">
          <div>What type of event is it?</div>
          <select id='select' name='type' onChange={e => setEventGenre(e.target.value)}>
            <div>What type of event is it?</div>
            <option value='' selected disabled>Select an Option</option>
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
          <input id='form' type="text" placeholder="Event Location" value={eventLocation}></input>
        </form>

        <form className="eventforms">
          <div>What time will the event take place?</div>
          <input id='form' type="time" placeholder="Event Time" onChange={e => setEventTime(e.target.value)} value={eventTime}></input>
        </form>

        <form className="eventforms">
          <input className='button' type="button" value="Finalize Changes" onClick={() => {
            if (document.getElementById('form').value === '' || eventGenre === '') {
              window.alert('Make sure to fill all sections of the form!')
            } else {
              let resBody = [{
                "name": eventName,
                "location": eventLocation,
                "details": eventDetails,
                "date": eventDate,
                "time": eventTime,
                "genre_id": eventGenre,
                "imgPath": selectedImage,
              }]
              console.log(resBody)


             // create fetch init object
            const init = {
              method: 'PATCH',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify(resBody)
            };

            fetch(`http://localhost:8081/events/${id}`, init)
              // .then(response => response.json())
              .then(data => console.log(data))
              .catch((error) => console.error('Error:', error))
            window.location = `http://localhost:3000/events/${id}`
            }
          }}>
          </input>
        </form>

        <div id='uploadedImg'>
            {selectedImage?<img src = {selectedImage} alt =''/>:<p>No Image Uploaded</p>}

          </div>

      </div>
    </>
  )
}

export default EventsEdit