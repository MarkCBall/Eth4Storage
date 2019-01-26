import React, { Component } from "react";
import VerifySignature from "../redux/actions/VerifySignature";
import { connect } from "react-redux";


//mport { Button } from 'react-bootstrap';

class Login extends Component {

    initLogin() {
        let TS = new Date();
        let TSs =
            TS.getFullYear() +
            "-" +
            TS.getMonth() +
            "-" +
            TS.getDate() +
            " at " +
            TS.getHours() +
            ":00 o 'clock";
        //get metamask's open account address
        let signingAcct = window.web3.eth.coinbase;
        //prompt the client to sign the string
        window.web3.personal.sign(
            window.web3.fromUtf8(TSs), //strin converted to proper format
            signingAcct,
            (e, signature) => {
                //this.props.setAddressFromSignature(TSs, signature);
                this.props.addSignature(TSs, signature);
                this.props.calcAddress(TSs, signature);

            }
        );
    }

    render() {
        return (
            <div>
                Logged in with <strong>{this.props.address}</strong> on{" "}
                <strong>{this.props.messageToSign}</strong>
                &nbsp;&nbsp;
            <button
                    type="button"
                    className="btn btn-primary"
                    onClick={this.initLogin.bind(this)}
                //onClick =//{this.props.///////////////////////////////////////////////////}
                >
                    Login
        </button>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        address: state.VerifySignature.verifiedAddress,
        messageToSign: state.VerifySignature.msg
    }
}

function mapDispatchToProps(dispatch) {
    return {
        calcAddress: (msg, msgSig) => {
            dispatch(VerifySignature.calcAddress(dispatch, msg, msgSig))
        },
        addSignature: (msg, msgSig) => {
            dispatch(VerifySignature.addSignature(dispatch, msg, msgSig))

        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);