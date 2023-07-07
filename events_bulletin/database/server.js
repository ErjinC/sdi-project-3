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
      'users.name AS organizer_name',
      'events.details',
      'events.location',
      'events.date',
      'events.time',
      'interests.name AS genre_name',
      knex.raw("STRING_AGG(users.name, ', ') AS attendees")
    )
    .join('users', 'events.organizer_id', '=', 'users.id')
    .join('interests', 'events.genre_id', '=', 'interests.id')
    .leftJoin('users_events', 'events.id', '=', 'users_events.event_id')
    .groupBy(
      'events.id',
      'events.name',
      'users.name',
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
      'users.name AS organizer_name',
      'events.details',
      'events.location',
      'events.date',
      'events.time',
      'interests.name AS genre_name',
      knex.raw("STRING_AGG(users.name, ', ') AS attendees")
    )
    .where('events.id', id)
    .join('users', 'events.organizer_id', '=', 'users.id')
    .join('interests', 'events.genre_id', '=', 'interests.id')
    .leftJoin('users_events', 'events.id', '=', 'users_events.event_id')
    .groupBy(
      'events.id',
      'events.name',
      'users.name',
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

  knex('events')
    .select('*')
    .whereLike('date', `%${date}%`)
    .then(data => res.status(200).send(JSON.stringify(data)));
})

//! POST new event
app.post('/events', (req, res) => {
  const eventToAdd = req.body;

  knex('events')
    .select('id')
    .from('events')
    .where('id', eventToAdd.id)
    .then((row) => {
      if (!row) {
        console.log("select id does not exist")
        return res.send("did not exist")
      }

      return knex('events')
        .update('event', req.body.event)
        .where('id', row.id)
        .then(data => res.status(200))

        // return res.sendStatus(200);
    });
});
//Add a patch to event
// app.patch('/events/:id', (req, res) => {
//   const { id } = req.params;
//   const { updatedEvent } = req.body;

//   let eventToUpdate = eventsArr.find(event => event.id === id);
//   if (!eventToUpdate) {
//     return res.sendStatus(404);
//   }

//   eventToUpdate.event = updatedEvent;

//   res.sendStatus(204);
// });

// app.delete('/events/:id', (req, res) => {
//   const { id } = req.params;
//   const updatedEvent = eventsArr.filter(event => event.id !== id);
//   eventsArr = updatedEvent;

//   res.send("Event Has Been Deleted.")
// })




app.listen(8081, () => {
  console.log(`API Server is running on http.//localhost:${port}`);
});









