// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// const saltRounds = 10;
// const myPlaintextPassword = 'IloveReact'
const express = require('express');
const app = express();
const port = 8081;
const knex = require('knex')(require('./knexfile.js')['development']);
const cors = require("cors");

app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(express.json());

//! GET blank homepage
app.get('/', (req, res) => {
  res.status(200).send('Welcome to the event database')
})

//! GET all events with participants
app.get('/events', (req, res) => {
  knex('events')
    .select(
      'events.id',
      'events.name',
      'organizer.name AS organizer_name',
      'events.details',
      'events.location',
      'events.date',
      'events.time',
      'interests.name AS genre_name',
      knex.raw("STRING_AGG(DISTINCT attendees.name, ', ') AS attendees")
      )
    .join('users AS organizer', 'events.organizer_id', '=', 'organizer.id')
    .join('users_events', 'events.id', '=', 'users_events.event_id')
    .join('users AS attendees', 'users_events.user_id', '=', 'attendees.id')
    .join('interests', 'events.genre_id', '=', 'interests.id')
    .groupBy(
      'events.id',
      'events.name',
      'organizer.name',
      'events.details',
      'events.location',
      'events.date',
      'events.time',
      'interests.name'
    )
    .then(data => res.status(200).send(data))
});

//get all events for a selected day
app.get('/calendar/:day', (req, res) => {
  let date = req.params.day;
  let dateParts = date.split('-');
  let newDate = new Date();
  newDate.setDate(dateParts[2])
  newDate.setFullYear(dateParts[0])
  newDate.setMonth(dateParts[1])

  knex('events')
    .select(
      'events.id',
      'events.name',
      'organizer.name AS organizer_name',
      'events.details',
      'events.location',
      'events.date',
      'events.time',
      'interests.name AS genre_name',
      knex.raw("STRING_AGG(DISTINCT attendees.name, ', ') AS attendees")
      )
      .join('users AS organizer', 'events.organizer_id', '=', 'organizer.id')
      .join('users_events', 'events.id', '=', 'users_events.event_id')
      .join('users AS attendees', 'users_events.user_id', '=', 'attendees.id')
      .join('interests', 'events.genre_id', '=', 'interests.id')
      .where('date', '=', newDate)
    .groupBy(
      'events.id',
      'events.name',
      'organizer.name',
      'events.details',
      'events.location',
      'events.date',
      'events.time',
      'interests.name'
    )
    .then(data => res.status(200).send(data))
});

//! GET single event with id param, including participants
app.get('/events/:id', (req, res) => {
  const { id } = req.params;
  knex('events')
    .select(
      'events.id',
      'events.name',
      'organizer.name AS organizer_name',
      'events.details',
      'events.location',
      'events.date',
      'events.time',
      'interests.name AS genre_name',
      knex.raw("STRING_AGG(DISTINCT attendees.name, ', ') AS attendees")
      )
    .where('events.id', id)
    .join('users AS organizer', 'events.organizer_id', '=', 'organizer.id')
    .join('users_events', 'events.id', '=', 'users_events.event_id')
    .join('users AS attendees', 'users_events.user_id', '=', 'attendees.id')
    .join('interests', 'events.genre_id', '=', 'interests.id')
    .groupBy(
      'events.id',
      'events.name',
      'organizer.name',
      'events.details',
      'events.location',
      'events.date',
      'events.time',
      'interests.name'
    )
    .then(data => res.status(200).send(data))
});

//! GET single user with id param, including interests
app.get('/user/:id', (req, res) => {
  const {id} = req.params;
  knex('users')
    .select(
      'users.*',
      knex.raw("STRING_AGG(interests.name, ', ') AS interests")
    )
    .where('users.id', id)
    .leftJoin('users_interests', 'users.id', '=', 'users_interests.user_id')
    .leftJoin('interests', 'users_interests.interest_id', '=', 'interests.id')
    .groupBy('users.id')
    .then(data => res.status(200).send(data))
});

//! GET list of interests
app.get('/interests', (req, res) => {
  knex('interests')
    .select('*')
    .then(data => res.status(200).send(data))
});

//! GET events filtered by date
app.get('/dateFilter', (req, res) => {
  let date = req.query.date;
  let dateParts = date.split('-');
  let newDate = new Date();
  newDate.setDate(dateParts[2])
  newDate.setFullYear(dateParts[0])
  newDate.setMonth(dateParts[1])

  knex('events')
    .select('*')
    .where('date', '=', newDate)
    .then(data => res.status(200).send(data));
})

//! POST new event
app.post('/events', (req, res) => {
  const eventToAdd = req.body;
  console.log(eventToAdd[0])
  let newEventId;

  knex('events')
    .count('*')
    // .then(data => Number(data[0].count))
    .then(data => {
      newEventId = Number(data[0].count)+1
      eventToAdd[0].id = newEventId

      return knex('events')
        .insert(eventToAdd[0])
    })
    .then(data => {
      return knex('events')
        .where('id', newEventId)
        .select('organizer_id')
    })
    .then(data => {
      const organizerId = data[0].organizer_id

      return knex('users_events')
        .insert({user_id: organizerId, event_id: newEventId})

    })
    .then(data => res.status(201).send(`${eventToAdd[0].name} added successfully`))
  })

app.delete('/events/:id', (req, res) => {
  const { id } = req.params

  knex('events')
    .select('*')
    .where('id', id)
    .del()
    .then(data => {
      res.status(204).send('Event Was Deleted')
    })
})

//! Add a patch to event
app.patch('/events/:id', (req, res) => {
  const { id } = req.params;
  const  updatedEvent = req.body;

  knex('events')
    .select('*')
    .where('id', id)
    .update(updatedEvent[0])
    .then(data => {
      res.status(201).send('Event updated')
    })
});

app.all('*', (req, res) => {
  res.status(200).send({
    Error: 'Path not found.'
  })
})

app.listen(8081, () => {
  console.log(`API Server is running on http.//localhost:${port}`);
});
