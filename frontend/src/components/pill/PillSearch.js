/*eslint-disable*/
import React, { useState, useEffect } from "react";
import { Input, Button, Card } from "reactstrap";
import Swal from "sweetalert2";
import PillSearchCSS from "./css/PillSearch.module.css";
import Header from "components/Headers/Header";
import { getPillSearch } from "../../api/pill.js";
import { useInView } from "react-intersection-observer";
import { useSelector } from "react-redux";

function PillSearch() {
  const [keyword, setKeyword] = useState("");
  const [pillList, setPillList] = useState([]);
  const [datas, setDatas] = useState([]);
  const [scrollOptions, setScrollOptions] = useState(10);
  const { ref, inView } = useInView();

  let isLogin = useSelector((state) => state.memberInfo.isLogin);

  if (!isLogin) {
    Swal.fire({
      icon: "warning",
      title: "로그인이 필요한 서비스입니다.",
      confirmButtonColor: `#ff0000`,
    }).then(function () {
      props.history.push(`/`);
    });
    return <div></div>;
  }

  useEffect(() => {
    if (inView) {
      setScrollOptions(scrollOptions + 20);
      // fetchMore({page});
    }
  }, [inView]);

  useEffect(() => {
    setDatas(pillList.slice(0, scrollOptions));
  }, [pillList, scrollOptions]);

  const onChangeKeyword = (e) => {
    setKeyword(e.target.value);
  };

  const onEnterKeyword = (e) => {
    if (e.key === "Enter") {
      goPillSearch();
    }
  };

  const goPillSearch = () => {
    setPillList([]);

    let regex = /([가-힣ㄱ-ㅎㅏ-ㅣ\x20])/i;
    if (keyword === "") {
      Swal.fire({
        icon: "warning",
        title: "검색할 글을 써주세요",
        confirmButtonColor: `#d33`,
      });
    } else if (!regex.test(keyword)) {
      Swal.fire({
        icon: "warning",
        title: "한글을 써주세요",
        confirmButtonColor: `#d33`,
      });
    } else if (regex.test(keyword)) {
      getPillSearch(
        keyword,
        async (response) => {
          setPillList(response.data.data);
          setKeyword("");
          if (response.data.data.length === 0) {
            Swal.fire({
              icon: "warning",
              title: "검색어에 해당하는 약이 없습니다",
              confirmButtonColor: `#d33`,
            });
          } else {
            ShowPillList();
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
  };

  const ShowPillList = () => {
    let result = [];
    if (datas.length !== 0) {
      datas.forEach((element) => {
        result.push(
          <Card
            id="pillListDiv"
            className={`${PillSearchCSS.PillList}`}
            onClick={() => gotoPillDetail(element.medicineSeq)}
          >
            <div className="d-flex align-items-center">
              <img className={`${PillSearchCSS.Img}`} alt="pillImg" src={element.medicineImage}></img>
              <span className={`${PillSearchCSS.PillName} flex-fill`}>{element.medicineName}</span>
              <i className={`now-ui-icons arrows-1_minimal-right`}></i>
            </div>
          </Card>
        );
      });
      result.push(
        <div ref={ref} style={{ color: `white` }}>
          &nbsp;
        </div>
      );
    } else {
      result.push();
    }

    return result;
  };

  React.useEffect(() => {
    ShowPillList();
  }, []);

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
        <Button className={PillSearchCSS.SearchBtn} onClick={() => goPillSearch()}>
          {" "}
          검색
        </Button>
        <br></br>
        <ShowPillList></ShowPillList>
      </div>
    </>
  );
}

function gotoPillDetail(pillSeq) {
  window.location.href = `/pill-detail/${pillSeq}`;
}

export default PillSearch;
