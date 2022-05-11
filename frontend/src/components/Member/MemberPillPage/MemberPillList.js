/*eslint-disable*/
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

// reactstrap components
import style from "../css/MemberPillCheck.module.css";
import { getMemberMedicineList } from "../../../api/member";
import PillTakeAlarm from "./PillTakeAlarm";
import { useSelector } from "react-redux";
import ProtectorTakeAlarm from "./ProtectorTakeAlarm";

// core components

function MemberPillList(props) {
  const memberSeq = props.match.params.memberSeq;
  const isProtector = useSelector((state) => state.memberInfo.memberInfo.protector);

  const [pills, setPills] = useState([]);

  const [rightTab, setRightTab] = useState(false);

  const onClickHandler = (state) => {
    setRightTab(state);
  };

  useEffect(() => {
    console.log("마운트");
    // console.log(match.params.memberSeq);
    getMediList();
  }, []);

  const getMediList = () => {
    getMemberMedicineList(
      memberSeq,
      (success) => {
        console.log(success);
        setPills(success.data.data);
      },
      (fail) => {
        console.log(fail);
      }
    );
  };

  const history = useHistory();

  const gotoMedicineDetail = (memMediSeq) => {
    history.push({
      pathname: `/pill-take/detail/${memMediSeq}`,
      state: {
        memberSeq: memberSeq,
      },
    });
  };

  const PillList = (props) => {
    let result = [];
    console.log(pills);
    pills.forEach((element) => {
      if (element.now == props.isNow) {
        result.push(
          <div
            className={`d-flex align-items-center flex-row pl-3 pr-2 ${style.checkAlarm2} `}
            onClick={() => gotoMedicineDetail(element.memberMedicineSeq)}
          >
            <div className={`${style.imgsize2} ml-2`}>
              <img src={element.imageURL} className={`${style.size}`}></img>
            </div>
            <div className="flex-fill">
              <span>{element.medicineName}</span>
              <br></br>
              <span>({element.memberMedicineName})</span>
              <br></br>
            </div>
          </div>
        );
      }
    });
    return result;
  };

  return (
    <>
      {rightTab ? (
        isProtector ? (
          <ProtectorTakeAlarm onClickHandler={onClickHandler} protegeSeq={memberSeq}></ProtectorTakeAlarm>
        ) : (
          <PillTakeAlarm onClickHandler={onClickHandler}></PillTakeAlarm>
        )
      ) : (
        <div className={`${style.center} ${style.whole}`}>
          <div className="d-flex">
            <div className="flex-fill pt-2 pb-2 pr-4 m-0 ">약</div>
            <div
              className="flex-fill pt-2 pb-2 border border-top-0 border-dark bg-white"
              onClick={() => onClickHandler(true)}
            >
              복용확인
            </div>
          </div>
          <div className="pt-4">
            <h5>현재 복용 중인 약</h5>
            <PillList isNow={true}></PillList>
          </div>
          <div className="pt-4">
            <h5>이전에 복용한 약</h5>
            <PillList isNow={false}></PillList>
          </div>
        </div>
      )}
    </>
  );
}

export default MemberPillList;
