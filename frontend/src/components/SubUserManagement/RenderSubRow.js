import React, { Component } from "react";
import { connect } from "react-redux";

//import ContractABI, { ContractAddress } from "../../ContractABI";

//CSS Files
import "./RenderSubRow.css";

class RenderSubRow extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  //call smart contract to delete user
  deleteUser(acctN, userN) {
    //var MyContract = window.web3.eth.contract(ContractABI).at(ContractAddress);
    this.props.Contract.deleteUser(acctN, userN, (e, r) => {});
  }
  //call smart contract to disable write access
  disableWrite(acctN, userN) {
    //var MyContract = window.web3.eth.contract(ContractABI).at(ContractAddress);
    this.props.Contract.disallowWrite(acctN, userN, (e, r) => {});
  }
  //call smart contract to enable write access
  enableWrite(acctN, userN) {
    //var MyContract = window.web3.eth.contract(ContractABI).at(ContractAddress);
    this.props.Contract.allowWrite(acctN, userN, (e, r) => {});
  }

  //searches the global state for account# and returns the associated user array
  getUserArray(acctN) {
    let accounts = this.props.Accounts;
    let arrIndex = accounts.findIndex(o => o.key === acctN);
    if (accounts[arrIndex].users) return accounts[arrIndex].users;
    return [];
  }
  render() {
    return (
      <>
        {this.getUserArray(this.props.acctNum).map(usr => (
          <div key={usr.key} className="row">
            <div className="col-1 col-solid" />
            <div className="col-4 col-solid" />
            {/* <div className="col-1 col-dotted"></div> */}
            <div className="col-6">
              {usr.canWrite ? (
                <div className="dot green" />
              ) : (
                <div className="dot red" />
              )}
              {usr.addy}
              {this.props.acctAddy === this.props.verifiedAddress ? (
                <>
                  {usr.canWrite ? (
                    <button
                      onClick={() => {
                        this.disableWrite(this.props.acctNum, usr.key);
                      }}
                    >
                      Disable
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        this.enableWrite(this.props.acctNum, usr.key);
                      }}
                    >
                      Enable
                    </button>
                  )}
                  <button
                    onClick={() => {
                      this.deleteUser(this.props.acctNum, usr.key);
                    }}
                  >
                    Delete
                  </button>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        ))}
      </>
    );
  }
}

//export default RenderSubRow;
const mapStateToProps = function(state) {
  return {
    Accounts:state.QueryContract.accounts,
    Contract:state.QueryContract.contract
  };
};

export default connect(mapStateToProps)(RenderSubRow);
