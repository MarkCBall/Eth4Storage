import React, { Component } from "react";
import { connect } from "react-redux";


class AddUserButton extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       checkbox: false,
//       inputValue: ""
//     };
//   }
 

  addUserSelectPermissions(acctN, fromAddy) {
    //YANESH PUT YOUR LOGIC HERE
  }

  render() {
    return (
        <button type="button"
        className="smallButton"

            onClick={e => this.addUserSelectPermissions(e)}
        >
            Add New User
        </button>

    );
  }
}

const mapStateToProps = function(state) {
    return {
      Contract:state.QueryContract.contract
    };
  };
  
  export default connect(mapStateToProps)(AddUserButton);
