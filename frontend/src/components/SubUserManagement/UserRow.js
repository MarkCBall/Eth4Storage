import React, { Component } from "react";
import { connect } from "react-redux";


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
function getPerms(read, write, exe) {
  let permInt = read ? r : 0 | write ? w : 0 | exe ? x : 0;
  console.log(read, write, exe, permInt);

  return "0x0" + permInt.toString(16);
}

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

  changePermissions(acctN, userN, userP) {
    //YANESH , you can do your magic here
    console.log(acctN, userN, userP);
    this.props.Contract.modifyUserPermissions(acctN, userN, userP, (e,r)=>{});
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
            &nbsp;Read
            <input ref="read"
              checked={usr.permission << 0 & r}
              disabled={!(this.props.acctAddy === this.props.verifiedAddress)}
              type="checkbox"
            />
            &nbsp;Write
            <input ref="write"
              checked={usr.permission << 0 & w}
              disabled={!(this.props.acctAddy === this.props.verifiedAddress)}
              type="checkbox"
            />
            &nbsp;Execute
            <input ref="execute"
              checked={usr.permission << 0 & x}
              disabled={!(this.props.acctAddy === this.props.verifiedAddress)}
              type="checkbox"
            />
              {usr.addy}
              {this.props.acctAddy === this.props.verifiedAddress ? (
                <>

                    <button onClick={() => {this.changePermissions(
                      this.props.acctNum,
                      usr.key,
                      usr.permission
                    )}}>
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
              ) : ( <></> )}

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
    Contract:state.QueryContract.contract,
    verifiedAddress:state.VerifySignature.verifiedAddress,
  };
};

export default connect(mapStateToProps)(UserRow);
