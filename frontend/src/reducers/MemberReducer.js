const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

const initialMemberInfo = {
  first: false,
  memberImage: "",
  memberSeq: 0,
  nickName: "",
};

const initialState = { isLogin: false, memberInfo: initialMemberInfo };

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLogin: true,
        memberInfo: action.memberInfo,
      };
    case LOGOUT:
      return {
        ...state,
        isLogin: false,
        memberInfo: initialState,
      };
    default:
      return state;
  }
};
