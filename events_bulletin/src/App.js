import React from 'react';
import Navbar from './navbar/Navbar.js'
import Homepage from './homepage/Homepage.js'
import EventsCreate from './eventscreate/EventsCreate.js'
import Calendar from './calendar/Calendar.js'
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import EventDetails from './eventsdetails/EventDetails.js'
import Templist from './tempList/Templist.js'
import Highlights from './highlights/Highlights.js'
import EventsEdit from './eventsedit/EventsEdit.js'
import './App.css'



function App() {
  return (
    <div className='flexcontainerapp'>
      <Navbar/>
        {/* <Route path = '/events/create' element ={<  />} /> */}
        {/* <Route path = '/events/:id' element ={<  />} /> */}
      <div className='main'>
        <Routes>
          <Route path = '/' element ={<Homepage/>} />
          <Route path = '/calendar/:day' element ={<Templist/>} />
          <Route path = '/events/:id' element ={<EventDetails />} />
          <Route path = '/events/create' element = {<EventsCreate/>} />
          <Route path = '/calendar' element ={<Calendar/>} />
          <Route path = '/test' element ={<Highlights/>} />
          <Route path = '/events/edit/:id' element = {<EventsEdit/>} />
        </Routes>
      </div>
      <div className="footer">&nbsp;</div>
    </div>
  )
}
export default App