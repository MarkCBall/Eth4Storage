import React, { Component } from 'react';

//Relative Imports
//import './components/Header'
import Header from './components/Header'
import Upload from './components/Upload'
import Download from './components/Download'
import UserManagement from './components/UserManagement'
import Home from './components/Home'

// test
//import { BrowserRouter } from 'react-router-dom'
import { Switch, Route } from 'react-router-dom'



//CSS Files
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state ={
      sessionID:0
    }
  }

    handleLogin = () => {
      this.setState({   sessionID : Math.floor(Math.random()*100000)  } )
    }

    handleLogout() {
      this.setState({   sessionID : 0  } )
    }


  //state.sessionID = 0;

  render() {
    return (
      <div className="App">

      <Header handleLogin={this.handleLogin}
        handleLogout={this.handleLogout.bind(this)} 
        sessionID={this.state.sessionID}
      />

      {/* <Route path="latest" components={{sidebar: Sidebar, content: ContentLayout}} something="foo" /> */}

      <Switch>
        <Route path="/Upload" 
        render={(props) => <Upload {...props} sessionID={this.state.sessionID} />}  
        />

        <Route path="/Download" 
        render={() => <Download sessionID={this.state.sessionID} />}  
        />

        <Route path="/UserManagement" 
        render={() => <UserManagement sessionID={this.state.sessionID} />}  
        />

        <Route path="/" 
        render={() => <Home sessionID={this.state.sessionID} />}  
        />
        
      </Switch>


      </div>
    );
  }
}

export default App;
