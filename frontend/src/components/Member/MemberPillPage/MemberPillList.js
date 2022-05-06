/*eslint-disable*/
import React from "react";

// reactstrap components
import style from "../css/MemberPillCheck.module.css"

// core components

function MemberPillList(props) {
  
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
