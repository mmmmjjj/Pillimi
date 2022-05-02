import React, { useState } from "react";
import { Row, Col, ListGroup, ListGroupItem, Modal } from "reactstrap";
import "../familycss.css";

function FamilyProtector() {
  const [modalbool, setmodalbool] = useState(false)
  const toggle = () => {
    setmodalbool(!modalbool)
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
        <ListGroupItem onClick={toggle}>
          <Row xs="4">
            <Col>
              <img alt="" src="/img/1.jpg" />
            </Col>
            <Col xs={{ offset: 1, size: 8 }} className="listitemtext">
              <h3>엄마</h3>
            </Col>
          </Row>
        </ListGroupItem>
        <ListGroupItem>
          <Row xs="4">
            <Col>
              <img alt="" src="/img/2.jpg" />
            </Col>
            <Col xs={{ offset: 1, size: 8 }} className="listitemtext">
              <h3>아빠</h3>
            </Col>
          </Row>
        </ListGroupItem>
        <ListGroupItem>
          <Row xs="4">
            <Col>
              <img alt="" src="/img/3.jpg" />
            </Col>
            <Col xs={{ offset: 1, size: 8 }} className="listitemtext">
              <h3>할머니</h3>
            </Col>
          </Row>
        </ListGroupItem>
        <ListGroupItem>
          <Row xs="4">
            <Col>
              <img alt="" src="/img/4.jpg" />
            </Col>
            <Col xs={{ offset: 1, size: 8 }} className="listitemtext">
              <h3>할아버지</h3>
            </Col>
          </Row>
        </ListGroupItem>
      </ListGroup>
      <Modal isOpen={modalbool} toggle={toggle} centered>
        <Row style={{ padding:"20px",borderBottom:"1px solid black"}}><h3>회원 정보</h3></Row>
        <Row style={{ padding:"20px" }}><h3>약 관리</h3></Row>
      </Modal>
    </div>
  );
}

export default FamilyProtector;
