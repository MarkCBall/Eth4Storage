import React, { Component } from 'react';

import ContractABI, {ContractAddress} from '../ContractABI';


//CSS Files
//import './Header.css';

class UserManagement extends Component {
    constructor(props){
        super(props)
        this.state ={
            r:"yyyy"
        }

    this.GetData();
    }
    //this.state.r = "yyy"

    GetData() {
        var MyContract = window.web3.eth.contract(ContractABI).at(ContractAddress);

        MyContract.owner.call(
            (e,response) => {   this.setState({r:response})   }
        )

        //how can I make this work with a bind?
        // MyContract.owner.call(
        //     function (e,response) {   this.setState({r:response})   }
        // )

    }

    render() {
        return (
            <div className="main-tile">

            <br></br><br></br><br></br><br></br><br></br>
            <h1>This is the UserManagement page</h1>

            <p>{this.props.sessionID}</p>

            <p>enter your account number <input type="text"></input></p>

            The owner of the account according to metamask's query is:
            <p>{this.state.r}</p>


        
            </div>
        );
    };
};

export default UserManagement;