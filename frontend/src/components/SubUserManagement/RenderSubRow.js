import React, { Component } from 'react';

//do this better - send contract through props?
import ContractABI, {ContractAddress} from '../../ContractABI';

class RenderSubRow extends Component {
    constructor(props){
        super(props)
        this.state ={
            userCountInAccount:0,
            // canWrite:[],
            users:[]
        }

        //set state to show if users can write
        var MyContract = window.web3.eth.contract(ContractABI).at(ContractAddress);
        var acctNum = this.props.rowNum;
        MyContract.userCountsInAccount.call(acctNum, (e,response) => {
            let numUsers = response.c.toString(10);
            console.log("num users is "+numUsers)
            this.setState({userCountInAccount:numUsers})
            //console.log(response.c.toString(10))


            let arr = [];
            let allFilled = 0 ;
            for (let i=0;i<numUsers;i++){
            let numUsers = parseInt(response.c.toString(10));
                MyContract.usersOfAccount(acctNum,i,(e,r)=>{
                    arr[i] = {}
                    arr[i].key=i
                    arr[i].addy = r[0]
                    arr[i].canWrite = r[1]
                    allFilled++;

                    if (allFilled===numUsers){
                        arr.sort((a,b) => { 
                            if (a.key < b.key)
                                return -1;
                            return 1;
                            })
                        this.setState({users:arr});
                        console.log(arr)
                    }


                    // console.log("acct#"+acctNum+" user#"+i)
                    // console.log(r[0])
                    // console.log(r[1])
                })
            }

        })
    }

    deleteUser(acctN, userN){
        var MyContract = window.web3.eth.contract(ContractABI).at(ContractAddress);
            MyContract.deleteUser(0,0,(e,r)=>{
            })
    }

    disableWrite(acctN, userN){
        var MyContract = window.web3.eth.contract(ContractABI).at(ContractAddress);
        MyContract.disallowWrite(acctN, userN,(e,r)=>{
        })
    }
    enableWrite(acctN, userN){
        var MyContract = window.web3.eth.contract(ContractABI).at(ContractAddress);
        MyContract.allowWrite(acctN, userN,(e,r)=>{
        })
    }

       render() {
        return (
            <>
                {this.state.users.map( (usr) => (

                    <div key={usr.key} className="row">
                        <div className="col-1 col-solid"></div>
                        <div className="col-4 col-solid"></div>
                        <div className="col-1 col-dotted"></div>
                        <div className="col-6">
                            {usr.addy}
                            {usr.canWrite ? 
                                <button onClick={()=> {this.disableWrite(this.props.rowNum,usr.key)}}>Disable write</button> 
                            : 
                                <button onClick={()=> {this.enableWrite(this.props.rowNum,usr.key)}}>Enable write</button>
                            }
                            <button onClick={()=> {this.deleteUser(this.props.rowNum,usr.key)}}>Delete</button>
                        </div>
                    </div>
                ))}

            </>
        );
    };
};

export default RenderSubRow;

