/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";
import style from "../css/MemberPillCheck.module.css"
import { AiOutlineCheckCircle } from 'react-icons/ai';
import MemberPillPage from "../MemberPillPage";

// core components

function ProtectorTakeAlarm(props) {

  const array1 = [
    {
      date: "2022-03-12",
      name: "김말자",
      time: "19시 12분",
      type: false,
      img: "http://ticketimage.interpark.com/PlayDictionary/DATA/PlayDic/PlayDicUpload/040001/21/09/0400012109_168370_01.539.gif"
    },
    {
      date: "2022-03-12",
      name: "김말자",
      time: "9시 6분",
      type: true,
      img: "http://ticketimage.interpark.com/PlayDictionary/DATA/PlayDic/PlayDicUpload/040001/21/09/0400012109_168370_01.539.gif"

    }
  ];

  const AlarmsList =  () => {
    let result = [];
    array1.forEach(element =>{
      console.log(element.type);
      if(element.type===false){
        console.log(true + " : "+ element.time);
        result.push(<div className={`${style.checkAlarm2}`}>
          <div className={`${style.alarmDescript2} `}>
            <span className={`${style.bold}`}>{element.date}</span><br></br>
          </div>
          <div className="d-flex align-items-center">
            <div className={`${style.imgsize} ml-2 flex-fill`}><img src={element.img} ></img></div>
            <div className="flex-fill">
              <span>{element.name}(님)의 {element.time}</span><br></br>
              <span>약 복용 사진입니다.</span><br></br>
              <span>확인 후 인증 버튼을 눌러주세요!</span><br></br>
            </div>          
          </div>
        </div>);
      } else {
        console.log(false + " : "+ element.time);
        result.push(<div className={`${style.checkAlarm2}`}>
          <div className={`${style.alarmDescript2} `}>
            <span className={`${style.bold}`}>{element.date}</span><br></br>
          </div>
          <span>{element.name}(님)의 {element.time}</span><br></br>
          <span>약 복용이 확인되셨습니다!</span><br></br>
        </div>);
      };
    })
    return result;
  };

  return (
    <>  
      <MemberPillPage></MemberPillPage>
      <div className={`${style.center} ${style.whole}`}>
        <div className="d-flex">
          <div className="flex-fill pt-2 pb-2 pr-4 m-0 border border-top-0 border-dark bg-white">
            약
          </div>
          <div className="flex-fill pt-2 pb-2">
            복용확인
          </div>
        </div>
        <div className={`pt-3 mb-0 ${style.alarmDescript2}`}>
          <span className={`${style.alarmDescript}`}>💡 미확인 알람이 {array1.length}개 있습니다</span>
        </div>
        <div className={`pt-1`}>
          <AlarmsList />
        </div>
      </div>
    </>
  )
}


export default ProtectorTakeAlarm;
