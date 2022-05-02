import React from "react";
import { Row, Col } from "reactstrap";
import "../components/family/familycss.css";

function Navbar() {
  return (
    <>
      <div
        style={{ backgroundColor: "#F1F1F1", margin: "0px", padding: "0px", position:"fixed", bottom:"0", width:"100%" }}
      >
        <Row xs="4">
          <Col className="navcol">
          <i className="fa-solid fa-house-chimney"></i>
          </Col>
          <Col className="navcol">
            <i className="fa fa-solid fa-magnifying-glass fa-2x"></i>
          </Col>
          <Col className="navcol">
            <i className="fa fa-light fa-users fa-2x"></i>
            <br/><h6>가족관리</h6>
          </Col>
          <Col className="navcol">
            <i className="fa fa-regular fa-address-card fa-2x"></i>
            <br/><h6>내정보</h6>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Navbar;
