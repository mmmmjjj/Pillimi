import React, { useState } from "react";
import { Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import "../familycss.css";

function MyFamily() {
  const [familyTab, setfamilyTab] = useState(true);
  const onFamilyTab = () => {
    setfamilyTab(true);
  };
  const offFamilyTab = () => {
    setfamilyTab(false);
  };


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
          <ListGroupItem><Row xs="4"><Col><img className="listimg" alt="" src="/img/1.jpg"/></Col><Col xs={{ offset:1, size:8}} className="listitemtext"><h3>엄마</h3></Col></Row></ListGroupItem>
          <ListGroupItem><Row xs="4"><Col><img className="listimg" alt="" src="/img/2.jpg"/></Col><Col xs={{ offset:1, size:8}} className="listitemtext"><h3>아빠</h3></Col></Row></ListGroupItem>
          <ListGroupItem><Row xs="4"><Col><img className="listimg" alt="" src="/img/3.jpg"/></Col><Col xs={{ offset:1, size:8}} className="listitemtext"><h3>할머니</h3></Col></Row></ListGroupItem>
          <ListGroupItem><Row xs="4"><Col><img className="listimg" alt="" src="/img/4.jpg"/></Col><Col xs={{ offset:1, size:8}} className="listitemtext"><h3>할아버지</h3></Col></Row></ListGroupItem>

        </ListGroup>
        : <ListGroup style={{ backgroundColor: "#EAF0F8", width: "100%", paddingBottom:"30px" }}>
            <ListGroupItem><Row xs="4"><Col><img className="listimg" alt="" src="/img/5.jpg"/></Col><Col xs={{ offset:1, size:8}} className="listitemtext"><h3>누구야</h3></Col></Row></ListGroupItem>
            <ListGroupItem><Row xs="4"><Col><img className="listimg" alt="" src="/img/6.jpg"/></Col><Col xs={{ offset:1, size:8}} className="listitemtext"><h3>가족찾음</h3></Col></Row></ListGroupItem>
          </ListGroup>
        }
    </div>
  );
}

export default MyFamily;
