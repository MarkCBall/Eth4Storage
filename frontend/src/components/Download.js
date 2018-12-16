import React, { Component } from 'react';
import { connect } from 'react-redux';


class Download extends Component {
    constructor(props) {
        super(props);
        this.state = {
            canWriteObj: {}
        }
        //why can't this be here?
        //this.logAccountsForAddress(this.props.verifiedAddress)
    }

    componentDidMount() {
        //console.log("mounting")
        this.logAccountsForAddress(this.props.verifiedAddress)
    }

    componentWillUpdate() {
        //console.log("updating")
        //this.logAccountsForAddress(this.props.verifiedAddress)
    }

    addElemToPermissionsArr(elem) {
        //console.log("elem added is", elem)
        this.setState(prevState => ({
            canWriteObj: { ...prevState.canWriteObj, [elem.acctN]: elem.canWrite }
        }))
    }



    //returns an array of users for a given account number
    getUserArray(acctN) {
        let accounts = this.props.state.todo.accounts;
        let arrIndex = accounts.findIndex(o => o.key === acctN);
        if (arrIndex >= 0 && accounts[arrIndex].users)
            return (accounts[arrIndex].users)
        return []

    }
    //returns an array of strings with the permissions the logged in metamask's account has
    logAccountsForAddress(address) {

        let accts = this.props.state.todo.accounts;
        //loop through all accounts
        for (let i = 0; i < accts.length; i++) {
            //loop through the users of the specific account
            let userArr = this.getUserArray(accts[i].key);
            for (let j = 0; j < userArr.length; j++) {
                //check if the logged in account has permission as a user
                if (userArr[j].addy === address)
                    if (userArr[j].canWrite) {
                        this.addElemToPermissionsArr({ acctN: accts[i].key, canWrite: true })
                    }
                    else {
                        this.addElemToPermissionsArr({ acctN: accts[i].key, canWrite: false })
                    }
            }
        }
    }

    render() {
        return (
            <div className="main-tile">



                <h1>This is the download page</h1>
                <p>Login to see what you have access to</p>

                <p>In future you can click on an account number and be taken to relevant upload/download page of that account</p>
                <p>NOTE!!! --- YOU MUST NAVIGATE TO THIS PAGE AFTER LOGGING IN TO RENDER ANYTHING</p>
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

                    {Object.keys(this.state.canWriteObj).map((x) => (
                        <div className="row" key={x}>
                            <div className="col-1">
                                {x}
                            </div>
                            <div className="col-1">
                                yes
                            </div>
                            <div className="col-1">
                                {this.state.canWriteObj[x] ? "yes" : "no"}
                            </div>
                        </div>
                    ))}

                </div>


                <button onClick={() => console.log(
                    this.state.canWriteObj
                )}>Console.log permissions for debugging</button>

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