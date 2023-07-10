import {useEffect, useState} from 'react'
import './CalendarItem.css'

const CalendarItem = (props) => {
    const { date } = props.date;
    const dateString = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
    const [eventList, setEventList] = useState([]);

    useEffect(()=> {
        console.log('fetching')
        fetch(`http://localhost:8081/dateFilter?date=${dateString}`)
            .then(res => res.json())
            .then(data => setEventList(data))
    },[dateString])

    if(eventList.length > 0) {
        return (
            <div id="cevents">
                {console.log(eventList)}
                {eventList.map(event => {
                    return (
                        <p key={event.id} >{event.name}</p>
                    )
                })}
            </div>
        )
    }
}

export default CalendarItem