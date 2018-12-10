import React, { Component } from 'react';



//MAKE THIS INTO
import './RenderTitleRow.css'


//CSS Files
//import './Header.css';

class RenderTitleRow extends Component {



    render() {
        return (
            <div className="row-top">
                {this.props.children}  
            </div>
        
        );
    };
};

export default RenderTitleRow;