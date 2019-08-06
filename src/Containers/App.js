import { HashRouter, Route } from 'react-router-dom';
import React from 'react';

import Nav from '../Components/Navbar';
import LoginForm from '../Components/LoginForm';
import Data from '../Components/Data';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import './App.css';

function App() {
  return (
    <HashRouter basename='/'> 
      <div className="App">
          <Nav />
        <Container className="mt-5">
          <Row className="mt-3">
                <Route exact path='/' component={LoginForm}/>
                <Route path='/data' Component={Data}/>
          </Row>
        </Container>
        <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossorigin="anonymous"/>
      </div>
    </HashRouter>
  );
}

export default App;
