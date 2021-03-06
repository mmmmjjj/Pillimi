/*eslint-disable*/
import Header from "components/Headers/Header";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { useHistory } from "react-router-dom";
// reactstrap components
import "../../assets/css/now-ui-kit.css";
import style from "./css/MemberPillCheck.module.css";
import MemberPillList from "./MemberPillPage/MemberPillList";
import PillTakePicture from "./MemberPillPage/PillTakePicture";
import ProtectorTakeAlarm from "./MemberPillPage/ProtectorTakeAlarm";
import Swal from "sweetalert2";

// core components

function MemberPillPage(props) {
  var basicurl = props.match.path;
  const [header, setHeader] = useState();
  const isProtector = useSelector((state) => state.memberInfo.memberInfo.protector);
  const protegeName = useSelector((state) => state.protegeInfo.nickName);
  const nickName = useSelector((state) => state.memberInfo.memberInfo.nickName);

  const memberSeq = useSelector((state) => state.protegeInfo.memberSeq);
  const history = useHistory();
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
  useEffect(() => {
    if (isProtector) {
      setHeader(protegeName);
    } else {
      setHeader(nickName);
    }
  });
  if (isLogin) {
    return (
      <>
        {/* <BrowserRouter> */}
        <Header header={header} canBack={true}></Header>
        <Switch>
          <Switch>
            <Route
              path={`${basicurl}/protector-take-alarm/:protegeSeq`}
              render={(props) => <ProtectorTakeAlarm {...props} />}
            />
            <Route
              exact
              path={`${basicurl}/member-pill-list`}
              render={(props) => {
                if (isProtector) {
                  return props.history.push(`/pill-today`);
                } else if (!isProtector) {
                  return props.history.push(`/main`);
                }
              }}
            />

            <Route
              exact
              path={`${basicurl}/member-pill-list/:memberSeq`}
              render={(props) => <MemberPillList {...props} />}
            />

            <Route
              exact
              path={`${basicurl}/pill-take-picture/:alarmSeq`}
              render={(props) => <PillTakePicture {...props} />}
            />
            {/* <Redirect to={`${basicurl}/protector-take-alarm`}></Redirect> */}
          </Switch>
        </Switch>
        {/* </BrowserRouter> */}
      </>
    );
  } else {
    return <div></div>;
  }
}

export default MemberPillPage;
