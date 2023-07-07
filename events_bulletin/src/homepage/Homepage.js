import React from 'react'
import {Link} from 'react-router-dom';
import './Homepage.css'

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

        <Link to={'/events/create'} className='started'>
          Click Here To Get Started!
          {/* Change link to */}
        </Link>

        <Link to={'https://github.com/ErjinC/sdi-blended-workshop-databases-scaffold'} className='started'>
          GitHub Link
          {/* Change link to */}
        </Link>

      </div>
    </>
  )
}

export default Homepage