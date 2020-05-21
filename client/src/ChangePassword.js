/* eslint-disable no-unused-expressions */
import React, { useState } from 'react';
import 'react-dates/initialize';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './AddPet.css';
import { Modal, Button, Col, Row, Form } from 'react-bootstrap';
import { Formik, yupToFormErrors } from 'formik';
import * as Yup from 'yup';

const ChangePassword = (props) => {
  return (



    <Modal
      onHide={props.onHide}
      show={props.show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <div className="name">Change Password</div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <Formik
          initialValues={{ password: '', confirmPassword: '' }}
          onSubmit={(values, { setSubmitting }) => {
            const userInfo = {
              password: values.password
            }

            props.submit(userInfo);
            props.onHide();
          }}

          validationSchema={Yup.object().shape({
            password: Yup.string()
              .label('Password')
              .required()
              .min(7, 'Must be at least 7 characters long'),
            confirmPassword: Yup.string()
              .label('Confirm Password')
              .required()
              .test('passwords-match', 'Passwords must match', function (value) {
                return this.parent.password === value;
              }),
          })}
        >

          {props => {
            const {
              values,
              touched,
              errors,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit,
            } = props;

            return (
              <div className="container">
            <Form id="UpdatePasswordForm" onSubmit={handleSubmit}>
              
              <Row key={1}>
                  <Col xs={5} className="att">
                    Password
                                        </Col>

                  <Form.Group as={Col} controlId="password">
                    <Form.Control
                      name="password"
                      type="password"
                      placeholder='Enter your password'
                      value={values.password}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                </Row>
                <Row key={2}>
                  <Col xs={5} className="att">
                    Confirm Password
                  </Col>

                  <Form.Group as={Col} controlId="confirmPassword">
                    <Form.Control
                      name="confirmPassword"
                      type="password"
                      placeholder='Confirm Password'
                      value={values.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                </Row>
                <Button variant="success" type="submit">Update Password</Button>
            </Form>
            </div>
          )}}
        </Formik>
      </Modal.Body>
    </Modal>





  );

}

export default ChangePassword;