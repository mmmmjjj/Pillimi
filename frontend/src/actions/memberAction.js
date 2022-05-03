const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

function loginAction(memberInfo) {
  console.log("loginAction 들어옴 : " + memberInfo.memberImage);
  return {
    type: LOGIN,
    memberInfo: memberInfo,
  };
}

function logoutAction() {
  return {
    type: LOGOUT,
    memberInfo: {},
  };
}

export { LOGIN, LOGOUT, loginAction, logoutAction };
