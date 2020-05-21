import React, { useState } from 'react';
import 'react-dates/initialize';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './AddPet.css';
import { Modal, Button, Col, Row, Form } from 'react-bootstrap';

const UpdatePet = props => {
    let { birthdate, breed, description, microchip, name, notes, sex, spayed, vaccinated, id } = props;
    const [birthDate, setBirthDate] = useState(birthdate === null ? new Date() : birthdate);
    const [editMode, setEditMode] = useState(false);

    breed = breed === null ? '' : breed;
    description = description === null ? "" : description;
    microchip = microchip === null ? "" : microchip;
    name = name === null ? "No Name" : name;
    notes = notes === null ? '' : notes;
    sex = sex === null ? true : sex;
    spayed = spayed === null ? false : spayed;
    vaccinated = vaccinated === null ? false : vaccinated;


    const handleSubmit = e => {
        if (editMode) {
            e.preventDefault();

            const { breed, description, microchip, name, notes, sex, spayed, vaccinated } = e.target;
            const petInfo = {
                name: name.value,
                birthdate: new Date(birthDate).toISOString(),
                breed: breed.value,
                description: description.value,
                microchip: microchip.value,
                sex: sex.value,
                spayed: spayed.value,
                vaccinated: vaccinated.value,
                notes: notes.value,
            }

            props.update(petInfo, id);
            props.onHide();
        } else {
            e.preventDefault();
        }
    };

    const handleChange = e =>{
        notes=e.target.value;
    };

    const petPopUp = edit => {
        let modalBody = [];
        modalBody.push(
            <Row key={1}>
                <Col xs={5} className="att">
                    Name
        </Col>
                {edit ?
                    <Form.Group as={Col} controlId="name">
                        <Form.Control
                            type="text"
                            placeholder={name}
                            required
                        />
                    </Form.Group> :
                    <Form.Group as={Col} controlId="name">
                        <Form.Control
                            type="text"
                            value={name}
                            readOnly
                        />
                    </Form.Group>
                }
            </Row>
        )
        modalBody.push(
            <Row key={2}>
                <Col xs={5} className="att">
                    Date of Birth
        </Col>
                {edit ?
                    <Form.Group as={Col}>
                        <DatePicker
                            selected={new Date(birthDate)}
                            onChange={event => setBirthDate(event)}
                            required
                        />
                    </Form.Group> :
                    <Form.Group as={Col}>
                        <DatePicker
                            selected={new Date(birthDate)}
                            readOnly
                        />
                    </Form.Group>
                }
            </Row>
        )
        modalBody.push(
            <Row key={3}>
                <Col xs={5} className="att">
                    Sex
        </Col>
                {edit ?
                    <Form.Group as={Col} controlId="sex">
                        <Form.Control as="select" placeholder="N/A" defaultValue={sex === "" ? false : sex} required>
                            <option value={false}>Male</option>
                            <option value={true}>Female</option>
                        </Form.Control>
                    </Form.Group> :
                    <Form.Group as={Col} controlId="sex">
                        <Form.Control as="select" placeholder="N/A" defaultValue={sex === "" ? false : sex} disabled>
                            <option value={false}>Male</option>
                            <option value={true}>Female</option>
                        </Form.Control>
                    </Form.Group>
                }
            </Row>
        )
        modalBody.push(
            <Row key={4}>
                <Col xs={5} className="att">
                    Microchip #
        </Col>
                {edit ?
                    <Form.Group as={Col} controlId="microchip">
                        <Form.Control
                            type="text"
                            placeholder={microchip}
                            optional
                        />
                    </Form.Group> :
                    <Form.Group as={Col} controlId="microchip">
                        <Form.Control
                            type="text"
                            placeholder="N/A"
                            value={microchip}
                            readOnly
                        />
                    </Form.Group>
                }
            </Row>
        )
        modalBody.push(
            <Row key={5}>
                <Col xs={5} className="att">
                    Breed
        </Col>
                {edit ?
                    <Form.Group as={Col} controlId="breed">
                        <Form.Control
                            type="text"
                            placeholder={breed}
                            required
                        />
                    </Form.Group> :
                    <Form.Group as={Col} controlId="breed">
                        <Form.Control
                            type="text"
                            value={breed}
                            placeholder="N/A"
                            readOnly
                        />
                    </Form.Group>
                }
            </Row>
        )
        modalBody.push(
            <Row key={6}>
                <Col xs={5} className="att">
                    Color
        </Col>
                {edit ?
                    <Form.Group as={Col} controlId="description">
                        <Form.Control
                            type="text"
                            placeholder={description}
                            required
                        />
                    </Form.Group> :
                    <Form.Group as={Col} controlId="description">
                        <Form.Control
                            type="text"
                            value={description}
                            placeholder="N/A"
                            readOnly
                        />
                    </Form.Group>
                }
            </Row>
        )
        modalBody.push(
            <Row key={7}>
                <Col xs={5} className="att">
                    Neutered/Spayed?
        </Col>
                {edit ?
                    <Form.Group as={Col} controlId="spayed">
                        <Form.Control as="select" placeholder="N/A" defaultValue={spayed === "" ? false : spayed} required>
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                        </Form.Control>
                    </Form.Group> :
                    <Form.Group as={Col} controlId="spayed">
                        <Form.Control as="select" placeholder="N/A" defaultValue={spayed === "" ? false : spayed} disabled>
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                        </Form.Control>
                    </Form.Group>
                }
            </Row>
        )
        modalBody.push(
            <Row key={8}>
                <Col xs={5} className="att">
                    Currently on Vaccination?
        </Col>
                {edit ?
                    <Form.Group as={Col} controlId="vaccinated">
                        <Form.Control as="select" placeholder="N/A" defaultValue={vaccinated === "" ? false : vaccinated} required>
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                        </Form.Control>
                    </Form.Group> :
                    <Form.Group as={Col} controlId="vaccinated">
                        <Form.Control as="select" placeholder="N/A" defaultValue={vaccinated === "" ? false : vaccinated} disabled>
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                        </Form.Control>
                    </Form.Group>
                }
            </Row>
        )
        modalBody.push(
            <Row key={9}>
                <Col xs={5} className="att">
                    Notes
        </Col>

        {edit ?
        <Form.Group as={Col} controlId="notes">
            <Form.Control as="textarea" rows="5" placeholder="N/A" defaultValue={Buffer.from(notes).toString()} onChange={handleChange}/>
        </Form.Group> :
        <Form.Group as={Col} controlId="notes">
            <Form.Control as="textarea" rows="5" placeholder="N/A" defaultValue={Buffer.from(notes).toString()} disabled/>
        </Form.Group>                    
        }
        </Row>
    )
    return (
        <div onClick={e => e.stopPropagation()}>
            <Modal
                onHide={props.onHide}
                show={props.show}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <div className="name">{name}</div> 
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id="UpdatePetForm" onSubmit={handleSubmit}>
                        <div className="container">    
                            {modalBody}
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="warning" onClick={() => setEditMode(!editMode)}>Edit</Button>
                    <Button variant="success" form="UpdatePetForm" type="submit">Update {props.name}</Button>
                    <Button variant="danger" onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>            
        </div>
    )
    }

    return (
        petPopUp(editMode)
    )

}

export default UpdatePet;