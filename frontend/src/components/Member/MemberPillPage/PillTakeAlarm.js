/*eslint-disable*/
import React from "react";

// reactstrap components
import style from "../css/MemberPillCheck.module.css";
import Navbar from "layout/Navbar.js";

// core components
function PillTakeAlarm(props) {
  const array1 = [
    {
      date: "2022-03-12",
      name: "김말자",
      time: "19시 12분",
      pill: ["고혈압 약", "당뇨 약"],
      type: false,
      img: "http://ticketimage.interpark.com/PlayDictionary/DATA/PlayDic/PlayDicUpload/040001/21/09/0400012109_168370_01.539.gif",
    },
    {
      date: "2022-03-12",
      name: "김말자",
      time: "9시 6분",
      pill: ["고혈압 약", "당뇨 약", "기침 약"],
      type: true,
      img: "http://ticketimage.interpark.com/PlayDictionary/DATA/PlayDic/PlayDicUpload/040001/21/09/0400012109_168370_01.539.gif",
    },
    {
      date: "2022-03-11",
      name: "김말자",
      time: "9시 6분",
      pill: ["고혈압 약"],
      type: false,
      img: "http://ticketimage.interpark.com/PlayDictionary/DATA/PlayDic/PlayDicUpload/040001/21/09/0400012109_168370_01.539.gif",
    },
  ];

  const onClickHandler = (state) => {
    props.onClickHandler(state);
  };

  const PillList = (props) => {
    let result = [];
    props.pills.forEach((element) => {
      result.push(<span key={element}>{element}</span>);
      result.push(<span key={`,${element}`}>, </span>);
      result.push(<span key={`nbsp${element}`}>&nbsp;</span>);
    });
    let spliceResult = result.splice(0, result.length - 2);
    return spliceResult;
  };

  const AlarmsList = () => {
    let result = [];
    array1.forEach((element) => {
      console.log(element.type);
      if (element.type === false) {
        console.log(true + " : " + element.time);
        result.push(
          <div className={`${style.checkAlarm2}`} key={element.date + element.img}>
            <div>
              <span className={`${style.bold}`}>{element.date}</span>
              <br></br>
            </div>
            <div className="d-flex align-items-center d-row">
              <div className={`${style.imgsize2} ml-2`}>
                <img src={element.img}></img>
              </div>
              <div className="flex-fill">
                <span>{element.time}</span>
                <br></br>
                <span>
                  <PillList pills={element.pill}></PillList>
                </span>
                <br></br>
                <span>드실 시간입니다!</span>
                <br></br>
              </div>
            </div>
          </div>
        );
      } else {
        console.log(false + " : " + element.time);
        result.push(
          <div className={`${style.checkAlarm2}`} key={element.time + element.img}>
            <div>
              <span className={`${style.bold}`}>{element.date}</span>
              <br></br>
            </div>
            <div className={`d-flex flex-row align-items-center d-row`}>
              <div className={`${style.imgsize2} ml-2`}>
                <img src={element.img}></img>
              </div>
              <div className="flex-fill">
                <span>{element.time}</span>
                <br></br>
                <span>
                  <PillList pills={element.pill}></PillList>
                </span>
                <br></br>
                <span>확인되셨습니다!</span>
                <br></br>
              </div>
            </div>
          </div>
        );
      }
    });
    return result;
  };

  return (
    <>
      <div className={`${style.center} ${style.whole}`}>
        <div className="d-flex">
          <div
            className="flex-fill pt-2 pb-2 pr-4 m-0 border border-top-0 border-dark bg-white"
            onClick={() => {
              onClickHandler(false);
            }}
          >
            약
          </div>
          <div className="flex-fill pt-2 pb-2">복용확인</div>
        </div>
        <div className={`pt-3 mb-0 ${style.alarmDescript2}`}>
          <span className={`${style.alarmDescript}`}>💡 미확인 알람이 {array1.length}개 있습니다</span>
        </div>
        <div className={`pt-1`}>
          <AlarmsList />
        </div>
      </div>
      <Navbar />
    </>
  );
}

export default PillTakeAlarm;
