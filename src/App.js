import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
	const [ registerUsername, setRegisterUsername ] = useState('');
	const [ registerPassword, setRegisterPassword ] = useState('');
	const [ loginUsername, setLoginUsername ] = useState('');
	const [ loginPassword, setLoginPassword ] = useState('');
	const [ loggedInUser, setLoggedInUser ] = useState('');

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
		}).then((res) => console.log(res));
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
		}).then((res) => console.log(res));
	};

	const getUser = () => {
		axios({
			method: 'GET',
			withCredentials: true,
			url: 'https://b-passport.herokuapp.com/user'
			// url: 'http://localhost:4000/user'
		}).then((res) => setLoggedInUser(res.username));
	};

	const logout = () => {
		axios({
			method: 'GET',
			url: 'https://b-passport.herokuapp.com/register'
			// url: 'http://localhost:4000/logout'
		});
	};

	return (
		<div className='App'>
			<div>
				<h1>
					<u>
						<i>PASSPORT AUTH</i>
					</u>
				</h1>
			</div>
			<div>
				<h1>Register</h1>
				<input placeholder='username' onChange={(e) => setRegisterUsername(e.target.value)} type='text' />
				<input placeholder='password' onChange={(e) => setRegisterPassword(e.target.value)} type='text' />
				<button onClick={register}>Submit</button>
			</div>

			<div>
				<h1>Login</h1>
				<input placeholder='username' onChange={(e) => setLoginUsername(e.target.value)} type='text' />
				<input placeholder='password' onChange={(e) => setLoginPassword(e.target.value)} type='text' />
				<button onClick={login}>Submit</button>
			</div>

			<div>
				<h1>Get User</h1>
				<p>Current user logged in: {loggedInUser}</p>
				<button onClick={getUser}>Submit</button>
			</div>

			<div>
				<button onClick={logout}>logout</button>
				<small>
					<i>Check current logged in user disappear</i>
				</small>
			</div>
		</div>
	);
}

export default App;
