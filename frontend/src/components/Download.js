import React, { Component } from 'react';
import { connect } from 'react-redux';


class Download extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         canWriteObj: {}
    //     }
    // }
    // componentWillReceiveProps(){
    //     this.logAccountsForAddress(this.props.verifiedAddress)
    // }

    // componentDidMount() {
    //     this.logAccountsForAddress(this.props.verifiedAddress)
    // }

    // addElemToPermissionsArr(elem) {
    //     //when passed true, set the value to true
    //     if (elem.canWrite){
    //         this.setState(prevState => ({
    //             canWriteObj: { ...prevState.canWriteObj, [elem.acctN]: true }
    //         }))
    //     }
    //     else{//when passed false, create the object with it's current value or false if object doesn't exist
    //         this.setState(prevState => ({
    //             canWriteObj: { 
    //                 ...prevState.canWriteObj, 
    //                     [elem.acctN]: prevState.canWriteObj[elem.acctN] 
    //                     || 
    //                     false 
    //             }
    //         }))
    //     }
    // }

    // logAccountsForAddress(address) {
    //     let accts = this.props.state.todo.accounts; //[acctN].users[userN].addy
    //     //loop through all accounts
    //     for (let acctN = 0; acctN < accts.length; acctN++) {
    //         //loop through the users of the specific account
    //         let userArr = (typeof(accts[acctN]) === "undefined") ? {} : accts[acctN].users
    //         for (let userN = 0; userN < userArr.length; userN++) {
    //             //check if the logged in account has permission as a user
    //             let userAddy = (typeof(userArr[userN]) === "undefined") ? {} : userArr[userN].addy
    //             if (userAddy === address){
    //                 this.addElemToPermissionsArr({ 
    //                     acctN: accts[acctN].key,
    //                     canWrite: userArr[userN].canWrite 
    //                 })
    //             }
    //         }
    //     }
    // }
    
    render() {
        return (
            <div className="main-tile">

                <h1>This is the download page</h1>
                <p>Login to see what you have access to</p>

                <p>In future you can click on an account number and be taken to relevant upload/download page of that account</p>
                <p>(THIS PAGE IS IN DEVELOPMENT)</p>

                <div className='container'>
                    <div className="row">
                        <div className="col-1">
                            Account #
                        </div>
                        <div className="col-1">
                            Can Read
                        </div>
                        <div className="col-1">
                            CanWrite
                        </div>
                    </div>

                    {Object.keys(
                        this.props.verifiedAddress in this.props.state.todo.addyPermission 
                        ? 
                        this.props.state.todo.addyPermission[this.props.verifiedAddress] 
                        :
                        {}
                    ).map((x) => (
                    <div className="row" key={x}>
                        <div className="col-1">
                            {x}
                        </div>
                        <div className="col-1">
                            yes
                        </div>
                        <div className="col-1">
                            {this.props.state.todo.addyPermission[x] ? "yes" : "no"}
                        </div>
                    </div>
                    ))}

                </div>


                <button onClick={() => console.log(
                    this.state.canWriteObj
                )}>Console.log permissions for debugging</button>

                                <button onClick={() => console.log(
                    this.props.state.todo
                )}>Console.log state for debugging</button>

            </div>
        );
    };
};

const mapStateToProps = function (state) {
    return {
        state
    }
}
export default connect(mapStateToProps)(Download)


//<p>{this.props.state.todo.accounts[0].key}</p>