import React, { Component } from 'react';


//CSS Files
//import './Header.css';

class TitleTile extends Component {



    render() {
        return (
            <>
            <h1>{this.props.title}</h1>
                {this.props.children}
            <hr></hr>
            </>
        );
    };
};

export default TitleTile;