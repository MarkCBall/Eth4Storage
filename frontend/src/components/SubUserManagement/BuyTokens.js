import React, { Component } from "react";
import { connect } from "react-redux";


class BuyTokens extends Component {
    constructor(props) {
        super(props);
        this.state = {
          transactionAmount: 0,
          weiToBuy:0,
          weiToSell:0
        };
        //this.setSupply();
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
        this.props.Contract.buyTokens(this.state.transactionAmount, { value: parseInt(this.state.weiToBuy*1.1) }, (e, r) => { });
    };

    SellTokens = () => {
        this.props.Contract.sellTokens(this.state.transactionAmount, (e, r) => { });
    };

    avgPriceBetween = (low, high) => {
        //calculates the bonding curve instead of querying the blockchain
        //need to fix to use big number later?
        if (low===high)
            return low*low;
        return (((high*high*high) - (low*low*low)) / 3 / (high-low))
    };

    handleTransactionAmountChange = (event) => {
        let totSupply = this.props.totalSupply;
        let transactionAmountString = event.target.value;
        let transactionAmountInt = parseInt(transactionAmountString)
        let newSupplyWithBuy = totSupply + transactionAmountInt
        let newSupplyWithSell = totSupply - transactionAmountInt
        

        this.setState({
            transactionAmount:transactionAmountString,
            weiToBuy:this.avgPriceBetween(totSupply,newSupplyWithBuy)*transactionAmountInt,
            weiToSell:this.avgPriceBetween(newSupplyWithSell,totSupply)*transactionAmountInt,
        })
    }


    render() {
        return (

            <>
            <br/><br/><br/>
                <button className="btn btn-primary" onClick={this.addAccount}>
                    Add New Account
                </button>
                <br/><br/>

                Tokens to buy/sell: &nbsp;              
                <input
                    placeholder="Tokens to buy/sell"
                    id="inputTxtBox"
                    type="textbox"
                    value={this.state.transactionAmount}
                    onChange={this.handleTransactionAmountChange}
                />  
              <br/>
                
                There are currently &nbsp;
                {this.props.totalSupply} 
                &nbsp; tokens created, making the price per token &nbsp;
                {this.avgPriceBetween(this.props.totalSupply,this.props.totalSupply)}
                &nbsp; wei
                <br/>


                
                <br/>
                <button className="btn btn-primary" onClick={this.BuyTokens}>
                    Buy {this.state.transactionAmount} Tokens costing:<br/>
                    {this.state.weiToBuy}
                    <br/>wei
                </button>
                
                &nbsp;&nbsp;&nbsp;
        
                <button className="btn btn-primary" onClick={this.SellTokens}>
                    Sell {this.state.transactionAmount} Tokens returning:<br/>
                    {this.state.weiToSell}
                    <br/>wei

                </button>
            </>

        )
    }
}


const mapStateToProps = function(state) {
    return {
      Contract: state.QueryContract.contract,
      totalSupply: state.QueryContract.prices.totalSupply,
    };
  };
  
  export default connect(mapStateToProps)(BuyTokens);
  

