import React from "react";
import { Button } from "reactstrap";

import PillDetailCSS from "./PillDetail.module.css";

function PillDetail() {
  React.useEffect(() => {}, []);
  return (
    <>
      <br></br>
      <h3 className={PillDetailCSS.PillDetailTitle}>알약 정보</h3>
      <hr></hr>
      <Button className={PillDetailCSS.AddBtn}>추가</Button>
      <br></br>
      <br></br>
      <h3 style={{ textAlign: "center" }}>이미지</h3>
      <br></br>
      <h3 className={PillDetailCSS.PillDetailTitle}>알약 이름</h3>
      <h3 className={PillDetailCSS.CompanyName}>회사 이름</h3>
      <br></br>
      <Label value={"효능"} content={"효능 내용"}></Label>
      <Label value={"주의사항"} content={"주의사항 내용"}></Label>
      <Label value={"복용방법"} content={"복용방법 내용"}></Label>
      <Label value={"동시 복용 불가 약품"} content={"동시 복용 불가 약품 내용"}></Label>
      <Label value={"성분표"} content={"성분표 내용"}></Label>
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

export default PillDetail;
