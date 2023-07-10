import React from 'react'
import { useNavigate } from 'react-router'
import './Navbar.css'
import { Link } from 'react-router-dom'



const Navbar = () => {
    const navigate = useNavigate();

    return (
        <div id="navbarContainer">
            <div>
                <button className="navButton" onClick={()=>{
                    navigate('/')
                }}>Home</button>
                <button className="navButton" onClick={()=>{
                    navigate('/events/create')
                }}>Create Event</button>
                <button className="navButton" onClick={()=>{
                    navigate('/calendar')
                }}>Calendar</button>
            </div>
            <p >
                <Link id="appTitle" to= '/'>EVENT-TOOLY</Link>
            </p>
        </div>
    )

}

export default Navbar