/* eslint-disable no-loop-func */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, Fragment } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import PillTodayCSS from "./css/PillToday.module.css";
import { Button, Row, Col } from "reactstrap";
import style from "../Member/css/MemberPillCheck.module.css";

import { getMyFamily } from "../../api/family.js";
import { getPillToday, getMyPillToday } from "../../api/pill.js";
import Navbar from "layout/Navbar.js";
import Loading from "./Loading";

function PillToday() {
  const [familyList, setFamilyList] = useState([]);
  const [pillList, setPillList] = useState([]);
  const [pillListKey, setPillListKey] = useState([]);

  const myName = useSelector((state) => state.memberInfo.memberInfo.nickName);
  const isProtector = useSelector((state) => state.memberInfo.memberInfo.protector);

  let firstFamilySeq = "";
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [selectedFamily, setSelectedFamily] = useState();

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
        if (response.data.data.length !==0) {
          firstFamilySeq = response.data.data[0].memberSeq;
          setSelectedFamily(firstFamilySeq);
          getPillToday(
            firstFamilySeq,
            (response) => {
              setPillListKey(Object.getOwnPropertyNames(response.data.data));
              setPillList(response.data.data);
            },
            (error) => {
              console.log(error);
            }
          );
        }
        setLoading(false);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const getMyPillTodayList = () => {
    getMyPillToday(
      (response) => {
        setPillListKey(Object.getOwnPropertyNames(response.data.data));
        setPillList(response.data.data);
        setLoading(false);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const otherFamily = (memberSeq) => {
    setPillListKey([]);
    setPillList([]);
    getPillToday(
      memberSeq,
      (response) => {
        setPillListKey(Object.getOwnPropertyNames(response.data.data));
        setPillList(response.data.data);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const gotoPillTakePicture = (alarmSeq) => {
    history.push({
      pathname: `/member-pill-page/pill-take-picture/${alarmSeq}`,
    });
  };

  const ShowPillList = () => {
    let result = [];
    let itemLength = 0;
    let medicineName = "";
    let imageURL = "";
    let memberMedicineName = "";
    let taken = "";
    let hour = "";
    let min = "";
    let resultTime = "";

    if (pillListKey.length !== 0) {
      result.push(
        <Fragment key={`something`}>
          <h3 className={PillTodayCSS.MainText}>시간에 맞춰 복약하세요!</h3>
          <br></br>
        </Fragment>
      );
    } else {
      result.push(
        <Fragment key={`nothing`}>
          <h3 className={PillTodayCSS.MainText}>오늘 먹을 약이 없습니다</h3>
        </Fragment>
      );
    }

    pillListKey.forEach((element, index) => {
      if (pillListKey.length !== 0) {
        hour = "";
        min = "";
        resultTime = "";

        hour = element.split(" ")[0].split(":")[0];
        min = element.split(" ")[0].split(":")[1];

        if (hour < 12) {
          resultTime += "오전 ";
          if (hour < 10) {
            resultTime += hour.substring(1, 2);
          } else {
            resultTime += hour;
          }
          resultTime += "시 ";
        } else {
          resultTime += "오후 ";
          if (hour === "12") {
            resultTime += hour;
          } else {
            resultTime += hour - 12;
          }
          resultTime += "시 ";
        }

        if (min !== "00") {
          resultTime += min + "분";
        }

        result.push(
          <div key={`nothing${element}`} className={PillTodayCSS.WhiteBox}>
            <br></br>
            <h3 className={PillTodayCSS.TimeText}>{resultTime}</h3>
            <br></br>
          </div>
        );
        if (pillList.length !== 0) {
          itemLength = pillList[element].length;
          for (var i = 0; i < itemLength; i++) {
            medicineName = pillList[element][i].medicineName;
            imageURL = pillList[element][i].imageURL;
            memberMedicineName = pillList[element][i].memberMedicineName;
            result.push(
              <div
                key={medicineName + pillList[element][i].time}
                className={`d-flex align-items-center flex-row pl-3 pr-2 ${PillTodayCSS.WhiteBox} ${PillTodayCSS.ItemAlign}`}
              >
                <div className={`${style.imgsize2} ml-2`}>
                  {imageURL !== null ? (
                    <img src={imageURL} className={`${style.size}`} alt="pillImg"></img>
                  ) : (
                    <img src="../../../img/basic.png" alt="basic.png" style={{ borderRadius: `10px` }}></img>
                  )}
                </div>
                <div className="flex-fill" style={{paddingLeft: "20px"}}>
                  <span>{medicineName}</span>
                  <br></br>
                  <span>({memberMedicineName})</span>
                  <br></br>
                </div>
              </div>
            );

            if (i === itemLength - 1) {
              taken = pillList[element][0].taken;
              if (taken === true) {
                result.push(
                  <Fragment key={`button${pillList[element][i]}${element}${i}`}>
                    <div className={PillTodayCSS.WhiteBox}>
                      <br></br>
                      <br></br>
                      <Button className={PillTodayCSS.DoneBtn}>복용 완료</Button>
                      <br></br>
                    </div>
                  </Fragment>
                );
              } else if (taken === false) {
                if (isProtector === false) {
                  result.push(
                    <Fragment key={`22${element}`}>
                      <div className={PillTodayCSS.WhiteBox}>
                        <br></br>
                        <br></br>
                        <Button
                          onClick={() => gotoPillTakePicture(element.split(" ")[1])}
                          className={PillTodayCSS.PictureBtn}
                        >
                          사진 찍기
                        </Button>
                        <br></br>
                      </div>
                    </Fragment>
                  );
                } else {
                  result.push(
                    <div className={PillTodayCSS.WhiteBox} key={`br${element}`}>
                      <br></br>
                    </div>
                  );
                }
              }
            } else if (itemLength > 1) {
              result.push(
                <div className={PillTodayCSS.WhiteBackground} key={`white${element}`}>
                  <br></br>
                </div>
              );
            }
          }
        }
        result.push(
          <div className={PillTodayCSS.Background} key={`space${element}`}>
            &nbsp;
          </div>
        );
      } else {
        result.push(<Fragment key={`blank space`}></Fragment>);
      }
    });

    return result;
  };

  const FamilyName = () => {
    let result = [];
    if (familyList !== "") {
      familyList.forEach((element) => {
        result.push(
          <>
            <Col
              xs="3"
              key={element.memberSeq}
              className={`${PillTodayCSS.FamilyName} mb-3`}
              style={{ cursor: "pointer", display: "inline", padding: "0" }}
              onClick={() => otherFamily(element.memberSeq)}
            >
              <div style={{ display: "inlineBlock", justifyContent: "center" }}>
                {
                  selectedFamily === Number(element.memberSeq) ?
                  <img
                  style={{border:"3px solid #0369a1"}}
                  src={element.memberImage}
                  alt="memberImg"
                  className={PillTodayCSS.img}
                ></img>
                : <img
                  src={element.memberImage}
                  alt="memberImg"
                  className={PillTodayCSS.img}
                ></img>
                }
              </div>
              {selectedFamily === Number(element.memberSeq) ?
                <span style={{fontWeight:`bold`, color:"#0369a1"}}>{element.memberName}</span>
                : <span>{element.memberName}</span>
              }
            </Col>
          </>
        );
      });
    }
    return result;
  };

  const [showFamily, setShowFamily] = useState(false);
  const showFamilyList = () => {
    setShowFamily(!showFamily);
  };
  return (
    <>
      <div
        style={{
          backgroundColor: "#eaf0f8",
          width: "100vw",
          minHeight: "100vh",
          margin: "0 auto",
        }}
      >
        <div className={PillTodayCSS.Header}>
          <span className={PillTodayCSS.MemberName}>{myName}</span>
          { loading ? <Loading></Loading> : <></>}
          {isProtector ? (
            !showFamily ? (
              <i
                onClick={showFamilyList}
                className={`fa fa-thin fa-angle-down ml-2 pt-1 ${PillTodayCSS.MemberName}`}
              ></i>
            ) : (
              <i onClick={showFamilyList} className={`fa fa-thin fa-angle-up ml-2 pt-1 ${PillTodayCSS.MemberName}`}></i>
            )
          ) : (
            <></>
          )}
        </div>
        {showFamily ? (
          <Row style={{ justifyContent: "start" }} className={`${PillTodayCSS.Family} pl-3 pr-2`}>
            <FamilyName></FamilyName>
          </Row>
        ) : (
          <></>
        )}
        <br></br>
        {/* <h3 className={PillTodayCSS.MainText}>시간에 맞춰 복약하세요!</h3>
        <br></br> */}
        <ShowPillList></ShowPillList>
      </div>
      <Navbar navarray={[true,false,false,false]}/>
    </>
  );
}

export default PillToday;
