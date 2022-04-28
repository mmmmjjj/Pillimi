import React from "react";
import { Link } from "react-router-dom";

import kakao_login from "../../assets/img/kakao_login.png";
import naver_login from "../../assets/img/naver_login.png";

import LoginCSS from "./css/Login.module.css";
import Header from "components/Headers/Header";

function Login() {
  React.useEffect(() => {}, []);
  return (
    <>
      <Header header="로그인"></Header>
      <div className={LoginCSS.LoginBtnDiv}>
        <br></br>
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
