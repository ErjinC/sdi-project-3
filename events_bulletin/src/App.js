import React from 'react';
import Navbar from './navbar/Navbar.js'
import Homepage from './homepage/Homepage.js'
import EventsCreate from './eventscreate/EventsCreate.js'
import Calendar from './calendar/Calendar.js'
import UserLogin from './userLogin/UserLogin.js'
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import EventDetails from './eventsdetails/EventDetails.js'
import Templist from './tempList/Templist.js'
import Highlights from './highlights/Highlights.js'
import EventsEdit from './eventsedit/EventsEdit.js'
import SearchList from './searchList/SearchList.js'
import CatchAll from './catchAll/CatchAll.js'
import Review from './homepage/Review.js'
import Register from './register/Register.js'
import './App.css'
// import Stars from './stars/Stars.js'



function App() {
  return (
    <div className='flexcontainerapp'>
      <Navbar/>
        {/* <Route path = '/events/create' element ={<  />} /> */}
        {/* <Route path = '/events/:id' element ={<  />} /> */}
      <div className='main'>
        <Routes>
          <Route path = '/' element ={<Homepage/>} />
          <Route path = '/register' element ={<Register/>} />
          <Route path = '/reviews' element ={<Review/>} />
          <Route path = '/login' element ={<UserLogin/>} />
          <Route path = '/search/:search' element ={<SearchList/>} />
          <Route path = '/search/' element ={<SearchList/>} />
          <Route path = '/calendar/:day' element ={<Templist/>} />
          <Route path = '/events/:id' element ={<EventDetails />} />
          <Route path = '/events/create' element = {<EventsCreate/>} />
          <Route path = '/calendar' element ={<Calendar/>} />
          <Route path = '/test' element ={<Highlights/>} />
          <Route path = '/events/edit/:id' element = {<EventsEdit/>} />
          <Route path = '/userLogin' element ={<UserLogin/>} />
          <Route path = '*' element ={<CatchAll/>} />
        </Routes>
      </div>
      <div className="footer">&nbsp;</div>
    </div>
  )
}
export default App