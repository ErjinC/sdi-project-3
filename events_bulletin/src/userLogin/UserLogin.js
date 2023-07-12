import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {useNavigate} from 'react-router-dom'
import { useAlert } from 'react-alert'
import './UserLogin.css'


async function loginUser(userData) {
  return fetch(`http://localhost:8081/login`)
        .then(res => res.json())
        .then(data => console.log(data))
      }





export default function UserLogin({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [DBPassword, setDBPassword] = useState();
  const navigate = useNavigate();
  const alert = useAlert();
  const sendSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      "username": username,
      "password": password
    });

    setToken(token);
  }
  return(
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={sendSubmit}>
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
            const init = {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify(password)
            }

            if(password) {
              fetch('http://localhost:8081/login', init)
                .then(data => {
                  if (data.status === 201) {
                    alert.success('Logging Successful!', {
                        timeout: 2000,
                        onClose: () => {
                          navigate('/')
                        }
                    })}})
              } else {
                  alert.error('User Not Found / Password Incorrect')
            }}}/>
          <button onClick={()=>{navigate('/register')}}>Register</button>
        </div>
      </form>
    </div>
  )
}

