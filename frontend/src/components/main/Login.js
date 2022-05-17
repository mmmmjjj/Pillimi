import React, { Fragment } from "react";
import { useSelector } from "react-redux";

import kakao_login from "../../assets/img/kakao_login.png";
// import naver_login from "../../assets/img/naver_login.png";

import LoginCSS from "./css/Login.module.css";

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
        <Fragment>
          <div style={{ textAlign: `center`, paddingTop: `30%` }}>
            <h1 style={{ fontFamily: `ONE-Mobile-POP`, marginBottom: `0px` }}>필리미</h1>
            <h3 style={{ fontFamily: `LeeSeoyun` }} className="pt-3">
              {" "}
              어르신을 위한 복약 알리미
            </h3>
          </div>
          <div style={{ width: `50%`, margin: `auto` }}>
            <img src="img/pillclock.png" alt="pillimi"></img>
          </div>
          <div className={`${LoginCSS.LoginBtnDiv} pt-3`}>
            <br></br>
            <a
              href="https://kauth.kakao.com/oauth/authorize?client_id=74245badb067a597419134fbf90742dd&redirect_uri=https://pillimi.com/callback
&response_type=code"
            >
              <img src={kakao_login} className={LoginCSS.LoginBtn} alt="kakao_login" />
            </a>
            <br></br>
            <br></br>
          </div>
        </Fragment>
      ) : (
        <div></div>
      )}
    </>
  );
}

export default Login;
