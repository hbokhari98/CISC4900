/* eslint-disable no-use-before-define */
import React, { useState, useEffect, useCallback } from 'react';
import Button from 'react-bootstrap/Button';
import { BrowserRouter as Switch, Route } from 'react-router-dom';
import AddPet from './AddPet';
import './AddPet.css';
import PetDisplay from './PetDisplay';
import cogoToast from 'cogo-toast';

const Pet = () => {
  const [pets, setPets] = useState([]);
  const [addPetShow, setAddPetShow] = useState(false);
  const [didDataUpdate, setDidDataUpdate] = useState(0);

  const handleUpdate = useCallback( (json, petId) => {
    
    let url = `/api/pets/${petId}`;
    fetch(url, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json; charset=utf-8"
      },
      body: JSON.stringify(json),
    }).then(res =>  {
      if(res.ok) {
          cogoToast.success(`Successfully updated ${json.name}`);
      } else if(!res.ok) {
          cogoToast.error(`Error updating ${json.name}`);
      }
    }).then( () => {
      let update = didDataUpdate + 1;
      setDidDataUpdate(update);
    })
      .catch(err => console.log(err));
  }, [didDataUpdate]);

  const handleSubmit = json => {
    
    let url = "/api/pets";
    fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json; charset=utf-8"
      },
      body: JSON.stringify(json),
    }).then(res =>  {
      if(res.ok) {
          cogoToast.success(`Successfully added ${json.name}`);
      } else if(!res.ok) {
          cogoToast.error(`Error adding ${json.name}`);
      }
    }).then( () => {
      let update = didDataUpdate + 1;
      setAddPetShow(false);
      setDidDataUpdate(update);
    })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    fetch('/api/users/1/pets')
      .then(res => res.json())
      .then(pets => setPets(pets.map((pet, ii) => <PetDisplay {...pet} key={ii} update={handleUpdate} />)))
  }, [didDataUpdate, handleUpdate]);

  

  return (
    <React.Fragment>
      <div className="page">
        <div className="container-fluid text-center">
          <br />
          <div className="row justify-content-center">
            {pets}
          </div>
          <div className="cardBox">
            <Button className="buttonAddPet" onClick={() => setAddPetShow(true)}>
              Add Pet
            </Button>
            <AddPet
              show={addPetShow}
              submit={handleSubmit}
              onHide={() => setAddPetShow(false)}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
export default Pet;


