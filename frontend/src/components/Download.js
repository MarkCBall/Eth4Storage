import React, { Component } from "react";
import { connect } from "react-redux";
import Footer from "./Footer";

class Download extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAcct: 0
    };
  }
  getPermissions() {
    return this.props.verifiedAddress in this.props.permissionsByAddress
      ? this.props.permissionsByAddress[this.props.verifiedAddress]
      : [["0", true]];
  }

  handleSelection(acctN) {
    this.setState({ selectedAcct: acctN });
    this.queryServer();
  }

  queryServer() {
    //get req to server
    fetch("http://localhost:3000/users", {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      headers: {
        data: JSON.stringify({
          date: this.props.date,
          dateSignature: this.props.dateSignature,
          accountId: this.state.selectedAcct
        })
      }
    })
      .then(function(response) {
        return response.json();
      })
      .then(data => {
        if (JSON.parse(data) && JSON.parse(data).msgs) {
          document.getElementById("transcript-output").innerHTML = "";

          JSON.parse(data).msgs.forEach(function(msg) {
            document.getElementById("transcript-output").innerHTML +=
              msg + "<br />";
          });
        }
        console.log(data ? JSON.parse(data) : {});
      });
  }

  render() {
    return (
      <div className="main-tile">
        <br />
        <br />
        <h1>Download student transcript</h1>
        <hr />
        <nav className="navbar navbar-expand-lg">
          {Object.keys(this.getPermissions()).map(acct => (
            <div key={acct}>
              <button
                type="button"
                className="btn btn-outline-info"
                
                onClick={() => this.handleSelection(acct)}
              >
                Student #{acct}
              </button>
              &nbsp;&nbsp;
            </div>
          ))}
        </nav>

        <div className="card">
          <div className="card-body">
            <h4 className="card-title">
              Viewing transcript for: Student #{this.state.selectedAcct}
            </h4>
            <p className="card-text">Select student to view their transcript</p>

            <hr />
            <div id="transcript-output" />
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    permissionsByAddress:state.QueryContract.addyPermission
  };
};
export default connect(mapStateToProps)(Download);


