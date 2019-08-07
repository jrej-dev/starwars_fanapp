import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Data extends Component{
  constructor(){
    super()
    this.state = {
      apiList:[],
      keys:[],
      data:[]
    }
  }

  componentDidMount(){
    fetch('https://swapi.co/api/')
    .then(response => response.json())
    .then(data => this.setState({ apiList : data, keys: Object.keys(data) }))
    .catch(err => console.log('Fail',err));    

  }

  fetchData = (event) => {
    const { apiList } = this.state;
    fetch(apiList[event])
    .then(response => response.json())
    .then(results => this.setState ({ data : results }))
    .catch(err => console.log('Fail',err));  
  }

  handleSelect = (event) => {
    this.fetchData(event.target.value);
  }

  render(){
    const { keys, data } = this.state;
    return(
      <div>
        <h1>Data From StarWars</h1>
        <Row>
          <Col xs={6} className="col-centered mt-3">
            <Form onChange={this.handleSelect}>
              <Form.Control as="select">
                <option value=""> Select Subject... </option>
                {keys.map(i=> <option value={i} key={i}>{i}</option>)}
              </Form.Control>
            </Form>
          </Col>
        </Row>
        <table className="mt-3">
          <tbody className='tableBody'>
            {data.map(i=> <tr key={i}>{i}</tr>)}
          </tbody>
        </table>          
      
      </div>
    )
  }
}

export default Data;
