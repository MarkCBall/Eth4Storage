import React, { Component } from "react";
import { connect } from "react-redux";

//relative imports react items
//import TitleTile from "./SubUserManagement/TitleTile";
import AccountRow from "./SubUserManagement/AccountRow";
import UserRow from "./SubUserManagement/UserRow";
import HeaderRow from "./SubUserManagement/HeaderRow";
import BuyTokens from "./SubUserManagement/BuyTokens";

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
        // let tmparr = this.state.isExpanded;
        // tmparr[acctNum] = !tmparr[acctNum];
        // this.setState({ isExpanded: tmparr });
        this.setState( prevState => ({
            isExpanded: {
                ...prevState.isExpanded,
                [acctNum]:!prevState.isExpanded[acctNum]
            }
        }))
    }


    /////////////////////////////////////////////////////////////////////////////////////////////////////
    render() {
        return (
            <div className="main-tile">
            <br /><br />
            <TitleTile title="User Management Page">
            Cost to add a Account: {this.props.Prices.AccPrice}
            <br/>
            Cost to add a User: {this.props.Prices.UserPrice}
            </TitleTile>

        <br />
        <div className="container-full">
          <HeaderRow
            row1="Account #"
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
                  <UserRow
                    acctAddy={acct.own}
                    acctNum={acct.key}
                  />
              ) : ( <></> )}
            </div>
          ))}
        </div>
        <BuyTokens/>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    Accounts:state.QueryContract.accounts,
    //Contract: state.QueryContract.contract,
    Prices: state.QueryContract.prices,
    verifiedAddress:state.VerifySignature.verifiedAddress,
  };
};

export default connect(mapStateToProps)(UserManagement);
