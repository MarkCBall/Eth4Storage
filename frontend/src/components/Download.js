import React, { Component } from 'react';


//CSS Files
//import './Header.css';

class Download extends Component {



    render() {
        return (
            <div className="main-tile">
            
            <br></br><br></br><br></br><br></br><br></br>
            <h1>This is the download page</h1>
        
            <p>{this.props.sessionID}</p>


            </div>
        );
    };
};

export default Download;