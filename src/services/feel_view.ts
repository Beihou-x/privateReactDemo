import { request } from "@/utils/request";
// import data from "../../public/config.json";
import { getUrl } from "@/utils/utils";

// const serverUrl = "http://192.168.1.240:11072";
const serverUrl = "";
const imgServiceUrl = getUrl().then((res) => {
  return res.imgServiceUrl;
});

const baseURLPath = "krakatoa/api/v2";
// 感知前端分布可视化  头部
export async function frontEndHead() {
  return request(`${serverUrl}${baseURLPath}/feel_before/header/search`, {
    method: "POST",
    body: {
    },
  });
}

// 感知前端分布 设备分布
export async function frontEndDevice() {
  return request(`${serverUrl}${baseURLPath}/feel_before/device_spread/search`, {
    method: "POST",
    body: {
    },
  });
}
// 感知前端分布 数据分布
export async function frontEndData() {
  return request(`${serverUrl}${baseURLPath}/feel_before/data_spread/search`, {
    method: "POST",
    body: {
    },
  });
}

// 感知前端分布 图片质量
export async function frontEndImgQuality() {
  return request(`${serverUrl}${baseURLPath}/feel_before/picture_good_quality_spread/search`, {
    method: "POST",
    body: {
    },
  });
}

// 感知前端分布 设备异常分布 地图
export async function unusualDevice(params) {
  return request(`${serverUrl}${baseURLPath}/feel_before/unusual_device_spread/search`, {
    method: "POST",
    body: {
      ...params
    },
  });
}
// 感知前端分布 地图各区域板块异常设备数
export async function areaUnusualDeviceNum(code) {
  return request(`${serverUrl}${baseURLPath}/feel_before/unusual_device_unit/search`, {
    method: "POST",
    body: {
      place_code: code
    },
  });
}

// 设备质量最优Top5
export async function deviceTop5(params) {
  return request(`${serverUrl}${baseURLPath}/feel_before/unusual_device_rank/search`, {
    method: "POST",
    body: {
      ...params
    },
  });
}


// 感知数据分布可视化 表头
export async function dataHead() {
  return request(`${serverUrl}${baseURLPath}/feel_data/header/search`, {
    method: "POST",
    body: {
    },
  });
}
// 感知数据分布可视化 今日上传部分
export async function dataTodayUpload() {
  return request(`${serverUrl}${baseURLPath}/feel_data/today_upload/search`, {
    method: "POST",
    body: {
    },
  });
}
// 感知数据分布可视化 近一周数据变化
export async function dataWeeklyChangeUpload() {
  return request(`${serverUrl}${baseURLPath}/feel_data/weekly_change/search`, {
    method: "POST",
    body: {
    },
  });
}
// 感知数据分布可视化 数据质量
export async function dataDataQuality() {
  return request(`${serverUrl}${baseURLPath}/feel_data/quality/search`, {
    method: "POST",
    body: {
    },
  });
}
// 感知数据分布可视化 数据异常TOP5
export async function dataDataAbnormalTop(params) {
  return request(`${serverUrl}${baseURLPath}/feel_data/abnormal/search`, {
    method: "POST",
    body: {
      ...params
    },
  });
}
