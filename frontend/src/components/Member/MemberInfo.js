/*eslint-disable*/
import React from "react";

// reactstrap components
import { Button, Container } from "reactstrap";
import MemberInfoDetail from "./MemberInfo/MemberInfoDetail";
import "../../assets/css/now-ui-kit.css";

// core components

function MemberInfo(props) {
  return (
    <>
        <Container>
          <div>
            <h4>{props.value}님의 정보</h4>
            <hr></hr>
          </div>
        </Container>
    </>
  );
}

export default MemberInfo;
