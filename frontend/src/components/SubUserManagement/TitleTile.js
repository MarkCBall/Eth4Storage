import React, { Component } from "react";

class TitleTile extends Component {
  render() {
    return (
      <>
        <h1>{this.props.title}</h1>
        {this.props.children}
        <hr />
      </>
    );
  }
}

export default TitleTile;
