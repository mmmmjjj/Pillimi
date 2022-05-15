import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import FamilyRegisterRequest from "components/family/familyRegister/FamilyRegisterRequest.js";
import FamilyRegisterReply from "components/family/familyRegister/FamilyRegisterReply.js";
import MyFamily from "components/family/familyPage/MyFamily.js";
import FamilyProtector from "components/family/familyPage/FamilyProtector.js";
import Cameratest from "components/family/familyPage/Cameratest.js";
import Cameratest2 from "components/family/familyPage/Cameratest2.js";
import Navbar from "layout/Navbar.js";
import Header from "components/Headers/Header";
import "../family/familycss.css";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

function Family(props) {
  const [header, setheader] = useState("가족");
  const [navbar, setnavbar] = useState(true);

  const getheader = (str) => {
    setheader(str);
  };
  const getnavbar = (bool) => {
    setnavbar(bool);
  };
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
  var basicurl = props.match.path;
  return (
    // <BrowserRouter>
    <div id="outsidecon">
      <Header header={header} canBack={true}></Header>
      <hr style={{ margin: "0px" }}></hr>
      <Switch>
        <Route
          path={`${basicurl}/reply`}
          render={(props) => <FamilyRegisterReply getheader={getheader} getnavbar={getnavbar} {...props} />}
        />
        <Route
          path={`${basicurl}/request`}
          render={(props) => <FamilyRegisterRequest getheader={getheader} getnavbar={getnavbar} {...props} />}
        />
        <Route path={`${basicurl}/myfamily`} render={(props) => <MyFamily getheader={getheader} {...props} />} />
        <Route
          path={`${basicurl}/Protector`}
          render={(props) => <FamilyProtector getheader={getheader} {...props} />}
        />
        <Route
          path={`${basicurl}/camera/:alarmSeq`}
          render={(props) => <Cameratest getheader={getheader} getnavbar={getnavbar} {...props} />}
        />
        <Route path={`${basicurl}/camera2`} render={(props) => <Cameratest2 {...props} />} />
      </Switch>
      {navbar ? <Navbar /> : null}
    </div>
    // </BrowserRouter>
  );
}

export default Family;
