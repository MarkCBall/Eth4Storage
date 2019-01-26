import React, { Component } from "react";
import { connect } from "react-redux";


class Download extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedAcct: "NA"
        };
    }
    getPermissions() {
        //01 bit is compute
        //02 bit is write
        //04 bit is read
        let permittedArray = [];
        if (this.props.verifiedAddress in this.props.permissionsByAddress){
            let eligibleAccounts = this.props.permissionsByAddress[this.props.verifiedAddress]
            for(var prop in eligibleAccounts) {
                if ((eligibleAccounts[prop] % 8) >= 4)//if the bit representing 4 is on
                    permittedArray[prop]=true;
            }
        }
        return permittedArray
    }

    handleSelection(acctN) {
        this.setState({ selectedAcct: acctN });
        this.queryServer();
    }

    queryServer() {
        //get req to server
        fetch("http://localhost:3000/users", {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, cors, *same-origin
            headers: {
                data: JSON.stringify({
                    date: this.props.msg,
                    dateSignature: this.props.msgSig,
                    accountId: this.state.selectedAcct
                })
            }
        })
            .then(function (response) {
                return response.json();
            })
            .then(data => {
                if (JSON.parse(data) && JSON.parse(data).msgs) {
                    document.getElementById("transcript-output").innerHTML = "";

                    JSON.parse(data).msgs.forEach(function (msg) {
                        document.getElementById("transcript-output").innerHTML +=
                            msg + "<br />";
                    });
                }
                console.log(data ? JSON.parse(data) : {});
            });
    }

    render() {
        return (
            <div className="main-tile">
                <br />
                <br />
                <h1>Download student transcript</h1>
                <hr />
                <nav className="navbar navbar-expand-lg">
                    {Object.keys(this.getPermissions()).map(acct => (
                        <div key={acct}>
                            <button
                                type="button"
                                className="btn btn-outline-info"

                                onClick={() => this.handleSelection(acct)}
                            >
                                Student #{acct}
                            </button>
                            &nbsp;&nbsp;
            </div>
                    ))}
                </nav>

                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">
                            Viewing transcript for: Student #{this.state.selectedAcct}
                        </h4>
                        <p className="card-text">Select student to view their transcript</p>

                        <hr />
                        <div id="transcript-output" />
                    </div>
                </div>


            </div>
        );
    }
}
const mapStateToProps = function (state) {
    return {
        permissionsByAddress: state.QueryContract.addyPermission,
        verifiedAddress: state.VerifySignature.verifiedAddress,
        msg: state.VerifySignature.msg,
        msgSig: state.VerifySignature.msgSig
    };
};
export default connect(mapStateToProps)(Download);
