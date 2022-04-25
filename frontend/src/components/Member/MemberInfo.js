/*eslint-disable*/
import React from "react";

// reactstrap components
import { Button, Container } from "reactstrap";
import MemberInfoDetail from "./MemberInfo/MemberInfoDetail";
import "../../assets/css/now-ui-kit.css";

// core components

function MemberInfo() {
  return (
    <>
        <Container>
          <div id="pillimi">
            <h4>김말자님의 정보</h4>
            <hr></hr>
            <MemberInfoDetail></MemberInfoDetail>
          </div>
        </Container>
    </>
  );
}

export default MemberInfo;
