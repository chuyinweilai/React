import * as React from 'react';
import './App.css';
// import Row from 'antd';
// import * as  Row,Col from 'antd';\
import DatePicker from 'antd/lib/date-picker';  // for js
import 'antd/lib/date-picker/style/css';        // for css
const logo = require('./logo.svg');
export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="App-Left">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to React</h2>
          </div>
          <p className="App-intro">
            To get started, edit <code>src/App.tsx</code> and save to reload.
          </p>
        </div>

        <div className="App-Phone">
          <div className="Phone-box">
            <div className="Phone">
              <DatePicker/>

            </div>
          </div>
        </div>

        <div className="App-Right">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to React</h2>
          </div>
          <p className="App-intro">
            To get started, edit <code>src/App.tsx</code> and save to reload.
          </p>
        </div>
      </div>
    );
  }
}
