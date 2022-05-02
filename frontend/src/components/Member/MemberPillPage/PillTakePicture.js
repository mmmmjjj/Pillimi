/*eslint-disable*/
import React from "react";
import { Button } from "reactstrap";

// reactstrap components
import style from "../css/MemberPillCheck.module.css"

// core components

function PillTakePicture(props) {

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
      name: "타이레놀",
      alias: "두통약",
      routineDate: [0,1,4,5,6],
      routineNumber: 1,
      routineTime: "19:00",
      img: "http://ticketimage.interpark.com/PlayDictionary/DATA/PlayDic/PlayDicUpload/040001/21/09/0400012109_168370_01.539.gif",
      isNow: false,
    },
    
  ];

  const PillImageList =  (props) => {
    let result = [];
    array1.forEach(element =>{
      result.push(<div className={`${style.size2} mr-5`}>
        <img src={element.img} className={`pt-4 ${style.imgsize3}`}></img>
      </div>)
      
    })
    return result;
  };

  return (
    <>  
      <div className={`${style.center} ${style.whole}`}>
        <div className="d-flex justify-content-center pl-4 pt-3 flex-wrap">
          <PillImageList></PillImageList>
        </div>
        <div className={`${style.bottom}`}>
          <Button color="success" className={`${style.bigbnt}`}>사진 찍기</Button>
        </div>
      </div>
    </>
  )
}


export default PillTakePicture;
