import { request } from "@/utils/request";
// import data from "../../public/config.json";
import { getUrl } from "@/utils/utils";

// const serverUrl = "http://192.168.1.240:11072";
const serverUrl = "";
const imgServiceUrl = getUrl().then((res) => {
  return res.imgServiceUrl;
});

const baseURLPath = "krakatoa/api/v2";

// 头部接口
export async function access_cloud_head() {
    return request(`${serverUrl}${baseURLPath}/access_cloud/header/search`, {
      method: "POST",
      body: {
      },
    });
}
// 今日抓拍
export async function access_cloud_today_capture() {
  return request(`${serverUrl}${baseURLPath}/access_cloud/today_capture/search`, {
    method: "POST",
    body: {
    },
  });
}
// 各种卡口
export async function access_cloud_face_super_total() {
  return request(`${serverUrl}${baseURLPath}/access_cloud/face_super_total/search`, {
    method: "POST",
    body: {
    },
  });
}
// 中间link
export async function access_cloud_middle_link() {
  return request(`${serverUrl}${baseURLPath}/access_cloud/middle/search`, {
    method: "POST",
    body: {
    },
  });
}
// 区域设备情况(滚屏)
export async function access_cloud_unit_device() {
  return request(`${serverUrl}${baseURLPath}/performance_appraisal/search`, {
    method: "POST",
    body: {
      start_time: new Date(new Date().toLocaleDateString()).getTime().toString().slice(0,-3)
    },
  });
}
// 今日活跃率
export async function access_cloud_today_alive() {
  return request(`${serverUrl}${baseURLPath}/access_cloud/today_alive/search`, {
    method: "POST",
    body: {
    },
  });
}
// 近一周活跃率
export async function access_cloud_weekly_alive() {
  return request(`${serverUrl}${baseURLPath}/access_cloud/weekly_alive/search`, {
    method: "POST",
    body: {
    },
  });
}
// 各版块接入百分比
export async function access_cloud_access_percent() {
  return request(`${serverUrl}${baseURLPath}/access_cloud/access_num/search`, {
    method: "POST",
    body: {
    },
  });
}

// 今日质量
export async function access_cloud_today_qualiy() {
  return request(`${serverUrl}${baseURLPath}/access_cloud/quality/search`, {
    method: "POST",
    body: {
    },
  });
}
/**
 * 今日质量最差Top50
 * @returns 
 */
export async function access_cloud_quality_bad_fifty() {
  return request(`${serverUrl}${baseURLPath}/access_cloud/image_bad_quality/search`, {
    method: "POST",
    body: {
    },
  });
}

// 数据Schema
export async function data_schema_search() {
  return request(`${serverUrl}${baseURLPath}/access_cloud/data_schema/search`, {
    method: "POST",
    body: {
    },
  });
}


