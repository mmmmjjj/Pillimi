import React, { useState } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import FamilyRegisterRequest from "components/family/familyRegister/FamilyRegisterRequest.js";
import { Container } from "reactstrap";
import "../family/familycss.css";
function Family(props) {
  const [header, setheader] = useState("가족");
  const getheader = (str) => {
    setheader(str);
  };
  var basicurl = props.match.path;
  return (
    <BrowserRouter>
      <Container id="outsidecon">
        <h4>{header}</h4>
        <hr></hr>
        <Switch>
          <Switch>
            <Route
              path={`${basicurl}/request`}
              render={(props) => (
                <FamilyRegisterRequest getheader={getheader} {...props} />
              )}
            />
          </Switch>
        </Switch>
      </Container>
    </BrowserRouter>
  );
}

export default Family;
