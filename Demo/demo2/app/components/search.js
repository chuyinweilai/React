import React, { Component } from 'react';
import {ReactDom} from 'react-dom';

export default class SearchBox extends Component {
  constructor(props){
    super(props);
    this.state = {

    };
    this.value = '';
    this.callback = null;
  }

  componentDidMount(){
    console.log(this.props.back)
    this.callback = this.props.back;
  }


  _click(){
    this.callback(this.refs.name.value)
  }

  render(){
    return (
      <div>
        <input style={styles.input} type="text" ref="name" placeholder="Searching..."/>
        <button style={styles.Button} onClick={()=>this._click()}>Button</button>
      </div>
    )
  }
}

const styles={
    input:{
      width: 400,
      height: 50,
      background: '#6fc',
    },
    Button:{
      width: 70,
      height: 50,
      borderRadius: 5,
    }
}

module.exports = SearchBox;