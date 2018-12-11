import React, { Component } from 'react';

class RenderSubRow extends Component {
    isValidAddress(str, acctN,contract){

        // return does exist
    }
    canWrite(str,acctN,contract){

        //return has write access
    }
    
    render() {
        return (
            <>
                {this.props.UserAcct.SubUserAddys ?
                    <>
                        {this.props.UserAcct.SubUserAddys.map( (usr) => (
                            <div key={usr.key} className="row">
                                <div className="col-1 col-solid"></div>
                                <div className="col-4 col-solid"></div>
                                <div className="col-1 col-dotted"></div>
                                <div className="col-6">
                                    {usr.val}
                                    View Only/Can Write
                                    <button>Delete</button>
                                    <button>(En)/(Dis)able Write</button>
                                </div>
                            </div>
                        ))}
                    </>
                :<></>}
                
            </>
        );
    };
};

export default RenderSubRow;