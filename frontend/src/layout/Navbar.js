/*eslint-disable*/
import React, { useEffect, useState } from "react";
import { Row, Col } from "reactstrap";
import { AiFillHome, AiOutlineSearch } from "react-icons/ai";
import { HiOutlineUserGroup } from "react-icons/hi";
import { CgUserList } from "react-icons/cg";
import "../components/family/familycss.css";
import { useSelector } from "react-redux";

function Navbar(props) {
  Navbar.defaultProps = {
    navarray:[false, false, false, false]
  };
  const [s1, sets1] = useState([false, false, false, false]);

  useEffect(() => {
    if (props.navarray){
      sets1(props.navarray)
    }
  }, [props]);

  let isProtector = useSelector(
    (state) => state.memberInfo.memberInfo.protector
  );
  const memberSeq = useSelector(
    (state) => state.memberInfo.memberInfo.memberSeq
  );

  const movepilltoday = () => {
    window.location.href = `/pill-today`;
  };
  const movemain = () => {
    window.location.href = `/main`;
  };
  const movepillsearch = () => {
    window.location.href = `/pill-search`;
  };
  const moveprotector = () => {
    window.location.href = `/family/Protector`;
  };
  const movemyinfo = () => {
    window.location.href = `/member-info/member-info-detail/${memberSeq}`;
  };
  return (
    <>
      {isProtector ? (
        <div
          style={{
            backgroundColor: "#F1F1F1",
            margin: "0px",
            padding: "0px",
            bottom: "0",
            width: "100%",
            height: "10vh",
            visibility:"hidden"
          }}
        >
          <Row xs="4" style={{ verticalAlign: "middle", margin:"0px", height:"100%" }}>
            <Col
              className={ s1[0]? "navcol check":"navcol"}
              onClick={movepilltoday}
            >
              <div>

              <AiFillHome className="fa-3x"/>
              <h6>홈</h6>
              </div>
            </Col>
            <Col
              className={ s1[1]? "navcol check":"navcol"}
              onClick={movepillsearch}
            >
              <div>

              <AiOutlineSearch className="fa-3x" />
              <h6>약 검색</h6>
              </div>
            </Col>
            <Col
              className={ s1[2]? "navcol check":"navcol"}
              onClick={moveprotector}
            >
              <div>

              <HiOutlineUserGroup className="fa-3x" />
              <h6>가족관리</h6>
              </div>
            </Col>
            <Col
              className={ s1[3]? "navcol check":"navcol"}
              onClick={movemyinfo}
            >
              <div>

              <CgUserList className="fa-3x" />
              <h6>내정보</h6>
              </div>
            </Col>
          </Row>
        </div>
      ) : (
        <div
          style={{
            backgroundColor: "#F1F1F1",
            margin: "0px",
            padding: "0px",
            bottom: "0",
            width: "100%",
            height: "10vh",
            visibility:"hidden"
          }}
        >
          <Row xs="1">
            <Col className="navcol" onClick={movemain}>
              <h2 style={{ margin: "0px" }}>처음 화면으로</h2>
            </Col>
          </Row>
        </div>
      )}

      {isProtector ? (
        <div
          style={{
            backgroundColor: "#F1F1F1",
            margin: "0px",
            padding: "0px",
            position: "fixed",
            bottom: "0",
            width: "100%",
            height: "10vh",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Row xs="4" style={{ verticalAlign: "middle", margin:"0px", height:"100%" }}>
            <Col
              className={ s1[0]? "navcol check":"navcol"}
              onClick={movepilltoday}
            >
              <div>

              <AiFillHome className="fa-3x"/>
              <h6>홈</h6>
              </div>
            </Col>
            <Col
              className={ s1[1]? "navcol check":"navcol"}
              onClick={movepillsearch}
            >
              <div>

              <AiOutlineSearch className="fa-3x" />
              <h6>약 검색</h6>
              </div>
            </Col>
            <Col
              className={ s1[2]? "navcol check":"navcol"}
              onClick={moveprotector}
            >
              <div>

              <HiOutlineUserGroup className="fa-3x" />
              <h6>가족관리</h6>
              </div>
            </Col>
            <Col
              className={ s1[3]? "navcol check":"navcol"}
              onClick={movemyinfo}
            >
              <div>

              <CgUserList className="fa-3x" />
              <h6>내정보</h6>
              </div>
            </Col>
          </Row>
        </div>
      ) : (
        <div
          style={{
            backgroundColor: "#F1F1F1",
            margin: "0px",
            padding: "0px",
            position: "fixed",
            bottom: "0",
            width: "100%",
            height: "10vh",
            display: "table",
          }}
        >
          <Row
            xs="1"
            style={{ display: "table-cell", verticalAlign: "middle" }}
          >
            <Col className="navcol" onClick={movemain}>
              <h2 style={{ margin: "0" }}>처음 화면으로</h2>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
}

export default Navbar;
