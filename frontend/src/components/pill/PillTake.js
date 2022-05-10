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
            <Route exact path={`${basicurl}`} render={(props) => <PillTakeRegister {...props} />} />
            <Route exact path={`${basicurl}/modify`} render={(props) => <PillTakeModify {...props} />} />
            <Route
              exact
              path={`${basicurl}/detail/:memberMedicineSeq`}
              render={(props) => <PillTakeDetail {...props} />}
            />
          </Switch>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default PillTake;
