/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, Fragment } from "react";
import { useHistory } from "react-router-dom";

import { Button, Modal } from "reactstrap";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

import PillDetailCSS from "./css/PillDetail.module.css";
import Header from "components/Headers/Header";

import { getPillInfo } from "../../api/pill.js";
import { getMyFamily } from "../../api/family.js";
import { getMemberMedicineCheck } from "../../api/member.js";
import Navbar from "layout/Navbar.js";

function PillDetail(props) {
  const pillSeq = props.match.params.pillSeq;

  var temp = "";

  const [showByLink, setShowByLink] = useState();

  const [pillInfo, setPillInfo] = useState({
    image: "",
    name: "",
    company: "",
    effect: "",
    caution: "",
    dosage: "",
    validity: "",
    ingredient: "",
  });

  const [familyList, setFamilyList] = useState([]);
  const [registerPillModal, setRegisterPillModal] = React.useState(false);

  const history = useHistory();

  useEffect(() => {
    getPillDetail(pillSeq);
    getFamilyList();
  }, [pillSeq]);

  const getPillDetail = (pillSeq) => {
    getPillInfo(
      pillSeq,
      (response) => {
        for (let i = 0; i < response.data.data.ingredientList.length; i++) {
          temp += response.data.data.ingredientList[i];
          if (i !== response.data.data.ingredientList.length - 1) {
            temp += ", ";
          }
        }

        if (response.data.data.medicineDetail.effect.substring(0, 1) === "h") {
          setShowByLink(true);
        }

        setPillInfo({
          image: response.data.data.medicineDetail.image,
          name: response.data.data.medicineDetail.name,
          company: response.data.data.medicineDetail.company,
          effect: response.data.data.medicineDetail.effect,
          caution: response.data.data.medicineDetail.caution,
          dosage: response.data.data.medicineDetail.dosage,
          validity: response.data.data.medicineDetail.validity,
          ingredient: temp,
        });
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const getFamilyList = () => {
    getMyFamily(
      (response) => {
        setFamilyList(response.data.data);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const gotoPillRegister = (memberSeq) => {
    setRegisterPillModal(false);
    getMemberMedicineCheck(
      pillSeq,
      memberSeq,
      (response) => {
        if (response.data.data.checkType === 0) {
          history.push({
            pathname: `/pill-take`,
            state: {
              medicineSeq: pillSeq,
              medicineName: pillInfo.name,
              memberSeq: memberSeq,
            },
          });
        } else {
          if (response.data.data.checkType === 1) {
            Swal.fire({
              icon: "warning",
              title: "연령대 금기",
              html: response.data.data.checkDesc,
              confirmButtonText: "확인",
              confirmButtonColor: `#d33`,
            }).then(function () {});
          } else if (response.data.data.checkType === 2) {
            Swal.fire({
              icon: "warning",
              title: "효능군 주의",
              html: response.data.data.checkDesc,
              confirmButtonText: "확인",
              confirmButtonColor: `#d33`,
            }).then(function () {});
          } else if (response.data.data.checkType === 3) {
            Swal.fire({
              icon: "warning",
              title: "병용 금기",
              html: response.data.data.checkDesc,
              confirmButtonText: "확인",
              confirmButtonColor: `#d33`,
            }).then(function () {});
          }
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const FamilyName = () => {
    let result = [];
    familyList.forEach((element) => {
      result.push(
        <Fragment key={element.memberSeq}>
          <h4 style={{ margin: "0" }} onClick={() => gotoPillRegister(element.memberSeq)}>
            {element.memberName}
          </h4>
          <br></br>
        </Fragment>
      );
    });
    return result;
  };

  function Label(params) {
    return (
      <>
        <div className={PillDetailCSS.Label}>{params.value}</div>
        <br></br>
        <div className={PillDetailCSS.LabelContent}>
          <div>{params.content}</div>
        </div>
        <br></br>
      </>
    );
  }

  const ShowAlert = (link) => {
    Swal.fire({
      icon: "warning",
      text: "파일을 다운로드 하시겠습니까?",
      width: "80%",
      confirmButtonColor: `#0369a1`,
      confirmButtonText: "확인",
      cancelButtonText: "취소",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = link;
      }
    });
  };

  const Effect = (props) => {
    let result = [];

    if (props.effect === true) {
      result.push(
        <span style={{ cursor: "pointer" }} onClick={() => ShowAlert(pillInfo.effect)}>
          {pillInfo.effect}
        </span>
      );
    } else {
      result.push(<span>{pillInfo.effect}</span>);
    }

    return result;
  };

  const Caution = (props) => {
    let result = [];

    if (props.caution === true) {
      result.push(
        <span style={{ cursor: "pointer" }} onClick={() => ShowAlert(pillInfo.caution)}>
          {pillInfo.caution}
        </span>
      );
    } else {
      result.push(<span>{pillInfo.caution}</span>);
    }

    return result;
  };

  const Dosage = (props) => {
    let result = [];

    if (props.dosage === true) {
      result.push(
        <span style={{ cursor: "pointer" }} onClick={() => ShowAlert(pillInfo.dosage)}>
          {pillInfo.dosage}
        </span>
      );
    } else {
      result.push(<pre>{pillInfo.dosage}</pre>);
    }

    return result;
  };

  let isLogin = useSelector((state) => state.memberInfo.isLogin);
  if (!isLogin) {
    Swal.fire({
      icon: "warning",
      title: "로그인이 필요한 서비스입니다.",
      confirmButtonColor: `#ff0000`,
    }).then(function () {
      props.history.push(`/`);
    });
    return <div></div>;
  }
  return (
    <>
      <Header header="알약 정보" canBack={true}></Header>
      <br></br>
      <Button className={PillDetailCSS.AddBtn} onClick={() => setRegisterPillModal(true)}>
        추가
      </Button>
      <br></br>
      <br></br>
      <h3 style={{ textAlign: "center" }}>
        {pillInfo.image !== null ? (
          <img alt="pillImg" src={pillInfo.image}></img>
        ) : (
          <div>
            <div>
              <img alt="basic" src="../../../img/basic.png" style={{ width: `60%`, borderRadius: `10px` }}></img>
            </div>
            <span style={{ fontSize: `60%` }}>이미지 준비 중입니다.</span>
          </div>
        )}
      </h3>
      <br></br>
      <div className={PillDetailCSS.Content}>
        <h3 className={PillDetailCSS.PillDetailTitle}>{pillInfo.name}</h3>
        <h3 className={PillDetailCSS.CompanyName}>{pillInfo.company}</h3>
        <br></br>

        <div className={PillDetailCSS.Label}>효능</div>
        <br></br>
        <div className={PillDetailCSS.LabelContent}>
          <Effect effect={showByLink}></Effect>
        </div>
        <br></br>

        <div className={PillDetailCSS.Label}>주의사항</div>
        <br></br>
        <div className={PillDetailCSS.LabelContent}>
          <Caution caution={showByLink}></Caution>
        </div>
        <br></br>

        <div className={PillDetailCSS.Label}>복용방법</div>
        <br></br>
        <div className={PillDetailCSS.LabelContent}>
          <Dosage dosage={showByLink}></Dosage>
        </div>
        <br></br>

        <Label value={"유통기한"} content={pillInfo.validity}></Label>
        <Label value={"성분표"} content={pillInfo.ingredient}></Label>
      </div>
      <Navbar navarray={[false,true,false,false]}/>

      <Modal
        centered
        isOpen={registerPillModal}
        className="modal-sm"
        modalClassName="bd-example-modal-sm"
        toggle={() => setRegisterPillModal(false)}
      >
        <div className="modal-header">
          <h4 className="modal-title" id="mySmallModalLabel">
            <br></br>
          </h4>
          <button
            aria-label="Close"
            className={`${PillDetailCSS.closeBtn} close`}
            type="button"
            onClick={() => setRegisterPillModal(false)}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <div className={`${PillDetailCSS.modalBody} modal-body`}>
          <h3 style={{ fontWeight: "bold" }}>누구의 약인가요?</h3>
          <FamilyName></FamilyName>
          <br></br>
          <br></br>
        </div>
      </Modal>
    </>
  );
}

export default PillDetail;
