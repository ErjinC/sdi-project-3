import React from 'react'
import { useNavigate } from 'react-router'
import './Navbar.css'


const Navbar = () => {
    const navigate = useNavigate();

    return (
        <div id="navbarContainer">
            <div>
                <button className="navButton" onClick={()=>{
                    navigate('/')
                }}>Home</button>
                <button className="navButton" onClick={()=>{
                    navigate('/events')
                }}>View Events</button>
                <button className="navButton" onClick={()=>{
                    navigate('/events/create')
                }}>Create Event</button>
                <button className="navButton" onClick={()=>{
                    navigate('/calendar')
                }}>Calendar</button>
            </div>
            <p id="appTitle">EVENT-TOOLY</p>
        </div>
    )

}

export default Navbar