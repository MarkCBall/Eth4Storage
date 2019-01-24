import React, { Component } from "react";
import { connect } from "react-redux";


class FooterRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkbox: false,
      inputValue: ""
    };
  }
 

  addUserSelectPermissions(acctN, fromAddy) {
    //YANESH PUT YOUR LOGIC HERE
  }

  render() {
    return (
      <div className="row">
        <div className="col-1 col-solid" />
        <div className="col-4 col-solid"/>
        <div className="col-1 col-solid" />
        <div className="col-6">
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
