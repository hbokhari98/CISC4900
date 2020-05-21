import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ChangePassword from './ChangePassword';
import cogoToast from 'cogo-toast';

const Info = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [zipcode, setZipcode] = useState('');

    const [showChangePassword, setShowChangePassword] = useState(false);

    const [didDataUpdate, setDidDataUpdate] = useState(0);

    useEffect(() => {
        const url = '/api/users/';
        const userId = '1';
        fetch(url + userId)
            .then((res) => res.json())
            .then((res) => {
                setFirstName(res.firstName);
                setLastName(res.lastName);
                setPhone(res.phone);
                setEmail(res.email);
                setAddress(res.address);
                setSelectedCity(res.city);
                setSelectedState(res.state);
                setZipcode(res.zipcode);
            });
    }, [didDataUpdate]);

    const handleSubmit = (event) => {

        event.preventDefault();

        const json = {
            firstName,
            lastName,
            phone,
            email,
            address,
            selectedCity,
            selectedState,
            zipcode,
        };

        console.log(json);

        const userId = '1';
        fetch(`/api/users/${userId}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(json),
        }).then((res) => {
            if (res.ok) {
                cogoToast.success('User profile updated!');
                const update = didDataUpdate + 1;
                setDidDataUpdate(update);
            }
        }).catch((err) => console.log(err));

    };


    const handlePasswordSubmit = (json) => {
        const userId = '1';
        fetch(`/api/users/${userId}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(json),
        }).then((res) => {
            if (res.ok) {
                cogoToast.success('Password changed!');
                const update = didDataUpdate + 1;
                setDidDataUpdate(update);
            }
        }).catch((err) => console.log(err));
    }

    const nyStates = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN',
        'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV',
        'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN',
        'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'];

    return (
        <div className="loginpage">
        <Form id="UserInfoForm" onSubmit={handleSubmit} className="userInfo">
            <Row>
                <Form.Group as={Col} controlId="firstName">
                    <Form.Label><span> First Name </span></Form.Label>
                    <Form.Control
                        className="fatt"
                        type="text"
                        name="firstName"
                        value={!firstName ? '' : firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group as={Col} controlId="lastName">
                    <Form.Label><span> Last Name </span></Form.Label>
                    <Form.Control
                        className="fatt"
                        type="text"
                        name="lastName"
                        value={!lastName ? '' : lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </Form.Group>
            </Row>
            <Form.Group controlId="phoneNumber">
                <Form.Label><span> Phone Number </span></Form.Label>
                <Form.Control
                    className="fatt"
                    type="tel"
                    name="phone"
                    pattern="^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})"
                    value={!phone ? '' : phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group controlId="email">
                <Form.Label><span> Email </span></Form.Label>
                <Form.Control
                    className="fatt"
                    type="email"
                    name="email"
                    value={!email ? '' : email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group controlId="address">
                <Form.Label><span> Address </span></Form.Label>
                <Form.Control
                    className="fatt"
                    type="text"
                    name="address"
                    value={!address ? '' : address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                />
            </Form.Group>
            <Row>
                <Form.Group as={Col} controlId="selectedCity">
                    <Form.Label><span> City </span></Form.Label>
                    <Form.Control
                        className="fatt"
                        type="text"
                        name="city"
                        value={!selectedCity ? '' : selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group as={Col} controlId="selectedState">
                    <Form.Label><span> State </span></Form.Label>
                    <Form.Control as="select"
                        className="fatt"
                        name="state"
                        value={!selectedState ? nyStates[0] : selectedState}
                        onChange={(e) => setSelectedState(e.target.value)}
                        required
                    >
                        {nyStates.map((abrv) => <option key={abrv}>{abrv}</option>)}
                    </Form.Control>
                </Form.Group>
                <Form.Group as={Col} controlId="zipcode">
                    <Form.Label><span> Zip </span></Form.Label>
                    <Form.Control
                        className="fatt"
                        type="text"
                        name="zipcode"
                        value={!zipcode ? '' : zipcode}
                        onChange={(e) => setZipcode(e.target.value)}
                        required
                    />
                </Form.Group>
            </Row>

            <Button variant="danger" className='mr-2' onClick={() => setShowChangePassword(true)}>
                Change Password
            </Button>

            <Button variant="primary" className='mr-2' form="UserInfoForm" type="submit">
                Submit
            </Button>

            <ChangePassword
                show={showChangePassword}
                submit={handlePasswordSubmit}
                onHide={() => setShowChangePassword(false)}
            />
        </Form>
        </div>

    );
}


export default Info;
