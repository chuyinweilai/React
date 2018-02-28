import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <a href="pageF/index.html">pageF</a>
        <div>
          <a href="pageS/index.html">pageS</a>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
