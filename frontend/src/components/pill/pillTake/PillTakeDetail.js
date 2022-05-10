import React, { useState } from "react";
import { Badge, Button, FormGroup } from "reactstrap";

// import moment from "moment";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import PillTakeRegisterCSS from "../css/PillTakeRegister.module.css";
import { getMemberMedicineInfo } from "../../../api/member.js";

//import PillDetailCSS from "../css/PillDetail.module.css";
import Header from "components/Headers/Header";

function PillTakeDetail({ match }) {
  const memberMedicineSeq = match.params.memberMedicineSeq;

  const [pillInfo, setPillInfo] = useState({
    medicineName: "",
    memberMedicineName: "",
    startDay: "",
    endDay: "",
    intakeDay: [],
    intakeTime: [],
    intakeCount: "",
    remarkContent: "",
    medicineSeq: "",
  });

  React.useEffect(() => {
    getMemberMedicineInfo(
      memberMedicineSeq,
      (response) => {
        if (response.status === 200) {
          setPillInfo(response.data.data);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }, [memberMedicineSeq]);

  const TakeDay = () => {
    let result = [];
    pillInfo.intakeDay.forEach((element) => {
      if (element === 1) {
        result.push(
          <>
            <Badge className={PillTakeRegisterCSS.Day} color="success">
              월
            </Badge>
          </>
        );
      }

      if (element === 2) {
        result.push(
          <>
            <Badge className={PillTakeRegisterCSS.Day} color="success">
              화
            </Badge>
          </>
        );
      }

      if (element === 3) {
        result.push(
          <>
            <Badge className={PillTakeRegisterCSS.Day} color="success">
              수
            </Badge>
          </>
        );
      }

      if (element === 4) {
        result.push(
          <>
            <Badge className={PillTakeRegisterCSS.Day} color="success">
              목
            </Badge>
          </>
        );
      }

      if (element === 5) {
        result.push(
          <>
            <Badge className={PillTakeRegisterCSS.Day} color="success">
              금
            </Badge>
          </>
        );
      }

      if (element === 6) {
        result.push(
          <>
            <Badge className={PillTakeRegisterCSS.Day} color="success">
              토
            </Badge>
          </>
        );
      }

      if (element === 7) {
        result.push(
          <>
            <Badge className={PillTakeRegisterCSS.Day} color="success">
              일
            </Badge>
          </>
        );
      }
    });

    return result;
  };

  const TakeTime = () => {
    let result = [];
    pillInfo.intakeTime.forEach((element) => {
      result.push(
        <>
          <Badge className={PillTakeRegisterCSS.BadgeTime} color="info" id="timeList">
            {element.substring(0, 5)}
          </Badge>
        </>
      );
    });

    return result;
  };

  //const [removePillModal, setRemovePillModal] = React.useState(false);
  const history = useHistory();
  const onSubmit = (event) => {
    event.preventDefault();
    Swal.fire({
      title: "에이서캡슐(아세클로페낙)을 정말 삭제하시겠습니까?",
      showCancelButton: true,
      confirmButtonColor: `#0369a1`,
      cancelButtonColor: "#d33",
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("삭제 완료!", "삭제가 완료 되었습니다.", "success").then(function (memberSeq) {
          //삭제할 함수 작성
          history.push(`/member-pill-page/member-pill-list/${memberSeq}`);
        });
        // .then((result) => {
        //   //삭제할 함수 작성
        //   history.push(`/member-pill-page/member-pill-list/1`)
        // });
      }
    });
  };

  // const onChangePillRegister = (e) => {
  //   if (moment.isMoment(e)) {
  //     setPillRegister({
  //       ...pillRegister,
  //       [e.name]: e._d,
  //     });
  //     console.log(pillRegister.time);
  //   } else {
  //     setPillRegister({
  //       ...pillRegister,
  //       [e.target.name]: e.target.value,
  //     });
  //   }
  // };

  return (
    <>
      <Header header="복용 약 상세"></Header>
      <br></br>
      <h3 className={PillTakeRegisterCSS.PillName}>{pillInfo.medicineName}</h3>
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
        <h5>{pillInfo.memberMedicineName}</h5>
        <br></br>
        <h3 className={PillTakeRegisterCSS.Label}>복용 시작 일자</h3>
        <h5>{pillInfo.startDay}</h5>
        <br></br>
        <h3 className={PillTakeRegisterCSS.Label}>복용 종료 일자</h3>
        <h5>{pillInfo.endDay}</h5>
        <br></br>
        <h3 className={PillTakeRegisterCSS.Label}>복용 요일</h3>
        <FormGroup className={PillTakeRegisterCSS.DayGroup}>
          <TakeDay></TakeDay>
        </FormGroup>
        <br></br>
        <div className="d-flex align-items-center">
          <h3
            className={`${PillTakeRegisterCSS.Label} flex-fill
        `}
          >
            복용 시간
          </h3>
        </div>
        <TakeTime></TakeTime>
        <br></br>
        <h3 className={PillTakeRegisterCSS.Label}>복용 개수</h3>
        <h5>{pillInfo.intakeCount}</h5>
        <br></br>
        <h3 className={PillTakeRegisterCSS.Label}>섭취 후 특이사항</h3>
        {pillInfo.remarkContent ? <h5>{pillInfo.remarkContent}</h5> : <h5>없음</h5>}
      </div>
      <br></br>
      <Button className={PillTakeRegisterCSS.ModifyBtn} onClick={gotoPillModify}>
        수정
      </Button>
      {/* <Button className={PillTakeRegisterCSS.RemoveBtn} onClick={() => setRemovePillModal(true)}>
        삭제
      </Button> */}
      <Button className={PillTakeRegisterCSS.RemoveBtn} onClick={onSubmit}>
        삭제
      </Button>
      <br></br>
      <br></br>
      <h3 className={PillTakeRegisterCSS.More} onClick={() => gotoPillDetail(pillInfo.medicineSeq)}>
        약 상세 정보 더보기
      </h3>
      <br></br>

      {/* <Modal
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
      </Modal> */}
    </>
  );
}

function gotoPillDetail(medicineSeq) {
  window.location.href = `/pill-detail/${medicineSeq}`;
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
