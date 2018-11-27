import React, { Component } from 'react';

import axios from 'axios';


class History extends Component {

  constructor() {
    super();
    this.state = {
      humid: '',
      temperature: '',
      waterlevel: '',
      time:'',
      date:''
    };
  }

  componentDidMount() {
    setInterval(() => {

      axios
        .get('/history')
        .then(result => {
          this.setState({ result: result.data });
        })
        .catch(error => {
          console.log('error+++++ >:', error);
        });

    });
  }
  return (
    <div>
      <div className="jumbotron text-center">
        <h1>Your Previous Searches MARVEL HEROES!</h1>

      </div>
      <div className="row container-fluid">
        <div className="col-md-1 text-center">

          <p />
        </div>
        <table className="table table-striped">
          <tbody>
            <tr>
              <th>humid</th>
              <th>temperature</th>
              <th>water level</th>
              <th>date</th>
              <th>time</th>
            </tr>
            {this.state.result.map(result => {
              return (
                <tr>
                  <td>{result.humid}%</td>
                  <td>{result.temperature}C</td>
                  <td>{result.waterlevel}</td>
                  <td>{result.date}</td>
                  <td>{result.time}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
