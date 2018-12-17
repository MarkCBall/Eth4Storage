import React, { Component } from 'react';
import { connect } from 'react-redux';


class Download extends Component {

    getPermissions(){
        return (
            this.props.verifiedAddress in this.props.state.todo.addyPermission 
            ? 
            this.props.state.todo.addyPermission[this.props.verifiedAddress] 
            :
            {}
        )
    }

    render() {
        return (
            <div className="main-tile">

                <h1>This is the download page</h1>
                <p>Login to see what you have access to</p>

                <p>In future you can click on an account number and be taken to relevant upload/download page of that account</p>
                <p>(THIS PAGE IS IN DEVELOPMENT)</p>

                <div className='container'>
                    <div className="row">
                        <div className="col-1">
                            Account #
                        </div>
                        <div className="col-1">
                            Can Read
                        </div>
                        <div className="col-1">
                            CanWrite
                        </div>
                    </div>

                    {Object.keys(this.getPermissions()).map((x) => (
                    <div className="row" key={x}>
                        <div className="col-1">
                            {x}
                        </div>
                        <div className="col-1">
                            yes
                        </div>
                        <div className="col-1">
                            {this.props.state.todo.addyPermission[x] ? "yes" : "no"}
                        </div>
                    </div>
                    ))}

                </div>


                <button onClick={() => console.log(
                    this.state.canWriteObj
                )}>Console.log permissions for debugging</button>

                                <button onClick={() => console.log(
                    this.props.state.todo
                )}>Console.log state for debugging</button>

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


//<p>{this.props.state.todo.accounts[0].key}</p>