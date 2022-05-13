/*eslint-disable*/
import {React, useEffect, useState} from "react";

// reactstrap components
import { Button, Container } from "reactstrap";
import MemberPillCheck from "../MemberPillCheck";
import style from "../css/MemberPillCheck.module.css"
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { getProtegeSeqAlarmDetail, deleteProtegeSeqAlarm } from "api/alarm";
import Swal from "sweetalert2";

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

  const gotoAlarmList = (event) => {
    // props.history.locaion.props.onClickHandler(false);
    deleteProtegeSeqAlarm(alarmSeq, (success) => {
      console.log(success);
      event.preventDefault();
      Swal.fire({
        icon: "success",
        title: "약 복용을 확인하셨습니다",
        confirmButtonColor: `#0369a1`,
      }).then(function () {
        props.history.replace(`/member-pill-page/member-pill-list/`+ alarm.protegeSeq)
      });
    }, (fail) => {
      console.log(fail);
    })
  }


  const PillList = () => {
    let result = [];
    if(alarm != null){
      alarm.medicineList.forEach(element => {
        result.push(
          <span key={element.medicineSeq}>
            {element.medicineName}({element.memberMedicineName})&nbsp;{element.memberMedicineCount}정
            <br></br>
          </span>
        )
      });
    }
    return result;
  }

  const IsCheckedPicture = () => {
    if(alarm==null) return <div></div>
      return(
        <div >
          <div className={`${style.checkAlarm} ${style.bold}`}>
            <span>({alarm.protegeName})님의 ({alarm.alarmTime})</span><br></br>
            <span>약 복용 사진입니다</span><br></br>
            <span>복용할 약이 맞다면 </span><br></br>
            <span><span className={`${style.blue}`}>확인</span> 버튼을 눌러주세요</span>
          </div>
          <Button color="sky" onClick={gotoAlarmList}>확인</Button>
        </div>
      )

  }

  return (
    <>
    <div className={`${style.whole}`}>
        
        <div  className={ `${style.center} ${style.backcolor}`}>
          <div className="pt-3">
            <span className={`${style.bold}`}>{alarm != null ? alarm.alarmDate : null}</span>
          </div>
          <div className={style.allcenter}>
            <img src={alarm!=null ? alarm.photoURL : ''} className={style.imgsize3}></img>
          </div>
          <div className={`${style.smaller}`}>
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
