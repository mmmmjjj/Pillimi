import React from "react";
import { useSelector } from "react-redux";

import kakao_login from "../../assets/img/kakao_login.png";
// import naver_login from "../../assets/img/naver_login.png";

import LoginCSS from "./css/Login.module.css";
import Header from "components/Headers/Header";

function Login() {
  const isLogin = useSelector((state) => state.memberInfo.isLogin);
  const isProtector = useSelector((state) => state.memberInfo.memberInfo.protector);

  React.useEffect(() => {
    if (isLogin === true) {
      if (isProtector === true) {
        window.location.href = `/pill-today`;
      } else {
        window.location.href = `/main`;
      }
    }
  }, [isLogin, isProtector]);
  return (
    <>
      {!isLogin ? (
        <>
          <Header header="로그인"></Header>
          <div className={LoginCSS.LoginBtnDiv}>
            <br></br>
            <a
              href="https://kauth.kakao.com/oauth/authorize?client_id=74245badb067a597419134fbf90742dd&redirect_uri=http://localhost:3000/callback
&response_type=code"
            >
              <img src={kakao_login} className={LoginCSS.LoginBtn} alt="kakao_login" />
            </a>
            <br></br>
            <br></br>
            {/* <Link to="/pill-today">
          <img src={naver_login} className={LoginCSS.LoginBtn} alt="naver_login" />
        </Link> */}
          </div>
        </>
      ) : (
        <div></div>
      )}
    </>
  );
}

export default Login;
