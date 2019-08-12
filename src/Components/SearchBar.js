import React from 'react';
import Form from 'react-bootstrap/Form';

const SearchBar = ({ searchChange }) =>{

    return (
      <div className="Form">
      	<form>
			<Form.Group controlId="formGroupSearch">
		    	<Form.Control
		    		as="input"
		    		type="text"	
		    		placeholder="Search..."
		    		onChange = {searchChange}
		    	/>
		  </Form.Group>
		</form>
      </div>
    );
  
}

export default SearchBar;
