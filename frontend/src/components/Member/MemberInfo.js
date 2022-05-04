/*eslint-disable*/
import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
// reactstrap components
import "../../assets/css/now-ui-kit.css";
import Header from "components/Headers/Header";
import MemberRegisterInfo from "./MemberInfo/MemberRegisterInfo";

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
            
          </Switch>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default MemberInfo;
