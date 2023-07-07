import {useEffect, useState} from 'react'

const CalendarItem = (props) => {
    const { date } = props.date;
    const dateString = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`
    const [eventList, setEventList] = useState([]);

    useEffect(()=> {
        fetch(`http://localhost:8081/dateFilter?date=${dateString}`)
            .then(res => res.json())
            .then(data => setEventList(data))
    },[dateString])

    if(eventList.length > 0) {
        return (
            <>{console.log(date)}</>
        )
    }
}

export default CalendarItem