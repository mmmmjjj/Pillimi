/*eslint-disable*/
import {React, useState} from "react";

// reactstrap components
import { Button, Container } from "reactstrap";
import MemberPillCheck from "../MemberPillCheck";
import style from "../css/MemberPillCheck.module.css"
import { AiOutlineCheckCircle } from 'react-icons/ai';


// core components

function PillPictureAlarm(props) {
  const pills = [
    {
      name: "나제론오디정0.1mg",
      alias: "고혈압 약",
      num: 2 
    },
    {
      name: "나제론오디정0.1mg",
      alias: "당뇨 약",
      num: 1
    }
  ]

  const [isChecked, setIsChecked] = useState(false);

  const onChangeIsChecked = () => {
    setIsChecked(!isChecked);
  }

  const PillList = () => {
    let result = [];
    pills.forEach(element => {
      result.push(<span>{element.name}({element.alias})&nbsp;{element.num}정<br></br></span>)
    });
    return result;
  }

  const IsCheckedPicture = () => {
    if(isChecked){
      return(
        <>
          <div className={`${style.checkAlarm} ${style.bold}`}>
            <span>(엄마)님께서 (9시 06분)</span><br></br>
            <span>약 복용이 확인되셨습니다.</span>
          </div>
          <Button color="sky">확인</Button>
        </>
      )
    }else{
      return(
        <>
          <div className={`${style.checkAlarm} ${style.bold}`}>
            <span>(엄마)님의 (19시 12분)</span><br></br>
            <span>약 복용 사진입니다</span><br></br>
            <span>복용할 약이 맞다면 </span><br></br>
            <span><span className={`${style.blue}`}>확인</span> 버튼을 눌러주세요</span>
          </div>
          <Button color="sky" onClick={onChangeIsChecked} className="mr-5">확인</Button>
          <Button>보류</Button>
        </>
      )
    }
  }

  return (
    <>
    <div className={`${style.whole}`}>
        
        <div  className={ `${style.center} ${style.backcolor}`}>
          <div className="pt-3">
            <span className={`${style.bold}`}>2022-04-12</span>
          </div>
          <div>
            <img src="http://ticketimage.interpark.com/PlayDictionary/DATA/PlayDic/PlayDicUpload/040001/21/09/0400012109_168370_01.539.gif"></img>
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
