import React, { Component } from "react";
import { connect } from "react-redux";

//relative imports react items
//import TitleTile from "./SubUserManagement/TitleTile";
import AccountRow from "./SubUserManagement/AccountRow";
import UserRow from "./SubUserManagement/UserRow";
import HeaderRow from "./SubUserManagement/HeaderRow";
import FooterRow from "./SubUserManagement/FooterRow";
import TitleTile from "./SubUserManagement/TitleTile";


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

  //hook this to global state and remove this function
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

    BuyTokens = () => {
        this.GetContract().buyTokens(500,{value: 10000000000000},(e, r) => { } );
    };

    SellTokens = () => {
        this.GetContract().sellTokens(100,(e, r) => {} );
    };
    /////////////////////////////////////////////////////////////////////////////////////////////////////
    render() {
        return (
            <div className="main-tile">
            <br /><br />
            <TitleTile title="User Management Page"></TitleTile>
            <TitleTile>
            <p>
                        The contract address is: <strong>{ContractAddress}</strong> and it
                        has
            <strong> {this.props.Accounts.length}</strong> account(s)
          </p>
        </TitleTile>
        <br />
        <div className="container-full">
          <HeaderRow
            row1="Student #"
            row2="Account Owner's Address"
            row3="Token Bal"
            row4="Permissions"
          />
          {this.props.Accounts.map(acct => (
            <div key={acct.key}>
              <AccountRow
                account={acct}
                isExpanded={this.state.isExpanded}
                expanded={this.ToggleUsers.bind(this)}
              />
              {this.state.isExpanded[acct.key] ? (
                <>
                  <UserRow
                    verifiedAddress={this.props.verifiedAddress}
                    acctAddy={acct.own}
                    acctNum={acct.key}
                  />
                  {this.props.verifiedAddress === acct.own ? (
                    <FooterRow
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

        THIS SHOULD BE IN A NEW CONTAINER
        <button className="btn btn-primary" onClick={this.addAccount}>
          Add New Account
        </button>

        <button className="btn btn-primary" onClick={this.BuyTokens}>
        Buy 500 Tokens
        </button>

        <button className="btn btn-primary" onClick={this.SellTokens}>
        Sell 100 Tokens
        </button>
        <br />

        <br />
        <br />

        
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    Accounts:state.QueryContract.accounts
  };
};

export default connect(mapStateToProps)(UserManagement);
