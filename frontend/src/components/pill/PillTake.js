import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";

import PillTakeRegister from "components/pill/pillTake/PillTakeRegister.js";
import PillTakeModify from "components/pill/pillTake/PillTakeModify.js";
import PillTakeDetail from "components/pill/pillTake/PillTakeDetail.js";

function PillTake(props) {
  var basicurl = props.match.path;

  return (
    <>
      <BrowserRouter>
        <Switch>
          <Switch>
            <Route path={`${basicurl}/register`} render={(props) => <PillTakeRegister {...props} />} />
            <Route path={`${basicurl}/modify`} render={(props) => <PillTakeModify {...props} />} />
            <Route path={`${basicurl}/detail`} render={(props) => <PillTakeDetail {...props} />} />
          </Switch>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default PillTake;
