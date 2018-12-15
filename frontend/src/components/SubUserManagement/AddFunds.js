import React, { Component } from "react";
import ContractABI, { ContractAddress } from "../../ContractABI";

class AddFunds extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amountToFund: "",
      accToFund: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  GetContract() {
    return window.web3.eth.contract(ContractABI).at(ContractAddress);
  }

  callAddFunds(accNum) {
    this.GetContract().addFunds(
      accNum,
      {
        from: window.web3.eth.accounts[accNum],
        value: this.state.amountToFund
      },
      function(e, r) {}
    );
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.callAddFunds(this.state.accToFund);
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          name="accToFund"
          placeholder="Account #"
          value={this.state.accToFund}
          onChange={this.handleChange}
        />
        <input
          name="amountToFund"
          placeholder="Amount (wei)"
          value={this.state.amountToFund}
          onChange={this.handleChange}
        />
        <input type="submit" value="Add Funds" />
      </form>
    );
  }
}

export default AddFunds;
