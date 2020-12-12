import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
	const [ registerUsername, setRegisterUsername ] = useState('');
	const [ registerPassword, setRegisterPassword ] = useState('');
	const [ loginUsername, setLoginUsername ] = useState('');
	const [ loginPassword, setLoginPassword ] = useState('');
  const [ loggedInUser, setLoggedInUser ] = useState('');
  
  useEffect(() => {
    // Check logged in user in useEffect to be able to use it for logic 
    // even when you refresh the page you will see current user logged in
    axios({
      method: 'GET',
      withCredentials: true,
      url: 'https://b-passport.herokuapp.com/user'
      // url: 'http://localhost:4000/user'
    }).then((res) => setLoggedInUser(res.data.username));
  }, [])

	const register = () => {
		axios({
			method: 'POST',
			data: {
				username: registerUsername,
				password: registerPassword
			},
			withCredentials: true,
			url: 'https://b-passport.herokuapp.com/register'
			// url: 'http://localhost:4000/register'
		}).then((res) => {
      console.log(res)
      if (res.data === 'User Created and Logged In') {
        setRegisterUsername('')
        setRegisterPassword('')
        getUser()
      }
    })
	};

	const login = () => {
		axios({
			method: 'POST',
			data: {
				username: loginUsername,
				password: loginPassword
			},
			withCredentials: true,
			url: 'https://b-passport.herokuapp.com/login'
			// url: 'http://localhost:4000/login'
		}).then((res) => {
      console.log(res)
      // create logic to change state to properly re-render component
      // only run if successful
      if(res.status === 200) {
        setLoginUsername('')
        setLoginPassword('')
        getUser()
      }
    });
  };
  
  const getUser = async () => {
    await axios({
      method: 'GET',
      withCredentials: true,
      url: 'https://b-passport.herokuapp.com/user'
      // url: 'http://localhost:4000/user'
    }).then((res) => {
      console.log(res)
      setLoggedInUser(res.data.username)
    });
  }

	const logout = () => {
		axios({
      method: 'GET',
      withCredentials: true,
			url: 'https://b-passport.herokuapp.com/logout'
			// url: 'http://localhost:4000/logout'
    }).then(res => {
      console.log(res)
      if (res.status === 200) getUser()
    })
	};

	return (
		<div className="App">
			<div>
				<h1>
					<u>
						<i>PASSPORT AUTH</i>
					</u>
				</h1>
			</div>
			<div>
				<h1>Register</h1>
				<input placeholder="username" value={registerUsername} onChange={(e) => setRegisterUsername(e.target.value)} type="text" />
				<input placeholder="password" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} type="text" />
				<button onClick={register}>Submit</button>
			</div>

			<div>
				<h1>Login</h1>
				<input placeholder="username" value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} type="text" />
				<input placeholder="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} type="text" />
				<button onClick={login}>Submit</button>
			</div>

			<div>
				<h1>USER</h1>
				<p>Current user logged in: {loggedInUser}</p>
			</div>

			<div>
				<button onClick={logout}>logout</button>
				<p>
					<small>
						<i>Current logged in user disappears on logout</i>
					</small>
				</p>
			</div>
		</div>
	);
}

export default App;
