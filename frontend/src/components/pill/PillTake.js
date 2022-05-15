import React from "react";
import { Route, Switch } from "react-router-dom";

import PillTakeRegister from "components/pill/pillTake/PillTakeRegister.js";
import PillTakeModify from "components/pill/pillTake/PillTakeModify.js";
import PillTakeDetail from "components/pill/pillTake/PillTakeDetail.js";
import Navbar from "layout/Navbar.js";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

function PillTake(props) {
  var basicurl = props.match.path;
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
    return <div></div>;
  }
  return (
    <>
      {/* <BrowserRouter> */}
      <Switch>
        <Switch>
          <Route exact path={`${basicurl}`} render={(props) => <PillTakeRegister {...props} />} />
          <Route
            exact
            path={`${basicurl}/modify/:memberMedicineSeq`}
            render={(props) => <PillTakeModify {...props} />}
          />
          <Route
            exact
            path={`${basicurl}/detail/:memberMedicineSeq`}
            render={(props) => <PillTakeDetail {...props} />}
          />
        </Switch>
      </Switch>
      <Navbar />
      {/* </BrowserRouter> */}
    </>
  );
}

export default PillTake;
