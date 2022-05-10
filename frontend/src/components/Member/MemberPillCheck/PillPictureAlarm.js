/*eslint-disable*/
import {React, useEffect, useState} from "react";

// reactstrap components
import { Button, Container } from "reactstrap";
import MemberPillCheck from "../MemberPillCheck";
import style from "../css/MemberPillCheck.module.css"
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { getProtegeSeqAlarmDetail } from "api/alarm";


// core components

function PillPictureAlarm(props) {

  const alarmSeq = props.match.params.alarmSeq;
  const [alarm, setAlarm] = useState();
  const [isChecked, setIsChecked] = useState(false)

  useEffect(() => {
    console.log("마운트");
    console.log(alarmSeq);
    getProtegeSeqAlarmDetail(alarmSeq, (success) => {
      console.log(success)
      setAlarm(success.data.data);
    }, (fail) =>{
      console.log(fail);
    })
  },[])


  const PillList = () => {
    let result = [];
    if(alarm != null){
      alarm.medicineList.forEach(element => {
        result.push(<span>{element.medicineName}({element.memberMedicineName})&nbsp;{element.memberMedicineCount}정<br></br></span>)
      });
    }
    return result;
  }

  const IsCheckedPicture = () => {
    if(alarm==null) return <div></div>
      return(
        <>
          <div className={`${style.checkAlarm} ${style.bold}`}>
            <span>({alarm.protegeName})님의 ({alarm.alarmTime})</span><br></br>
            <span>약 복용 사진입니다</span><br></br>
            <span>복용할 약이 맞다면 </span><br></br>
            <span><span className={`${style.blue}`}>확인</span> 버튼을 눌러주세요</span>
          </div>
          <Button color="sky" className="mr-5">확인</Button>
        </>
      )

  }

  return (
    <>
    <div className={`${style.whole}`}>
        
        <div  className={ `${style.center} ${style.backcolor}`}>
          <div className="pt-3">
            <span className={`${style.bold}`}>2022-04-12</span>
          </div>
          <div>
            <img src={alarm!=null ? alarm.photoURL : ''}></img>
          </div>
          <div className={`${style.smaller} mt-2`}>
            <span>복용시간 : 9시 00분</span>
            <br></br>
            <PillList></PillList>
          </div>
          <div className={`mt-3`}>
            <IsCheckedPicture></IsCheckedPicture>
          </div>
        </div>
      </div>
    </>
  )
}


export default PillPictureAlarm;
