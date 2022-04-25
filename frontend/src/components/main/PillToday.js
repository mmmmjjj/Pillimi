import React from "react";
import { Button } from "reactstrap";

import PillTodayCSS from "./PillToday.module.css";

function PillToday() {
  React.useEffect(() => {}, []);
  return (
    <>
      <div className={PillTodayCSS.Whole}>
        <div className={PillTodayCSS.Header}>
          {/* 로그인한 사용자가 보호자일 때 */}
          <span className={PillTodayCSS.MemberName}>김말자</span>
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
          <div>가족 이미지</div>
          <div>가족 이름</div>
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
          <br></br>
          <br></br>
          {/* 로그인한 사용자가 피보호자일 때 */}
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
          <br></br>
          <br></br>
          {/* 로그인한 사용자가 피보호자일 때 */}
          <Button className={PillTodayCSS.PictureBtn}>사진 찍기</Button>
          {/*  */}
          <br></br>
        </div>
      </div>
    </>
  );
}

export default PillToday;
