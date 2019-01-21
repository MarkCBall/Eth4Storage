import React, { Component } from "react";
import { connect } from "react-redux";

//relative imports react items
import TitleTile from "./SubUserManagement/TitleTile";
import RenderRow from "./SubUserManagement/RenderRow";
import RenderSubRow from "./SubUserManagement/RenderSubRow";
import HeaderRow from "./SubUserManagement/HeaderRow";
import FooterSubRow from "./SubUserManagement/FooterSubRow";
import Footer from "./Footer";

//relative imports smart contract data
import ContractABI, { ContractAddress } from "../ContractABI";

//CSS Files
import "./SubUserManagement/UserManagement.css";
//import AddFunds from "./SubUserManagement/AddFunds";

class UserManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: []
    };
  }

  GetContract() {
    return window.web3.eth.contract(ContractABI).at(ContractAddress);
  }

    //changes the status of is users are displayed under the account
    ToggleUsers(acctNum) {
        let tmparr = this.state.isExpanded;
        tmparr[acctNum] = !this.state.isExpanded[acctNum];
        this.setState({ isExpanded: tmparr });
    }
    //interacts with the smart contract to add a account
    addAccount = () => {
        this.GetContract().accPrice.call((e, r) => {
            this.GetContract().createAccount(
                { from: window.web3.eth.accounts[0], value: 0 },
                function (e, r) { }
            );
        });
    };
    /////////////////////////////////////////////////////////////////////////////////////////////////////
    render() {
        return (
            <div className="main-tile">
            <br /><br />
                <TitleTile title="User Management Page">
                    <p>
                        The contract address is: <strong>{ContractAddress}</strong> and it
                        has

            <strong> {this.props.state.todo.accounts.length}</strong> account(s)
          </p>
        </TitleTile>
        <br />
        <div className="container-full">
          <HeaderRow
            row1="Student #"
            row2="Account Owner's Address"
            // row3="Balance (Ether)"
            row4="Permissions"
          />
          {this.props.state.todo.accounts.map(acct => (
            <div key={acct.key}>
              <RenderRow
                account={acct}
                isExpanded={this.state.isExpanded}
                expanded={this.ToggleUsers.bind(this)}
              />
              {this.state.isExpanded[acct.key] ? (
                <>
                  <RenderSubRow
                    verifiedAddress={this.props.verifiedAddress}
                    acctAddy={acct.own}
                    acctNum={acct.key}
                  />
                  {this.props.verifiedAddress === acct.own ? (
                    <FooterSubRow
                      account={acct}
                      verifiedAddress={this.props.verifiedAddress}
                    />
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <></>
              )}
            </div>
          ))}
        </div>
        <br />
        <br />
        <br />
        <button className="btn btn-primary" onClick={this.addAccount}>
          Add New Account
        </button>
        <br />

        <br />
        <br />

        <Footer />
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    state
  };
};

export default connect(mapStateToProps)(UserManagement);
