import React, { Component } from "react";
import { connect } from "react-redux";

//relative imports react items
//import TitleTile from "./SubUserManagement/TitleTile";
import AccountRow from "./SubUserManagement/AccountRow";
import UserRow from "./SubUserManagement/UserRow";
import HeaderRow from "./SubUserManagement/HeaderRow";
import FooterRow from "./SubUserManagement/FooterRow";
import TitleTile from "./SubUserManagement/TitleTile";


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


    //changes the status of is users are displayed under the account
    ToggleUsers(acctNum) {
        let tmparr = this.state.isExpanded;
        tmparr[acctNum] = !this.state.isExpanded[acctNum];
        this.setState({ isExpanded: tmparr });
    }
    //interacts with the smart contract to add a account
    addAccount = () => {
        this.props.Contract.accPrice.call((e, r) => {
            this.props.Contract.createAccount(
                { from: window.web3.eth.accounts[0], value: 0 },
                function (e, r) { }
            );
        });
    };

    BuyTokens = () => {
        this.props.Contract.buyTokens(500,{value: 10000000000000},(e, r) => { } );
    };

    SellTokens = () => {
        this.props.Contract.sellTokens(100,(e, r) => {} );
    };

    /////////////////////////////////////////////////////////////////////////////////////////////////////
    render() {
        return (
            <div className="main-tile">
            <br /><br />
            <TitleTile title="User Management Page">
            Cost to add a Account: --put this and get from global state--
            <br/>
            Cost to add a User: --put this and get from global state--
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
    Accounts:state.QueryContract.accounts,
    Contract: state.QueryContract.contract
  };
};

export default connect(mapStateToProps)(UserManagement);
