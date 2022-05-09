import React, { useState, useEffect } from "react";
import { Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import "../familycss.css";
import { getMyFamily, getFamilyRequest } from "api/family"
import MemberReducer from "reducers/MemberReducer";


function MyFamily(props) {
  const [familyTab, setfamilyTab] = useState(true);
  const onFamilyTab = () => {
    setfamilyTab(true);
  };
  const offFamilyTab = () => {
    setfamilyTab(false);
  };

  useEffect(() => {
    console.log("마운트")
    getFamilyList();
    getFamilyRequestList();
  },[])

  const [ familyList, setFamilyList ] = useState([]);

  const getFamilyList = () => {
    getMyFamily(( success ) => {
      setFamilyList(success.data.data);
      console.log(success)
      console.log(success.data.data);
    }, ( fail ) => {
      console.log(fail);
    })
  }

  const [ preFamilyList, setPreFamilyList ] = useState([]);

  const getFamilyRequestList = () => {
    getFamilyRequest(( success ) => {
      setPreFamilyList(success.data.data);
      console.log(success);
    }, ( fail ) => {
      console.log(fail);
    })
  }

  const gotoMemberDetail = (memberSeq) => {
    window.location.href = `/member-info/member-info-detail/${memberSeq}`
  }

  const gotoFamilyResponse = (memberInfo) => {
    // console.log(memberInfo.requestName);
    // console.log(memberInfo.requestPhone);
    props.history.push({
      pathname: `/family/reply`,
      props:{
        memberInfo: {
          name: memberInfo.requestName,
          phone: memberInfo.requestPhone,
          reqSeq: memberInfo.familyRequestSeq
        }
      }
    })
  }

  const FamilyList = () => {
    let result = [];
    familyList.map((element, idx) => {
      result.push(
        <ListGroupItem onClick={() => gotoMemberDetail(element.memberSeq)}>
          <Row xs="4">
            <Col>
              <img className="listimg" alt="" src={element.memberImage}/>
            </Col>
            <Col xs={{ offset:1, size:8}} className="listitemtext">
              <h3 className="familyh3">{element.memberName}</h3>
            </Col>
          </Row>
        </ListGroupItem>
      )
    })
    return result;
  }

  const PreFamilyList = () => {
    let result = [];
    preFamilyList.map((element, idx) => {
      result.push(
        <ListGroupItem onClick={() => gotoFamilyResponse(element)}>
          <Row xs="4">
            <Col>
              <img className="listimg" alt="" src={element.requestImage}/>
            </Col>
            <Col xs={{ offset:1, size:8}} className="listitemtext">
              <h3 className="familyh3">{element.requestName}</h3>
            </Col>
          </Row>
        </ListGroupItem>

      )
    })
    return result;
  }

  return (
    <div style={{ backgroundColor: "#EAF0F8", padding:"0px", height:"100vh", margin:"0px"}}>
      <Row xs="2">
        <Col className={`${familyTab ? "onTab" : "offTab"}`} onClick={onFamilyTab}><div className="textdiv">내 가족</div></Col>
        {/* <Col className={`${familyTab ? "onTab" : "offTab"}`} onClick={onFamilyTab}><h5>내 가족</h5></Col> */}
        <Col className={`${familyTab ? "offTab" : "onTab"}`} onClick={offFamilyTab} style={{ position:"relative" }}><div className="textdiv">가족 요청</div>
        <i className="fa fa-exclamation-circle fa-2x" size="lg"style={{ position: "absolute", color:"red", top:"-14px" , right:"7px", zIndex:"1"}}></i></Col>
      </Row>
      {
        familyTab ?
        <ListGroup style={{ backgroundColor: "#EAF0F8", width: "100%", paddingBottom:"30px" }}>
          <FamilyList></FamilyList>
        </ListGroup>
        : <ListGroup style={{ backgroundColor: "#EAF0F8", width: "100%", paddingBottom:"30px" }}>
            <PreFamilyList></PreFamilyList>
          </ListGroup>
        }
    </div>
  );
}

export default MyFamily;
