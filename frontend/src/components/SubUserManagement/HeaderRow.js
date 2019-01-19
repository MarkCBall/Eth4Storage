import React, { Component } from "react";

//CSS Files
import "./RowTopBorder.css";

class HeaderRow extends Component {
  render() {
    return (
      <div className="row line-above">
        <div className="col-1 col-solid">
          <b>{this.props.row1}</b>
        </div>
        <div className="col-4 col-solid">
          <b>{this.props.row2}</b>
        </div>
        <div className="col-6">
          <b>{this.props.row4}</b>
        </div>
      </div>
    );
  }
}

export default HeaderRow;
