import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { withRouter } from "react-router-dom";
import './Login.css';

const SignUp = props =>{
    const [firstName, setFName] = useState('');
    const [lastName, setLName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const handleSubmit = e => {
        e.preventDefault();
        const userInfo =  {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
        }
        console.log(userInfo);
        fetch("/api/auth/signup", {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userInfo),
        })
          .then(res => {
            if(res.ok) {
                props.history.push("/user");
                this.props.onSignIn(true);
                return res;
            }
            throw new Error('Content validation');
          })
          .then(post => {
                setErrorMessage("");
          })
          .catch(err => {
                setErrorMessage("There was an issue signing up");
                console.log(err);
          });
    };
    return (   
       <div> <h2>{ errorMessage }</h2>
        <div className="container-fluid" id="banner">
            <div className="signupform">
                <form className="signupbox" onSubmit={handleSubmit}>
                    <label htmlFor="fname">First Name:</label>
                        <input type="text" name="fname" placeholder="John" onChange={event => setFName(event.target.value)}required/>
                    <label htmlFor="lname">Last Name:</label>
                        <input type="text" name="lname" placeholder="Doe" onChange={event => setLName(event.target.value)} required/>                                
                    <label htmlFor="email">Email:</label>
                        <input type="email" name="email" placeholder="Enter your email" onChange={event => setEmail(event.target.value)}  required/>
                    <label htmlFor="password">Password:</label>
                        <input type="password" name="password" placeholder="Enter a password" onChange={event => setPassword(event.target.value)} required/>
                    <button type="submit" className="buttonSignUp">Submit</button>
                        <p>Have an account?</p>
                    <Button href="/login" type="button" className="buttonLogin">Login Here</Button>
                </form>
            </div>    
        </div>
       </div> 
        );
}

export default withRouter(SignUp);
                   