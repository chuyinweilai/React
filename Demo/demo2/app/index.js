import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import SearchBox from './components/search';
require('./less/bootstrap.less')
class App extends Component{
  constructor(props) {
    super(props);
    this.setState = {
      
    } 
    this.name = "MIKU";
  }
  callback(value){
    console.log(value);
  }
  
  render() {
      //JSX here!
      return (
        <div style={styles.mainBox} className="container" id="mainBox">
          <SearchBox back={this.callback}/>
          <section className="jumbotron">
            <h3 className="jumbotron-heading">{this.name}142e4</h3>
          </section>
        </div>
      )
  }
};


const styles={
  mainBox: {
    flex: 1,
    background: 'gray'
  }
}

const app = document.createElement('div');
document.body.appendChild(app);
ReactDOM.render(<App />, app);