import React, { Component } from 'react';
import logo from './logo.svg';
import $ from 'jquery'
import './App.css';
import {
  Row,
  Col
} from 'antd'

class App extends Component {
  render() {
    return (
      <Row className="App">
        <Col className="App-Left">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to React</h2>
          </div>
          <p className="App-intro">
            To get started, edit <code>src/App.tsx</code> and save to reload.
          </p>
        </Col>

        <Col className="App-Phone">
          <Row className="Phone-box" type="flex" align="center" justify="middle">
            <Col className="Phone">
            
            </Col>
          </Row>
        </Col>

        <Col className="App-Right">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to React</h2>
          </div>
          <p className="App-intro">
            To get started, edit <code>src/App.tsx</code> and save to reload.
          </p>
        </Col>
      </Row>
    );
  }
}

export default App;
