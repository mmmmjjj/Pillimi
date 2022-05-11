import React from "react";
import { useDispatch } from "react-redux";
import { getKakaoToken, getKakaoLogin } from "api/member";
import { useSelector } from "react-redux";
import { loginAction } from "actions/memberAction";
import Loading from "./Loading";
import { postFcmToken } from "../../api/member.js";

function Callback() {
  const dispatch = useDispatch();
  const [fcmToken, setFcmToken] = React.useState("");
  let isLogin = useSelector((state) => state.memberInfo.isLogin);
  let isFirst = useSelector((state) => state.memberInfo.memberInfo.first);
  let isProtector = useSelector((state) => state.memberInfo.memberInfo.protector);
  let memberSeq = useSelector((state) => state.memberInfo.memberInfo.memberSeq);

  React.useEffect(() => {
    // 앱에서 fcmToken 가져오기
    document.addEventListener("message", ({ data }) => {
      setFcmToken(data);
    });

    if (!isLogin) {
      let code = new URL(window.location.href).searchParams.get("code");
      getKakaoToken(
        code,
        async (response) => {
          const TOKEN = response.data.data;
          await getKakaoLogin(
            TOKEN,
            async (response) => {
              if (response.data.statusCode === 200) {
                await dispatch(loginAction(response.data.data));
                const ACCESS_TOKEN = response.data.data.accessToken;
                localStorage.setItem("ACCESS_TOKEN", ACCESS_TOKEN);
              }
            },
            (error) => {
              console.log(error);
            }
          );
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      // await fcmToken 보내기 요청
      if (fcmToken !== "") {
        postFcmToken(
          fcmToken,
          memberSeq,
          async (response) => {
            if (response.status === 200) {
              console.log(fcmToken);
              if (isFirst) {
                gotoRegisterInfo();
              } else {
                if (isProtector) {
                  gotoPillToday();
                } else {
                  gotoElderMain();
                }
              }
            }
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        if (isFirst) {
          gotoRegisterInfo();
        } else {
          if (isProtector) {
            gotoPillToday();
          } else {
            gotoElderMain();
          }
        }
      }
    }
  }, [dispatch, isFirst, isLogin, isProtector, fcmToken]);

  // return <>카카오 로그인 중</>;
  return <Loading></Loading>;
}

function gotoRegisterInfo() {
  window.location.href = "/member-info/member-register-info";
}

function gotoElderMain() {
  window.location.href = "/main";
}

function gotoPillToday() {
  window.location.href = "/pill-today";
}

export default Callback;
