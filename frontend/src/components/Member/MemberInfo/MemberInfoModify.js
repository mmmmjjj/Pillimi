/*eslint-disable*/
import React from "react";
import { useState } from "react";

// reactstrap components
import { Button, Container, FormGroup, Form, Input } from "reactstrap";
import style from "../css/MemberInfo.module.css";
import MemberInfo from "../MemberInfo";
import Datetime from 'react-datetime';

// core components

function MemberInfoModify(props) {
  const array1 = [1, "당뇨"];
  const disease = () => {
    const result = [];
    for (let i = 0; i < array1.length; i++) {
      result.push(<span key={{i}}>{array1[i]}</span>);
      result.push(<br></br>)
    }
    return result;
  }
  
  const [profile, setProfile] = useState({
    nickname: "",
    birthDate: new Date(),
    phone: "",
  })

  const onChangeProfile = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    })
  }

  const inputprops = {
    className: "`${style.dateinput}`"
  }
  return (
    <>
      <MemberInfo></MemberInfo>
      <div id="pillimi" className={`${style.center}`}>
        <img src="" alt="프로필 사진"></img>
        <br></br>
        <Form>
          <FormGroup>
            <Label value={"닉네임"} ></Label>
            <Input
              id="nickname"
              name="nickname"
              type="text"
              className={`${style.datepicker}`}
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label value={"생년월일"}></Label>
            <Datetime 
              className={`${style.datepicker}`}
              // inputProps={inputprops}
              timeFormat={false}></Datetime>
          </FormGroup>
          <FormGroup>
          <Label value={"전화번호"}></Label>
            <span><Input 
            id="phone" 
            name="phone" 
            type="tel" 
            className={`${style.datepicker}`}
            onChange={onChangeProfile}></Input></span>
            <br></br>
          </FormGroup>
          <FormGroup>
            <label className={`mt-3 ${style.infolabel}`}>기저 질환</label><br></br>
            <div>
              <DiseaseList arr={array1}></DiseaseList>
            </div>
          </FormGroup>
        </Form>
        <br></br>
        <Button color="sky" className={`${style.bigbnt}`}>완료</Button>
        <Button color="danger" className={`${style.bigbnt}`} onClick={gotoMemberInfoDetail}>취소</Button>
      </div>
    </>
  );
}

const gotoMemberInfoDetail = () =>{
  window.location.href = "/mypage"
}

function Label(params) {
  return (
    <>
      <label className={`mt-3 ${style.infolabel}`}>
        {params.value}
      </label>
      <br></br>
      
      
    </>
  )  
}

const DiseaseList = (params) => {
  const issues = [...Array(10).keys()];

  return(
    <>
      <span>
        {issues.map((issue, index) => (
          <span> <input type="checkbox"/>&nbsp;{issue}<Space index={index}></Space></span>
        ))}
      </span>
    </>
  )
}

function check(issue, array){
  console.log("issue" + issue);
  array.forEach(element => {
    console.log(element);
    console.log(issue===element)
    if(element===issue) {
      console.log("true 리턴할 거임") 
      return true;
    }
  });
  return false;
}

function Space(props) {
  if(props.index%2===1) {
    return(
      <>
        <br></br>
      </>
    )
  }else{
    return(
      <>
        &nbsp;&nbsp;&nbsp;&nbsp;
      </>
    )
  }
}

export default MemberInfoModify;
