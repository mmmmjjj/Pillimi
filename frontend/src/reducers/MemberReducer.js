const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

const initialMemberInfo = {
  first: false,
  memberImage: "",
  memberSeq: 0,
  nickName: "",
};

const initialState = { isLogin: false, memberInfo: initialMemberInfo };

// const initialState = {
//   isLogin: false,
//   memberInfo_first: false,
//   memberInfo_memberImage: "",
//   memberInfo_memberSeq: 0,
//   memberInfo_nickName: "",
// };

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  console.log("reducer 들어옴");
  switch (action.type) {
    case LOGIN:
      console.log(
        "loginReducer 들어옴 : " +
          action.memberInfo.first +
          " " +
          action.memberInfo.memberImage +
          " " +
          action.memberInfo.memberSeq +
          " " +
          action.memberInfo.nickName
      );
      return {
        ...state,
        isLogin: true,
        memberInfo: {
          first: true,
          memberImage: "http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg",
          memberSeq: 5,
          nickName: "최혜린",
        },
      };
    case LOGOUT:
      console.log("logoutReducer 들어옴 : " + action.memberInfo.first + " " + action.memberInfo.memberSeq);
      return {
        ...state,
        isLogin: false,
        memberInfo: initialState,
      };
    default:
      console.log("default 들어옴 : ");
      return state;
  }
};
