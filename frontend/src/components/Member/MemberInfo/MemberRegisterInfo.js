/*eslint-disable*/
import React from "react";
import { useState } from "react";

// reactstrap components
import { Button, FormGroup, Form, Input } from "reactstrap";
import style from "../css/MemberInfo.module.css";
import Datetime from 'react-datetime';
import moment from "moment";
import 'moment/locale/ko'
import { addRegInfo } from "../../../api/member"

// core components

function MemberRegisterInfo(props) {

  const [profile, setProfile] = useState({
    Moment: new Date(null),
    phone: "",
  })
  const [numberok, setnumberok] = useState(false);

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

  const checknumber = (event) => {
    var str = event.currentTarget.value.replace(/[^0-9]/g, "");
    var tmp = {
      target:{
        name: 'phone',
        value: str
      }
    };
    if (str.substring(0, 2) == "02") {
      if (str.length > 8) {
        setnumberok(true);
      } else {
        setnumberok(false);
      }
      // 서울 전화번호일 경우 10자리까지만 나타나고 그 이상의 자리수는 자동삭제
      if (str.length < 3) {
        onChangeProfile(tmp);
      } else if (str.length < 6) {
        tmp.target.value = str.substr(0, 2);
        tmp.target.value += "-";
        tmp.target.value += str.substr(2);
        onChangeProfile(tmp);
      } else if (str.length < 10) {
        tmp.target.value = str.substr(0, 2);
        tmp.target.value += "-";
        tmp.target.value += str.substr(2, 3);
        tmp.target.value += "-";
        tmp.target.value += str.substr(5);
        onChangeProfile(tmp);
      } else {
        tmp.target.value = str.substr(0, 2);
        tmp.target.value += "-";
        tmp.target.value += str.substr(2, 4);
        tmp.target.value += "-";
        tmp.target.value += str.substr(6, 4);
        onChangeProfile(tmp);
      }
    } else {
      if (str.length > 9) {
        setnumberok(true);
      } else {
        setnumberok(false);
      }
      // 핸드폰 및 다른 지역 전화번호 일 경우
      if (str.length < 4) {
        onChangeProfile(tmp);
      } else if (str.length < 7) {
        tmp.target.value = str.substr(0, 3);
        tmp.target.value += "-";
        tmp.target.value += str.substr(3);
        onChangeProfile(tmp);
      } else if (str.length < 11) {
        tmp.target.value = str.substr(0, 3);
        tmp.target.value += "-";
        tmp.target.value += str.substr(3, 3);
        tmp.target.value += "-";
        tmp.target.value += str.substr(6);
        onChangeProfile(tmp);
      } else {
        tmp.target.value = str.substr(0, 3);
        tmp.target.value += "-";
        tmp.target.value += str.substr(3, 4);
        tmp.target.value += "-";
        tmp.target.value += str.substr(7);
        onChangeProfile(tmp);
      }
    }
  };

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
      birthDate: isProtector === true? null : birthDate,
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
                  checked={isProtector}
                  onChange={onChangeIsProtector}></Input>
                <span className="form-check-sign">보호자이십니까?</span>
              </label>
            </FormGroup>
            <FormGroup>
              <Lbl value={"생년월일"}></Lbl>
              <Datetime 
                className={`${style.datepicker}`}
                // inputProps={inputprops}
                locale="ko"
                dateFormat="yyyy-MM-DD"
                value={profile.Moment}
                onChange={(e) => {
                  e.name = "Moment"
                  onChangeProfile(e)
                }}
                timeFormat={false}></Datetime>
            </FormGroup>
            <FormGroup>
            <Lbl value={"전화번호"}></Lbl>
              <span>
                <Input
                  className={`${style.datepicker}`} 
                  placeholder="전화번호"
                  type="text"
                  onChange={checknumber}
                  value={profile.phone}
                  pattern="[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}"
                  maxLength="13"
                  ></Input>
              </span>
              <br></br>
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
                  checked={isProtector}
                  onChange={onChangeIsProtector}
                  ></Input>
                <span className="form-check-sign">보호자이십니까?</span>
                
              </label>
            </FormGroup>
            <FormGroup>
            <Lbl value={"전화번호"}></Lbl>
              <span><Input 
              className={`${style.datepicker}`} 
              placeholder="전화번호"
              type="text"
              onChange={checknumber}
              value={profile.phone}
              pattern="[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}"
              maxLength="13"></Input></span>
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

export default MemberRegisterInfo;
