/*eslint-disable*/
import React from "react";
import { useState } from "react";

// reactstrap components
import { Button, Container, FormGroup, Form, Input } from "reactstrap";
import style from "../css/MemberInfo.module.css";
import MemberInfo from "../MemberInfo";
import Datetime from 'react-datetime';
import moment from "moment";

// core components

function MemberRegisterInfo(props) {

  const [profile, setProfile] = useState({
    nickname: "",
    Moment: Date,
    phone: "",
  })

  const [birthDate, setBirthDate] = useState(new Date());

  const onChangeDate = (value) => {
    // setBirthDate(value);
    console.log(value);
    profile.Moment = value._d;
    console.log(profile.Moment);
  }

  const [isProtector, setIsProtector] = useState(false);

  const onChangeIsProtector = () => {
    setIsProtector(!isProtector);
    console.log(isProtector);
  }

  const onChangeProfile = (e) => {
      if (moment.isMoment(e)){
          setProfile({...profile, [e.name]:e});
          console.log(profile.Moment)
      }
      else{
          setProfile({...profile, [e.target.name]:e.target.value});
      }
  }


  if(!isProtector){
    return (
      <>
        <MemberInfo></MemberInfo>
        <div id="pillimi" className={`${style.center}`}>
          <Form>
            <FormGroup>
              <label>
                <Input 
                  id="isProtector"
                  name="isProtector"
                  type="checkbox" 
                  onChange={onChangeIsProtector}></Input>
                <span className="form-check-sign"></span>
                보호자이십니까?
              </label>
            </FormGroup>
            <FormGroup>
              <Lbl value={"생년월일"}></Lbl>
              <Datetime 
                className={`${style.datepicker}`}
                // inputProps={inputprops}
                value={profile.Moment}
                onChange={(e) => {
                  e.name = "Moment"
                  onChangeProfile(e)
                }}
                timeFormat={false}></Datetime>
            </FormGroup>
            <FormGroup>
            <Lbl value={"전화번호"}></Lbl>
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
                <DiseaseList></DiseaseList>
              </div>
            </FormGroup>
          </Form>
          <br></br>
          <Button color="sky" className={`${style.bigbnt}`}>완료</Button>
        </div>
      </>
    );
  }else {
    return (
      <>
        <MemberInfo></MemberInfo>
        <div id="pillimi" className={`${style.center}`}>
          <Form>
            <FormGroup>
              <label>
                <Input 
                  id="isProtector"
                  name="isProtector"
                  type="checkbox" 
                  onChange={onChangeIsProtector}
                  ></Input>
                <span className="form-check-sign"></span>
                보호자이십니까?
              </label>
            </FormGroup>
            <FormGroup>
            <Lbl value={"전화번호"}></Lbl>
              <span><Input 
              id="phone" 
              name="phone" 
              type="tel" 
              className={`${style.datepicker}`}
              onChange={onChangeProfile}></Input></span>
              <br></br>
            </FormGroup>
          </Form>
          <br></br>
          <Button color="sky" className={`${style.bigbnt}`}>완료</Button>
        </div>
      </>
    );
  }
  
}


function Lbl(params) {
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

export default MemberRegisterInfo;
