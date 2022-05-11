/*eslint-disable*/
import Header from "components/Headers/Header";
import React from "react";
import { Redirect } from "react-router-dom";
import { Route, Switch, BrowserRouter } from "react-router-dom";

// reactstrap components
import "../../assets/css/now-ui-kit.css";
import style from "./css/MemberPillCheck.module.css";
import MemberPillList from "./MemberPillPage/MemberPillList";
import PillTakeAlarm from "./MemberPillPage/PillTakeAlarm";
import PillTakePicture from "./MemberPillPage/PillTakePicture";
import ProtectorTakeAlarm from "./MemberPillPage/ProtectorTakeAlarm";

// core components

function MemberPillPage(props) {
  var basicurl = props.match.path;
  return (
    <>
      {/* <BrowserRouter> */}
      <Header header="김말자"></Header>
      <Switch>
        <Switch>
          <Route
            path={`${basicurl}/protector-take-alarm/:protegeSeq`}
            render={(props) => <ProtectorTakeAlarm {...props} />}
          />
          <Route path={`${basicurl}/member-pill-list/:memberSeq`} render={(props) => <MemberPillList {...props} />} />
          <Route exact path={`${basicurl}/pill-take-picture`} render={(props) => <PillTakePicture {...props} />} />
          <Route path={`${basicurl}/pill-take-alarm`} render={(props) => <PillTakeAlarm {...props} />} />
          {/* <Redirect to={`${basicurl}/protector-take-alarm`}></Redirect> */}
        </Switch>
      </Switch>
      {/* </BrowserRouter> */}
    </>
  );
}

export default MemberPillPage;
