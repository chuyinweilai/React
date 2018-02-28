import React,{Component} from 'react';
import ReactDOM from 'react-dom';

class PageF extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">PageF</h1>
        </header>
				<div><a href="/index.html">to home</a></div>
				<div><a href="/PageS/index.html">to pageS</a></div>
				<div><a href="./page0/index.html">to page0</a></div>
				<div><a href="./page1/index.html">to page1</a></div>
      </div>
    );
  }
}

ReactDOM.render(<PageF />, document.getElementById('root'));
