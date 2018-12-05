import React, { Component } from 'react';


//CSS Files
//import './Header.css';

class UserManagement extends Component {



    render() {
        return (
            <div className="main-tile">

            <br></br><br></br><br></br><br></br><br></br>
            <h1>This is the UserManagement page</h1>

            <p>{this.props.sessionID}</p>
        
            </div>
        );
    };
};

export default UserManagement;