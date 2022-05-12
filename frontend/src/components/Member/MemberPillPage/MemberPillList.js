// /*eslint-disable*/
// import React, { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";

// // reactstrap components
// import style from "../css/MemberPillCheck.module.css";
// import { getMemberMedicineList } from "../../../api/member";
// import PillTakeAlarm from "./PillTakeAlarm";
// import { useSelector } from "react-redux";
// import ProtectorTakeAlarm from "./ProtectorTakeAlarm";

// // core components

// function MemberPillList(props) {
//   const memberSeq = props.match.params.memberSeq;
//   const isProtector = useSelector((state) => state.memberInfo.memberInfo.protector);

//   const [pills, setPills] = useState([]);

//   const [rightTab, setRightTab] = useState(false);

//   const onClickHandler = (state) => {
//     setRightTab(state);
//   };

//   useEffect(() => {
//     console.log("마운트");
//     // console.log(match.params.memberSeq);
//     getMediList();
//   }, []);

//   const getMediList = () => {
//     getMemberMedicineList(
//       memberSeq,
//       (success) => {
//         console.log(success);
//         setPills(success.data.data);
//       },
//       (fail) => {
//         console.log(fail);
//       }
//     );
//   };

//   const history = useHistory();

//   const gotoMedicineDetail = (memMediSeq) => {
//     history.push({
//       pathname: `/pill-take/detail/${memMediSeq}`,
//       state: {
//         memberSeq: memberSeq,
//       },
//     });
//   };

//   const PillList = (props) => {
//     let result = [];
//     console.log(pills);
//     pills.forEach((element) => {
//       if (element.now == props.isNow) {
//         result.push(
//           <div
//             className={`d-flex align-items-center flex-row pl-3 pr-2 ${style.checkAlarm2} `}
//             onClick={() => gotoMedicineDetail(element.memberMedicineSeq)}
//           >
//             <div className={`${style.imgsize2} ml-2`}>
//               <img src={element.imageURL} className={`${style.size}`}></img>
//             </div>
//             <div className="flex-fill">
//               <span>{element.medicineName}</span>
//               <br></br>
//               <span>({element.memberMedicineName})</span>
//               <br></br>
//             </div>
//           </div>
//         );
//       }
//     });
//     return result;
//   };

//   return (
//     <>
//       {rightTab ? (
//         isProtector ? (
//           <ProtectorTakeAlarm onClickHandler={onClickHandler} protegeSeq={memberSeq}></ProtectorTakeAlarm>
//         ) : (
//           <PillTakeAlarm onClickHandler={onClickHandler}></PillTakeAlarm>
//         )
//       ) : (
//         <div className={`${style.center} ${style.whole}`}>
//           <div className="d-flex">
//             <div className="flex-fill pt-2 pb-2 pr-4 m-0 ">약</div>
//             <div
//               className="flex-fill pt-2 pb-2 border border-top-0 border-dark bg-white"
//               onClick={() => onClickHandler(true)}
//             >
//               복용확인
//             </div>
//           </div>
//           <div className="pt-4">
//             <h5>현재 복용 중인 약</h5>
//             <PillList isNow={true}></PillList>
//           </div>
//           <div className="pt-4">
//             <h5>이전에 복용한 약</h5>
//             <PillList isNow={false}></PillList>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default MemberPillList;






import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

// reactstrap components
import style from "../css/MemberPillCheck.module.css";
import { getMemberMedicineList } from "../../../api/member";
import PillTakeAlarm from "./PillTakeAlarm";
import { useSelector } from "react-redux";
import ProtectorTakeAlarm from "./ProtectorTakeAlarm";

// core components

function MemberPillList(props) {
  const memberSeq = props.match.params.memberSeq;
  const isProtector = useSelector((state) => state.memberInfo.memberInfo.protector);

  const [pills, setPills] = useState([]);

  const [rightTab, setRightTab] = useState(false);
  // const [datas, setDatas] = useState([]);
  const [tdatas, setTDatas] = useState([]);  //getMediList에서 엑시오스 연결을 할 때 tdatas에는 now가 true인 데이터만 뽑아서 넣는다.
  const [ttdatas, setTtDatas] = useState([]); //PillList에서 엑시오스에서 넘어온 모든 데이터를 반복하는게 아니라 true인 데이터만 돌려서 원하는 갯수만큼만 뽑는다.
  const [fdatas, setFDatas] = useState([]);  //getMediList에서 엑시오스 연결을 할 때 fdatas에는 now가 false인 데이터만 뽑아서 넣는다.
  const [ffdatas, setFfDatas] = useState([]); //PillList에서 엑시오스에서 넘어온 모든 데이터를 반복하는게 아니라 false인 데이터만 돌려서 원하는 갯수만큼만 뽑는다.
  const [tdropOptions, setTDropOptions] = useState(5);
  const [fdropOptions, setFDropOptions] = useState(5);

  useEffect(() => {
    setTtDatas(tdatas.slice(0, tdropOptions));
    setFfDatas(fdatas.slice(0, fdropOptions));
  }, [tdatas, fdatas, tdropOptions, fdropOptions]);

  const onClickHandler = (state) => {
    setRightTab(state);
  };

  useEffect(() => {
    console.log("마운트");
    // console.log(match.params.memberSeq);
    getMediList();
  });

  const onsubmitTbutton= () => {
    setTDropOptions(tdropOptions+10);
  }

  const onsubmitFbutton= () => {
    setFDropOptions(fdropOptions+10);
  }
  const getMediList = () => {
    getMemberMedicineList(
      memberSeq,
      (success) => {
        console.log(success);
        var bools = success.data.data
        setPills(bools);
        var isTrue =[];
        var isFalse = [];
        bools.forEach((element) => {
          if(element.now === true){
            isTrue.push(element);
          }else if (element.now === false){
            isFalse.push(element);
          }
        })
        setTDatas(isTrue);
        setFDatas(isFalse);
      },
      (fail) => {
        console.log(fail);
      }
    );
  };

  const history = useHistory();

  const gotoMedicineDetail = (memMediSeq) => {
    history.push({
      pathname: `/pill-take/detail/${memMediSeq}`,
      state: {
        memberSeq: memberSeq,
      },
    });
  };

  const PillList = (props) => {
    let result = [];
    console.log(pills);
      // if (element.now == props.isNow) {
      if (props.isNow === true) {
        ttdatas.forEach((element) => {
        result.push(
          <div
            className={`d-flex align-items-center flex-row pl-3 pr-2 ${style.checkAlarm2} `}
            onClick={() => gotoMedicineDetail(element.memberMedicineSeq)}
          >
            <div className={`${style.imgsize2} ml-2`}>
              <img src={element.imageURL} className={`${style.size}`} alt="이미지"></img>
            </div>
            <div className="flex-fill">
              <span>{element.medicineName}</span>
              <br></br>
              <span>({element.memberMedicineName})</span>
              <br></br>
            </div>
          </div>
        
        );
      });
      } else if(props.isNow === false) {
        ffdatas.forEach((element) => {
        result.push(
          <div
            className={`d-flex align-items-center flex-row pl-3 pr-2 ${style.checkAlarm2} `}
            onClick={() => gotoMedicineDetail(element.memberMedicineSeq)}
          >
            <div className={`${style.imgsize2} ml-2`}>
              <img src={element.imageURL} className={`${style.size}`} alt="이미지"></img>
            </div>
            <div className="flex-fill">
              <span>{element.medicineName}</span>
              <br></br>
              <span>({element.memberMedicineName})</span>
              <br></br>
            </div>
          </div>
        );
      });
      }
    return result;
  };

  return (
    <>
      {rightTab ? (
        isProtector ? (
          <ProtectorTakeAlarm onClickHandler={onClickHandler} protegeSeq={memberSeq}></ProtectorTakeAlarm>
        ) : (
          <PillTakeAlarm onClickHandler={onClickHandler}></PillTakeAlarm>
        )
      ) : (
        <div className={`${style.center} ${style.whole}`}>
          <div className="d-flex">
            <div className="flex-fill pt-2 pb-2 pr-4 m-0 ">약</div>
            <div
              className="flex-fill pt-2 pb-2 border border-top-0 border-dark bg-white"
              onClick={() => onClickHandler(true)}
            >
              복용확인
            </div>
          </div>
          <div className="pt-4">
            <h5>현재 복용 중인 약</h5>
            <PillList isNow={true}></PillList>
            <button onClick={onsubmitTbutton} className={style.buttoncolor}>더보기</button>
          </div>
          <div className="pt-4">
            <h5>이전에 복용한 약</h5>
            <PillList isNow={false}></PillList>
            <button onClick={onsubmitFbutton} className={style.buttoncolor}>더보기</button>
          </div>
        </div>
      )}
    </>
  );
}

export default MemberPillList;

