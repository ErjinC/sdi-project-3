import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './UserLogin.css'

export default function UserLogin() {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  return(
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form>
        <label>
          <p>Username</p>
          <input type="text" onChange={e => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <div>
          <input type="button" value ="Submit"onClick={() => {
}}></input>
        </div>
      </form>
    </div>
  )
}

async function loginUser(userData) {
    return fetch('http://localhost:8081/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
      .then(data => data.json())
   }