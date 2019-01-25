import React, { Component } from "react";
import { connect } from "react-redux";

let log = console.log;
// permissions
const x = 1;  // execute  00000001
const w = 2;  // write    00000010
const r = 4;  // read     00000100

// To set permissions apply bitwise OR:
const adminPerms = r | w | x;

// To check permission apply bitwise AND:
// adminPerms & r ? 'yes' : 'no'

class FooterRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      permission: 0,
      inputValue: ""
    };
  }


  addUserSelectPermissions() {
    //YANESH PUT YOUR LOGIC HERE

    // if (!this.validStateAddress()) {
    //   alert("Not a valid Ethereum Address");
    //   return;
    // }
    //log(acctN, fromAddy)

    let inputAddress = this.state.inputValue;
    let accountN = this.props.account.key;

    log(inputAddress, accountN);

    // if (this.state.checkbox) this.approveWriter(accountN, inputAddress);
    // else this.approveViewer(accountN, inputAddress);

    console.log(this.props.Contract);
    this.props.Contract.createUserInAccount(accountN, inputAddress, '0x06', (e, r) => {});

  }

  render() {
    return (
      <div className="row">
        <div className="col-1 col-solid" />
        <div className="col-4 col-solid"/>
        <div className="col-1 col-solid" />
        <div className="col-6">

        <div className="col-6">
  <>
    <input
      type="text"
      placeholder="new user's address"
      value={this.state.inputValue}
      onChange={e => this.setState({ inputValue: e.target.value })}
    />
    <button onClick={e => this.addUserSelectPermissions(e)}>Create</button>
    <input
      onChange={() => this.setState({ checkbox: !this.state.checkbox })}
      type="checkbox"
    />
    New user can write
  </>
</div>
            <button onClick={e => this.addUserSelectPermissions(e)}>Add New User</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
    return {
      Contract:state.QueryContract.contract
    };
  };

  export default connect(mapStateToProps)(FooterRow);
