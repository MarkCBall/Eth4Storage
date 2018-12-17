import React, { Component } from 'react';
import { connect } from 'react-redux';

class Upload extends Component {

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
            <h1>This is the upload page</h1>


                    {Object.keys(this.getPermissions()).map((x) => (
                        <p key={x}>
                            You can write to Account# {this.getPermissions()[x] ? x : "no"}
                        </p>
                    ))}


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
