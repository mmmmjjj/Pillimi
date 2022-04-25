/*eslint-disable*/
import React, { useState } from "react";

// reactstrap components
import { Input, InputGroupAddon, InputGroupText, InputGroup } from "reactstrap";

// core components

function FamilyRegisterRequest() {
  const [phonenumber, setphonenumber] = useState("");
  const checknumber = (event) => {
    var str = event.currentTarget.value.replace(/[^0-9]/g, "");
    var tmp = "";
    if (str.substring(0, 2) == "02") {
        console.log(str.substring(0, 2))
        // 서울 전화번호일 경우 10자리까지만 나타나고 그 이상의 자리수는 자동삭제
        if (str.length < 3) {
          setphonenumber(str);
        } else if (str.length < 6) {
          tmp += str.substr(0, 2);
          tmp += '-';
          tmp += str.substr(2);
          setphonenumber("tmp");
        } else if (str.length < 10) {
          tmp += str.substr(0, 2);
          tmp += '-';
          tmp += str.substr(2, 3);
          tmp += '-';
          tmp += str.substr(5);
          setphonenumber(tmp);
        } else {
          tmp += str.substr(0, 2);
          tmp += '-';
          tmp += str.substr(2, 4);
          tmp += '-';
          tmp += str.substr(6, 4);
          setphonenumber(tmp);
        }
      } else {
        // 핸드폰 및 다른 지역 전화번호 일 경우
        console.log(str.substring(0, 2))
        if (str.length < 4) {
          setphonenumber(str);
        } else if (str.length < 7) {
          tmp += str.substr(0, 3);
          tmp += '-';
          tmp += str.substr(3);
          setphonenumber(tmp);
        } else if (str.length < 11) {
          tmp += str.substr(0, 3);
          tmp += '-';
          tmp += str.substr(3, 3);
          tmp += '-';
          tmp += str.substr(6);
          setphonenumber(tmp);
        } else {
          tmp += str.substr(0, 3);
          tmp += '-';
          tmp += str.substr(3, 4);
          tmp += '-';
          tmp += str.substr(7);
          setphonenumber(tmp);
        }
      }
  };
  //   const checknumber = (e) => {
  //     // const regex = /^[0-9\b -]{0,13}$/;
  //     console.log(e.target.value)
  //     if (regex.test(e.target.value)) {
  //       setInputValue(e.target.value);
  //     }
  //   };
  return (
    <>
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <i className="now-ui-icons users_circle-08"></i>
          </InputGroupText>
        </InputGroupAddon>
        <Input placeholder="성함" type="text"></Input>
      </InputGroup>
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <i className="now-ui-icons tech_mobile"></i>
          </InputGroupText>
        </InputGroupAddon>
        <Input
          placeholder="전화번호"
          type="text"
          onChange={checknumber}
          value={phonenumber}
          pattern="[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}"
          maxLength="13"
        ></Input>
      </InputGroup>
    </>
  );
}

export default FamilyRegisterRequest;
