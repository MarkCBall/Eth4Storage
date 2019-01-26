import React, { Component } from "react";
import { connect } from "react-redux";

// permissions            1 byte = 2 hex values
const x = 1;  // execute  0000 0001
const w = 2;  // write    0000 0010
const r = 4;  // read     0000 0100

// To set permissions apply bitwise OR
// To remove permissions apply bitwise XOR
function setPerms(initialState, perm, checked) {
  return !checked ? initialState ^ perm : initialState | perm;
}

class AddUserButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      permission: 0,
      inputValue: ""
    };
  }


  addUserSelectPermissions() {
    let inputAddress = this.state.inputValue;
    let accountN = this.props.account;

    // Convert permission to hex and pad first 4 bits with 0
    let perms = "0x0" + this.state.permission.toString(16);

    // DEBUG
    console.log(this);
    console.log(inputAddress, accountN, perms);

    this.props.Contract.createUserInAccount(accountN, inputAddress, perms, (e, r) => {});

  }

  render() {
    return (
      <div className="col-8">
      <>
      Read
      <input ref="read"
      onChange={() => this.setState({
      permission: setPerms(this.state.permission, r, this.refs.read.checked)
      })}
      type="checkbox"
      />
      &nbsp;Write
      <input ref="write"
      onChange={() => this.setState({
      permission: setPerms(this.state.permission, w, this.refs.write.checked)
      })}
      type="checkbox"
      />
      &nbsp;Execute
      <input ref="execute"
      onChange={() => this.setState({
      permission: setPerms(this.state.permission, x, this.refs.execute.checked)
      })}
      type="checkbox"
      />
      <input
      type="text"
      placeholder="new user's address"
      value={this.state.inputValue}
      onChange={e => this.setState({ inputValue: e.target.value })}
      />
      <button onClick={e => this.addUserSelectPermissions(e)}>Add New User</button>
      </>
      </div>

    );
  }
}

const mapStateToProps = function(state) {
    return {
      Contract:state.QueryContract.contract
    };
  };

  export default connect(mapStateToProps)(AddUserButton);
