import React, { Component } from 'react';

//Relative Imports
//import './components/Header'
import Header from './components/Header'

//CSS Files
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state ={
      sessionID:0
    }
  }

    handleLogin() {
      this.setState({   sessionID : 100000  } )
    }

    handleLogout() {
      this.setState({   sessionID : 0  } )
    }


  //state.sessionID = 0;

  render() {
    return (
      <div className="App">

      <Header handleLogin={this.handleLogin.bind(this)}
        handleLogout={this.handleLogout.bind(this)} 
        sessionID={this.state.sessionID}

      />

      <p>heeeeexxeeee</p>

      </div>
    );
  }
}

export default App;
