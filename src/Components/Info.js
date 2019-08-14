import { Redirect } from 'react-router-dom';
import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

class Info extends Component {
  constructor() {
    super()
    this.state = {
      data: { "Loading...": null }
    }
  }

  componentDidMount() {
    fetch(this.props.url)
      .then(response => response.json())
      .then(results => this.handleNestedUrl(results))
      .catch(err => console.log('Fail', err));
  }

  handleNestedUrl = (results) => {
    this.setState({ data: results })
    const titles = Object.keys(results);
    const values = Object.values(results);

    for (let i = 0; i < titles.length; i++) {
      
      if (values[i].length === 0) {
        let title = titles[i];
        this.setState(prevState => ({
          data:
          {
            ...prevState.data,
            [title]: "n/a"
          }
        }))
      } else if (Array.isArray(values[i])) {
        let valuesArray = [];
        let title = titles[i];
        values[i].map(url =>
          fetch(url)
            .then(response => response.json())
            .then(results => {
              if (results.name !== undefined) {
                valuesArray.push(<div key={results.name}>{results.name}</div>);
              } else if (results.title !== undefined) {
                valuesArray.push(<div key={results.title}>{results.title}</div>);
              } else if (results.key !== undefined) {
                valuesArray.push(<div key={results.key}>{results.key}</div>);
              }
            })
            .catch(err => console.log('Fail', err))
        );
        this.setState(prevState => ({
          data:
          {
            ...prevState.data,
            [title]: valuesArray
          }
        }))
      } else if (values[i].indexOf("swapi") !== -1) {
        let title = titles[i];
        fetch(values[i])
          .then(response => response.json())
          .then(results =>
            this.setState(prevState => ({
              data:
              {
                ...prevState.data,
                [title]: results.name,
                url: this.props.url
              }
            }))
          )
          .catch(err => console.log('Fail', err));
      } else if (values[i].match(/:\d{2}:/g)) {
        const createdDate = values[i].slice(0, 10);
        let title = titles[i];
        this.setState(prevState => ({
          data:
          {
            ...prevState.data,
            [title]: createdDate
          }
        }))
      }
    }
  }

  render() {
    const { data } = this.state;
    const titles = Object.keys(data);
    const values = Object.values(data);
    if (this.props.url === "") {
      return <Redirect to='/data' />;
    }
    return (
      <div className="info">
        <h1>Detailed Information</h1>
        <Row className='mt-5 mb-5'>
          <Col className="col-centered">
            <table>
              <tbody className="tableBody">
                <tr className='tableTitleRow' >
                  <th key="title" style={{ textAlign: "center" }}>
                    {values[0] || 'The'} description
                  </th>
                </tr>
              </tbody>
            </table>
            <table>
              <tbody className="tableBody">
                {titles.map(title =>
                  <tr key={title}>
                    <td key={'col-' + title}>
                      {title.replace(/_/g, " ")}
                    </td>
                    <td key={data[title]}>
                      {data[title]}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Info;