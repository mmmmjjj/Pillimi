/*eslint-disable*/
import { getAlarmPillList } from "api/alarm";
import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";

// reactstrap components
import style from "../css/MemberPillCheck.module.css"

// core components

function PillTakePicture(props) {

  const alarmSeq = props.match.params.alarmSeq;

  const [pillList, setPillList] = useState([]);
  const [memberName, setMemberName] = useState('');

  useEffect(() => {
    getAlarmPillList(alarmSeq, (success) => {
      console.log(success.data.data);
      setPillList(success.data.data.pillList);
      setMemberName(success.data.data.nickName)
    }, (fail) => {
      console.log(fail);
    })
  },[])

  const gotoCamera = () => {
    console.log("hi")
    window.location.href = `/family/camera/${alarmSeq}`
  }

  const PillImageList =  (props) => {
    let result = [];
    let image = "https://nedrug.mfds.go.kr/pbp/cmn/itemImageDownload/150946223524600017"
    pillList.forEach(element =>{
      result.push(<div style={{width: `100%`}}>
        <img src={image} alt="약 사진" className={`pt-4 mr-4`} style={{width:`80%`}}></img>
        <div>
          <span><h5>{element.medicineName}</h5></span>
          <span><h5>{element.count} 개</h5></span>
        </div>
      </div>)
      
    })
    return result;
  };

  return (
    <>  
      <div className={`${style.center} ${style.whole}`}>
        <div className="pl-4 pt-3">
          <PillImageList></PillImageList>
        </div>
        <div className={`${style.bottom}`}>
          <Button color="success" className={`${style.bigbnt}`} onClick={gotoCamera}>사진 찍기</Button>
        </div>
      </div>
    </>
  )
}


export default PillTakePicture;
