import React,{Component} from 'react';
import ReactDOM from 'react-dom';

class Page1 extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Page1</h1>
        </header>
				<div><a href="/index.html">to home</a></div>
				<div><a href="./../page0/index.html">to page0</a></div>
      </div>
    );
  }
}

ReactDOM.render(<Page1 />, document.getElementById('root'));
