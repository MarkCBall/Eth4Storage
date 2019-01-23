import React from "react";
import { Link } from "react-router-dom";
//why is Router and Route needed?

// CSS
//import "./navHeader.css";
// url strings
const ICON_URL = "../../images/logo.png";

const NavHeader = props => {
  return (
    <div className="fixed-header">
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <Link to="/" className="navbar-brand">
          Transcript Blockchain
        </Link>
        <img alt="logo" className="header-img" src={ICON_URL} />
        &nbsp;
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                {" "}
                &nbsp;&nbsp;Home&nbsp;&nbsp;{" "}
              </Link>
            </li>
            <li className="nav-item">
              <Link to="Upload" className="nav-link">
                {" "}
                Upload&nbsp;&nbsp;{" "}
              </Link>
            </li>
            <li className="nav-item">
              <Link to="Download" className="nav-link">
                {" "}
                Download &nbsp;&nbsp;
              </Link>
            </li>
            <li className="nav-item">
              <Link to="UserManagement" className="nav-link">
                {" "}
                User-Management{" "}
              </Link>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-light my-2 my-sm-0">
              Search
            </button>
          </form>
        </div>
      </nav>
    </div>
  );
};

export default NavHeader;
