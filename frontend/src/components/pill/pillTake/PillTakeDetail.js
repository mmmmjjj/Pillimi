import React, { useState } from "react";
import { Badge, Button, FormGroup } from "reactstrap";

import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import PillTakeRegisterCSS from "../css/PillTakeRegister.module.css";
import { getMemberMedicineInfo, deleteMemberMedicine } from "../../../api/member.js";

import Header from "components/Headers/Header";

function PillTakeDetail(props) {
  const memberMedicineSeq = props.match.params.memberMedicineSeq;
  const memberSeq = props.history.location.state.memberSeq;

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
  }, [memberMedicineSeq, props]);

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

  const history = useHistory();
  const onSubmit = () => {
    // event.preventDefault();
    Swal.fire({
      title: `${pillInfo.medicineName}을 정말 삭제하시겠습니까?`,
      showCancelButton: true,
      confirmButtonColor: `#0369a1`,
      cancelButtonColor: "#d33",
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("isConfirmed");
        deleteMemberMedicine(
          memberMedicineSeq,
          memberSeq,
          (response) => {
            if (response.status === 200) {
              Swal.fire("삭제 완료!", "삭제가 완료 되었습니다.", "success").then(function () {
                history.push(`/member-pill-page/member-pill-list/${memberSeq}`);
              });
            }
          },
          (error) => {
            console.log(error);
          }
        );
      }
    });
  };

  const gotoPillModify = (memberMedicineSeq) => {
    history.push({
      pathname: `/pill-take/modify/${memberMedicineSeq}`,
      state: {
        info:pillInfo,
        memberSeq: memberSeq,
      },
    });
  };

  return (
    <>
      <Header header="복용 약 상세" canBack={true}></Header>
      <br></br>
      <h3 className={PillTakeRegisterCSS.PillName}>{pillInfo.medicineName}</h3>
      <div className={PillTakeRegisterCSS.Whole}>
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
      <Button className={PillTakeRegisterCSS.ModifyBtn} onClick={() => gotoPillModify(memberMedicineSeq)}>
        수정
      </Button>
      <Button className={PillTakeRegisterCSS.RemoveBtn} onClick={onSubmit}>
        삭제
      </Button>
      <br></br>
      <br></br>
      <h3 className={PillTakeRegisterCSS.More} onClick={() => gotoPillDetail(pillInfo.medicineSeq)}>
        약 상세 정보 더보기
      </h3>
      <br></br>
    </>
  );
}

function gotoPillDetail(medicineSeq) {
  window.location.href = `/pill-detail/${medicineSeq}`;
}

export default PillTakeDetail;
