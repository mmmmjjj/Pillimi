/*eslint-disable*/
import React from "react";

// reactstrap components
import style from "../css/MemberPillCheck.module.css"

// core components

function MemberPillList(props) {

  const array1 = [
    {
      name: "나제론오디정0.1mg",
      alias: "고혈압약",
      routineDate: [0,1,2,3,4,5,6],
      routineNumber: 1,
      routineTime: "19:00",
      img: "http://ticketimage.interpark.com/PlayDictionary/DATA/PlayDic/PlayDicUpload/040001/21/09/0400012109_168370_01.539.gif",
      isNow: true,
    },
    {
      name: "나제론오디정0.1mg",
      alias: "고혈압약",
      routineDate: [0,3,6],
      routineNumber: 2,
      routineTime: "9:00",
      img: "http://ticketimage.interpark.com/PlayDictionary/DATA/PlayDic/PlayDicUpload/040001/21/09/0400012109_168370_01.539.gif",
      isNow: true,
    },
    {
      name: "타이레놀",
      alias: "두통약",
      routineDate: [0,1,4,5,6],
      routineNumber: 1,
      routineTime: "19:00",
      img: "http://ticketimage.interpark.com/PlayDictionary/DATA/PlayDic/PlayDicUpload/040001/21/09/0400012109_168370_01.539.gif",
      isNow: false,
    },
    {
      name: "나제론오디정0.1mg",
      alias: "고혈압약",
      routineDate: [0,3,4,6],
      routineNumber: 2,
      routineTime: "9:00",
      img: "http://ticketimage.interpark.com/PlayDictionary/DATA/PlayDic/PlayDicUpload/040001/21/09/0400012109_168370_01.539.gif",
      isNow: false,
    }
  ];

  const RoutineDate = (props) => {
    let result = []
    console.log(props)
    if(props.value.length===7){
      result.push(<span>매일</span>)
    }else{
      let Week = ["월", "화", "수", "목", "금", "토", "일"];
      props.value.forEach(element=>{
        result.push(<span>{Week[element]}&nbsp;</span>)
      })
    }
    return result;
  }
  const PillList =  (props) => {
    let result = [];
    array1.forEach(element =>{
      if(element.isNow==props.isNow){
        console.log(element.type);
        result.push(<div className={`d-flex align-items-center flex-row pl-3 pr-2 ${style.checkAlarm2} `}>
          <div className={`${style.imgsize2} ml-2`}>
            <img src={element.img} className={`${style.size}`}></img>
          </div>
          <div className="flex-fill">
            <span>{element.name}</span><br></br>
            <span>({element.alias})</span><br></br>
            <span>
              <RoutineDate value={element.routineDate}></RoutineDate>
            </span>&nbsp;/&nbsp;
            <span>1회 {element.routineNumber}정</span>&nbsp;/&nbsp;
            <span>{element.routineTime}</span>
          </div>
        </div>)
      }
    })
    return result;
  };

  return (
    <>  
      <div className={`${style.center} ${style.whole}`}>
        <div className="d-flex">
          <div className="flex-fill pt-2 pb-2 pr-4 m-0 ">
            약
          </div>
          <div className="flex-fill pt-2 pb-2 border border-top-0 border-dark bg-white">
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
    </>
  )
}


export default MemberPillList;
