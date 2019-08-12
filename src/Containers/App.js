import { HashRouter, Route } from 'react-router-dom';
import React, { Component } from 'react';

import Nav from '../Components/Navbar';
import LoginForm from '../Components/LoginForm';
import Data from '../Components/Data';
import Info from '../Components/Info';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './App.css';

class App extends Component {
  constructor(){
    super()
    this.state = {
      userEmail:'',
      infoUrl:''
    }
  }

  handleUser = (value) => {
    this.setState ({ userEmail : value });
    localStorage.setItem('currentUser', JSON.stringify(value));
  }

  handleUrl = (value) => {
    this.setState ({ infoUrl : value});
  }

  render(){
    return (
      <HashRouter basename='/'> 
        <div className="App">
            <Nav user={this.state.userEmail}/>
          <Container className="mt-5">
            <Row className="mt-3">
              <Col className="col-centered">
                <Route 
                  exact 
                  path='/' 
                  render={(props) => 
                    <LoginForm 
                      userEmail={this.handleUser}
                    />
                  }
                />
                <Route 
                  path='/data' 
                  render={(props) => 
                    <Data 
                      url={this.handleUrl}
                      userEmail={this.handleUser}
                    />
                  }
                />
                <Route 
                  path='/info' 
                  render={(props) => 
                    <Info 
                      url={this.state.infoUrl}
                    />
                  }
                />
              </Col>
            </Row>
          </Container>
        </div>
      </HashRouter>
    );
  }
}

export default App;
