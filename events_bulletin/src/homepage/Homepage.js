import React from 'react'
import {Link} from 'react-router-dom';
import './Homepage.css'
import Highlights from '../highlights/Highlights.js'
import Review from './Review.js'




const Homepage = () => {
  return (
    <>
      <div className='flexcontainer'>

        <div className='title'>
          Welcome to EVENT-TOOLY!
        </div>

        <div className='acronym'>
          (EXTREMELY VERSATILE EVENT NAVIGATION TOOL - TIMETABLE ORGANIZATION OBJECT LIBRARY)
        </div>

        <div className='credits'>
          Made by SDI-17 Group 5
        </div>

        <Link to={'/events/create'} className='started hplink'>
          Click Here To Get Started!
          {/* Change link to */}
        </Link>

        <Link to={'https://github.com/ErjinC/sdi-project-3/tree/main'} className='started hplink'>
          GitHub Link
          {/* Change link to */}
        </Link>

        <Link to={'/reviews'} className='started hplink'>
          Review Our App!
        </Link>

        <h2 id="popEvents">Popular Events:</h2>
        <Highlights/>


      </div>
    </>


 )
}

export default Homepage;