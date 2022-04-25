/*eslint-disable*/
import React from "react";

// reactstrap components
import { Button, Container } from "reactstrap";
import "../../../assets/css/now-ui-kit.css";

// core components

function MemberInfoDetail() {
  return (
    <>
        <Container>
          <div id="pillimi">
            <img src="" alt="프로필 사진"></img>
            <br></br>
            <Label value={"닉네임"} content={"김말자"} ></Label>
            <Label value={"생년월일"} content={"1987.02.12"}></Label>
            <Label value={"전화번호"} content={"010-2012-1020"}></Label>
            <label className="infolabel mt-3">기저 질환</label><br></br>
            고혈압
            <br></br>
            <Button color="#0369A1">수정</Button>
          </div>
        </Container>
    </>
  );
}

function Label(params) {
  return (
    <>
      <label className="mt-3 infolabel">
        {params.value}
      </label>
      <br></br>
      {params.content}
      <br></br>
      
    </>
  )  
}
export default MemberInfoDetail;
