/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";
import style from "../css/MemberPillCheck.module.css"
import { AiOutlineCheckCircle } from 'react-icons/ai';
import MemberPillPage from "../MemberPillPage";

// core components

function MemberPillList(props) {

  const array1 = [
    {
      name: "나제론오디정0.1mg",
      alias: "고혈압약",
      routineDate: [0,1,2,3,4,5,6],
      routineNumber: 1,
      routineTime: "19:00",
      img: "http://ticketimage.interpark.com/PlayDictionary/DATA/PlayDic/PlayDicUpload/040001/21/09/0400012109_168370_01.539.gif"
    },
    {
      name: "나제론오디정0.1mg",
      alias: "고혈압약",
      routineDate: [0,3,6],
      routineNumber: 2,
      routineTime: "9:00",
      img: "http://ticketimage.interpark.com/PlayDictionary/DATA/PlayDic/PlayDicUpload/040001/21/09/0400012109_168370_01.539.gif"
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
  const PillList =  () => {
    let result = [];
    array1.forEach(element =>{
      console.log(element.type);
      result.push(<div className="d-flex align-items-center ">
        <div className={`${style.imgsize2} ml-2 flex-fill`}>
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
    })
    return result;
  };

  return (
    <>  
      <div className={`${style.center} ${style.whole}`}>
        <PillList></PillList>
      </div>
    </>
  )
}


export default MemberPillList;
