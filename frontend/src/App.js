import React, { Component } from 'react';

//Relative Imports
//import './components/Header'
import Header from './components/Header'
import Login from './components/Login';
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
      signedInAs:"0x"
    }
  }

    handleLogin = () => {
      this.setState({   signedInAs : Math.floor(Math.random()*100000)  } )
    }

    handleLogout() {
      this.setState({   signedInAs : 0  } )
    }


  //state.signedInAs = 0;

  render() {
    return (
      <div className="App">

      <Login
        handleLogin={this.handleLogin}
        handleLogout={this.handleLogout.bind(this)} 
        signedInAs={this.state.signedInAs}
      />

      <Header/>



      <Switch>
        <Route path="/Upload" 
        render={(props) => <Upload {...props} signedInAs={this.state.signedInAs} />}  
        />

        <Route path="/Download" 
        render={() => <Download signedInAs={this.state.signedInAs} />}  
        />

        <Route path="/UserManagement" 
        render={() => <UserManagement signedInAs={this.state.signedInAs} />}  
        />

        <Route path="/" 
        render={() => <Home signedInAs={this.state.signedInAs} />}  
        />
        
      </Switch>


      </div>
    );
  }
}

export default App;
