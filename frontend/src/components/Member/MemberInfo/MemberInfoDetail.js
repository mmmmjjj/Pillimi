/*eslint-disable*/
import React from "react";

// reactstrap components
import { Button, Container } from "reactstrap";
import style from "../css/MemberInfo.module.css";
import MemberInfo from "../MemberInfo";

// core components

function MemberInfoDetail(props) {
  const array1 = ["고혈압", "당뇨"];
  const disease = () => {
    const result = [];
    for (let i = 0; i < array1.length; i++) {
      result.push(<span key={{i}}>{array1[i]}</span>);
      result.push(<br></br>)
    }
    return result;
  }
  
  return (
    <>
        <Container>
          <div id="pillimi" className={`${style.center}`}>
            <MemberInfo></MemberInfo>
            <img src="" alt="프로필 사진"></img>
            <br></br>
            <Label value={"닉네임"} content={"김말자"} ></Label>
            <Label value={"생년월일"} content={"1987.02.12"}></Label>
            <Label value={"전화번호"} content={"010-2012-1020"}></Label>
            <label className={`mt-3 ${style.infolabel}`}>기저 질환</label><br></br>
            <div>
              {disease()}
            </div>
            <br></br>
            <Button color="sky" className={`${style.bigbnt}`}>수정</Button>
            <Button color="danger" className={`${style.bigbnt}`}>로그아웃</Button>
          </div>
        </Container>
    </>
  );
}

function Label(params) {
  return (
    <>
      <label className={`mt-3 ${style.infolabel}`}>
        {params.value}
      </label>
      <br></br>
      <span>{params.content}</span>
      <br></br>
      
    </>
  )  
}
export default MemberInfoDetail;
