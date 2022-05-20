/*eslint-disable*/
import React, { useState } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
// reactstrap components
import "../../assets/css/now-ui-kit.css";
import Header from "components/Headers/Header";
import MemberRegisterInfo from "./MemberInfo/MemberRegisterInfo";
import MemberInfoDetail from "./MemberInfo/MemberInfoDetail";
import MemberInfoModify from "./MemberInfo/MemberInfoModify";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

// core components

function MemberInfo(props) {
  // var basicurl = props.match.path;
  let nickName = useSelector((state) => state.memberInfo.memberInfo.nickName);
  let isLogin = useSelector((state) => state.memberInfo.isLogin);
  if (!isLogin) {
    Swal.fire({
      icon: "warning",
      title: "로그인이 필요한 서비스입니다.",
      width: "80%",
      confirmButtonColor: `#ff0000`,
    }).then(function () {
      props.history.push(`/`);
    });
  }
  const [header, setheader] = useState(nickName);
  const getheader = (str) => {
    setheader(str);
  };
  const getnavbar = (bool) => {
    setnavbar(bool);
  };
  if (isLogin) {
    return (
      <>
        {/* <BrowserRouter> */}
        <Header header={header + `님의 정보`} canBack={true}></Header>
        <Switch>
          <Switch>
            <Route
              exact
              path={`${props.match.path}/member-register-info`}
              render={(props) => <MemberRegisterInfo {...props} />}
            />
            <Route
              exact
              path={`${props.match.path}/member-info-detail/:memberSeq`}
              render={(props) => <MemberInfoDetail getheader={getheader} {...props} />}
            />
            <Route
              exact
              path={`${props.match.path}/member-info-modify/:memberSeq`}
              render={(props) => <MemberInfoModify getheader={getheader} {...props} />}
            />
          </Switch>
        </Switch>
        {/* </BrowserRouter> */}
      </>
    );
  } else {
    return <div></div>;
  }
}

export default MemberInfo;
