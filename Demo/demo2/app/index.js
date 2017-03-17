import React from 'react';
import ReactDOM from 'react-dom';
import SearchBox from './components/search';
class App extends React.Component{
    constructor(props) {
        super(props);
        this.name = "MIKU";
    }
    callback(value){
      console.log(value);
    }
    
    render() {
        //JSX here!
        return (
          <div className="container">
            <SearchBox back={this.callback}/>
            <section className="jumbotron">
              <h3 className="jumbotron-heading">{this.name}142e4</h3>
            </section>
          </div>
        )
    }
};

const app = document.createElement('div');
document.body.appendChild(app);
ReactDOM.render(<App />, app);