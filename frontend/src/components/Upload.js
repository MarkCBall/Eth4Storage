import React, { Component } from "react";
import { connect } from "react-redux";
import "./Upload.css";

class Upload extends Component {
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
            if ((eligibleAccounts[prop] % 4) >= 2)//if the bit representing 2 is on
                permittedArray[prop]=true;
        }
    }
    return permittedArray
}

  handleSelection(acctN) {
    this.setState({ selectedAcct: acctN });
  }

  putToServer() {
    fetch("http://localhost:3000/users", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        input_text: document.getElementById("inputTxtBox").value,
        accountId: this.state.selectedAcct,
        date: this.props.msg,
        dateSignature: this.props.msgSig
      })
    });
    //console.log("/n"+document.getElementById("inputTxtBox").value);
  }

  render() {
    return (
      <div className="main-tile">
        <br />
        <br />
        <h1>Upload data to the server</h1>
        <hr />
        <nav className="navbar navbar-expand-lg">
        {Object.keys(this.getPermissions()).map(acct => (
            <div key={acct[0]}>
              <button
                type="button"
                className="btn btn-outline-info"

                onClick={() => this.handleSelection(acct[0])}
              >
                Account #{acct[0]}
              </button>
              &nbsp;&nbsp;
            </div>
          ))}
        </nav>

        <div className="card">
          <div className="card-body">
            <h4 className="card-title">
              Post data for: Account #{this.state.selectedAcct}
            </h4>
            <p className="card-text">
              Account #{this.state.selectedAcct} selected, enter data and
              click Upload.
            </p>
            <div className="form-inline my-5 my-lg-0 upload-box">
              <input
                className="form-control my-sm-5"

                placeholder="Enter grades to add to transcript"
                aria-label="Upload"
                id="inputTxtBox"
                type="textbox"
              />
              <button
                className="btn btn-primary"
                onClick={() => this.putToServer()}
              >
                Upload
              </button>
            </div>
          </div>
        </div>


      </div>
    );
  }
}

// export default Upload;

const mapStateToProps = function(state) {
  return {
    permissionsByAddress:state.QueryContract.addyPermission,
    verifiedAddress:state.VerifySignature.verifiedAddress,
    msg:state.VerifySignature.msg,
    msgSig:state.VerifySignature.msgSig

  };
};
export default connect(mapStateToProps)(Upload);
