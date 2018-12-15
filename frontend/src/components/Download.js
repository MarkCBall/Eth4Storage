import React, { Component } from 'react';
import {connect} from 'react-redux';


class Download extends Component {


    //returns an array of users for a given account number
    getUserArray(acctN) {
        let accounts = this.props.state.todo.accounts;
        let arrIndex = accounts.findIndex(o => o.key === acctN);
        if (arrIndex>=0 && accounts[arrIndex].users)
            return (accounts[arrIndex].users)
        return []

    }

    //returns an array of strings with the permissions the logged in metamask's account has
    logAccountsForAddress(address){
        let permissionsArray =[]
        let accts = this.props.state.todo.accounts;
        //loop through all accounts
        for (let i=0;i<accts.length;i++){
            //check if the logged in account owns the specific account
            if (accts[i].own === address){
                permissionsArray.push("You own account#" + i)  
            }
            //loop through the users of the specific account
            let userArr = this.getUserArray(accts[i].key);
            for (let j=0;j<userArr.length;j++){
                //check if the logged in account has permission as a user
                if (userArr[j].addy === address)
                    if (userArr[j].canWrite){
                        permissionsArray.push("You can read/write on account # "+ accts[i].key)
                    }
                    else{
                        permissionsArray.push("You can read on account # "+ accts[i].key)
                    }
            }
        }
        return permissionsArray;
    }


    render() {
        return (
            <div className="main-tile">
                <h1>This is the download page</h1>
                {this.logAccountsForAddress(this.props.verifiedAddress).map( (line)=>(
                    <p key={line}>{line}</p>
                ))}
            </div>
        );
    };
};

const mapStateToProps = function(state){
    return{
        state
    }
}
export default connect(mapStateToProps)(Download)
