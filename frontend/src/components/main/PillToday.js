/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";

import { useSelector } from "react-redux";
import PillTodayCSS from "./css/PillToday.module.css";
import { getMyFamily } from "../../api/family.js";

function PillToday() {
  const [familyList, setFamilyList] = useState([]);

  const myName = useSelector((state) => state.memberInfo.memberInfo.nickName);

  useEffect(() => {
    getFamilyList();
  }, []);

  const getFamilyList = () => {
    getMyFamily(
      (response) => {
        setFamilyList(response.data.data);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const FamilyName = () => {
    let result = [];
    familyList.forEach((element) => {
      result.push(
        <>
          <div>
            <div>
              <img src={element.memberImage} alt="memberImg" className={PillTodayCSS.img}></img>
            </div>
            <div>{element.memberName}</div>
          </div>
        </>
      );
    });
    return result;
  };

  return (
    <>
      <div className={PillTodayCSS.Whole}>
        <div className={PillTodayCSS.Header}>
          {/* 로그인한 사용자가 보호자일 때 */}
          <span className={PillTodayCSS.MemberName}>{myName}</span>
          <span className={PillTodayCSS.Icon}>
            <i className={"now-ui-icons ui-1_bell-53"}></i>
          </span>
          {/* 로그인한 사용자가 피보호자일 때 */}
          {/* <span className={PillTodayCSS.Icon}>
            <i className={"now-ui-icons ui-1_bell-53"}></i>
          </span> */}
        </div>
        {/* 로그인한 사용자가 보호자일 때 */}
        <div className={PillTodayCSS.Family}>
          <FamilyName></FamilyName>
          {/* <div>가족 이미지</div>
          <div>가족 이름</div> */}
        </div>
        {/*  */}
        <br></br>
        <br></br>
        <h3 className={PillTodayCSS.MainText}>시간에 맞춰 복약하세요!</h3>
        <br></br>
        <div className={PillTodayCSS.WhiteBox}>
          <br></br>
          <h3 className={PillTodayCSS.TimeText}>시간</h3>
          <span className={PillTodayCSS.Img}>이미지</span>
          <span className={PillTodayCSS.TimeText}>알약이름</span>
          {/* 로그인한 사용자가 피보호자일 때 */}
          <br></br>
          <br></br>
          <Button className={PillTodayCSS.DoneBtn}>복용 완료</Button>
          {/*  */}
          <br></br>
        </div>
        <br></br>
        <div className={PillTodayCSS.WhiteBox}>
          <br></br>
          <h3 className={PillTodayCSS.TimeText}>시간</h3>
          <span className={PillTodayCSS.Img}>이미지</span>
          <span className={PillTodayCSS.TimeText}>알약이름</span>
          {/* 로그인한 사용자가 피보호자일 때 */}
          <br></br>
          <br></br>
          <Button className={PillTodayCSS.PictureBtn}>사진 찍기</Button>
          {/*  */}
          <br></br>
        </div>
      </div>
    </>
  );
}

export default PillToday;
