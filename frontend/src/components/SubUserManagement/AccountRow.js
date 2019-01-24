import React, { Component } from "react";

//CSS Files
import "./RowTopBorder.css";

class AccountRow extends Component {
  ShowMoreLessText(acct) {
    return this.props.isExpanded[this.props.account.key]
      ? "Show less"
      : "Show more";
  }

  render() {
    return (
      <div className="row line-above">
        <div className="col-1 col-solid">{this.props.account.key}</div>
        <div className="col-4 col-solid">{this.props.account.own}</div>
        <div
          className="col-6"
          onClick={() => this.props.expanded(this.props.account.key)}
        >
          {this.ShowMoreLessText()}
        </div>
      </div>
    );
  }
}

export default AccountRow;