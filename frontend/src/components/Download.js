import React, { Component } from 'react';
import {connect} from 'react-redux';
//import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';

//CSS Files
//import './Header.css';

class Download extends Component {
    constructor(props){
        super(props)
        this.state ={
            accessibleAccounts : []
        }
    }


    getUserArray(acctN) {
        let accounts = this.props.state.todo.accounts;
        let arrIndex = accounts.findIndex(o => o.key === acctN);
        if (arrIndex>=0 && accounts[arrIndex].users)
            return (accounts[arrIndex].users)
        return []

    }


    logAccountsForAddress(address){
        let permissionsArray =[]

        let accts = this.props.state.todo.accounts;
        for (let i=0;i<accts.length;i++){
            if (accts[i].own === address){
                console.log("you own account#" + i)
                permissionsArray.push("you own account#" + i)  
            }
            let userArr = this.getUserArray(accts[i].key);
            //onsole.log(userArr)
            for (let j=0;j<userArr.length;j++){
                //console.log(userArr[j])
                if (userArr[j].addy === address)
                    if (userArr[j].canWrite){
                        console.log("You can read/write on account # "+ accts[i].key)
                        permissionsArray.push("You can read/write on account # "+ accts[i].key)
                    }
                    else{
                        console.log("You can read on account # "+ accts[i].key)
                        permissionsArray.push("You can read on account # "+ accts[i].key)
                    }
            }
        }
        return permissionsArray;
    }


    render() {
        return (
            <div className="main-tile">
            
            <br></br><br></br><br></br><br></br><br></br>
            <h1>This is the download page</h1>


            {this.logAccountsForAddress(this.props.verifiedAddress).map( (line)=>(
                <p>{line}</p>
            ))}
        
            <button onClick={() => console.log(this.props.state.todo.accounts)}>Show accounts array</button>
            <br></br>
            <br></br>
            <button onClick={() => this.logAccountsForAddress(this.props.verifiedAddress)}>log accounts</button>


            </div>
        );
    };
};

//export default Download;

//export default UserManagement;
const mapStateToProps = function(state){
    return{
        state
    }
}


export default connect(mapStateToProps)(Download)
