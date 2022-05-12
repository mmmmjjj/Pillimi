const SETINFO = "setInfo";

const setProtegeInfoAction = (protegeInfo) => {
  return {
    type: SETINFO,
    protegeInfo: protegeInfo,
  };
}

export { SETINFO, setProtegeInfoAction }