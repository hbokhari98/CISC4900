import React, { useState } from 'react';
import 'react-dates/initialize';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Modal, Button, Col, Row, Form } from 'react-bootstrap';
import './AddPet.css';

const AddPet = props => {
    const [birthDate, setBirthDate] = useState(new Date())
    const [name, setName] = useState('pet')

    const handleSubmit = event => {

        event.preventDefault();

        const { breed, description, microchip, name, notes, sex, spayed, vaccinated } = event.target;

        if (microchip.value === '') {
            microchip.value = null;
        }

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

        props.submit(petInfo);
    }

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
                    <Form id="AddPetForm" onSubmit={handleSubmit}>
                        <div className="container">
                            <Row>
                                <Col xs={5} className="att">
                                    Name
                      </Col>
                                <Form.Group as={Col} controlId="name">
                                    <Form.Control
                                        type="text"
                                        placeholder="Pet's name"
                                        onChange={e => setName(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                            </Row>
                            <Row key={2}>
                                <Col xs={5} className="att">
                                    Date of Birth
                      </Col>
                                <Form.Group as={Col}>
                                    <DatePicker
                                        selected={birthDate}
                                        onChange={event => setBirthDate(event)}
                                        required
                                    />
                                </Form.Group>
                            </Row>
                            <Row>
                                <Col xs={5} className="att">
                                    Sex
                      </Col>
                                <Form.Group as={Col} controlId="sex">
                                    <Form.Control as="select" required>
                                        <option value={false}>Male</option>
                                        <option value={true}>Female</option>
                                    </Form.Control>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Col xs={5} className="att">
                                    Microchip #
                      </Col>
                                <Form.Group as={Col} controlId="microchip">
                                    <Form.Control
                                        type="text"
                                        placeholder="Microchip #"
                                        optional
                                    />
                                </Form.Group>
                            </Row>
                            <Row>
                                <Col xs={5} className="att">
                                    Breed
                      </Col>
                                <Form.Group as={Col} controlId="breed">
                                    <Form.Control
                                        type="text"
                                        placeholder="Breed"
                                        required
                                    />
                                </Form.Group>
                            </Row>
                            <Row>
                                <Col xs={5} className="att">
                                    Color
                      </Col>
                                <Form.Group as={Col} controlId="description">
                                    <Form.Control
                                        type="text"
                                        placeholder="Color"
                                        required
                                    />
                                </Form.Group>
                            </Row>
                            <Row>
                                <Col xs={5} className="att">
                                    Neutered/Spayed?
                      </Col>
                                <Form.Group as={Col} controlId="spayed">
                                    <Form.Control as="select" required>
                                        <option value={true}>Yes</option>
                                        <option value={false}>No</option>
                                    </Form.Control>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Col xs={5} className="att">
                                    Vaccinated?
                      </Col>
                                <Form.Group as={Col} controlId="vaccinated">
                                    <Form.Control as="select" required>
                                        <option value={true}>Yes</option>
                                        <option value={false}>No</option>
                                    </Form.Control>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Col xs={5} className="att">
                                    Notes
                      </Col>
                                <Form.Group as={Col} controlId="notes">
                                    <Form.Control as="textarea" rows="5" />
                                </Form.Group>
                            </Row>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" form="AddPetForm" type="submit">Add {name}</Button>
                    <Button variant="danger" onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AddPet;