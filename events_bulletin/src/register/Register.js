import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import { useAlert } from 'react-alert'
import './Register.css'

const Register = () => {
    const [fullname, setFullname] = useState('');
    const [location, setLocation] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNum, setPhoneNum] = useState('');
    const [passMatch, setPassMatch] = useState(false);
    const alert = useAlert()
    const newUser = {
        'name': fullname,
        'location': location,
        'username': username,
        'password': password,
        'email': email,
        'phone': phoneNum
    }
    const navigate = useNavigate();

    useEffect(() => {
        if(!passMatch) {
            document.getElementById("subBtn").disabled = true;
        }
        if(!passMatch && password === passwordConfirm && passwordConfirm.length > 0) {
            setPassMatch(true);
            document.getElementById("subBtn").disabled = false;
        }
    }, [password, passMatch, passwordConfirm])

    return (
        <div id="regCon">
            <p>Please Enter Your Full Name:</p>
            <input id="fName" type="text" onChange={()=>{
                    setFullname(document.getElementById('fName').value);
                }} />
            <p>Please Enter Your City Name:</p>
            <input id="locale" type="text" onChange={()=>{
                    setLocation(document.getElementById('locale').value);
                }}/>
            <p>Please Enter Your Username:</p>
            <input id="uName" type="text" onChange={()=>{
                    setUsername(document.getElementById('uName').value);
                }}/>
            <p>Please Enter Your Password:</p>
            <input id="pWord" type="password" onChange={()=>{
                    setPassword(document.getElementById('pWord').value);
                }}/>
            <p>Please Confirm Your Password:</p>
            <input id="pWordCon" type="password" onChange={()=>{
                    setPasswordConfirm(document.getElementById('pWordCon').value);
                }}/>
            <p>Please Enter Your Email:</p>
            <input id="email" type="email" onChange={()=>{
                    setEmail(document.getElementById('email').value);
                }}/>
            <p>Please Enter Your Phone Number:</p>
            <input id="pNum" type="tel" onChange={()=>{
                    setPhoneNum(document.getElementById('pNum').value);
                }}/><br/>
            <button id="subBtn" onClick={()=>{
                if(passMatch && password.length > 10) {
                    const init = {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(newUser)
                      };

                    fetch('http://localhost:8081/register', init)
                        .then(data => {
                            if (data.status === 201) {
                                alert.success('Thank you for registering!', {
                                    timeout: 2000,
                                    onClose: () => {
                                      navigate('/')
                                    }
                                  })
                            } else if (data.status === 400) {
                                alert.error('Username or Email already in use!', {timeout: 2000})
                            }
                        })
                        .catch((error) => console.error('Error:', error))
                }
            }}>Submit</button>
            {passMatch ? <p>Passwords Match!</p> : <p>Passwords must match!</p>}
            {password.length > 10 ? <p>Passwords Length Achieved!</p> : <p>Password is not long enough!</p>}
        </div>
    )
}

export default Register