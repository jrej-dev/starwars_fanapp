import React from 'react';
import Navbar from 'react-bootstrap/Navbar';

const Nav = ({Username}) => {
  return (
    <div className="Form">
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">
          {'StarWars Fan App'}
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
	        <Navbar.Text>
		    	Signed in as: <a href="/">Username</a>
		    </Navbar.Text>
	    </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default Nav;
