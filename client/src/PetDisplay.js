import React, { useState } from 'react';
import UpdatePet from './UpdatePet';
import "./AddPet.css";

const PetDisplay = props => {
  const [updatePetShow, setUpdatePetShow] = useState(false);

  // const { birthdate, breed, description, microchip, name, notes, sex, spayed, vaccinated, id} = props;
  const { breed, description, name, notes } = props;
  return (
    <div className="col-10 col-md-8 col-lg-7" onClick={() => setUpdatePetShow(true)}>
      <div className="card mb-4">
        <div className="card-header name text-info">
          { name }
        </div>
        <div className="card-body card-text">
          <p className="card-text"><strong>Breed: </strong>{ breed }</p>
          <p className="card-text"><strong>Color: </strong>{ description }</p>
          <p className="card-text"><strong>Notes: </strong>{ notes === null ? '' : Buffer.from(notes.data).toString() }</p>
        </div>
        <UpdatePet 
          show={updatePetShow}
          update = {props.update}
          onHide={() => setUpdatePetShow(false)}
          {...props}
        />
      </div>
    </div>
  );
}

export default PetDisplay;
