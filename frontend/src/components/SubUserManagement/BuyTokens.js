import React, { Component } from "react";
import { connect } from "react-redux";


class BuyTokens extends Component {
    constructor(props) {
        super(props);
        this.state = {
          transactionAmount: 100,
          currentTotalMinted: 1000

        };
        this.setSupply();
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
        this.props.Contract.buyTokens(500, { value: 10000000000000 }, (e, r) => { });
    };

    SellTokens = () => {
        this.props.Contract.sellTokens(100, (e, r) => { });
    };

    avgPriceBetween = (low, high) => {
        //calculates the bonding curve instead of querying the blockchain
        //need to fix to use big number later?
        if (low===high)
            return low^2;
        return (((high*high*high) - (low*low*low)) / 3 / (high-low))
    };

    handleTransactionAmountChange(){

    }


    render() {
        return (

            <>
            <br/><br/><br/>
                <button className="btn btn-primary" onClick={this.addAccount}>
                    Add New Account
                </button>
                <br/><br/>

                Tokens to buy/sell:               
                <input
                    placeholder="Tokens to buy/sell"
                    id="inputTxtBox"
                    type="textbox"
                    //onClick=
                />  
              <br/>
                
                There are currently {"xxx"} tokens created, making the price per token {"xxx"}<br/>
                {/* Cost to buy {"xx"} tokens estimated at: {"x"}<br/>
                Cost to sell {"xx"} tokens estimated at: {"x"}<br/> */}

                
                <br/>
                <button className="btn btn-primary" onClick={this.BuyTokens}>
                    Buy {this.state.transactionAmount} Tokens costing:<br/>
                    {this.avgPriceBetween(
                        this.state.currentTotalMinted,
                        this.state.currentTotalMinted+this.state.transactionAmount
                    )*this.state.transactionAmount
                    }
                    <br/>wei
                </button>
        
                <button className="btn btn-primary" onClick={this.SellTokens}>
                    Sell {this.state.transactionAmount} Tokens returning:<br/>
                    {this.avgPriceBetween(
                        this.state.currentTotalMinted-this.state.transactionAmount,
                        this.state.currentTotalMinted
                    )*this.state.transactionAmount
                    }
                    <br/>wei

                </button>
            </>

        )
    }
}


const mapStateToProps = function(state) {
    return {
      Contract: state.QueryContract.contract,
    };
  };
  
  export default connect(mapStateToProps)(BuyTokens);
  