const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

function loginAction(memberInfo) {
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
