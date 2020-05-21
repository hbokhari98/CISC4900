import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './Navbar';
import Calendar from './Calendar';
import Info from './Info';
import Pet from './Pet';
import AddPet from './AddPet';
import SignUp from './SignUp';
import Login from './Login';
import Landing from './Landing';

const App = props =>{
  const months = ["January","Februrary","March","April","May","June","July","August","September","October","November","December"]
  const today = new Date();
  const [offsetMonth, setOffsetMonth] = useState(0);
  const [offsetYear, setOffsetYear] = useState(0);
  const [currentUser, setCurrentUser] = useState("Arif");
  const [userPic, setUserPic] = useState("/assets/tempDogFaceProfile.png");
  const [loggedIn, setLoggedIn] = useState(true);

  useEffect(() =>{
    fetch('/api/auth/login',{
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email: 'banai.arif@gmail.com', password: 'password'}),
    })
    .then(res => {
      if(res.ok){
        return res.json();
      }
      throw new Error('There was an issue logging in');
    })
    .then(data => {
      console.log('hi');
      console.log(data);
      setCurrentUser(data.userName)
    })
    .catch(err =>{
        console.log(err);
    })
  },[])

  const handleSwitch = indexMonth =>{
    let newMonth = offsetMonth;
    newMonth = newMonth + indexMonth;
    let newYear = offsetYear;
    newYear = Math.floor((newMonth-12) / 12);
    setOffsetMonth(newMonth);
    setOffsetYear(newYear);
  }

  const handleLogin = loggedIn =>{ 
    setLoggedIn(loggedIn) 
  }

  const getCurrentYear = () =>{
    let offsetMonthsToYear = Math.floor((today.getMonth() + offsetMonth)/12);
    return today.getFullYear()+offsetMonthsToYear;
  }

  const getCurrentMonth = () => {
    let curr = (12+today.getMonth()+(offsetMonth%12))%12;
    return curr;
  }

  return (
    <React.Fragment>
      <Router>
        <div className="container-fluid">
          <Navbar 
            userName={currentUser}
            picSrc={userPic}
            authorized={loggedIn ? true : false}
          />
          <Switch>
            <Route path="/" exact render={() => 
              (<Landing
                {...props}/>)}
            />
            <Route path="/SignUp" exact render={() => 
              (<SignUp
                {...props}/>)}
            />
            <Route path="/login" exact render={() => 
              (<Login 
                onSignIn={handleLogin}
                {...props}/>)}
            />
            <Route path="/user" exact render={() => 
              (<Calendar
                monthAsString={months[getCurrentMonth()]}
                monthAsNumber={getCurrentMonth()}
                year ={getCurrentYear()}
                onSwitch={handleSwitch}
                {...props}/>)}
            />
            <Route path="/info" exact render={() => 
              (<Info 
                {...props}/>)}
            />
            <Route path="/pets" exact render={() => 
              (<Pet 
                {...props}
                />)}
            />
              <Route path="/pets/addpet" exact render={() => 
              (<AddPet 
                {...props}/>)}
            />
          </Switch>
        </div>
      </Router>
    </React.Fragment>
    );
  } 
export default App;