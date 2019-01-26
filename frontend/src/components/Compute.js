import React, { Component } from "react";
import { connect } from "react-redux";


class Compute extends Component {
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
            if ((eligibleAccounts[prop] % 2) >= 1)//if the bit representing 1 is on
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

  queryServer() {
    if (this.state.selectedAcct == "NA") { return; }

    //get req to server
    fetch("http://localhost:3000/users/compute", {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      headers: {
        data: JSON.stringify({
          input: document.getElementById("inputTxtBox").value
        })
      }
    })
      .then(function(response) {
        console.log(response);
        return response.json();
      })
      .then(data => {
          document.getElementById("transcript-output").innerHTML = "Result: " + JSON.parse(data).answer;
      });
  }

  render() {
    return (
      <div className="main-tile">
        <br />
        <br />
        <h1>Compute something on the server</h1>
        <hr />
        <nav className="navbar navbar-expand-lg">
          {Object.keys(this.getPermissions()).map(acct => (
            <div key={acct}>
              <button
                type="button"
                className="btn btn-outline-info"

                onClick={() => this.handleSelection(acct)}
              >
                Account #{acct}
              </button>
              &nbsp;&nbsp;
            </div>
          ))}
        </nav>

        <div className="card">
          <div className="card-body">
            <h4 className="card-title">
              Compute on server using: Account #{this.state.selectedAcct}
            </h4>
            <p className="card-text">
              Account #{this.state.selectedAcct} selected, enter data and
              click Upload.
            </p>
            <div className="form-inline my-5 my-lg-0 upload-box">
              <input
                className="form-control col-md-3"

                placeholder="Get a random number between 0 and ..."
                aria-label="Compute"
                id="inputTxtBox"
                type="textbox"
              />
              <button
                className="btn btn-primary"
                onClick={() => this.queryServer()}
              >
                Compute
              </button>

            </div>
            <hr />
            <div id="transcript-output" />

          </div>
        </div>


      </div>
    );
  }
}
const mapStateToProps = function(state) {
    return {
      permissionsByAddress:state.QueryContract.addyPermission,
      verifiedAddress:state.VerifySignature.verifiedAddress,
      msg:state.VerifySignature.msg,
      msgSig:state.VerifySignature.msgSig
    };
  };
  export default connect(mapStateToProps)(Compute);
