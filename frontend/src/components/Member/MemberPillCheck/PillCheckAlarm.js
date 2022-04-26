/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";
import MemberPillCheck from "../MemberPillCheck";

// core components

function PillCheckAlarm(props) {
  return (
    <>
      <Container>
        <MemberPillCheck></MemberPillCheck>
        <div>
          감사합니다!<br></br>
          약이 확인되었습니다!
        </div>
        
      </Container>
    </>
  )
}


export default PillCheckAlarm;
