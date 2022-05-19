import React, { useEffect, useState } from "react";
import { Row, Col, ListGroup, ListGroupItem, Modal } from "reactstrap";
import "../familycss.css";
import { getMyFamily } from "../../../api/family";
import { useDispatch } from "react-redux";
import { setProtegeInfoAction } from "actions/protegeAction";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

function FamilyProtector(props) {
  const [modalbool, setmodalbool] = useState(false);
  const [modalnum, setModalNum] = useState(-1);
  const [modalName, setModalName] = useState("");

  const toggle = (num, str) => {
    setModalNum(num);
    setModalName(str);
    setmodalbool(!modalbool);
  };
  // const [FamilyData, setFamilyData] = useState([])
  const getFamilyData = () => {
    getMyFamily();
  };

  useEffect(() => {
    getFamilyData();
  });

  useEffect(() => {
    props.getnavbar(true);
    getFamilyList();
  }, [props]);

  const [familyList, setFamilyList] = useState([]);

  const getFamilyList = () => {
    getMyFamily(
      (success) => {
        setFamilyList(success.data.data);
      },
      (fail) => {
        console.log(fail);
      }
    );
  };

  const Family = () => {
    let result = [];
    if (familyList.length === 0) {
      result.push(<div key={`nothing`}>등록된 가족이 없습니다</div>);
    } else {
      familyList.forEach((element) => {
        result.push(
          <ListGroupItem
            onClick={(e) => {
              toggle(element.memberSeq, element.memberName, e);
            }}
            key={`fapro${element.memberSeq}`}
          >
            <Row xs="4">
              <Col>
                <img className="listimg" alt="" src={element.memberImage} />
              </Col>
              <Col xs={{ offset: 1, size: 8 }} className="listitemtext">
                <h3 className="familyh3">{element.memberName}</h3>
              </Col>
            </Row>
          </ListGroupItem>
        );
      });
    }
    return result;
  };

  const ProtegeModal = () => {
    return (
      <Modal isOpen={modalbool} toggle={(e) => toggle(-1, "", e)} centered>
        <Row style={{ padding: "20px", borderBottom: "1px solid black" }} onClick={gotoMemberInfoDetail}>
          <h3 className="familyh3">회원 정보</h3>
        </Row>
        <Row style={{ padding: "20px" }}>
          <h3 className="familyh3" onClick={gotoMedicineList}>
            약 관리
          </h3>
        </Row>
      </Modal>
    );
  };

  const dispatch = useDispatch();

  const gotoMemberInfoDetail = () => {
    window.location.href = `/member-info/member-info-detail/` + modalnum;
  };

  const gotoMedicineList = () => {
    dispatch(setProtegeInfoAction({ memberSeq: modalnum, nickName: modalName }));
    window.location.href = `/member-pill-page/member-pill-list/` + modalnum;
  };

  let isProtector = useSelector((state) => state.memberInfo.memberInfo.protector);
  if (!isProtector) {
    Swal.fire({
      icon: "warning",
      title: "권한이 없는 페이지입니다.",
      width: "80%",
      confirmButtonColor: `#ff0000`,
    }).then(function () {
      props.history.push(`/`);
    });
    return <div></div>;
  }

  const gotoFamilyRequest = () => {
    window.location.href = `/family/request`;
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
      </ListGroup>
      <ProtegeModal></ProtegeModal>
      {/* <i class="fa fa-light fa-circle-plus"></i>
      <i class="fa fa-regular fa-user-plus"></i>
      <i class="fa fa-solid fa-plus"></i> */}
      <div 
        style={{
          position: "absolute",
          // bottom: "17",
          color: "#0284C7",
          width: "100%"
        }}>
        <i 
          className="fa fa-solid fa-plus fa-3x" 
          style={{
            position: "absolute",
            left: "45%",
            clear:"both",
            padding: "0px",
            margin: "0px",
            cursor: "pointer",
          }}
          onClick={gotoFamilyRequest}
        ></i>
      </div>
    </div>
  );
}

export default FamilyProtector;
