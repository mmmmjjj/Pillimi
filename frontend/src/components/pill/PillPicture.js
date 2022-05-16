import React from "react";
import { Button } from "reactstrap";

import PillPictureCSS from "./css/PillPicture.module.css";
import Header from "components/Headers/Header";
import Navbar from "layout/Navbar.js";

function PillPicture() {
  React.useEffect(() => {}, []);
  return (
    <>
      <Header header="사진 찍기"  canBack={true}></Header>
      <div className={PillPictureCSS.Whole}>
        <br></br>
        <div className={PillPictureCSS.CameraArea}>
          <img
            className={PillPictureCSS.Img}
            alt="pillImg"
            src="http://ticketimage.interpark.com/PlayDictionary/DATA/PlayDic/PlayDicUpload/040001/21/09/0400012109_168370_01.539.gif"
          ></img>
          <div className={PillPictureCSS.IconArea}>
            <i className={`${PillPictureCSS.Camera} align-middle now-ui-icons media-1_camera-compact`}></i>
          </div>
        </div>
        <br></br>
        <br></br>
      </div>
      <div>
        <Button className={PillPictureCSS.SendBtn}>전송</Button>
      </div>
      <Navbar navarray={[false,false,false,false]}/>
    </>
  );
}

export default PillPicture;
