import React, { Component } from 'react';

import RenderRow from './RenderRow'

//CSS Files
//import './Header.css';

class ExpandableRow extends Component {
    constructor(props){
        super(props)
        console.log(this.props.account)
        console.log("XXXXXXXXXXXXXXXXXXXXXXXXXX")
        }


    
    ShowMoreLessText(acct){
        return acct.expanded ? "Show less" : "Show more"
    }
    

    render() {
        return (
            
          
            <RenderRow
            rowNum={this.props.account.key}                             
            row1={this.props.account.key}
            row2={this.props.account.own}

            row3={this.props.account.bal/1000000000000000000}
            row4={this.ShowMoreLessText(this.props.account)}
            row4onclick={this.props.row4onclick}
         />
        



        );
    };
};

export default ExpandableRow;