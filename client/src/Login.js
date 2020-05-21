import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Link, withRouter } from "react-router-dom";
import './Login.css';

const Login = props => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const handleSubmit = e => {
		e.preventDefault();
        let userCookie = '';
        // fetch('/api/auth/login',{
        //     method: 'POST',
		// 	credentials: 'include',
		// 	headers: {
		// 		'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({email: 'banai.arif@gmail.com', password: 'password'}),
        // })
        // .then(res => {
        //     if(res.ok){
        //         userCookie = document.cookie;
        //         this.props.onSignIn = true;
        //         props.history.push("/user");
        //     }
        //     throw new Error('There was an issue logging in');
        // })
        // .catch(err =>{
        //     console.log(err);
        // });
	};
					
	return (   
		<div className="loginpage">
			<div className="loginform">
			<h1>Welcome back! </h1>
					<form className="loginbox" onSubmit={handleSubmit}>
						<label htmlFor="email">Email:</label>
						<br/>
						<input type="email" name="email" placeholder="Enter your email:" onChange={event => setEmail(event.target.value)} required/>
						<br/>
						<label htmlFor="password">Password:</label>
						<br/>
						<input type="password" name="password" placeholder="Enter a password" onChange={event => setPassword(event.target.value)} required/>
						<br/>
						<button type="submit" className="btn btn-primary buttonLogin" >Login</button>
						<br/>
						<p>Don't have an account?</p>
						<Button href="/signup" type="button" className="buttonSignUp" onClick={() => props.onSignIn(true)}>Create Account</Button>
					</form>
				</div>    
			</div>
    );
}

 
export default withRouter(Login);
