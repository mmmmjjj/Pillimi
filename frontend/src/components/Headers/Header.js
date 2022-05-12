/*eslint-disable*/
import React from "react";

// reactstrap components
import { Row, Col } from "reactstrap";
import "../family/familycss.css";
import { useHistory } from 'react-router-dom';

// core components

function Header(props) {
  let history = useHistory();
  return (
    <>
        <Row style={{paddingTop:"30px", paddingBottom:"5px"}}>
          <Col xs="2" className="familypagecol1">
            { props.canBack ?
            <i
              className="fa fa-solid fa-arrow-left"
              style={{ fontSize: "xx-large", margin:"auto", float:"left" }}
              onClick={ () => {
                history.goBack();
              } }
            ></i> : <></>
          }
          </Col>
          <Col xs="8" className="familypagecol2">
            <h4 style={{margin:"0px"}}>{props.header}</h4>
          </Col>
          <Col xs="2" className="familypagecol2"></Col>
        </Row>
        <hr style={{margin:"0px"}}></hr>
        <hr style={{margin:"0px"}}></hr>
    </>
  );
}

export default Header;
