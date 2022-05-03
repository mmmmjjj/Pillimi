import React from "react";
import { useDispatch } from "react-redux";
import { getKakaoToken, getKakaoLogin } from "api/member";
import { useSelector } from "react-redux";
import { loginAction } from "actions/memberAction";

function Callback() {
  const dispatch = useDispatch();

  let isLogin = useSelector((state) => state.memberInfo.isLogin);
  let isFirst = useSelector((state) => state.memberInfo.memberInfo.first);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memberInfo = {
    first: false,
    memberImage: "",
    memberSeq: 0,
    nickName: "",
  };

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
                console.log(response.data.data);
                memberInfo.first = response.data.data.first;
                memberInfo.memberImage = response.data.data.memberImage;
                memberInfo.memberSeq = response.data.data.memberSeq;
                memberInfo.nickName = response.data.data.nickName;
                await dispatch(loginAction(memberInfo));
                // await dispatch(loginAction(response.data.data));
                const ACCESS_TOKEN = response.data.data.accessToken;
                localStorage.setItem("ACCESS_TOKEN", ACCESS_TOKEN);
                console.log(isLogin + " " + isFirst);
                if (isLogin) {
                  gotoPillToday();
                }
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
    }
  }, [dispatch, isLogin, isFirst, memberInfo]);

  return <>카카오 로그인 중</>;
}

function gotoPillToday() {
  window.location.href = "/pill-today";
}

export default Callback;
