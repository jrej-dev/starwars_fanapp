import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';

class Nav extends Component {

  render() {
    return (
      <div className="Form">
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/starwars_fanapp/#/">
            <h1 className='mt-2'>StarWars Fan App</h1>
          </Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              User: <a href="/starwars_fanapp/#/">{this.props.user || "Signed off"}</a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Nav;