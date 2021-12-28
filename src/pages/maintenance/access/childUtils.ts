export const getStatus = (val) => {
  if (val === "START") {
    return "就绪";
  } else if (val === "STARTING") {
    return "启动中";
  } else if (val === "RUNNING") {
    return "运行中";
  } else if (val === "STOPPING") {
    return "停止中";
  } else if (val === "UNKNOW") {
    return "未知"
  } else {
    return "就绪"
  }
};

export const getColor = (val) => { 
  if (val === "RUNNING") {
    return "#07CE92";
  } else if (val === "START") {
    return "#FFF";
  } else if (val === "STARTING") {
    return "#0093ff";
  } else if (val === "STOPPING") {
    return "#FE536E";
  } else if (val === "UNKNOW") {
    return "#ffbf00"
  } else {
    return "#fff"
  }
};