import React, { useState } from "react";
import { Input, Badge, Button } from "reactstrap";
import Datetime from "react-datetime";
import moment from "moment";

import PillTakeRegisterCSS from "../css/PillTakeRegister.module.css";
import Header from "components/Headers/Header";

function PillTakeRegister() {
  React.useEffect(() => {}, []);

  const [pillRegister, setPillRegister] = useState({
    nick: "",
    startDate: "",
    endDate: "",
    period: "",
    time: "",
    volume: "",
    caution: "",
  });

  const onChangePillRegister = (e) => {
    if (moment.isMoment(e)) {
      if (e.name === "time") {
        setPillRegister({
          ...pillRegister,
          [e.name]: e.format("HH:mm a"),
        });
        console.log(pillRegister.time);
      } else {
        setPillRegister({
          ...pillRegister,
          [e.name]: e.format("YYYY/MM/DD"),
        });
        console.log(pillRegister.startDate);
      }
    } else {
      setPillRegister({
        ...pillRegister,
        [e.target.name]: e.target.value,
      });
    }
  };

  return (
    <>
      <Header header="복용 약 추가"></Header>
      <br></br>
      <h3 className={PillTakeRegisterCSS.PillName}>에이서캡슐(아세클로페낙)</h3>
      <div className={PillTakeRegisterCSS.Whole}>
        {/* <Label content={"약 별칭"}></Label>
        <DateLabel content={"복용 시작 일자"}></DateLabel>
        <DateLabel content={"복용 종료 일자"}></DateLabel>
        <NumberLabel content={"복용 주기"}></NumberLabel>
        <TimeLabel content={"복용 시간"}></TimeLabel>
        <NumberLabel content={"복용 용량"}></NumberLabel>
        <Label content={"섭취 후 특이사항"}></Label> */}
        <br></br>
        <h3 className={PillTakeRegisterCSS.Label}>약 별칭</h3>
        <Input onChange={onChangePillRegister} name="nick" className={PillTakeRegisterCSS.Input} type="text"></Input>
        <br></br>
        <h3 className={PillTakeRegisterCSS.Label}>복용 시작 일자</h3>
        <Datetime
          onChange={(e) => {
            e.name = "startDate";
            onChangePillRegister(e);
          }}
          value={pillRegister.startDate}
          name="startDate"
          className={PillTakeRegisterCSS.Input}
          timeFormat={false}
        />
        <br></br>
        <h3 className={PillTakeRegisterCSS.Label}>복용 종료 일자</h3>
        <Datetime
          onChange={(e) => {
            e.name = "endDate";
            onChangePillRegister(e);
          }}
          name="endDate"
          value={pillRegister.endDate}
          className={PillTakeRegisterCSS.Input}
          timeFormat={false}
        />
        <br></br>
        <h3 className={PillTakeRegisterCSS.Label}>복용 주기</h3>
        <Input
          onChange={onChangePillRegister}
          name="period"
          className={PillTakeRegisterCSS.Input}
          type="number"
        ></Input>
        <br></br>
        <div className="d-flex align-items-center">
          <h3
            className={`${PillTakeRegisterCSS.Label} flex-fill
        `}
          >
            복용 시간
          </h3>
          <i
            onClick={() => {
              if (pillRegister.time !== "") {
                var print = document.getElementById("timeList");
                var value = "";
                value += `<Badge className={PillTakeRegisterCSS.Badge} color="info">${pillRegister.time}</Badge>`;
                print.innerHTML = value;
              }
            }}
            className={`${PillTakeRegisterCSS.TimePlus} now-ui-icons ui-1_simple-add`}
          ></i>
        </div>
        <Datetime
          onChange={(e) => {
            e.name = "time";
            onChangePillRegister(e);
          }}
          name="time"
          value={pillRegister.time}
          className={PillTakeRegisterCSS.Input}
          dateFormat={false}
        />
        <Badge className={PillTakeRegisterCSS.Badge} color="info" id="timeList"></Badge>
        <br></br>
        <h3 className={PillTakeRegisterCSS.Label}>복용 용량</h3>
        <Input
          onChange={onChangePillRegister}
          name="volume"
          className={PillTakeRegisterCSS.Input}
          type="number"
        ></Input>
        <br></br>
        <h3 className={PillTakeRegisterCSS.Label}>섭취 후 특이사항</h3>
        <Input onChange={onChangePillRegister} name="caution" className={PillTakeRegisterCSS.Input} type="text"></Input>
      </div>
      <br></br>
      <br></br>
      <Button className={PillTakeRegisterCSS.DoneBtn}>완료</Button>
      <br></br>
      <br></br>
    </>
  );
}

// function Label(params) {
//   return (
//     <>
//       <br></br>
//       <h3 className={PillTakeRegisterCSS.Label}>{params.content}</h3>
//       {/* {(function () {
//         if (`${params.content}` === "약 별칭")
//           return (
//             <Input
//               onChange={PillTakeRegister.onChangePillRegister}
//               id="nick"
//               name="nick"
//               className={PillTakeRegisterCSS.Input}
//               type="text"
//             ></Input>
//           );
//         else
//           return (
//             <Input
//               onChange={PillTakeRegister.onChangePillRegister}
//               id="caution"
//               name="caution"
//               className={PillTakeRegisterCSS.Input}
//               type="text"
//             ></Input>
//           );
//       })()} */}
//       <h3 className={PillTakeRegisterCSS.Label}>{params.content}</h3>
//       <Input className={PillTakeRegisterCSS.Input} type="text"></Input>
//       <Input className={PillTakeRegisterCSS.Input} type="text"></Input>
//     </>
//   );
// }

// function DateLabel(params) {
//   return (
//     <>
//       <br></br>
//       <h3 className={PillTakeRegisterCSS.Label}>{params.content}</h3>
//       <Datetime className={PillTakeRegisterCSS.Input} timeFormat={false} />
//     </>
//   );
// }

// function TimeLabel(params) {
//   return (
//     <>
//       <br></br>
//       <div className="d-flex align-items-center">
//         <h3
//           className={`${PillTakeRegisterCSS.Label} flex-fill
//         `}
//         >
//           {params.content}
//         </h3>
//         <i className={`${PillTakeRegisterCSS.TimePlus} now-ui-icons ui-1_simple-add`}></i>
//       </div>
//       <Datetime className={PillTakeRegisterCSS.Input} dateFormat={false} />{" "}
//     </>
//   );
// }

// function NumberLabel(params) {
//   const [number, setNumber] = useState("");

//   const onChange = (e) => {
//     setNumber(e.target.value);
//   };

//   return (
//     <>
//       <br></br>
//       <h3 className={PillTakeRegisterCSS.Label}>{params.content}</h3>
//       <Input onChange={onChange} value={number} className={PillTakeRegisterCSS.Input} type="number"></Input>
//     </>
//   );
// }

export default PillTakeRegister;
