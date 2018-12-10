import React, { Component } from 'react';



//CSS Files
//import './Header.css';

class RenderRow extends Component {




    render() {
        return (
        
          
                
            <div className="row">
                <div className="col-1 col-solid">
                    {this.props.row1}
                </div>
                <div className="col-4 col-solid">
                    {this.props.row2}
                </div>
                <div className="col-1 col-dotted">
                    {this.props.row3}
                </div>
                <div className="col-6" onClick={() => this.props.ToggleUsers(this.props.rowNum)}>
                    {this.props.row4}
                </div>
            </div>
        



        );
    };
};

export default RenderRow;