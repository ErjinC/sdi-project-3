import React, {useState} from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'



const Navbar = () => {
    // const navigate = useNavigate();
    const [search, setSearch] = useState('');

    return (
        <div id="navbarContainer">
            <div>
                <button className="navButton" onClick={()=>{
                    window.location=`http://localhost:3000/`
                }}>Home</button>
                <button className="navButton" onClick={()=>{
                    window.location=`http://localhost:3000/events/create`
                }}>Create Event</button>
                <button className="navButton" onClick={()=>{
                    window.location=`http://localhost:3000/calendar`
                }}>Calendar</button>
                <button className="navButton" onClick={()=>{
                    window.location=`http://localhost:3000/login`
                }}>Login</button>
            </div>
            <div id="searchCon">
                <input id="navSearch" type="text" placeholder="Search an Event..." onChange={()=>{
                    setSearch(document.getElementById('navSearch').value);
                }} onKeyDown={(event)=>{
                    if(event.key === 'Enter') {
                        window.location=`http://localhost:3000/search/${search}`
                    }
                }}/>
                <Link id="appTitle" to= '/' style={{ textDecoration: 'none' }}>EVENT-TOOLY</Link>
            </div>
        </div>
    )

}

export default Navbar