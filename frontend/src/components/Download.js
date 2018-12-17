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



                    {Object.keys(this.getPermissions()).map((x) => (
                    <p key={x}>
                            You can download from Accunt#:{x}
                        </p>
                    ))}
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

{/* <div className="main-tile">
<h1>This is the download page</h1>
<p>Login to see what you have access to</p>
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
            {this.getPermissions()[x] ? "yes" : "no"}
        </div>
    </div>
    ))}
</div>
</div> */}