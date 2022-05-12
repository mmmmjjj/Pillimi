const SETINFO = "setInfo";

const initialProtegeInfo = {
  memberSeq: 0,
  nickName: "",
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialProtegeInfo, action) => {
  switch (action.type) {
    case SETINFO:
      return {
        ...state,
        memberSeq: action.protegeInfo.memberSeq,
        nickName: action.protegeInfo.nickName,
      };
    default:
      return state;
  }
};
