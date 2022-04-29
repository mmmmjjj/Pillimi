/*

=========================================================
* Now UI Kit React - v1.5.0
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-kit-react
* Copyright 2021 Creative Tim (http://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/now-ui-kit-react/blob/main/LICENSE.md)

* Designed by www.invisionapp.com Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// styles for this kit
import "assets/css/bootstrap.min.css";
import "assets/scss/now-ui-kit.scss?v=1.5.0";
import "assets/demo/demo.css?v=1.5.0";
import "assets/demo/nucleo-icons-page-styles.css?v=1.5.0";
// pages for this kit
import Index from "views/Index.js";
import NucleoIcons from "views/NucleoIcons.js";
import LoginPage from "views/examples/LoginPage.js";
import LandingPage from "views/examples/LandingPage.js";
import ProfilePage from "views/examples/ProfilePage.js";
import MainPage from "views/MainPage.js";
import ElderMain from "components/main/ElderMain.js";
import PillToday from "components/main/PillToday.js";
import PillDetail from "components/pill/PillDetail.js";
import PillSearch from "components/pill/PillSearch.js";
import PillTake from "components/pill/PillTake.js";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Switch>
        <Route exact path="/" render={(props) => <MainPage {...props} />} />
        <Route exact path="/index" render={(props) => <Index {...props} />} />
        <Route exact path="/nucleo-icons" render={(props) => <NucleoIcons {...props} />} />
        <Route exact path="/landing-page" render={(props) => <LandingPage {...props} />} />
        <Route exact path="/profile-page" render={(props) => <ProfilePage {...props} />} />
        <Route exact path="/login-page" render={(props) => <LoginPage {...props} />} />
        <Route exact path="/main" render={(props) => <ElderMain {...props} />} />
        <Route exact path="/pill-today" render={(props) => <PillToday {...props} />} />
        <Route exact path="/pill-detail" render={(props) => <PillDetail {...props} />} />
        <Route exact path="/pill-search" render={(props) => <PillSearch {...props} />} />
        <Route path="/pill-take" render={(props) => <PillTake {...props} />} />
        <Redirect to="/index" />
        {/* <Redirect from="/" to="/index" /> */}
      </Switch>
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
