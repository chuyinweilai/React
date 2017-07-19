import React, { Component } from 'react';
import './App.css';

import { 
  Layout, 
  Menu, 
  Icon,
  Breadcrumb,
} from 'antd';

import Headers from './components/Layout/header';
import Siders from './components/Layout/sider';
import Router from './content/Router';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
class App extends Component {
  constructor(props){
    super(props);
    this.state={
      message:{
        nextPage: 'login',
        historyPage: '',
        mess:'',
      },
    }
  }

  _Router(nextPage,mess,historyPage){
    let obj= {
      nextPage: nextPage,
      historyPage: historyPage,
      message: mess
    }
    this.setState({
      message: obj
    })
  }

  render() {
    if(this.state.message.nextPage === "login"){
      return ( 
        <Layout>
            <Router message={this.state.message} Router={(nextPage,mess,historyPage) => this._Router(nextPage,mess,historyPage)}/>
        </Layout>
      );
    } else {
      return ( 
        <Layout>
          <Header className="header" >
            <Headers className="header" >
            </Headers>
          </Header>
          <Layout>
            <Sider width={200} style={{ background: '#fff' }}>
              <Siders message={this.state.message} Router={(nextPage,mess, historyPage) => this._Router(nextPage,mess,historyPage)}></Siders>
            </Sider>
            <Router message={this.state.message} Router={(nextPage,mess,historyPage) => this._Router(nextPage,mess,historyPage)}/>
          </Layout>
        </Layout>
      );
    }
  }


}
export default App;
