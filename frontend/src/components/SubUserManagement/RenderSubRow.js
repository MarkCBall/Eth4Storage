import React, { Component } from 'react';



//CSS Files
//import './Header.css';

class RenderSubRow extends Component {




    render() {
        return (
            <>
                {this.props.UserAcct.SubUserAddys.map( (usr) => (
                    <div key={usr.key} className="row">
                        <div className="col-1 col-solid">
                            {this.props.row1}
                        </div>
                        <div className="col-4 col-solid">
                            {this.props.row2}
                        </div>
                        <div className="col-1 col-dotted">
                            {this.props.row3}
                        </div>
                        <div className="col-6">
                            {JSON.stringify(usr.val)}
                        </div>
                    </div>
                ))}
            </>
        );
    };
};

export default RenderSubRow;