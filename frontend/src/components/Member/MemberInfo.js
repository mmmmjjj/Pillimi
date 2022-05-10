/*eslint-disable*/
import React, { useState } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
// reactstrap components
import "../../assets/css/now-ui-kit.css";
import Header from "components/Headers/Header";
import MemberRegisterInfo from "./MemberInfo/MemberRegisterInfo";
import MemberInfoDetail from "./MemberInfo/MemberInfoDetail";
import MemberInfoModify from "./MemberInfo/MemberInfoModify";
import { useSelector } from 'react-redux';

// core components

function MemberInfo(props) {

  // var basicurl = props.match.path;
  let nickName = useSelector((state) => state.memberInfo.memberInfo.nickName);
  console.log(nickName)
  const [header, setheader] = useState(nickName);
  const getheader = (str) => {
    console.log(str);
    setheader(str);
    console.log(header)
  };
  const getnavbar = (bool) => {
    setnavbar(bool);
  };
  return (
    <>
      <BrowserRouter>
        <Header header={header+`님의 정보`}></Header>
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
                <MemberInfoDetail 
                  getheader={getheader}
                  {...props} />
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
