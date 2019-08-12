import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';

class Nav extends Component{
  
  render(){  
    return (
      <div className="Form">
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/">
            <h1 className='mt-1'>StarWars Fan App</h1>
          </Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
  	        <Navbar.Text>
  		    	Signed in as: <a href="/">{this.props.user}</a>
  		    </Navbar.Text>
  	    </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Nav;
