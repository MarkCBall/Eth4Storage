import React, { Component } from 'react';
import { connect } from 'react-redux';


class Download extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedAcct: 0
        }
    }
    getPermissions() {
        return (
            this.props.verifiedAddress in this.props.state.todo.addyPermission
                ?
                this.props.state.todo.addyPermission[this.props.verifiedAddress]
                :
                {}
        )
    }

    handleSelection(acctN){
        this.setState({selectedAcct:acctN})
    }

    render() {
        return (
            <div className="main-tile">
                <h1>This is the download page</h1>
                <nav className="navbar navbar-expand-lg">
                    {Object.keys(this.getPermissions()).map((acct) => (
                        <button key={acct} onClick={()=>this.handleSelection(acct)} className="navbar-brand" >
                            Acnt#{acct}
                        </button>
                    ))}
                </nav>

                <div className="card">
                <div className="card-body">
                    <h4 className="card-title">Account# {this.state.selectedAcct} download page</h4>
                    <p className="card-text">View existing files you can download </p>
                </div>
                </div>


            </div>
        );
    };
};

const mapStateToProps = function (state) {
    return {
        state
    }
}
export default connect(mapStateToProps)(Download)

// {/* <div className="main-tile">
// <h1>This is the download page</h1>
// <p>Login to see what you have access to</p>
// <div className='container'>
//     <div className="row">
//         <div className="col-1">
//             Account #
//         </div>
//         <div className="col-1">
//             Can Read
//         </div>
//         <div className="col-1">
//             CanWrite
//         </div>
//     </div>
//     {Object.keys(this.getPermissions()).map((x) => (
//     <div className="row" key={x}>
//         <div className="col-1">
//             {x}
//         </div>
//         <div className="col-1">
//             yes
//         </div>
//         <div className="col-1">
//             {this.getPermissions()[x] ? "yes" : "no"}
//         </div>
//     </div>
//     ))}
// </div>
// </div> */}