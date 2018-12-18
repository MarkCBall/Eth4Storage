import React, { Component } from 'react';
import { connect } from 'react-redux';

class Upload extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedAcct: 0
        }
    }

    getPermissions = () => {
        if(this.props.verifiedAddress in this.props.state.todo.addyPermission){
            let permissionedAddresses = this.props.state.todo.addyPermission[this.props.verifiedAddress]
            // console.log(Object.entries(permissionedAddresses))
            // Object.entries(permissionedAddresses).map((acct) =>(
            //     console.log(acct[0])
            // ))
            
            
            
            //CUT OUT NON TRUES

            return Object.entries(permissionedAddresses).filter( o=>o[1] )
        }
        return [["0",true]]
            
        

    }

    handleSelection(acctN){
        this.setState({selectedAcct:acctN})
    }

    render() {
        return (
            <div className="main-tile">
                <h1>This is the upload page</h1>
                <nav className="navbar navbar-expand-lg">
                    {this.getPermissions().map((acct) => (
                       
                          <button key={acct[0]} onClick={()=>this.handleSelection(acct[0])} className="navbar-brand">Acnt#{acct[0]}</button> 
                
                      
                    ))}
                </nav>

                <div className="card">
                <div className="card-body">
                    <h4 className="card-title">Account# {this.state.selectedAcct} upload page</h4>
                    <p className="card-text">Click here to upload text </p>
                    <input type="textbox"></input>
                </div>
                </div>
                
           



            </div>
        );
    };
};

// export default Upload;

const mapStateToProps = function (state) {
    return {
        state
    }
}
export default connect(mapStateToProps)(Upload)
