/*eslint-disable*/
import React from "react";

// reactstrap components
import { Button, Container } from "reactstrap";
import MemberInfoDetail from "./MemberInfo/MemberInfoDetail";
import "../../assets/css/now-ui-kit.css";
import Header from "components/Headers/Header";

// core components

function MemberInfo(props) {
  return (
    <>
      <Header header={`${props.nickname}님의 정보`}></Header>
    </>
  );
}

export default MemberInfo;
