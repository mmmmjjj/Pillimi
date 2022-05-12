/*eslint-disable*/
import Header from "components/Headers/Header";
import React from "react";

// reactstrap components
import "../../assets/css/now-ui-kit.css";
import PillPictureAlarm from "./MemberPillCheck/PillPictureAlarm";
import { Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

// core components

function MemberPillCheck(props) {
  let isLogin = useSelector((state) => state.memberInfo.isLogin);
  if(!isLogin){
    Swal.fire({
      icon: "warning",
      title: "로그인이 필요한 서비스입니다.",
      confirmButtonColor: `#ff0000`,
    }).then(function () {
      props.history.push(`/`)
    });
  }
  let isProtector = useSelector((state) => state.memberInfo.memberInfo.protector);
  if(!isProtector){
    Swal.fire({
      icon: "warning",
      title: "권한이 없는 페이지입니다.",
      confirmButtonColor: `#ff0000`,
    }).then(function () {
      props.history.push(`/`)
    });
    return(
      <div></div>
    )
  }
  if(isLogin){
    return (
      <>
        {/* <BrowserRouter> */}
          <Header header={`복용 확인`} canBack={true}></Header>
          <Switch>
            <Switch>
              <Route exact
                path={`${props.match.path}/pill-picture-alarm/:alarmSeq`}
                render={(props) => (
                  <PillPictureAlarm {...props} />
                )}
              />
            </Switch>
          </Switch>
        {/* </BrowserRouter> */}
      </>
    );
  } else {
    return (
      <div></div>
    )
  }
}

export default MemberPillCheck;
