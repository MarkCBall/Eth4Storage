import React, { Component } from 'react';


//CSS Files
import './Header.css';


import { Link } from 'react-router-dom'

class Header extends Component {



    render() {
        return (
            <div className="header-box">


                <div className="container">
                    <div className="row">
                        <div className="col-sm">
                            {/* if sessionID is 0, then you are not logged in */}
                            {   
                                this.props.sessionID 
                            ?
                                <p> logged in <br></br>
                                Session id is {this.props.sessionID}<br></br>
                                <br></br>Click here to change login</p> 
                            : 
                                <p><br></br><button onClick={this.props.handleLogin}>CLick here to log in</button><br></br></p>
                            }

                        </div>
                        <div className="col-sm">
                        <Link to="Upload">Upload Page</Link>
                        </div>
                        <div className="col-sm">
                        <Link to="Download">Download Page</Link>
                        </div>
                        <div className="col-sm">
                        <Link to="UserManagement">UserManagement Page</Link>
                        </div>
                        <div className="col-sm">
                        <button onClick={this.props.handleLogout}>Logout</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};

export default Header;