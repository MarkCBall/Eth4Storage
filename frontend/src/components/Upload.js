import React, { Component } from 'react';


//CSS Files
//import './Header.css';

class Upload extends Component {



    render() {
        return (
            <div className="main-tile">

            <br></br><br></br><br></br><br></br><br></br>
            <h1>This is the upload page</h1>

            <p>{this.props.sessionID}</p>
            {/* <p>{this.props.route.something}</p> */}
        
            </div>
        );
    };
};

export default Upload;