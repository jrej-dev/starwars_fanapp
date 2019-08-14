import { Redirect } from 'react-router-dom';
import React, { Component } from 'react';
//Component
import SearchBar from '../Components/SearchBar';
//Libraries
import Fuse from "fuse.js";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

class Data extends Component {
  constructor() {
    super()
    this.state = {
      apiList: {},
      keys: [],
      data: [{ "Loading...": null }],
      select: "people",
      searchField: '',
      searchResults: [],
      isClicked: false,
      clickUrl: "",
    }
  }

  componentDidMount() {
    //Fetching initial keys and api addresses.
    fetch('https://swapi.co/api/')
      .then(response => response.json())
      .then(results => this.fetchData(results[this.state.select], [], results))
      .catch(err => console.log('Fail', err));
    //Getting current user back to NavBar component.
    if (localStorage.getItem('currentUser') !== null) {
      localStorage.getItem('currentUser')
      this.userCallBackMethod(JSON.parse(localStorage.getItem('currentUser')));
    }
  }
  //Main fetching function.
  fetchData = (url, data, results) => {
    fetch(url)
      .then(response => response.json())
      .then(response => {
        const retrivedData = data.concat(response.results)
        this.handleNestedUrl(retrivedData);
        this.newFuzzySearch(this.state.searchField, retrivedData);
        //Using recursive function to fetch all API pages.
        if (response.next !== null) {
          this.fetchData(response.next, retrivedData)
        } else {
          this.handleNestedUrl(retrivedData);
          this.newFuzzySearch(this.state.searchField, retrivedData);
        }
      })
      .catch(err => console.log('Fail', err));
    if (results !== undefined) {
      this.setState({ apiList: results, keys: Object.keys(results) })
    }
  }

  handleNestedUrl = (retrivedData) => {
    this.setState({ data: retrivedData });
    const titles = Object.keys(retrivedData[0]);

    for (let i = 0; i < retrivedData.length; i++) {
      const values = Object.values(retrivedData[i]);

      for (let j = 0; j < titles.length; j++) {
        let title = titles[j];

        if (values[j].length === 0) {
          this.setState(prevState => ({
            data: prevState.data.map(item =>
              item.name === values[0] ? {
                ...item,
                [title]: "n/a"
              } : item
            )
          }))
        } else if (Array.isArray(values[j])) {
          let valuesArray = [];
          values[j].map(url =>
            fetch(url)
              .then(response => response.json())
              .then(results => {
                if (results.name !== undefined) {
                  valuesArray.push(results.name);
                } else if (results.title !== undefined) {
                  valuesArray.push(results.title);
                } else if (results.key !== undefined) {
                  valuesArray.push(results.key);
                }
              })
              .catch(err => console.log('Fail', err))
          );
          this.setState(prevState => ({
            data: prevState.data.map(item =>
              item.name === values[0] ? {
                ...item,
                [title]: valuesArray
              } : item
            )
          }))
        } else if (values[j].indexOf("swapi") !== -1) {
          fetch(values[j])
            .then(response => response.json())
            .then(results =>
              this.setState(prevState => ({
                data: prevState.data.map(item =>
                  item.name === values[0] ? {
                    ...item,
                    [title]: results.name,
                    url: this.props.url
                  } : item
                )
              }))
            )
            .catch(err => console.log('Fail', err));
        } else if (values[j].match(/:\d{2}:/g)) {
          const createdDate = values[j].slice(0, 10);
          this.setState(prevState => ({
            data: prevState.data.map(item =>
              item.name === values[0] ? {
                ...item,
                [title]: createdDate
              } : item
            )
          }))
        }
      }
    }
  }

  handleSelect = (event) => {
    this.fetchData(this.state.apiList[event.target.value], []);
    this.setState({ select: event.target.value });
  }

  handleClick = (event) => {
    this.props.url(event);
    this.setState({ isClicked: !this.state.isClicked });
  }

  handleSearch = (event) => {
    this.setState({ searchField: event.target.value });
    this.newFuzzySearch(event.target.value, this.state.data);
  }

  //Fuzzy search function from fuse.js library.
  newFuzzySearch = (searchField, data) => {
    const titles = Object.keys(data[0]);
    var options = {
      shouldSort: true,
      tokenize: true,
      matchAllTokens: true,
      threshold: 0.5,
      location: 0,
      distance: 100,
      keys: titles
    };
    var fuse = new Fuse(data, options);
    var result = fuse.search(searchField);
    this.setState({ searchResults: result });
  }

  userCallBackMethod = (value) => {
    this.props.userEmail(value);
  }

  render() {
    const { keys, data, isClicked, searchResults, searchField } = this.state;
    const titles = Object.keys(data[0]).slice(0, 4);

    if (searchField !== "") {
      var filteredData = searchResults
    } else {
      filteredData = data;
    }
    if (isClicked) {
      return <Redirect to='/info' />;
    }

    return (
      <div>
        <h2>Data From StarWars</h2>
        <Row className="mt-4">
          <Col xs={4} className="selectField">
            <Form onChange={this.handleSelect}>
              <Form.Control as="select">
                {keys.map(i => <option value={i} key={i}>{i}</option>)}
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
                  {titles.map(title => <th key={title}>{title.replace(/_/g, " ")}</th>)}
                </tr>
                {filteredData.map(i =>
                  <tr key={Object.values(i)[0]} onClick={this.handleClick.bind(this, i.url)} className='selectRow'>
                    <td key={Object.values(i)[0] + 0}>{Object.values(i)[0]}</td>
                    <td key={Object.values(i)[0] + 1}>{Object.values(i)[1]}</td>
                    <td key={Object.values(i)[0] + 2}>{Object.values(i)[2]}</td>
                    <td key={Object.values(i)[0] + 3}>{Object.values(i)[3]}</td>
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