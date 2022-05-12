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
        protegeInfo: action.protegeInfo,
      };
    default:
      return state;
  }
};
