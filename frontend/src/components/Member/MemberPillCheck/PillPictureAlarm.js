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
      result.push(<p>{element.name}({element.alias})&nbsp;{element.num}정</p>)
    });
    return result;
  }

  const IsCheckedPicture = () => {
    if(isChecked){
      return(
        <>
          <div>
            <p>(엄마)님께서 (9시 06분) 약 복용이 확인되셨습니다.</p>
          </div>
          <Button color="sky">확인</Button>
        </>
      )
    }else{
      return(
        <>
          <div>
            <p>(엄마)님의 (19시 12분)</p>
            <p>약 복용 사진입니다</p>
            <p>올바른 사진이라면 확인 버튼을 눌러주세요</p>
          </div>
          <Button color="sky" onClick={onChangeIsChecked}>확인</Button>
          <Button>보류</Button>
        </>
      )
    }
  }

  return (
    <>
      <Container>
        <MemberPillCheck></MemberPillCheck>
        <div>
          <div>
            2022-04-12
          </div>
          <div>
            <img src="http://ticketimage.interpark.com/PlayDictionary/DATA/PlayDic/PlayDicUpload/040001/21/09/0400012109_168370_01.539.gif"></img>
            <p>복용시간 : <span>9시 00분</span></p>
            <PillList></PillList>
          </div>
          <div>
            <IsCheckedPicture></IsCheckedPicture>
          </div>
        </div>
      </Container>
    </>
  )
}


export default PillPictureAlarm;
