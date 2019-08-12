import { Redirect } from 'react-router-dom';
import React, { Component } from 'react';
import Fuse from "fuse.js";

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import SearchBar from '../Components/SearchBar';

class Data extends Component{
  constructor(){
    super()
    this.state = {
      apiList:{},
      keys:[],
      data:[{"Loading...":null}],
      select: "people",
      searchField: "",
      searchResults:[],
      isClicked: false,
      clickUrl: "",
    }
  }

  componentDidMount(){
    fetch('https://swapi.co/api/')
    .then(response => response.json())
    .then(results => this.fetchData(results[this.state.select],[],results))
    .catch(err => console.log('Fail',err));

    if (localStorage.getItem('currentUser')!==null){
      localStorage.getItem('currentUser')
      this.userCallBackMethod(JSON.parse(localStorage.getItem('currentUser')));
    }
  }  

  fetchData = (url, data, results) => {
    fetch(url)
      .then(response => response.json())
      .then(response => {
        const retrivedData = data.concat(response.results)
        this.setState ({ data : retrivedData });
        this.newFuzzySearch(this.state.searchField,retrivedData);
        if(response.next !== null) {
          this.fetchData(response.next, retrivedData)
        } else {
          this.setState ({ data : retrivedData });
          this.newFuzzySearch(this.state.searchField,retrivedData);
        }
      })
      .catch(err => console.log('Fail',err));
    if (results !== undefined){
    this.setState({ apiList : results, keys: Object.keys(results)})
    }
  } 

  handleSelect = (event) => {
    this.fetchData(this.state.apiList[event.target.value],[]);
    this.setState ({ select : event.target.value });
  }

  handleClick = (event) => {
    this.props.url(event);
    this.setState ({ isClicked : !this.state.isClicked });
  }

  handleSearch = (event) => {
    this.setState ({ searchField : event.target.value });
    this.newFuzzySearch(event.target.value, this.state.data);
  }

  newFuzzySearch = (searchField,data) => {
    const titles= Object.keys(data[0]);
    let options = {
      shouldSort: true,
      tokenize: true,
      matchAllTokens: true,
      threshold: 0.5,
      location: 0,
      distance: 100,
      keys: titles
    };
    let fuse = new Fuse(data, options);
    let result = fuse.search(searchField);
    this.setState ({ searchResults : result });
  }

  userCallBackMethod = (value) =>{
  this.props.userEmail(value);
  }

  render(){
    const { keys, data, isClicked, searchResults } = this.state;
    const titles = Object.keys(data[0]).slice(0, 4);
    
    if (searchResults.length > 0) {
      var filteredData = searchResults
    } else { 
      filteredData = data;}

    if ( isClicked ){
      return <Redirect to='/info'/>;} 
    return(
      <div>
        <h2>Data From StarWars</h2>
        <Row className="mt-4">
          <Col xs={4} className="selectField">
            <Form onChange={this.handleSelect}>
              <Form.Control as="select">
                {keys.map(i=> <option value={i} key={i}>{i}</option>)}
              </Form.Control>
            </Form>
          </Col>
          <Col xs={8} className="searchField">
            <SearchBar searchChange={this.handleSearch} />
          </Col>
        </Row>
        <Row className='mt-4 mb-5'>
          <Col className="col-centered">
            <table>
              <tbody className="tableBody">
                <tr className='tableTitleRow'>
                  {titles.map(title => <th key={title}>{title.replace(/_/g," ")}</th>)}
                </tr>
                {filteredData.map(i=><tr key={Object.values(i)[0]} onClick={this.handleClick.bind(this, i.url)}> 
                  <td key={Object.values(i)[0]+0}>{Object.values(i)[0]}</td>
                  <td key={Object.values(i)[0]+1}>{Object.values(i)[1]}</td>
                  <td key={Object.values(i)[0]+2}>{Object.values(i)[2]}</td>
                  <td key={Object.values(i)[0]+3}>{Object.values(i)[3]}</td>
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
