/*eslint-disable*/
import React, { useState, useRef, useEffect } from "react";
import { Camera } from "react-camera-pro";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import { addPillTakePicture } from "api/alarm";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

function Cameratest(props) {
  const cam = useRef();
  const [picimg, setImage] = useState();
  const [pic, setPicture] = useState(false);
  const alarmSeq = props.match.params.alarmSeq;

  const takepic = () => {
    setPicture(true);
  };
  const retry = () => {
    setPicture(false);
  };

  const history = useHistory();

  const sendImage = (event) => {
    let picimgData = picimg.split(",");
    let imgInfo = {
      alarmSeq: Number(alarmSeq),
      image: picimgData[1],
    };
    addPillTakePicture(
      imgInfo,
      (success) => {
        event.preventDefault();
        Swal.fire({
          icon: "success",
          text: "사진이 전송되었습니다.",
          width: "80%",
          confirmButtonColor: `#0369a1`,
        }).then(function () {
          history.push(`/pill-today`);
        });
      },
      (fail) => {
        console.log(fail);
      }
    );
  };

  useEffect(() => {
    props.getheader("사진 찍기");
    props.getnavbar(false);
  }, []);

  let isProtector = useSelector((state) => state.memberInfo.memberInfo.protector);
  if (isProtector) {
    Swal.fire({
      icon: "warning",
      title: "권한이 없는 페이지입니다.",
      confirmButtonColor: `#ff0000`,
    }).then(function () {
      props.history.push(`/`);
    });
    return <div></div>;
  }

  return (
    <>
      <div style={{ height: "40px" }}></div>
      {pic ? (
        <div style={{ width: "80%", margin: "auto" }}>
          <img src={picimg} alt="다시찍기를 눌러주세요" />
          <br />
          <Button className="activebtn" size="lg" onClick={sendImage}>
            전송하기
          </Button>
          <Button className="unactivebtn" size="lg" onClick={retry}>
            다시찍기
          </Button>
        </div>
      ) : (
        <div style={{ width: "80%", margin: "auto" }}>
          <Camera ref={cam} aspectRatio={2 / 3} facingMode={"environment"} />
          <Button
            className="activebtn"
            size="lg"
            onClick={() => {
              setImage(cam.current.takePhoto());
              takepic();
            }}
          >
            사진찍기
          </Button>
        </div>
      )}
    </>
  );
}

export default Cameratest;
