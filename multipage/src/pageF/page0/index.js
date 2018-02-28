import React,{Component} from 'react';
import ReactDOM from 'react-dom';

class Page0 extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Page0</h1>
        </header>
				<div><a href="/index.html">to home</a></div>
				<div><a href="./../page1/index.html">to page1</a></div>
      </div>
    );
  }
}

ReactDOM.render(<Page0 />, document.getElementById('root'));
