import React, { useState } from "react";
import { Input, Button, Card } from "reactstrap";

import PillSearchCSS from "./css/PillSearch.module.css";
import Header from "components/Headers/Header";
import { getPillSearch } from "../../api/pill.js";

function PillSearch() {
  const [keyword, setKeyword] = useState("");
  let pillList = [];

  const onChangeKeyword = (e) => {
    setKeyword(e.target.value);
  };

  const onEnterKeyword = (e) => {
    if (e.key === "Enter") {
      goPillSearch();
    }
  };

  React.useEffect(() => {}, []);
  return (
    <>
      <Header header="검색"></Header>
      <div className={PillSearchCSS.Whole}>
        <br></br>
        <Input
          className={PillSearchCSS.SearchInput}
          onChange={onChangeKeyword}
          onKeyPress={onEnterKeyword}
          placeholder="검색어를 입력해주세요"
          value={keyword}
          type="text"
        ></Input>
        <Button className={PillSearchCSS.SearchBtn} onClick={goPillSearch}>
          {" "}
          검색
        </Button>
        <br></br>
        <Card id="pillListDiv" className={PillSearchCSS.PillList} onClick={gotoPillDetail}>
          {/* <div className="d-flex align-items-center">
            <img
              className={`${PillSearchCSS.Img}`}
              alt="pillImg"
              src="http://ticketimage.interpark.com/PlayDictionary/DATA/PlayDic/PlayDicUpload/040001/21/09/0400012109_168370_01.539.gif"
            ></img>
            <span className={`${PillSearchCSS.PillName} flex-fill`}>타이레놀정500mg</span>
            <i className={`now-ui-icons arrows-1_minimal-right`}></i>
          </div> */}
        </Card>
      </div>
    </>
  );

  function goPillSearch() {
    if (keyword.length >= 2) {
      pillList = [];
      var print = document.getElementById("pillListDiv");
      var value = "";

      getPillSearch(keyword, (response) => {
        for (var i = 0; i < response.data.data.length; i++) {
          const tempImg = response.data.data[i].medicineImage;
          const tempSeq = response.data.data[i].medicineSeq;
          const tempName = response.data.data[i].medicineName;

          const tempInfo = {
            medicineImage: tempImg,
            medicineSeq: tempSeq,
            medicineName: tempName,
          };

          pillList.push(tempInfo);
          value += `<div className="d-flex align-items-center">
        <img
        id="pillImg"
        alt="pillImg"
        src="${pillList[i].medicineImage}"
      ></img><span className={\`\${PillSearchCSS.PillName} flex-fill\`}>${pillList[i].medicineName}</span>
      <i className={\`now-ui-icons arrows-1_minimal-right\`}></i></div>`;
        }
        console.log(value);
        print.innerHTML = value;
      });

      setKeyword("");
    } else {
      setKeyword("");
      alert("2글자 이상의 검색어를 입력해주세요");
    }
  }
}

function gotoPillDetail() {
  window.location.href = "/pill-detail";
}

export default PillSearch;
