import React, { useState, useEffect } from "react";
import { Row, Col, ListGroup, ListGroupItem, Modal } from "reactstrap";
import "../familycss.css";
import { getMyFamily } from "api/family"

function FamilyProtector() {
  const [modalbool, setmodalbool] = useState(false)
  const toggle = () => {
    setmodalbool(!modalbool)
  }
  
  useEffect(() => {
    console.log("마운트")
    getFamilyList();
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

  const Family = () => {
    let result = []
    if(familyList.length===0){
      result.push(
        <div>등록된 가족이 없습니다</div>
      )
    }else{
      familyList.forEach( element => {
        result.push(
          <ListGroupItem onClick={toggle} key={element.memberSeq}>
            <Row xs="4">
              <Col>
                <img className="listimg" alt="" src={element.memberImage} />
              </Col>
              <Col xs={{ offset: 1, size: 8 }} className="listitemtext">
                <h3 className="familyh3">{element.memberName}</h3>
              </Col>
            </Row>
          </ListGroupItem>
        )
      })
    }
    return result;
  }

  return (
    <div
      style={{
        backgroundColor: "#EAF0F8",
        padding: "0px",
        height: "100vh",
        margin: "0px",
      }}
    >
      <ListGroup
        style={{
          backgroundColor: "#EAF0F8",
          width: "100%",
          paddingBottom: "30px",
          paddingTop: "50px",
        }}
      >
        <Family></Family>
        {/* <ListGroupItem onClick={toggle}>
          <Row xs="4">
            <Col>
              <img className="listimg" alt="" src="/img/1.jpg" />
            </Col>
            <Col xs={{ offset: 1, size: 8 }} className="listitemtext">
              <h3 className="familyh3">엄마</h3>
            </Col>
          </Row>
        </ListGroupItem>
        <ListGroupItem>
          <Row xs="4">
            <Col>
              <img className="listimg" alt="" src="/img/2.jpg" />
            </Col>
            <Col xs={{ offset: 1, size: 8 }} className="listitemtext">
              <h3 className="familyh3">아빠</h3>
            </Col>
          </Row>
        </ListGroupItem>
        <ListGroupItem>
          <Row xs="4">
            <Col>
              <img className="listimg" alt="" src="/img/3.jpg" />
            </Col>
            <Col xs={{ offset: 1, size: 8 }} className="listitemtext">
              <h3 className="familyh3">할머니</h3>
            </Col>
          </Row>
        </ListGroupItem>
        <ListGroupItem>
          <Row xs="4">
            <Col>
              <img className="listimg" alt="" src="/img/4.jpg" />
            </Col>
            <Col xs={{ offset: 1, size: 8 }} className="listitemtext">
              <h3 className="familyh3">할아버지</h3>
            </Col>
          </Row>
        </ListGroupItem> */}
      </ListGroup>
      <Modal isOpen={modalbool} toggle={toggle} centered>
        <Row style={{ padding:"20px",borderBottom:"1px solid black"}}><h3 className="familyh3">회원 정보</h3></Row>
        <Row style={{ padding:"20px" }}><h3 className="familyh3">약 관리</h3></Row>
      </Modal>
    </div>
  );
}

export default FamilyProtector;
