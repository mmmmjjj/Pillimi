/*eslint-disable*/
import Header from "components/Headers/Header";
import React from "react";
import { Redirect } from "react-router-dom";
import { Route, Switch, BrowserRouter } from "react-router-dom";

// reactstrap components
import "../../assets/css/now-ui-kit.css";
import style from "./css/MemberPillCheck.module.css"
import ProtectorTakeAlarm from "./MemberPillPage/ProtectorTakeAlarm";

// core components

function MemberPillPage(props) {
  var basicurl = props.match.path;
  return (
    <>
      
      <BrowserRouter>
      <Header header="김말자"></Header>
        <Switch>
          <Switch>
            <Route
              path={`${basicurl}/protector-take-alarm`}
              render={(props) => (
                <ProtectorTakeAlarm {...props} />
              )}
            />
            <Redirect to={`${basicurl}/protector-take-alarm`}></Redirect>
          </Switch>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default MemberPillPage;
