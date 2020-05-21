import React from "react";
import "./Landing.css"
import { Container, Row, Col } from "reactstrap";

import LandingPageHeader from "./LandingPageHeader.js";

function LandingPage() {
  return (
      <div className="wrapper">
      	<LandingPageHeader />
        <div className="section section-about-us back">
          <Container className="back">
            <Row>
              <Col className="ml-auto mr-auto text-center" md="8">
                <h1 className="text-info info back display-4">Who we are?</h1>
                <h5 className="back">
					Our business aims to provide the best dog-walking and training service in the city. In order
          to keep delivering our premium service, we set up this website for your convenience.
					This web-application will allow you to set up appointments to have their dog walked and/or 
					trained. The dog walker assigned will be based on the type of dog to be walked/trained, 
					the walkers and trainer sent during the meet & greet, and the availability of staff at 
					the time of appointment. During the day of the walk, the dog walker will be keeping 
					track of how the dog behaves: leash behavior, walking energy, bathroom behaviors, 
					and other characteristics. The motivation behind our business is to help dog owners 
					who are too busy to take their dogs on regular walks or training sessions, but want a 
					professional and quality service. 
                </h5>

                <h3 className="back">A True Dog deserves a TruWalk.</h3>
              </Col>
            </Row>
            <div className="separator separator-primary"></div>
          </Container>
        </div>
        <div className="section section-team text-center">
          <Container>
            <h2 className="text-info info back display-4">Here our some of our most loved clients</h2>
            <div className="team">
              <Row>
                <Col md="4">
                  <div className="team-player">
                    <img
                      alt="..."
                      className="rounded-circle img-fluid img-raised"
                      src="/assets/dog4.jpg"
                    ></img>
                    <h4 className="text-info title">Jack</h4>
                    <p className="description">
                      Jack is a hit not only with our team of trainers and dogwalkers,
                      but also with the frequent visitors of Central Park. Jack has impressed many
                      with his enthusiastic personality and has gained the love of all he meets.
                    </p>
                  </div>
                </Col>
                <Col md="4">
                  <div className="team-player">
                    <img
                      alt="..."
                      className="rounded-circle img-fluid img-raised"
                      src="/assets/dog5.jpg"
                    ></img>
                    <h4 className="text-info title">Rose</h4>
                    <p className="description">
                    Rose is a playful puppy that enjoys the outdoors. 
                    She loves to travel and to run around in parks, where she can meet
                    new people and get all the belly rubs she can. 
                    </p>
                  </div>
                </Col>
                <Col md="4">
                  <div className="team-player">
                    <img
                      alt="..."
                      className="rounded-circle img-fluid img-raised"
                      src="/assets/dog6.jpg"
                    ></img>
                    <h4 className="text-info title">Luke</h4>
                    <p className="description">
                   	Luke is a sociable puppy that loves to play with his friends. 
                   	He loves the outdoors, especially dog parks - so he can gather
                   	more friends and grab the attention of park visitors. 
                    </p>
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
          <Container>
				<img className="d-block w-100" src="/assets/services.png" alt="Services"/>
          </Container>
        </div>
      </div>
  );
}

export default LandingPage;