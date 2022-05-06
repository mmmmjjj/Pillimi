/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Button, Modal } from "reactstrap";

import PillDetailCSS from "./css/PillDetail.module.css";
import Header from "components/Headers/Header";
import { getPillInfo } from "../../api/pill.js";

function PillDetail({ match }) {
  const pillSeq = match.params.pillSeq;

  var temp = "";

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

  useEffect(() => {
    getPillDetail(pillSeq);
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

  const [registerPillModal, setRegisterPillModal] = React.useState(false);

  const familyName = ["김말자", "박옥자", "김싸피"];
  const whosePill = () => {
    const result = [];
    for (let i = 0; i < familyName.length; i++) {
      result.push(
        <span onClick={gotoPillRegister} className={PillDetailCSS.familyName} key={{ i }}>
          {familyName[i]}
        </span>
      );
      result.push(<br></br>);
    }
    return result;
  };

  return (
    <>
      <Header header="알약 정보"></Header>
      <br></br>
      <Button className={PillDetailCSS.AddBtn} onClick={() => setRegisterPillModal(true)}>
        추가
      </Button>
      <br></br>
      <br></br>
      <h3 style={{ textAlign: "center" }}>
        <img
          alt="pillImg"
          src="http://ticketimage.interpark.com/PlayDictionary/DATA/PlayDic/PlayDicUpload/040001/21/09/0400012109_168370_01.539.gif"
        ></img>
      </h3>
      <br></br>
      <div className={PillDetailCSS.Content}>
        <h3 className={PillDetailCSS.PillDetailTitle}>{pillInfo.name}</h3>
        <h3 className={PillDetailCSS.CompanyName}>{pillInfo.company}</h3>
        <br></br>
        <Label value={"효능"} content={pillInfo.effect}></Label>
        <Label value={"주의사항"} content={pillInfo.caution}></Label>
        <Label value={"복용방법"} content={pillInfo.dosage}></Label>
        <Label value={"유통기한"} content={pillInfo.validity}></Label>
        <Label value={"성분표"} content={pillInfo.ingredient}></Label>
      </div>

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
          <h3>누구의 약인가요?</h3> {whosePill()}
          <br></br>
          <br></br>
        </div>
      </Modal>
    </>
  );
}

function Label(params) {
  return (
    <>
      <div className={PillDetailCSS.Label}>{params.value}</div>
      <br></br>
      <div className={PillDetailCSS.LabelContent}>{params.content}</div>
      <br></br>
    </>
  );
}

function gotoPillRegister() {
  window.location.href = "/pill-detail";
}

export default PillDetail;
