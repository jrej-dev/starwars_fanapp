import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Data extends Component{
  constructor(){
    super()
    this.state = {
      apiList:{},
      keys:[],
      data:[{"Please Select Above...":"Fetch Data"}],
    }
  }

  componentDidMount(){
    fetch('https://swapi.co/api/')
    .then(response => response.json())
    .then(results => this.setState({ apiList : results, keys: Object.keys(results) }))
    .catch(err => console.log('Fail',err));
  }

  handleSelect = (event) => {
    this.fetchData(event.target.value);
  }

  fetchData = (value) => {
    const { apiList,data } = this.state;
    fetch(apiList[value])
    .then(response => response.json())
    .then(response => response.results)
    .then(results => this.setState ({ data : results }))
    .catch(err => console.log('Fail',err)); 
  }


  render(){
    const { keys, data, tableTitles } = this.state;
    const titles = Object.keys(data[0]).slice(0, 4);
    return(
      <div>
        <h1>Data From StarWars</h1>
        <Row>
          <Col xs={6} className="col-centered mt-3">
            <Form onChange={this.handleSelect}>
              <Form.Control as="select">
                <option value="">Select subject...</option>
                {keys.map(i=> <option value={i} key={i}>{i}</option>)}
              </Form.Control>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col className="col-centered">
            <table>
              <tbody className="tableBody">
                <tr className='tableTitleRow'>
                  {titles.map(title => <td key={title}>{title}</td>)}
                </tr>
                {data.map(i=><tr key={i.name}> 
                  <td>{Object.values(i)[0]}</td>
                  <td>{Object.values(i)[1]}</td>
                  <td>{Object.values(i)[2]}</td>
                  <td>{Object.values(i)[3]}</td>
                </tr>
                )}
              </tbody>
            </table>   
          </Col>  
        </Row> 
      </div>
    )
  }
}

export default Data;
