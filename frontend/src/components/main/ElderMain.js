import React from "react";
import { Link } from "react-router-dom";

import ElderMainCSS from "./ElderMain.module.css";

function ElderMain() {
  React.useEffect(() => {}, []);
  const RemoveLine = {
    textDecoration: "none",
  };
  return (
    <>
      <div className={ElderMainCSS.Whole}>
        <div className={ElderMainCSS.Header}></div>
        <div className={ElderMainCSS.MainTitle}>
          <div className={ElderMainCSS.WhiteBox}>
            <div className={ElderMainCSS.WhiteBoxHeight}></div>
            <br></br>
            <Link to="/pill-today" style={RemoveLine}>
              <h3 className={ElderMainCSS.MainText}>오늘 먹을 약</h3>
            </Link>
            <div className={ElderMainCSS.WhiteBoxHeight}></div>
          </div>
          <br></br>
          <br></br>
          <div className={ElderMainCSS.WhiteBox}>
            <div className={ElderMainCSS.WhiteBoxHeight}></div>
            <br></br>
            <h3 className={ElderMainCSS.MainText}>내 약</h3>
            <div className={ElderMainCSS.WhiteBoxHeight}></div>
          </div>
          <br></br>
          <br></br>
          <div className={ElderMainCSS.WhiteBox}>
            <div className={ElderMainCSS.WhiteBoxHeight}></div>
            <br></br>
            <h3 className={ElderMainCSS.MainText}>가족</h3>
            <div className={ElderMainCSS.WhiteBoxHeight}></div>
          </div>
          <br></br>
          <br></br>
          <div className={ElderMainCSS.WhiteBox}>
            <div className={ElderMainCSS.WhiteBoxHeight}></div>
            <br></br>
            <h3 className={ElderMainCSS.MainText}>내 정보</h3>
            <div className={ElderMainCSS.WhiteBoxHeight}></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ElderMain;
