import React from 'react';
import { Modal, Button, Col, Row, Form } from 'react-bootstrap';

const AddAppointment = props => {
    const time = `${props.hour%12===0?'12':props.hour%12}${props.hour/12 >= 1 ? 'PM' : 'AM'}`;

    const inputStyle = {
        borderTop: '0',
        borderLeft: '0',
        borderRight: '0',
        borderBottom: '2px solid red',
        borderRadius: '0',
    }

    const handleSubmit = event => {
        event.preventDefault();

        const { time, task, selectedDog } = event.target;
        // Splits the time into format
        // [year , month , day]
        let appointmentDate = time.value.split('-');
        const form = 
        {
            apptTime: new Date(appointmentDate[0],appointmentDate[1]-1,appointmentDate[2],props.hour).toISOString(),
            task: task.value,
            petId: selectedDog.value,
            userId: 1,
        };
        console.log('form',form);
        console.log('form',);
        props.submit(form, props.pets[selectedDog.value - 1].name);
        props.onHide();
    }

    return (
        <div
            onClick={e => e.stopPropagation()}
        >
            <Modal
                onHide={props.onHide}
                show={props.show}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <div><strong>Setting Appointment at {time}</strong></div> 
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form id="AppointmentForm" onSubmit={handleSubmit}>
                <div className="container">
                    <Row>
                        <Col xs={2}>
                            <i className="far fa-clock"></i>
                        </Col>
                        <Form.Group as={Col} controlId="time">
                            <Form.Control 
                                type="date"
                                value={`${props.year}-${props.month+1 < 10 ? '0'+(props.month+1) : props.month+1}-${props.day < 10 ? '0'+props.day : props.day}`}
                                readOnly
                            />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Col xs={2}>
                            <i className="fas fa-scroll"></i>
                        </Col>
                        <Form.Group as={Col} controlId="task">
                            <Form.Control 
                                style={inputStyle}
                                type="text"
                                required
                                placeholder={props.task ? props.task : "Set a task"}
                            />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Col xs={2}>
                            <i className="fas fa-dog"></i>
                        </Col>
                        <Form.Group as={Col} controlId="selectedDog">
                            <Form.Control as="select" required>
                                {props.pets.map((pet,index) => {
                                    return <option key={index} value={pet.id}>{pet.name}</option>
                                })}
                            </Form.Control>
                        </Form.Group>
                    </Row>
                </div>
            </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" form="AppointmentForm" type="submit">Schedule Appointment</Button>
                <Button variant="danger" onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>            
    </div>
    );
} 
export default AddAppointment;