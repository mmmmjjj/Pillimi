/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";

import { useSelector } from "react-redux";
import PillTodayCSS from "./css/PillToday.module.css";
import { getMyFamily } from "../../api/family.js";
import { getPillToday, getMyPillToday } from "../../api/pill.js";
import style from "../Member/css/MemberPillCheck.module.css";

function PillToday() {
  const [familyList, setFamilyList] = useState([]);
  const [pillList, setPillList] = useState([]);
  const [pillListKey, setPillListKey] = useState([]);

  const myName = useSelector((state) => state.memberInfo.memberInfo.nickName);
  const isProtector = useSelector((state) => state.memberInfo.memberInfo.protector);

  let firstFamilySeq = "";

  useEffect(() => {
    if (isProtector === true) {
      getFamilyList();
    } else {
      getMyPillTodayList();
    }
  }, []);

  const getFamilyList = () => {
    getMyFamily(
      (response) => {
        setFamilyList(response.data.data);
        if (familyList !== "") {
          firstFamilySeq = response.data.data[0].memberSeq;
          getPillToday(
            firstFamilySeq,
            (response) => {
              console.log(response.data.data);
              setPillListKey(Object.getOwnPropertyNames(response.data.data));
              setPillList(response.data.data);
            },
            (error) => {
              console.log(error);
            }
          );
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const getMyPillTodayList = () => {
    getMyPillToday(
      (response) => {
        setPillList(response.data.data);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const otherFamily = (memberSeq) => {
    getPillToday(
      memberSeq,
      (response) => {
        console.log(response.data.data);
        setPillListKey(Object.getOwnPropertyNames(response.data.data));
        setPillList(response.data.data);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const ShowPillList = () => {
    let result = [];
    let itemLength = 0;
    let medicineName = "";
    let imageURL = "";
    let memberMedicineName = "";
    let taken = "";

    pillListKey.forEach((element, index) => {
      if (pillListKey.length !== 0) {
        result.push(
          <>
            <div className={PillTodayCSS.WhiteBox}>
              <br></br>
              <h3 className={PillTodayCSS.TimeText}>{element.split(" ")[0]}</h3>
              <br></br>
            </div>
          </>
        );
        if (pillList.length !== 0) {
          itemLength = pillList[element].length;

          for (var i = 0; i < itemLength; i++) {
            medicineName = pillList[element][i].medicineName;
            imageURL = pillList[element][i].imageURL;
            memberMedicineName = pillList[element][i].memberMedicineName;
            result.push(
              <>
                <div
                  className={`d-flex align-items-center flex-row pl-3 pr-2 ${PillTodayCSS.WhiteBox} ${PillTodayCSS.ItemAlign}`}
                >
                  <div className={`${style.imgsize2} ml-2`}>
                    <img src={imageURL} className={`${style.size}`} alt="pillImg"></img>
                  </div>
                  <div className="flex-fill">
                    <span>{medicineName}</span>
                    <br></br>
                    <span>({memberMedicineName})</span>
                    <br></br>
                  </div>
                </div>
              </>
            );

            if (i === itemLength - 1) {
              taken = pillList[element][0].taken;
              if (taken === true) {
                result.push(
                  <>
                    <br></br>
                    <br></br>
                    <Button className={PillTodayCSS.DoneBtn}>복용 완료</Button>
                    <br></br>
                  </>
                );
              } else if (taken === false) {
                result.push(
                  <>
                    <div className={PillTodayCSS.WhiteBox}>
                      <br></br>
                      <br></br>
                      <Button className={PillTodayCSS.PictureBtn}>사진 찍기</Button>
                      <br></br>
                    </div>
                  </>
                );
              }
            }
          }
        }
      }

      result.push(
        <>
          <div className={PillTodayCSS.Background}>&nbsp;</div>
        </>
      );
    });

    return result;
  };

  // const ShowPillList = () => {
  //   let result = [];
  //   let itemLength = 0;

  //   pillListKey.forEach((element, index) => {
  //     if (pillListKey.length !== 0) {
  //       if (pillList.length !== 0) {
  //         itemLength = pillList[element].length;

  //         let medicineName = pillList[element][0].medicineName;
  //         let imageURL = pillList[element][0].imageURL;
  //         let memberMedicineName = pillList[element][0].memberMedicineName;
  //         result.push(
  //           <>
  //             <div>
  //               <div className={PillTodayCSS.WhiteBox}>
  //                 <br></br>
  //                 <h3 className={PillTodayCSS.TimeText}>{element.split(" ")[0]}</h3>
  //                 <img className={PillTodayCSS.Img} src={imageURL} alt="pillImg"></img>
  //                 <span className={PillTodayCSS.TimeText}>{medicineName}</span>
  //                 <div>{memberMedicineName}</div>
  //                 {/* 로그인한 사용자가 피보호자일 때 */}
  //                 <br></br>
  //                 <br></br>
  //                 <Button className={PillTodayCSS.DoneBtn}>복용 완료</Button>
  //                 {/*  */}
  //                 <br></br>
  //               </div>
  //               <br></br>
  //             </div>
  //           </>
  //         );
  //       }
  //     }
  //   });

  //   return result;
  // };

  const FamilyName = () => {
    let result = [];
    if (familyList !== "") {
      familyList.forEach((element) => {
        result.push(
          <>
            <div style={{ cursor: "pointer" }} onClick={() => otherFamily(element.memberSeq)}>
              <div>
                <img src={element.memberImage} alt="memberImg" className={PillTodayCSS.img}></img>
              </div>
              <div>{element.memberName}</div>
            </div>
          </>
        );
      });
    }
    return result;
  };

  return (
    <>
      <div className={PillTodayCSS.Whole}>
        <div className={PillTodayCSS.Header}>
          {/* 로그인한 사용자가 보호자일 때 */}
          <span className={PillTodayCSS.MemberName}>{myName}</span>
          <span className={PillTodayCSS.Icon}>
            <i className={"now-ui-icons ui-1_bell-53"}></i>
          </span>
          {/* 로그인한 사용자가 피보호자일 때 */}
          {/* <span className={PillTodayCSS.Icon}>
            <i className={"now-ui-icons ui-1_bell-53"}></i>
          </span> */}
        </div>
        {/* 로그인한 사용자가 보호자일 때 */}
        <div className={PillTodayCSS.Family}>
          <FamilyName></FamilyName>
          {/* <div>가족 이미지</div>
          <div>가족 이름</div> */}
        </div>
        {/*  */}
        <br></br>
        <br></br>
        <h3 className={PillTodayCSS.MainText}>시간에 맞춰 복약하세요!</h3>
        <br></br>
        <ShowPillList></ShowPillList>

        {/* <div className={PillTodayCSS.WhiteBox}>
          <br></br>
          <h3 className={PillTodayCSS.TimeText}>시간</h3>
          <span className={PillTodayCSS.Img}>이미지</span>
          <span className={PillTodayCSS.TimeText}>알약이름</span> */}
        {/* 로그인한 사용자가 피보호자일 때 */}
        {/* <br></br>
          <br></br>
          <Button className={PillTodayCSS.DoneBtn}>복용 완료</Button> */}
        {/*  */}
        {/* <br></br>
        </div> */}

        {/* <br></br>
        <div className={PillTodayCSS.WhiteBox}>
          <br></br>
          <h3 className={PillTodayCSS.TimeText}>시간</h3>
          <span className={PillTodayCSS.Img}>이미지</span>
          <span className={PillTodayCSS.TimeText}>알약이름</span> */}
        {/* 로그인한 사용자가 피보호자일 때 */}
        {/* <br></br>
          <br></br>
          <Button className={PillTodayCSS.PictureBtn}>사진 찍기</Button> */}
        {/*  */}
        {/* <br></br>
        </div> */}
      </div>
    </>
  );
}

export default PillToday;
