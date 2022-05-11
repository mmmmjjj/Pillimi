/*eslint-disable*/
import Header from "components/Headers/Header";
import React from "react";

// reactstrap components
import "../../assets/css/now-ui-kit.css";
import PillPictureAlarm from "./MemberPillCheck/PillPictureAlarm";
import { Route, Switch } from "react-router-dom";

// core components

function MemberPillCheck(props) {
  return (
    <>
      {/* <BrowserRouter> */}
        <Header header={`복용 확인`}></Header>
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
}

export default MemberPillCheck;
