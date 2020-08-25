import React from "react";
import "./navbar.scss";
import logo from "../../../assets/buy.png";
function Navbar() {
 

  return (
    <nav className="sticky-top navbar navbar-expand-lg navbar-light bg-primary p-0">
      <div className="d-flex justify-content-between w-100">
        <a className="navbar-brand" href="#">
          <img src={logo} alt="Imagen logo compra" />
          <span className="ml-3">Lets do it ©</span>
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
