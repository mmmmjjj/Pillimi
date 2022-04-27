/*eslint-disable*/
import React from "react";

// reactstrap components
import {Container } from "reactstrap";
import "../../assets/css/now-ui-kit.css";
import style from "./css/MemberPillCheck.module.css"

// core components

function MemberPillCheck(props) {
  return (
    <>
        <Container>
          <div className={`${style.center}`}>
            <h4>복용 확인</h4>
            <hr></hr>
          </div>
        </Container>
    </>
  );
}

export default MemberPillCheck;
