import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import DeletedMessage from './DeletedMessage';


class App extends Component {
  constructor() {
    super();
    this.state = {
      humid: '',
      temperature:'',
      waterlevel:'',
      date:'',
      time:'',
      sensor1alldata: [],
      errors: '',
      showDeletedMessage: false
    };
  }

  dofilter(inarray) {
    var array = [];
    var i = 0;
    inarray.forEach(obj => {
      array.push({
        seq: ++i,
        humid: obj.humid,
        temperature: obj.temperature,
        waterlevel:obj.waterlevel,
        date:obj.date,
        time:obj.time

      });
    });
    this.setState({ sensor1alldata: array });
  }

  componentDidMount() {
    setInterval(() => {
      axios
        .get('/humid')
        .then(result => {
          this.setState({ humid: result.data });
        })
        .catch(err => {
          console.log( err);
        });
        axios
     .get('/temperature')
     .then(result => {
       this.setState({ temperature: result.data });
     })
     .catch(err => {
       console.log( err);
     });
     axios
  .get('/waterlevel')
  .then(result => {
    this.setState({ waterlevel: result.data });
  })
  .catch(err => {
    console.log(err);
  });
  axios
  .get('/time')
  .then(result => {
    this.setState({ time: result.data });
  })
  .catch(err => {
    console.log(err);
  });
  axios
    .get('/date')
    .then(result => {
      this.setState({ date: result.data });
    })
    .catch(err => {
      console.log(err);
    });

  }, 5000);
    setInterval(() => {
      axios
        .get('/history')
        .then(result => {
          this.dofilter(result.data);
        })
        .catch(err => {
          this.setState({ errors: err.response.data });
        });
    }, 5000);
  }

  deleteAllHandler = () => {
    axios
      .get('/deleteall')
      .then(result => {
        this.setState({ showDeletedMessage: true });
      })
      .catch(err => {
        console.log('unable to delete: ', err);
      });
  };

  alertDismissHandler = () => {
    this.setState({ showDeletedMessage: false });
  };

  render() {
    if(parseInt(this.state.humid)>70  && parseInt(this.state.temperature)<30 && parseInt(this.state.waterlevel)<550){
      return (
        <div>
          <div className="w3-panel w3-red text-center header">
            <h1>Warning!!! There is a float!</h1>

          </div>

          <div className="container">
            <DeletedMessage
              show={this.state.showDeletedMessage}
              alertDismiss={this.alertDismissHandler}
            />
            <div className="row">
              <div className="text-center container col-sm-12">
                <div className="row">
                  <div className="text-center container col-sm-2">
                    <div id="deleteall">
                      <br />
                      <button
                        className="btn btn-primary"
                        onClick={this.deleteAllHandler}
                      >
                        <h4>Delete All</h4>
                      </button>
                    </div>
                  </div>
                  <div className="text-center container col-sm-2">
                    <div id="sensorvalue">
                      <label>
                        <h4>Humid (%)</h4>
                      </label>
                      <br />
                      <label>
                        <h4>{this.state.humid} </h4>
                      </label>
                    </div>
                  </div>
                  <div className="text-center container col-sm-2">
                    <div id="sensorvalue">
                      <label>
                        <h4>Temperature (C)</h4>
                      </label>
                      <br />
                      <label>
                        <h4>{this.state.temperature} </h4>
                      </label>
                    </div>
                  </div>
                  <div className="text-center container col-sm-2">
                    <div id="sensorvalue">
                      <label>
                        <h4>Water level</h4>
                      </label>
                      <br />
                      <label>
                        <h4>{this.state.waterlevel}</h4>
                      </label>
                    </div>
                  </div>
                  <div className="text-center container col-sm-2">
                    <div id="sensorvalue">
                      <label>
                        <h4>Date</h4>
                      </label>
                      <br />
                      <label>
                        <h4>{this.state.date} </h4>
                      </label>
                    </div>
                  </div>
                  <div className="text-center container col-sm-2">
                    <div id="sensorvalue">
                      <label>
                        <h4>Time</h4>
                      </label>
                      <br />
                      <label>
                        <h4>{this.state.time} </h4>
                      </label>
                    </div>
                  </div>
                </div>
                <div>
                  <label />
                </div>
                <div className="row">
                  <div className="sensortable">
                    <label>
                      <h4>Sensor1 Table</h4>
                    </label>
                    <br />
                    <div>
                      <ReactTable
                        data={this.state.sensor1alldata}
                        columns={[
                          {
                                   Header: 'Sequence',
                                   accessor: 'seq'
                                 },
                                 {
                                   Header: 'humid',
                                   accessor: 'humid'
                                 },
                                 {
                                   Header: 'temperature',
                                   accessor: 'temperature'
                                 },
                                 {
                                   Header: 'waterlevel',
                                   accessor: 'waterlevel'
                                 },
                                 {
                                   Header: 'date',
                                   accessor: 'date'
                                 },
                                 {
                                   Header: 'time',
                                   accessor: 'time'
                                 }
                        ]}
                        defaultPageSize={5}
                        className="-striped -highlight"
                      />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      );
    }
    if(parseInt(this.state.humid)>70  && parseInt(this.state.temperature)<30 && parseInt(this.state.waterlevel)>549 && parseInt(this.state.waterlevel)<700){
      {
        return (
          <div>
            <div className="w3-panel w3-yellow text-center header">
              <h1>Alert!!! Beware of float!</h1>

            </div>

            <div className="container">
              <DeletedMessage
                show={this.state.showDeletedMessage}
                alertDismiss={this.alertDismissHandler}
              />
              <div className="row">
                <div className="text-center container col-sm-12">
                  <div className="row">
                    <div className="text-center container col-sm-2">
                      <div id="deleteall">
                        <br />
                        <button
                          className="btn btn-primary"
                          onClick={this.deleteAllHandler}
                        >
                          <h4>Delete All</h4>
                        </button>
                      </div>
                    </div>
                    <div className="text-center container col-sm-2">
                      <div id="sensorvalue">
                        <label>
                          <h4>Humid (%)</h4>
                        </label>
                        <br />
                        <label>
                          <h4>{this.state.humid} </h4>
                        </label>
                      </div>
                    </div>
                    <div className="text-center container col-sm-2">
                      <div id="sensorvalue">
                        <label>
                          <h4>Temperature (C)</h4>
                        </label>
                        <br />
                        <label>
                          <h4>{this.state.temperature} </h4>
                        </label>
                      </div>
                    </div>
                    <div className="text-center container col-sm-2">
                      <div id="sensorvalue">
                        <label>
                          <h4>Water level</h4>
                        </label>
                        <br />
                        <label>
                          <h4>{this.state.waterlevel} </h4>
                        </label>
                      </div>
                    </div>
                    <div className="text-center container col-sm-2">
                      <div id="sensorvalue">
                        <label>
                          <h4>Date</h4>
                        </label>
                        <br />
                        <label>
                          <h4>{this.state.date} </h4>
                        </label>
                      </div>
                    </div>
                    <div className="text-center container col-sm-2">
                      <div id="sensorvalue">
                        <label>
                          <h4>Time</h4>
                        </label>
                        <br />
                        <label>
                          <h4>{this.state.time} </h4>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label />
                  </div>
                  <div className="row">
                    <div className="sensortable">
                      <label>
                        <h4>Sensor1 Table</h4>
                      </label>
                      <br />
                      <div>
                        <ReactTable
                          data={this.state.sensor1alldata}
                          columns={[
                            {
                                     Header: 'Sequence',
                                     accessor: 'seq'
                                   },
                                   {
                                     Header: 'humid',
                                     accessor: 'humid'
                                   },
                                   {
                                     Header: 'temperature',
                                     accessor: 'temperature'
                                   },
                                   {
                                     Header: 'waterlevel',
                                     accessor: 'waterlevel'
                                   },
                                   {
                                     Header: 'date',
                                     accessor: 'date'
                                   },
                                   {
                                     Header: 'time',
                                     accessor: 'time'
                                   }
                          ]}
                          defaultPageSize={5}
                          className="-striped -highlight"
                        />
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        );
      }
    }
    else{
      return (
        <div>
          <div className="w3-panel w3-green text-center header">
            <h1>No Worry!!! Float is not around!</h1>

          </div>

          <div className="container">
            <DeletedMessage
              show={this.state.showDeletedMessage}
              alertDismiss={this.alertDismissHandler}
            />
            <div className="row">
              <div className="text-center container col-sm-12">
                <div className="row">
                  <div className="text-center container col-sm-2">
                    <div id="deleteall">
                      <br />
                      <button
                        className="btn btn-primary"
                        onClick={this.deleteAllHandler}
                      >
                        <h4>Delete All</h4>
                      </button>
                    </div>
                  </div>
                  <div className="text-center container col-sm-2">
                    <div id="sensorvalue">
                      <label>
                        <h4>Humid (%)</h4>
                      </label>
                      <br />
                      <label>
                        <h4>{this.state.humid} </h4>
                      </label>
                    </div>
                  </div>
                  <div className="text-center container col-sm-2">
                    <div id="sensorvalue">
                      <label>
                        <h4>Temperature (C)</h4>
                      </label>
                      <br />
                      <label>
                        <h4>{this.state.temperature} </h4>
                      </label>
                    </div>
                  </div>
                  <div className="text-center container col-sm-2">
                    <div id="sensorvalue">
                      <label>
                        <h4>Water level</h4>
                      </label>
                      <br />
                      <label>
                        <h4>{this.state.waterlevel} </h4>
                      </label>
                    </div>
                  </div>
                  <div className="text-center container col-sm-2">
                    <div id="sensorvalue">
                      <label>
                        <h4>Date</h4>
                      </label>
                      <br />
                      <label>
                        <h4>{this.state.date} </h4>
                      </label>
                    </div>
                  </div>
                  <div className="text-center container col-sm-2">
                    <div id="sensorvalue">
                      <label>
                        <h4>Time</h4>
                      </label>
                      <br />
                      <label>
                        <h4>{this.state.time} </h4>
                      </label>
                    </div>
                  </div>
                </div>
                <div>
                  <label />
                </div>
                <div className="row">
                  <div className="sensortable">
                    <label>
                      <h4>Sensor1 Table</h4>
                    </label>
                    <br />
                    <div>
                      <ReactTable
                        data={this.state.sensor1alldata}
                        columns={[
                          {
                                   Header: 'Sequence',
                                   accessor: 'seq'
                                 },
                                 {
                                   Header: 'humid',
                                   accessor: 'humid'
                                 },
                                 {
                                   Header: 'temperature',
                                   accessor: 'temperature'
                                 },
                                 {
                                   Header: 'waterlevel',
                                   accessor: 'waterlevel'
                                 },
                                 {
                                   Header: 'date',
                                   accessor: 'date'
                                 },
                                 {
                                   Header: 'time',
                                   accessor: 'time'
                                 }
                        ]}
                        defaultPageSize={5}
                        className="-striped -highlight"
                      />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      );
    }
  }
}

export default App;
