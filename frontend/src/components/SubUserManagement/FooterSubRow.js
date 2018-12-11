import React, { Component } from 'react';



//CSS Files
import './RowBotBorder.css';

class RenderRow extends Component {


    changeOwner(acctN){

        console.log("change owner function called on account# " + acctN)
        console.log("change owner function called on contract " + this.GetContract())

    }


    render() {
        return (
            <div className="row line-below">
                <div className="col-1 col-solid">
                    
                </div>
                <div className="col-4 col-solid">
                    <button onClick={()=>this.changeOwner(this.props.account.key)}>Change owner</button>
                </div>
                <div className="col-1 col-dotted">
                    
                </div>
                <div className="col-6">
                    <>
                        <button>Add</button> 
                        <input type="text" placeholder="User address"></input>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <button>Create</button>
                        <select>
                            <option value="View">View Only</option>
                            <option value="Write">Write or view</option>
                        </select>
                    </>
                </div>
            </div>
        );
    };
};

export default RenderRow;