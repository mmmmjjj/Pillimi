import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";

import PillTakeRegister from "components/pill/pillTake/PillTakeRegister.js";
import PillTakeModify from "components/pill/pillTake/PillTakeModify.js";

function PillTake(props) {
  var basicurl = props.match.path;

  return (
    <>
      <BrowserRouter>
        <Switch>
          <Switch>
            <Route path={`${basicurl}/register`} render={(props) => <PillTakeRegister {...props} />} />
            <Route path={`${basicurl}/modify`} render={(props) => <PillTakeModify {...props} />} />
          </Switch>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default PillTake;
