import React from "react";
import { Button } from "reactstrap";

import PillDetailCSS from "./css/PillDetail.module.css";
import Header from "components/Headers/Header";

function PillDetail() {
  React.useEffect(() => {}, []);
  return (
    <>
      <Header header="알약 정보"></Header>
      <br></br>
      <Button className={PillDetailCSS.AddBtn}>추가</Button>
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
        <h3 className={PillDetailCSS.PillDetailTitle}>에이서캡슐(아세클로페낙)</h3>
        <h3 className={PillDetailCSS.CompanyName}>경동제약(주)</h3>
        <br></br>
        <Label value={"효능"} content={"류마티스관절염,강직척추염"}></Label>
        <Label value={"주의사항"} content={"위장관계 위험"}></Label>
        <Label value={"복용방법"} content={"이 약은 씹거나 부수지 말고 그대로 복용한다."}></Label>
        <Label value={"동시 복용 불가 약품"} content={"타이레놀"}></Label>
        <Label value={"성분표"} content={"아세클로페낙(EP) 100mg"}></Label>
      </div>
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
