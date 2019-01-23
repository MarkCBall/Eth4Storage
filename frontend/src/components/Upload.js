import React, { Component } from "react";
import { connect } from "react-redux";
import Footer from "./Footer";
import "./Upload.css";

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAcct: 0
    };
  }

  getPermissions = () => {
    if (this.props.verifiedAddress in this.props.permissionsByAddress) {
      let permissionedAddresses = this.props.permissionsByAddress[
        this.props.verifiedAddress
      ];
      //filter only entries with write permission == true
      console.log("asdfasdf", permissionedAddresses);
      return Object.entries(permissionedAddresses).filter(o => o[1]);
    }
    return [["0", true]];
  };

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
        date: this.props.date,
        dateSignature: this.props.dateSignature
      })
    });
    //console.log("/n"+document.getElementById("inputTxtBox").value);
  }

  render() {
    return (
      <div className="main-tile">
        <br />
        <br />
        <h1>Upload grades to student transcript</h1>
        <hr />
        <nav className="navbar navbar-expand-lg">
          {this.getPermissions().map(acct => (
            <div key={acct[0]}>
              <button
                type="button"
                className="btn btn-outline-info"
                
                onClick={() => this.handleSelection(acct[0])}
              >
                Student #{acct[0]}
              </button>
              &nbsp;&nbsp;
            </div>
          ))}
        </nav>

        <div className="card">
          <div className="card-body">
            <h4 className="card-title">
              Post transcript data for: Student #{this.state.selectedAcct}
            </h4>
            <p className="card-text">
              Student #{this.state.selectedAcct} selected, enter grade data and
              click Upload.
            </p>
            <div className="form-inline my-5 my-lg-0 upload-box">
              <input
                className="form-control my-sm-5"
                //type="search"
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

        <Footer />
      </div>
    );
  }
}

// export default Upload;

const mapStateToProps = function(state) {
  return {
    permissionsByAddress:state.QueryContract.addyPermission
  };
};
export default connect(mapStateToProps)(Upload);
