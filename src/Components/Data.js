import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';



class Data extends Component{
  constructor(){
    super()
    this.state = {
      people:[],
      planets:[],
      species:[]
    }
  }
  componentDidMount(){
    Promise.all([
    fetch('https://swapi.co/api/people/').then( people => people.json()),
    fetch('https://swapi.co/api/planets/').then( planets => planets.json()),
    fetch('https://swapi.co/api/species/').then( species => species.json())
  ])    
    .then(([people,planets,species]) => ([people.results, planets.results, species.results]))
    .then(results => results.map(x=>x))
    .then(x => this.setState({ people : x[0] }) +
    this.setState({ planets : x[1] }) +
    this.setState({ species : x[2] })
    )
    .then(y => this.setState({ people : y.name }) +
    this.setState({ planets : y.name }) +
    this.setState({ species : y.name })
    )
       
    .catch(err => console.log('Epic fail',err));    
  }

  render(){
    const { people } = this.state;   
    return(
      <Col xs={12} className="col-centered">
        <table>
          <h1>People From StarWars</h1>
          <tbody className='tableBody'>
            <tr className='tableTitleRow'>
              <th>Name</th>
              <th>Gender</th>
              <th>Species</th>
              <th>Height</th>
              <th>Homeworld</th>
            </tr>
            {people.map(i=><tr key={i.name}> 
              <td>{i.name}</td>
              <td>{i.gender}</td>
              <td>{i.species}</td>
              <td>{i.height}</td>
              <td>{i.homeworld}</td>
            </tr>
            )}
          </tbody>
        </table>
      </Col>
    )
  }
}

export default Data;
