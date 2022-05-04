/*eslint-disable*/
import React from "react";
import { useState } from "react";

// reactstrap components
import { Button, FormGroup, Form, Input } from "reactstrap";
import style from "../css/MemberInfo.module.css";
import Datetime from 'react-datetime';
import moment from "moment";
import { addRegInfo } from "../../../api/member"

// core components

function MemberRegisterInfo(props) {

  const [profile, setProfile] = useState({
    Moment: new Date(null),
    phone: "",
  })


  const [isProtector, setIsProtector] = useState(false);

  const onChangeIsProtector = () => {
    setIsProtector(!isProtector);
    console.log(isProtector);
  }

  const onChangeProfile = (e) => {
      if (moment.isMoment(e)){
          setProfile({...profile, [e.name]:e._d});
          console.log(profile.Moment)
      }
      else{
          console.log(e.target.value);
          setProfile({...profile, [e.target.name]:e.target.value});
      }
  }

  function dateformat(bDay){
    if(moment.isMoment(bDay)) return "2022-02-13";
    else{
      var month = bDay.getMonth() + 1;
      if (month < 10) month = "0" + month;
      var day = bDay.getDate();
      if (day < 10) day = "0" + day;
      var tmp = bDay.getFullYear() + "-" + month + "-" + day;
      return tmp;
    }
  }
  function addRegisterInfo() {
    let birthDate = dateformat(new Date(profile.Moment));
    // let birthDate = profile.Moment;
    if(isProtector) birthDate = null;
    let reginfo = {
      birthDate: birthDate,
      isProtector: isProtector === true? 1 : 0,
      phone: profile.phone
    };
    console.log(reginfo);
    addRegInfo(reginfo, (success) =>{
      console.log(success)
      gotoMain();
    },
    (fail)=>{
      console.log(fail)
      setProfile({
        phone: "",
      })
      if(isProtector){
        setIsProtector();
      }
    });
    
    console.log(profile.phone)
  }

  function gotoMain() {
    if(isProtector){
      window.location.href = "/pill-today";
    }else{
      window.location.href = "/main";
    }
  }
  if(!isProtector){
    return (
      <>
        <div id="pillimi" className={`${style.center}`}>
          <Form>
            <FormGroup>
              <label className="mt-3">
                <Input 
                  id="isProtector"
                  name="isProtector"
                  type="checkbox" 
                  onChange={onChangeIsProtector}></Input>
                <span className="form-check-sign">보호자이십니까?</span>
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
              value={profile.phone}
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
          <Button color="sky" className={`${style.bigbnt}`} onClick={addRegisterInfo}>완료</Button>
        </div>
      </>
    );
  }else {
    return (
      <>
        <div id="pillimi" className={`${style.center}`}>
          <Form>
            <FormGroup>
              <label className="mt-3">
                <Input 
                  id="isProtector"
                  name="isProtector"
                  type="checkbox" 
                  onChange={onChangeIsProtector}
                  ></Input>
                <span className="form-check-sign">보호자이십니까?</span>
                
              </label>
            </FormGroup>
            <FormGroup>
            <Lbl value={"전화번호"}></Lbl>
              <span><Input 
              id="phone" 
              name="phone" 
              type="tel" 
              value={profile.phone}
              className={`${style.datepicker}`}
              onChange={onChangeProfile}></Input></span>
              <br></br>
            </FormGroup>
          </Form>
          <br></br>
          <Button color="sky" onClick={addRegisterInfo}>완료</Button>
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
