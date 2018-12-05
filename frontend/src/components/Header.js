import React, { Component } from 'react';


//CSS Files
import './Header.css';

class Header extends Component {

    // handleSelection(e) {
    //     if (this.state.activeSelection == null){
    //         this.setState({   activeSelection : e.target.id  } )
    //         console.log("state set to " + e.target.id)
    //     }
    //     else{
    //         this.setState({   activeSelection : null  } )
    //         console.log("state set to null")
    //     }
    // } 
    render() {
        return (
            <div className="header-box">


                <div className="container">
                    <div className="row">
                        <div className="col-sm">
                            {/* if sessionID is 0, then you are not logged in */}
                            {this.props.sessionID ? 
                            <p> logged in <br></br>Session id is {this.props.sessionID}<br></br><button>Click here to change login</button></p> 
                            : 
                            <p><br></br><button>CLick here to log in</button><br></br></p>}

                        </div>
                        <div className="col-sm">
                        Upload Page
                        </div>
                        <div className="col-sm">
                        Download page
                        </div>
                        <div className="col-sm">
                        User Management page
                        </div>
                        <div className="col-sm">
                        <button>Logout</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};

export default Header;