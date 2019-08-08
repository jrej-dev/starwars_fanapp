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
      data:[],
      select:"people",
      tableTitles:[]
    }
  }

  componentDidMount(){
    fetch('https://swapi.co/api/')
    .then(response => response.json())
    .then(results => this.setState({ apiList : results, keys: Object.keys(results) }))
    .catch(err => console.log('Fail',err));
    this.fetchData()    
  }

  handleSelect = (event) => {
    this.setState ({ select : event.target.value });
    this.fetchData();
  }

  fetchData = () => {
    const { apiList, select } = this.state;
    fetch(apiList[select])
    .then(response => response.json())
    .then(response => response.results)
    .then(results => this.setState ({ data : results }))
    .catch(err => console.log('Fail',err)); 

    this.createTableTitle() 
  }

  createTableTitle = () =>{
    const { data } = this.state;
    if (data.length > 0){
      const titles = Object.keys(data[0]).slice(0, 4);
      this.setState ({ tableTitles : titles });
    }
  }

  render(){
    const { keys, data, tableTitles } = this.state;
    return(
      <div>
        <h1>Data From StarWars</h1>
        <Row>
          <Col xs={6} className="col-centered mt-3">
            <Form onChange={this.handleSelect}>
              <Form.Control as="select">
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
                  {tableTitles.map(title => <td>{title}</td>)}
                </tr>
                {data.map(i=><tr key={i.name}> 
                  <td>{i.name}</td>
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
