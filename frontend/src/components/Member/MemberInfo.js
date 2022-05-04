/*eslint-disable*/
import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
// reactstrap components
import "../../assets/css/now-ui-kit.css";
import Header from "components/Headers/Header";
import MemberRegisterInfo from "./MemberInfo/MemberRegisterInfo";
import MemberInfoDetail from "./MemberInfo/MemberInfoDetail";
import MemberInfoModify from "./MemberInfo/MemberInfoModify";

// core components

function MemberInfo(props) {

  // var basicurl = props.match.path;

  return (
    <>
      <BrowserRouter>
        <Header header={`님의 정보`}></Header>
        <Switch>
          <Switch>
            <Route exact
              path={`${props.match.path}/member-register-info`}
              render={(props) => (
                <MemberRegisterInfo {...props} />
              )}
            />
            <Route exact
              path={`${props.match.path}/member-info-detail/:memberSeq`}
              render={(props) => (
                <MemberInfoDetail {...props} />
              )}
            />
            <Route exact
              path={`${props.match.path}/member-info-modify/:memberSeq`}
              render={(props) => (
                <MemberInfoModify {...props} />
              )}
            />
          </Switch>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default MemberInfo;
