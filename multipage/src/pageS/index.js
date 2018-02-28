import React,{Component} from 'react';
import ReactDOM from 'react-dom';

class PageS extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">PageS</h1>
        </header>
				<div><a href="/index.html">to home</a></div>
				<div><a href="/pageF/index.html">to pageF</a></div>
      </div>
    );
  }
}

ReactDOM.render(<PageS />, document.getElementById('root'));
