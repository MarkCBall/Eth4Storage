import React, { Component } from 'react';



//MAKE THIS INTO
import './RowBotBorder.css'


//CSS Files
//import './Header.css';

class RowBotBorder extends Component {



    render() {
        return (
            <div className="row-top">
                {this.props.children}  
            </div>
        
        );
    };
};

export default RowBotBorder;