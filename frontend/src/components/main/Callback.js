import React from "react";
import { useDispatch } from "react-redux";
import { getKakaoToken, getKakaoLogin } from "api/member";
import { useSelector } from "react-redux";
import { loginAction } from "actions/memberAction";

function Callback() {
  const dispatch = useDispatch();

  let isLogin = useSelector((state) => state.memberInfo.isLogin);

  React.useEffect(() => {
    if (!isLogin) {
      let code = new URL(window.location.href).searchParams.get("code");
      getKakaoToken(
        code,
        (response) => {
          const TOKEN = response.data.data;
          getKakaoLogin(
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
      gotoPillToday();
    }
  }, [dispatch, isLogin]);

  return <>카카오 로그인 중</>;
}

function gotoPillToday() {
  window.location.href = "/pill-today";
}

export default Callback;
