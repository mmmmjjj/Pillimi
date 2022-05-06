/*eslint-disable*/
import React, { useMemo } from "react";
import { useState, useEffect } from "react";

// reactstrap components
import { Button, Container, FormGroup, Form, Input } from "reactstrap";
import style from "../css/MemberInfo.module.css";
import MemberInfo from "../MemberInfo";
import Datetime from 'react-datetime';
import { getMemberInfoDetail, modifyMemberInfo } from '../../../api/member'
import moment from "moment";

// core components


function MemberInfoModify({match}) {

  const memberSeq = match.params.memberSeq;

  const [profile, setProfile] = useState({
    member_nickname: "",
    member_img: "",
    member_birthDate: "",
    member_phone: "",
    member_isprotector: 0
  });

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

  const outProfile = useMemo(() => onChangeProfile, [profile]);
  
  useEffect(() => {
    console.log("마운트")
    console.log(match.params.memberSeq);
    getMemberDetail(memberSeq);
  },[])

  const getMemberDetail = (memberSeq) => {
    getMemberInfoDetail(memberSeq,
      (success) => {
        console.log(success);
        setProfile({
          member_nickname: success.data.data.nickName,
          member_img: success.data.data.memberImage,
          member_birthDate: success.data.data.birthDate,
          member_phone: success.data.data.phone,
        })
      }, (fail) => {
        console.log(fail);
      })
  }

  const array1 = [1, "당뇨"];
  const Disease = () => {
    const result = [];
    for (let i = 0; i < array1.length; i++) {
      result.push(<span key={{i}}>{array1[i]}</span>);
      result.push(<br></br>)
    }
    return result;
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

  const modifyInfo = () => {
    let birthDate = dateformat(new Date(profile.member_birthDate));
    let memberInfo = {
      birthDate: birthDate,
      memberSeq: memberSeq,
      nickName: profile.member_nickname,
      phone: profile.member_phone
    }
    modifyMemberInfo(memberInfo,
      ( success ) => {
        console.log(success)
      }, ( fail ) => {
        console.log(fail)
      })
  }

  const gotoMemberInfoDetail = () =>{
    window.location.href = "/member-info/member-info-detail/"+memberSeq;
  }

  if(profile.member_birthDate!==null){
    return (
      <>
        <div id="pillimi" className={`${style.center}`}>
          <img src={profile.member_img} className={`${style.imgsize} mt-5`} alt="프로필 사진"></img>
          <br></br>
          <div>
          <Form>
            <FormGroup>
              <Label value={"닉네임"} ></Label>
              <Input
                id="nickname"
                name="member_nickname"
                type="text"
                value={profile.member_nickname}
                onChange={onChangeProfile}
                className={`${style.datepicker}`}
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label value={"생년월일"}></Label>
              <Datetime 
                className={`${style.datepicker}`}
                value={profile.Moment}
                onChange={(e) => {
                  e.name = "member_birthDate"
                  onChangeProfile(e)
                }}
                // inputProps={inputprops}
                timeFormat={false}></Datetime>
            </FormGroup>
            <FormGroup>
            <Label value={"전화번호"}></Label>
              <span><Input 
              id="phone" 
              name="member_phone" 
              type="tel" 
              value={profile.member_phone}
              className={`${style.datepicker}`}
              onChange={onChangeProfile}></Input></span>
              <br></br>
            </FormGroup>
            <FormGroup>
              <label className={`mt-3 ${style.infolabel}`}>기저 질환</label><br></br>
              <div>
                <Disease arr={array1}></Disease>
              </div>
            </FormGroup>
          </Form>
        </div>
          <br></br>
          <Button color="sky" className={`${style.bigbnt}`} onClick={modifyInfo}>완료</Button>
          <Button color="danger" className={`${style.bigbnt}`} onClick={gotoMemberInfoDetail}>취소</Button>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div id="pillimi" className={`${style.center}`}>
          <img src={profile.member_img} className={`${style.imgsize} mt-5`} alt="프로필 사진"></img>
          <br></br>
          <div>
          <Form>
          <FormGroup>
            <Label value={"닉네임"} ></Label>
            <Input
              id="nickname"
              name="member_nickname"
              type="text"
              value={profile.member_nickname}
              onChange={onChangeProfile}
              className={`${style.datepicker}`}
            ></Input>
          </FormGroup>
          <FormGroup>
          <Label value={"전화번호"}></Label>
            <span><Input 
            id="member_phone" 
            name="member_phone" 
            type="tel" 
            value={profile.member_phone}
            className={`${style.datepicker}`}
            onChange={onChangeProfile}></Input></span>
            <br></br>
          </FormGroup>
        </Form>
        </div>
          <br></br>
          <Button color="sky" className={`${style.bigbnt}`} onClick={modifyInfo}>완료</Button>
          <Button color="danger" className={`${style.bigbnt}`} onClick={gotoMemberInfoDetail}>취소</Button>
        </div>
      </>
    );
  }
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
