/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";
import MemberPillCheck from "../MemberPillCheck";
import style from "../css/MemberPillCheck.module.css"
import { AiOutlineCheckCircle } from 'react-icons/ai';

// core components

function PillCheckAlarm(props) {
  return (
    <>
      <Container className={`${style.center}`}>
        <MemberPillCheck></MemberPillCheck>
        <div className={`${style.allcenter}`}>
          <div>
            <span className={`${style.bigfont}`}>
              감사합니다!<br></br>
              약이 확인되었습니다!
            </span>
            <div>
              <AiOutlineCheckCircle className="mt-3" size={"2.5em"} color="2BC228"></AiOutlineCheckCircle>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}


export default PillCheckAlarm;
