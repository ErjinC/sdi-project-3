import '../tempList/Templist.css'
import React, {useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom';

const SearchList = () => {
    const [eventList, setEventList] = useState([]);
    const { search } = useParams();
    const navigate = useNavigate();

    useEffect(()=> {
        fetch(`http://localhost:8081/search/${search}`)
        .then(res => res.json())
        .then(data => setEventList(data))
    },[search])

    if(eventList.length > 0) {
        return (
            <>
                {eventList.map(event => {
                    return (
                        <div key={event.id} className="eventListItem" onClick={()=>{
                            navigate(`/events/${event.id}`)
                        }}>
                            <p>{event.name}</p>
                            <p>{event.date.substring(0, 10)}</p>
                        </div>
                    )
                })}
            </>
        )
    } else {
        return <h1 style={{marginLeft: '1rem'}}>No Events Found</h1>
    }
}

export default SearchList;