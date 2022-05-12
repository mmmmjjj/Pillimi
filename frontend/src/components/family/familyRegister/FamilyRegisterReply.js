import React, { useEffect, useState } from "react";
import { Button, Container, Row } from "reactstrap";
import "../familycss.css";
import Swal from "sweetalert2";
import { useHistory  } from "react-router-dom";
import { addFamily, revertFamilyRequest } from 'api/family';
import { useSelector } from 'react-redux';

function FamilyRegisterReply(props) {
  const [name, setname] = useState("");
  const [number, setnumber] = useState("");
  const [familyRequestSeq, setFamilyRequestSeq] = useState(-1);

  useEffect(() => {
    props.getheader("가족 요청");
    props.getnavbar(false);
    if(props.history.location.state===undefined){
      Swal.fire({
        icon: "warning",
        title: "비정상적인 접근입니다.",
        confirmButtonColor: `#ff0000`,
      }).then(function () {
        history.push(`/`)
      });
    } else {
      console.log("정상 접근")
      setFamilyRequestSeq(props.history.location.state.memberInfo.reqSeq)
      setpage();
    }
    console.log(props.history.location)
  },[props, history, setpage]);
  const setpage = () => {
    console.log(props)
    setname(`(${props.history.location.state.memberInfo.name})`);
    setnumber(props.history.location.state.memberInfo.phone);
  };
  const history = useHistory();
  
  const onSubmityes = (event) => {
    addFamily(familyRequestSeq, (success) => {
      console.log(success);
      event.preventDefault();
      Swal.fire({
        icon: "success",
        title: "가족 등록을 수락하였습니다.",
        confirmButtonColor: `#0369a1`,
      }).then(function () {
        history.push(`/family/myfamily`)
      });
    }, ( fail ) => {
      console.log(fail);
    })
    
  };
  const onSubmitno = (event) => {
    revertFamilyRequest(familyRequestSeq, (success)=>{
     console.log(success);
      event.preventDefault();
      Swal.fire({
        icon: "warning",
        title: "가족 등록을 거절하였습니다.",
        confirmButtonColor: `#C4C4C4`,
      }).then(function () {
        history.push(`/family/myfamily`)
      });
    }, ( fail ) => {
      console.log(fail);
    })
    
  };

  let isProtector = useSelector((state) => state.memberInfo.memberInfo.protector);
  if(isProtector){
    Swal.fire({
      icon: "warning",
      title: "권한이 없는 페이지입니다.",
      confirmButtonColor: `#ff0000`,
    }).then(function () {
      props.history.push(`/`)
    });
    return(
      <div></div>
    )
  }
  return (
    <Container style={{ padding: "50px" }}>
      <Row style={{ marginBottom: "40px"}}>
        <h2>
          {name}님을 가족으로 수락하시겠습니까?<br></br>
          {number}
        </h2>
      </Row>
      <Button className="activebtn" onClick={onSubmityes} size="lg" style={{ width: "70%", marginBottom: "40px"}}>
        네
      </Button>
      <br></br>
      <Button className="unactivebtn" onClick={onSubmitno} size="lg" style={{ width: "70%"}}>
        아니오
      </Button>
    </Container>
  );
}

export default FamilyRegisterReply;
