import React, { Component } from "react";
import { connect } from "react-redux";

//import ContractABI, { ContractAddress } from "../../ContractABI";

//CSS Files
import "./UserRow.css";

// permissions
const x = 1;  // execute  00000001
const w = 2;  // write    00000010
const r = 4;  // read     00000100

// To set permissions apply bitwise OR:
const adminPerms = r | w | x;

// To check permission apply bitwise AND:
// adminPerms & r ? 'yes' : 'no'


class UserRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      permission: 0
    };
  }
  //call smart contract to delete user
  deleteUser(acctN, userN) {
    //var MyContract = window.web3.eth.contract(ContractABI).at(ContractAddress);
    this.props.Contract.deleteUser(acctN, userN, (e, r) => {});
  }

  changePermissions() {
    //YANESH , you can do your magic here
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
            <div className="col-1 col-dotted"></div>
            <div className="col-6">
                <span>(
                  {usr.permission << 0 & r ? 'r' : '-'}
                  {usr.permission << 0 & w ? 'w' : '-'}
                  {usr.permission << 0 & x ? 'x' : '-'}
                )&nbsp;
                </span>
              {usr.addy}
              {this.props.acctAddy === this.props.verifiedAddress ? (
                <>

                    <button onClick={() => {console.log(usr, r, w, x)}}>
                      Change Permissions
                    </button>

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

//export default UserRow;
const mapStateToProps = function(state) {
  return {
    Accounts:state.QueryContract.accounts,
    Contract:state.QueryContract.contract
  };
};

export default connect(mapStateToProps)(UserRow);
