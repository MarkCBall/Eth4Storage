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
                               
                        </div>
                        <div className="col-4 col-solid">
                            
                        </div>
                        <div className="col-1 col-dotted">
                            
                        </div>
                        <div className="col-6">
                            {JSON.stringify(usr.val)}
                            View Only/Can Write
                            <button>Delete</button>
                            <button>(En)/(Dis)able Write</button>
                        </div>
                    </div>
                ))}
            </>
        );
    };
};

export default RenderSubRow;