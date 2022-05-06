import React, { useState, useRef, useEffect } from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

function Cameratest2() {
  // const [picimg,setImage] = useState();
  const [pic, setPicture] = useState(false);
  const takepic = () => {
    setPicture(true);
  };
  const retry = () => {
    setPicture(false);
  };

  const videoRef = useRef(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: false,
      })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      });
  });

  return (
    <>
      <h2>test1</h2>
      {pic ? (
        <div style={{ width: "80%", margin: "auto" }}>
          <img
            src=""
            style={{ transform: "scaleX(-1)" }}
            alt="다시찍기를 눌러주세요"
          />
          <br />
          <Button className="activebtn" size="lg" onClick={retry}>
            전송하기
          </Button>
          <Button className="unactivebtn" size="lg" onClick={retry}>
            다시찍기
          </Button>
        </div>
      ) : (
        <div style={{ width: "80%", margin: "auto" }}>
          <video
            ref={videoRef}
            autoPlay
            style={{ width: "100%", objectFit: "fill" }}
          />
          <Button
            className="activebtn"
            size="lg"
            onClick={() => {
              //   setImage(cam.current.takePhoto());
              takepic();
            }}
          >
            사진찍기
          </Button>
        </div>
      )}
      <Link to="/family/camera">
        <Button>
          <p>Click Me!</p>
        </Button>
      </Link>
    </>
  );
}

export default Cameratest2;
