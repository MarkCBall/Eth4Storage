import React, { Component } from 'react';

class HeaderRow extends Component {
    render() {
        return (
            <div className="row row-top">
                <div className="col-1 col-solid">
                    {this.props.row1}
                </div>
                <div className="col-4 col-solid">
                    {this.props.row2}
                </div>
                <div className="col-1 col-dotted">
                    {this.props.row3}
                </div>
                <div className="col-6">
                    {this.props.row4}
                </div>
            </div>
        );
    };
};

export default HeaderRow;