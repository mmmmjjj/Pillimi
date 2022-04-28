/*eslint-disable*/
import React from "react";

// reactstrap components
import style from "./Header.module.css"

// core components

function Header(props) {
  return (
    <>
      <div className={`${style.center}`}>
        <h4>{props.header}</h4>
        <hr></hr>
      </div>
    </>
  );
}

export default Header;
