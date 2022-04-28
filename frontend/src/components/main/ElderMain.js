import React from "react";

import ElderMainCSS from "./css/ElderMain.module.css";

function ElderMain() {
  React.useEffect(() => {}, []);
  return (
    <>
      <div className={ElderMainCSS.Whole}>
        <div className={ElderMainCSS.Header}></div>
        <div className={ElderMainCSS.MainTitle}>
          <div className={ElderMainCSS.WhiteBox} onClick={gotoPillToday}>
            <div className={ElderMainCSS.WhiteBoxHeight}></div>
            <br></br>
            <h3 className={ElderMainCSS.MainText}>오늘 먹을 약</h3>
            <div className={ElderMainCSS.WhiteBoxHeight}></div>
          </div>
          <Menu content={"내 약"}></Menu>
          <Menu content={"가족"}></Menu>
          <Menu content={"내 정보"}></Menu>
        </div>
      </div>
    </>
  );
}

function Menu(params) {
  return (
    <>
      <br></br>
      <br></br>
      <div className={ElderMainCSS.WhiteBox}>
        <div className={ElderMainCSS.WhiteBoxHeight}></div>
        <br></br>
        <h3 className={ElderMainCSS.MainText}>{params.content}</h3>
        <div className={ElderMainCSS.WhiteBoxHeight}></div>
      </div>
    </>
  );
}

function gotoPillToday() {
  window.location.href = "/pill-today";
}

export default ElderMain;
