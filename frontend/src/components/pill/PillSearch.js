import React from "react";
import { Input, Button, Card } from "reactstrap";

import PillSearchCSS from "./PillSearch.module.css";

function PillSearch() {
  React.useEffect(() => {}, []);
  return (
    <>
      <br></br>
      <h3 className={PillSearchCSS.PillDetailTitle}>검색</h3>
      <div className={PillSearchCSS.Whole}>
        <hr></hr>
        <br></br>
        <Input className={PillSearchCSS.SearchInput} placeholder="검색어를 입력해주세요" type="text"></Input>
        <Button className={PillSearchCSS.SearchBtn}>검색</Button>
        <br></br>
        <Card className={PillSearchCSS.PillList} onClick={gotoPillDetail}>
          <div className="d-flex align-items-center">
            <img
              className={`${PillSearchCSS.Img}`}
              alt="pillImg"
              src="http://ticketimage.interpark.com/PlayDictionary/DATA/PlayDic/PlayDicUpload/040001/21/09/0400012109_168370_01.539.gif"
            ></img>
            <span className={`${PillSearchCSS.PillName} flex-fill`}>타이레놀정500mg</span>
            <i className={`now-ui-icons arrows-1_minimal-right`}></i>
          </div>
        </Card>
      </div>
    </>
  );
}

function gotoPillDetail() {
  window.location.href = "/pill-detail";
}

export default PillSearch;
