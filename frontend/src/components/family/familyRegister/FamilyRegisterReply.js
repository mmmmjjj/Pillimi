import React, { useEffect, useState } from "react";
import { Button, Container, Row } from "reactstrap";
import "../familycss.css";
import { Link } from "react-router-dom";

function FamilyRegisterReply(props) {
  const [name, setname] = useState("");
  const [number, setnumber] = useState("");
  useEffect(() => {
    props.getheader("가족 요청");
    props.getnavbar(false);
    setpage();
  });
  const setpage = () => {
    setname("(이름)");
    setnumber("010-1234-5678");
  };
  return (
    <Container style={{ padding: "50px" }}>
      <Row style={{ marginBottom: "40px"}}>
        <h2>
          {name}님을 가족으로 수락하시겠습니까?<br></br>
          {number}
        </h2>
      </Row>
      <Button className="activebtn" size="lg" style={{ width: "70%", marginBottom: "40px"}}>
        네
      </Button>
      <br></br>
      <Button className="unactivebtn" size="lg" style={{ width: "70%"}}>
        아니오
      </Button>
      <Link to="/family/camera">
        <Button>
          <p>Click Me!</p>
        </Button>
      </Link>
    </Container>
  );
}

export default FamilyRegisterReply;
