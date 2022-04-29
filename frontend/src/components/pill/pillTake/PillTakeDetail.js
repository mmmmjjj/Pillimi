import React, { useState } from "react";
import { Input, Badge, Button, Modal } from "reactstrap";
import Datetime from "react-datetime";

import PillTakeRegisterCSS from "../css/PillTakeRegister.module.css";
import PillDetailCSS from "../css/PillDetail.module.css";
import Header from "components/Headers/Header";

function PillTakeDetail() {
  React.useEffect(() => {}, []);

  const [removePillModal, setRemovePillModal] = React.useState(false);

  const [pillRegister, setPillRegister] = useState({
    nick: "",
    // startDate: "",
    // endDate: "",
    period: "",
    // time: "",
    volume: "",
    caution: "",
  });

  const { nick, startDate, endDate, period, time, volume, caution } = pillRegister;

  const [startDateValue, setstartDateValue] = useState("");
  const [endDateValue, setendDateValue] = useState("");
  const [timeValue, settimeValue] = useState([""]);
  var timeTemp = "";

  const onChangePillRegister = (e) => {
    setPillRegister({
      ...pillRegister,
      [e.target.name]: e.target.value,
    });
  };

  const onChange = (event) => {
    // console.log(event);
    // console.log(event._d);
    timeTemp = event.format("HH-mm-ss a");
    console.log(timeTemp);
    settimeValue(event._d);
    // setstartDateValue(event._d);
    // console.log(event);
    // setstartDateValue(event);
    // setstartDateValue(event.target);
    // setstartDateValue(event.target.value);
  };

  const timeList = () => {
    // return alert("temp");
  };

  return (
    <>
      <Header header="복용 약 상세"></Header>
      <br></br>
      <h3 className={PillTakeRegisterCSS.PillName}>에이서캡슐(아세클로페낙)</h3>
      <div className={PillTakeRegisterCSS.Whole}>
        {/* <Label content={"약 별칭"}></Label>
        <DateLabel content={"복용 시작 일자"}></DateLabel>
        <DateLabel content={"복용 종료 일자"}></DateLabel>
        <NumberLabel content={"복용 주기"}></NumberLabel>
        <TimeLabel content={"복용 시간"}></TimeLabel>
        <NumberLabel content={"복용 용량"}></NumberLabel>
        <Label content={"섭취 후 특이사항"}></Label> */}
        <br></br>
        <h3 className={PillTakeRegisterCSS.Label}>약 별칭</h3>
        <Input onChange={onChangePillRegister} name="nick" className={PillTakeRegisterCSS.Input} type="text"></Input>
        <br></br>
        <h3 className={PillTakeRegisterCSS.Label}>복용 시작 일자</h3>
        <Datetime
          // onChange={onChangePillRegister}
          value={startDateValue}
          // name="startDate"
          className={PillTakeRegisterCSS.Input}
          timeFormat={false}
          onChange={onChange}
        />
        {startDateValue}
        <br></br>
        <h3 className={PillTakeRegisterCSS.Label}>복용 종료 일자</h3>
        <Datetime
          // onChange={onChangePillRegister}
          // name="endDate"
          className={PillTakeRegisterCSS.Input}
          timeFormat={false}
          value={endDateValue}
          onChange={onChange}
        />
        <br></br>
        <h3 className={PillTakeRegisterCSS.Label}>복용 주기</h3>
        <Input
          onChange={onChangePillRegister}
          name="period"
          className={PillTakeRegisterCSS.Input}
          type="number"
        ></Input>
        <br></br>
        <div className="d-flex align-items-center">
          <h3
            className={`${PillTakeRegisterCSS.Label} flex-fill
        `}
          >
            복용 시간
          </h3>
          <i onClick={timeList()} className={`${PillTakeRegisterCSS.TimePlus} now-ui-icons ui-1_simple-add`}></i>
        </div>
        <Datetime
          // onChange={onChangePillRegister}
          // name="takeTime"
          className={PillTakeRegisterCSS.Input}
          dateFormat={false}
          onChange={onChange}
          viewMode="time"
        />{" "}
        <div id="timeList"></div>
        <Badge className={PillTakeRegisterCSS.Badge} color="info">
          9:00
        </Badge>
        <br></br>
        <h3 className={PillTakeRegisterCSS.Label}>복용 용량</h3>
        <Input
          onChange={onChangePillRegister}
          name="volume"
          className={PillTakeRegisterCSS.Input}
          type="number"
        ></Input>
        <br></br>
        <h3 className={PillTakeRegisterCSS.Label}>섭취 후 특이사항</h3>
        <Input onChange={onChangePillRegister} name="caution" className={PillTakeRegisterCSS.Input} type="text"></Input>
      </div>
      <br></br>
      <Button className={PillTakeRegisterCSS.ModifyBtn} onClick={gotoPillModify}>
        수정
      </Button>
      <Button className={PillTakeRegisterCSS.RemoveBtn} onClick={() => setRemovePillModal(true)}>
        삭제
      </Button>
      <br></br>
      <br></br>
      <h3 className={PillTakeRegisterCSS.More} onClick={gotoPillDetail}>
        약 상세 정보 더보기
      </h3>
      <br></br>

      <Modal
        centered
        isOpen={removePillModal}
        className="modal-sm"
        modalClassName="bd-example-modal-sm"
        toggle={() => setRemovePillModal(false)}
      >
        <div className="modal-header">
          <h4 className="modal-title" id="mySmallModalLabel">
            <br></br>
          </h4>
          <button
            aria-label="Close"
            className={`${PillDetailCSS.closeBtn} close`}
            type="button"
            onClick={() => setRemovePillModal(false)}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <div className={`${PillDetailCSS.modalBody_remove} modal-body`}>
          <h4>에이서캡슐(아세클로페낙)을 정말 삭제하시겠습니까?</h4>
          <br></br>
          <Button className={PillTakeRegisterCSS.RealRemoveBtn}>삭제</Button>
          <Button className={PillTakeRegisterCSS.CancelBtn} onClick={() => setRemovePillModal(false)}>
            취소
          </Button>
          <br></br>
        </div>
      </Modal>
    </>
  );
}

function gotoPillDetail() {
  window.location.href = "/pill-detail";
}

function gotoPillModify() {
  window.location.href = "/pill-take/modify";
}

// function Label(params) {
//   return (
//     <>
//       <br></br>
//       <h3 className={PillTakeRegisterCSS.Label}>{params.content}</h3>
//       {/* {(function () {
//         if (`${params.content}` === "약 별칭")
//           return (
//             <Input
//               onChange={PillTakeRegister.onChangePillRegister}
//               id="nick"
//               name="nick"
//               className={PillTakeRegisterCSS.Input}
//               type="text"
//             ></Input>
//           );
//         else
//           return (
//             <Input
//               onChange={PillTakeRegister.onChangePillRegister}
//               id="caution"
//               name="caution"
//               className={PillTakeRegisterCSS.Input}
//               type="text"
//             ></Input>
//           );
//       })()} */}
//       <h3 className={PillTakeRegisterCSS.Label}>{params.content}</h3>
//       <Input className={PillTakeRegisterCSS.Input} type="text"></Input>
//       <Input className={PillTakeRegisterCSS.Input} type="text"></Input>
//     </>
//   );
// }

// function DateLabel(params) {
//   return (
//     <>
//       <br></br>
//       <h3 className={PillTakeRegisterCSS.Label}>{params.content}</h3>
//       <Datetime className={PillTakeRegisterCSS.Input} timeFormat={false} />
//     </>
//   );
// }

// function TimeLabel(params) {
//   return (
//     <>
//       <br></br>
//       <div className="d-flex align-items-center">
//         <h3
//           className={`${PillTakeRegisterCSS.Label} flex-fill
//         `}
//         >
//           {params.content}
//         </h3>
//         <i className={`${PillTakeRegisterCSS.TimePlus} now-ui-icons ui-1_simple-add`}></i>
//       </div>
//       <Datetime className={PillTakeRegisterCSS.Input} dateFormat={false} />{" "}
//     </>
//   );
// }

// function NumberLabel(params) {
//   const [number, setNumber] = useState("");

//   const onChange = (e) => {
//     setNumber(e.target.value);
//   };

//   return (
//     <>
//       <br></br>
//       <h3 className={PillTakeRegisterCSS.Label}>{params.content}</h3>
//       <Input onChange={onChange} value={number} className={PillTakeRegisterCSS.Input} type="number"></Input>
//     </>
//   );
// }

export default PillTakeDetail;
