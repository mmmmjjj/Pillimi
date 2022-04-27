import React from "react";
import { Link } from "react-router-dom";

import kakao_login from "../../assets/img/kakao_login.png";
import naver_login from "../../assets/img/naver_login.png";

import LoginCSS from "./Login.module.css";

function Login() {
  React.useEffect(() => {}, []);
  return (
    <>
      <br></br>
      <h3 className={LoginCSS.LoginTitle}>로그인</h3>
      <hr></hr>
      <div className={LoginCSS.LoginBtnDiv}>
        <Link to="/main">
          <img src={kakao_login} className={LoginCSS.LoginBtn} alt="kakao_login" />
        </Link>
        <br></br>
        <br></br>
        <Link to="/pill-today">
          <img src={naver_login} className={LoginCSS.LoginBtn} alt="naver_login" />
        </Link>
      </div>
    </>
  );
}

export default Login;
