/*eslint-disable*/
import React, { useState, useEffect } from "react";

// reactstrap components
import { Row, Col, Container } from "reactstrap";
import style from "../css/MemberPillCheck.module.css";
import { AiOutlineCheckCircle } from "react-icons/ai";
import MemberPillPage from "../MemberPillPage";
import { getProtegeSeqAlarmList } from "api/alarm";

// core components

function ProtectorTakeAlarm(props) {
  const protegeSeq = props.protegeSeq;

  const [alarmList, setAlarmList] = useState([]);

  useEffect(() => {
    getAlarmList();
  }, []);

  const getAlarmList = () => {
    getProtegeSeqAlarmList(
      protegeSeq,
      (success) => {
        setAlarmList(success.data.data);
      },
      (fail) => {
        console.log(fail);
      }
    );
  };

  const timeFormat = (time) => {
    let temp = "";

    if (time.substring(0, 1) === "0") {
      temp = time.substring(1, 2);
    } else {
      temp = time.split(":")[0];
    }
    temp += "시 ";

    if (time.split(":")[1] !== 0) {
      temp += time.split(":")[1];
      temp += "분";
    }

    return temp;
  };

  const gotoAlarmDetail = (alarmSeq) => {
    window.location.href = `/member-pill-check/pill-picture-alarm/${alarmSeq}`;
  };

  const onClickHandler = (state) => {
    props.onClickHandler(state);
  };

  const AlarmsList = () => {
    let result = [];
    if (alarmList.length === 0) {
      <div key={`nothing`}></div>;
    }
    alarmList.forEach((element) => {
      console.log(element.type);
      let time = timeFormat(element.alarmTime);
      let titleTime = "";

      if (element.type === false) {
        result.push(
          <div
            key={element.alarmProtectorSeq}
            className={`${style.checkAlarm2}`}
            onClick={() => gotoAlarmDetail(element.alarmProtectorSeq)}
          >
            <div>
              <span className={`${style.bold}`}>{element.alarmDate}</span>
              <br></br>
            </div>
            <div className="d-flex align-items-center">
              <div className={`${style.imgsize} ml-2 flex-fill`}>
                <img src={element.photoURL}></img>
              </div>
              <div className="flex-fill">
                <span>
                  {element.protegeName}(님)의 {time}
                </span>
                <br></br>
                <span>약 복용 사진입니다.</span>
                <br></br>
                <span>확인 후 인증 버튼을 눌러주세요!</span>
                <br></br>
              </div>
            </div>
          </div>
        );
      } else {
        result.push(
          <div
            key={element.alarmProtectorSeq}
            className={`${style.checkAlarm2}`}
            onClick={() => gotoAlarmDetail(element.alarmProtectorSeq)}
          >
            <div>
              <span className={`${style.bold}`}>
                {element.alarmDate}&nbsp;{titleTime}
              </span>
              <br></br>
            </div>
            <span>
              {element.protegeName}(님)의 {time}
            </span>
            <br></br>
            <span>약 복용이 확인되셨습니다!</span>
            <br></br>
          </div>
        );
      }
    });
    return result;
  };

  return (
    <>
      <div className={`${style.center}`} style={{
          backgroundColor: "#eaf0f8",
          width: "100vw",
          minHeight: "100vh",
          margin: "0 auto",
        }}>
        <Row xs="2">
          <Col className="pt-2 pb-2 m-0 border border-top-0 border-dark bg-white" onClick={() => onClickHandler(false)}>
            약
          </Col>
          <Col className="pt-2 pb-2">복용확인</Col>
        </Row>
        <div className={`pt-3 mb-0 ${style.alarmDescript2}`}>
          <span className={`${style.alarmDescript}`}>💡 미확인 알람이 {alarmList.length}개 있습니다</span>
        </div>
        <div className={`pt-1`}>
          <AlarmsList />
        </div>
      </div>
    </>
  );
}

export default ProtectorTakeAlarm;
