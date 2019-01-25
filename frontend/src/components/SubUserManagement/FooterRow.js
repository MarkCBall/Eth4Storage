import React, { Component } from "react";
import { connect } from "react-redux";

let log = console.log;

// permissions            1 byte = 2 hex values
const x = 1;  // execute  0000 0001
const w = 2;  // write    0000 0010
const r = 4;  // read     0000 0100

// To set permissions apply bitwise OR
// To remove permissions apply bitwise XOR
function setPerms(initialState, perm, checked) {
  return !checked ? initialState ^ perm : initialState | perm;
}

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

    let inputAddress = this.state.inputValue;
    let accountN = this.props.account.key;

    // Convert permission to hex and pad first 4 bits with 0
    let perms = "0x0" + this.state.permission.toString(16);

    // DEBUG
    log(inputAddress, accountN, perms);

    this.props.Contract.createUserInAccount(accountN, inputAddress, perms, (e, r) => {});

  }

  render() {
    return (
      <div className="row">
        <div className="col-1 col-solid" />
        <div className="col-4 col-solid"/>
        <div className="col-1 col-solid" />
        <div className="col-6">

        <div className="col-8">
  <>
    <input
      type="text"
      placeholder="new user's address"
      value={this.state.inputValue}
      onChange={e => this.setState({ inputValue: e.target.value })}
    />
    <button onClick={e => this.addUserSelectPermissions(e)}>Create</button>
    Read:
    <input ref="read"
      onChange={() => this.setState({
        permission: setPerms(this.state.permission, r, this.refs.read.checked)
      })}
      type="checkbox"
    />
    Write:
    <input ref="write"
      onChange={() => this.setState({
        permission: setPerms(this.state.permission, w, this.refs.write.checked)
      })}
      type="checkbox"
    />
    Execute:
    <input ref="execute"
      onChange={() => this.setState({
        permission: setPerms(this.state.permission, x, this.refs.execute.checked)
      })}
      type="checkbox"
    />
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
