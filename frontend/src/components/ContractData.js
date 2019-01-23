import React, { Component } from "react";
import { connect } from "react-redux";

//relative imports redux items
import QueryContractActions from "../redux/actions/QueryContract";


class ContractData extends Component {
    constructor(props) {
        super(props)
        this.setContract();
        //give half a second for contract to get into state before moving on
        //how can this be improved??
        setTimeout(
            (
                () => 
                this.contractToState()
            )
        ,500);
    }

    setContract(){
        this.props.setContract();
    }

    //pulls smart contract data semi-asyncronously
    contractToState() {
                this.props.Contract.accountCount.call((e, resNumAccts) => {
                    let numAccts = parseInt(resNumAccts.toString(10));
                    for (let acctNum = 0; acctNum < numAccts; acctNum++) {
                        this.props.addAccount(acctNum);
                        this.iterateUsers(acctNum)
                    }
                }) 
    }
    //pulls user info from contract into state
    iterateUsers(acctNum) {
        //find the number of users in the account - done as a callback 
        this.props.Contract.userCountsInAccount.call(acctNum, (e, resNumUsers) => {
            let numUsers = resNumUsers.toString(10);
            //iterate over each user in the account -- should this be async????
            for (let userNum = 0; userNum < numUsers; userNum++) {
                this.props.addUserToAccount(acctNum, userNum);
            }
        });
    }
    render() {
        return <div />;
    }
}


function mapStateToProps(state){
    return {
        Contract: state.QueryContract.contract
    }
}

function mapDispatchToProps(dispatch){
    return {
        addAccount:(acctNum) =>{
            dispatch(QueryContractActions.addAccount(dispatch,acctNum))
        },
        addUserToAccount:(acctNum,user) => {
            dispatch(QueryContractActions.addUserToAccount(dispatch,acctNum,user))
        },
        setContract:() =>{
            dispatch(QueryContractActions.setContract())
        },
    }
}



export default connect(mapStateToProps,mapDispatchToProps)(ContractData);
