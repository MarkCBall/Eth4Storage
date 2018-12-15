import React, { Component } from 'react';

class Home extends Component {



    render() {
        return (
            <div className="main-tile">
            <br></br><br></br><br></br><br></br><br></br>
            <h1>This is the Home page</h1>
            <p>{this.props.sessionID}</p>
            </div>
        );
    };
};

export default Home;