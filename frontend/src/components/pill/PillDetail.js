import React from "react";
import { Button, Modal } from "reactstrap";

import PillDetailCSS from "./css/PillDetail.module.css";
import Header from "components/Headers/Header";

function PillDetail() {
  React.useEffect(() => {}, []);

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
        <h3 className={PillDetailCSS.PillDetailTitle}>에이서캡슐(아세클로페낙)</h3>
        <h3 className={PillDetailCSS.CompanyName}>경동제약(주)</h3>
        <br></br>
        <Label value={"효능"} content={"류마티스관절염,강직척추염"}></Label>
        <Label value={"주의사항"} content={"위장관계 위험"}></Label>
        <Label value={"복용방법"} content={"이 약은 씹거나 부수지 말고 그대로 복용한다."}></Label>
        <Label value={"동시 복용 불가 약품"} content={"타이레놀"}></Label>
        <Label value={"성분표"} content={"아세클로페낙(EP) 100mg"}></Label>
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
