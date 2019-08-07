import { HashRouter, Route } from 'react-router-dom';
import React, { Component } from 'react';

import Nav from '../Components/Navbar';
import LoginForm from '../Components/LoginForm';
import Data from '../Components/Data';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './App.css';

class App extends Component {
  render(){
    return (
      <HashRouter basename='/'> 
        <div className="App">
            <Nav />
          <Container className="mt-5">
            <Row className="mt-3">
              <Col className="col-centered">
                <Route exact path='/' component={LoginForm}/>
                <Route path='/data' component={Data}/>
              </Col>
            </Row>
          </Container>
        </div>
      </HashRouter>
    );
  }
}

export default App;
