import { request } from "@/utils/request";
// import data from "../../public/config.json";
import { getUrl } from "@/utils/utils";
import { stringify } from "qs";

// const serverUrl = "http://192.168.1.240:11072";
const serverUrl = "";
const imgServiceUrl = getUrl().then(res => {
  return res.imgServiceUrl;
});

const baseURLPath = "krakatoa/api/v2";

// const baseURLPathThird = "/krakatoa/api/v2"
/**
 * 路由请求
 * */

export async function fetchRouter(params) {
  return request(`${baseURLPath}/router`, {
    method: "GET",
  });
}
export async function fetchRouter1(params) {
  return request(`${baseURLPath}/router_old`, {
    method: "GET",
  });
}

// 
export async function fetchPermissionRouter() {
  return request(`${baseURLPath}/user/router/search`, {
    method: "POST",
    body: {
    },
  });
}


// 项目名称
export async function getProjectName(params) {
  return request(`${baseURLPath}/project_name`, {
    method: "GET",
  });
}

/**
 * 查询分配设备
 * */
export async function accessDeviceDistribute(params) {
  return request(`${serverUrl}${baseURLPath}/access_device/distribute/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}

/**
 * 设备统计
 * */
export async function accessDeviceTotal(params) {
  return request(
    `${serverUrl}${baseURLPath}/access_device/function_type/total`,
    {
      method: "POST",
      body: {
        ...params,
      },
    }
  );
}
/**
 * 接入申请
 * */
export async function accessApply(params) {
  return request(`${serverUrl}${baseURLPath}/access_request/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
// 接入申请设备信息
export async function accessDeviceSearch(params) {
  return request(`${serverUrl}${baseURLPath}/access_device/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
// 接入申请服务信息
export async function accessServiceSearch(id) {
  return request(`${serverUrl}${baseURLPath}/access_service/${id}`, {
    method: "GET"
  });
}

// 保存分配服务
export async function saveServices(params) {
  return request(`${serverUrl}${baseURLPath}/access_service/batchAdd/${params.access_id}`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}

// 接入申请新增
export async function accessApplyAdd(params) {
  return request(`${serverUrl}${baseURLPath}/access_request`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
// 接入申请编辑 & 保存审核
export async function accessApplyEdit({ id, ...params }: any) {
  return request(`${serverUrl}${baseURLPath}/access_request/${id}`, {
    method: "PUT",
    body: {
      ...params,
    },
  });
}

// 接入申请导入
export async function accessDeviceUpload({ file }, id) {
  return request(`${serverUrl}${baseURLPath}/upload/accessDevice/${id}`, {
    method: "POST",
    body: file,
  });
}
// 接入申请删除
export async function accessApplyDelete(id) {
  return request(`${serverUrl}${baseURLPath}/access_request/${id}`, {
    method: "DELETE",
    body: {},
  });
}

// 获取一个接入申请信息
export async function getDetailInfo(params) {
  return request(`${serverUrl}${baseURLPath}/access_request/${params.id}`, {
    method: "GET",
  });
}

export async function accessExports({ name }, params) {
  return request(`${serverUrl}${baseURLPath}/download_access_request/${name}`, {
    method: "POST",
    body: {
      limit: 999,
      offset: 0,
      ...params
    },
  });
}

/**
 * 接入管理
 * */
export async function accessSearch(params) {
  return request(`${serverUrl}${baseURLPath}/device_access/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
// 接入管理>删除
export async function accessDelete(deviceId, accessId) {
  return request(`${serverUrl}${baseURLPath}/device_access/${deviceId}`, {
    method: "DELETE",
    body: {
      access_id: accessId,
    },
  });
}
// 接入管理 >新增
export async function accessAdd(params) {
  return request(`${serverUrl}${baseURLPath}/access_device`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
// 接入管理 > 详情 -标签信息
export async function accessDetailTag(device_id) {
  return request(`${serverUrl}${baseURLPath}/device_access/tag/search`, {
    method: "POST",
    body: {
      device_id: device_id,
    },
  });
}
// 获取设备字段描述
// export async function deviceDiscription(params) {
//   return request(`${serverUrl}${baseURLPath}/device/discription`, {
//     method: "POST",
//     body: {
//       ...params,
//     },
//   });
// }

// 获取设备正常异常数以及详细正常异常数
export async function deviceStatusCount(params) {
  return request(`${serverUrl}${baseURLPath}/device/status`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
//  一机一档统计接口
export async function deviceSyncCount(params) {
  return request(`${serverUrl}${baseURLPath}/device_sync/group/total`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}

// export async function accessDiscription(params) {
//   return request(`${serverUrl}${baseURLPath}/device/discription`, {
//     method: "POST",
//     body: {
//       ...params,
//     },
//   });
// }

export async function accessSearchOnce({ id }) {
  return request(`${serverUrl}${baseURLPath}/access_device/${id}`, {
    method: "GET",
  });
}

// export async function accessUpdate({ id, ...params }) {
//   return request(`${serverUrl}${baseURLPath}/device/${id}`, {
//     method: "PUT",
//     body: {
//       ...params,
//     },
//   });
// }

export async function accessExport() {
  return request(`${serverUrl}${baseURLPath}/download_source/sourceExcel`, {
    method: "POST",
    body: {
      category: "接入来源"
    },
  });
}
// 接入管理>检索
export async function accessUpload({ file }) {
  return request(`${serverUrl}${baseURLPath}/upload/device_search`, {
    method: "POST",
    body: file,
  });
}
// 接入管理 > 导入
export async function accessImport({ file }) {
  return request(`${serverUrl}${baseURLPath}/upload/accessManageDevice`, {
    method: "POST",
    body: file
  })
}
// 接入管理 > 导出
export async function accessManageExport(params) {
  return request(`${serverUrl}${baseURLPath}/download_access_request_manage/accessManageDevice`, {
    method: "POST",
    body: {
      limit: 999,
      offset: 0,
      ...params
    },
  });
}
// 导入 下载模板
export async function accessManageImportDownloadTemplate() {
  return request(`${serverUrl}${baseURLPath}/download_template/accessManageDevice`, {
    method: "POST",
    body: {},
  });
}
// 检索 下载模板
export async function accessManageSearchkDownloadTemplate() {
  return request(`${serverUrl}${baseURLPath}/download_template/AccessDeviceAdvancedSearch`, {
    method: "POST",
    body: {},
  });
}
// 报文查询 头部今日数据七天数据
export async function totalDaily(params) {
  return request(`${serverUrl}${baseURLPath}/device/total/daily`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
/**
 * 报文查询 头部今日数据七天数据 使用一期接口
 * @param params device_id, start_at, end_at
 * @returns 
 */
export async function totalDailyUseOne(params) {
  return request(`metrics/access_summary?${stringify(params)}`, {
    method: "GET",
  });
}

export async function inspection(params) {
  return request(`${serverUrl}${baseURLPath}/device/sample`, {
    method: "POST",
    body: {
      ...params,
      limit: 10,
      offset: 0,
      orderby: "request_at desc"
    },
  });
}

export async function deviceTotalGraph(params) {
  return request(`${serverUrl}${baseURLPath}/device/graph`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}

/**
 * 接入测试
 * */

/**
 * 报文查询
 * */
// 报文查询 > 人像上传
// export async function messageCheckhumanImg(start, end, device_id,objs) {
//   return request(
//     `${serverUrl}${baseURLPath}/image_detect_summary/daily/total`,
//     {
//       method: "POST",
//       body: {
//         start: start,
//         end: end,
//         device_id:device_id,
//         objects: objs
//       },
//     }
//   );
// }
/**
 * 报文查询人像上传车辆上传,调用一期接口
 * @param params device_id,start,end,period,group_by
 * @returns 
 */
export async function messageCheckhumanImg(params) {
  return request(`metrics/upload/summary?${stringify(params)}`, {
    method: "GET",
  });
}




/**
 * 服务器
 * */
export async function serverSearch(params) {
  return request(`${serverUrl}${baseURLPath}/server/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}

export async function serverDiscription(params) {
  return request(`${serverUrl}${baseURLPath}/server/discription`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}

export async function serverAdd(params: any) {
  return request(`${serverUrl}${baseURLPath}/server`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}

export async function serverUpdate({ id, ...params }: any) {
  return request(`${serverUrl}${baseURLPath}/server/${id}`, {
    method: "PUT",
    body: {
      ...params,
    },
  });
}

export async function serverSearchOnce({ id }) {
  return request(`${serverUrl}${baseURLPath}/server/${id}`, {
    method: "GET",
  });
}

export async function serverDelete({ id }) {
  return request(`${serverUrl}${baseURLPath}/server/${id}`, {
    method: "DELETE",
    body: {},
  });
}

//服务器管理导出（集群管理-节点管理）
export async function serverExport({ name }) {
  return request(`${serverUrl}${baseURLPath}/download_server/${name}`, {
    method: "POST",
    body: {},
  });
}

/**
 * 服务详细信息
 * */
export async function serviceSelectSearch(params) {
  return request(`${serverUrl}${baseURLPath}/service/select/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
/**
 * 服务管理
 * */
export async function serviceSearch(params) {
  return request(`${serverUrl}${baseURLPath}/service/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}

//服务管理新增
export async function serviceAdd(params) {
  return request(`${serverUrl}${baseURLPath}/service`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
//服务管理更新修改
export async function serviceUpdate(id, params) {
  return request(`${serverUrl}${baseURLPath}/service/${id}`, {
    method: "PUT",
    body: {
      ...params,
    },
  });
}

//服务管理详情
export async function serviceDiscription({ name }) {
  return request(`${serverUrl}${baseURLPath}/screen/${name}`, {
    method: "GET",
  });
}
//服务管理详情
export async function serviceDiscriptions() {
  return request(`${serverUrl}${baseURLPath}/service/discription`, {
    method: "post",
  });
}
export async function serviceSearchOnce({ id }) {
  return request(`${serverUrl}${baseURLPath}/service/${id}`, {
    method: "GET",
  });
}
//数据汇聚管理>删除
export async function serviceDelete({ id }) {
  return request(`${serverUrl}${baseURLPath}/service/${id}`, {
    method: "PUT",
    body: { status: "DELETED" },
  });
}
//服务管理下载配置文件
export async function serviceConfigDownLoad({ id }) {
  return request(`${serverUrl}${baseURLPath}/service_config/${id}`, {
    method: "GET",
  });
}

//运维管理---服务管理重启、停用
export async function ServiceStatus(id, { ...params }: any) {
  return request(`${serverUrl}${baseURLPath}/service/${id}`, {
    method: "PUT",
    body: {
      ...params,
    },
  });
}

/**
 * 设备管理
 * */
//新增分组
export async function deviceGroupSyncAdd(params) {
  return request(`${serverUrl}${baseURLPath}/tag`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}

export async function deviceGroupSyncUpdate(params) {
  return request(`${serverUrl}${baseURLPath}/tag/${params.id}`, {
    method: "PUT",
    body: {
      ...params,
    },
  });
}

//分组查询
export async function deviceGroupSyncSearch(params) {
  return request(`${serverUrl}${baseURLPath}/tag_device_total/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}

// 分配设备
export async function devicetagAssign(params) {
  return request(`${serverUrl}${baseURLPath}/devicetag`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}

//删除分组
export async function deviceGroupSyncDelete({ id }) {
  return request(`${serverUrl}${baseURLPath}/tag/${id}`, {
    method: "DELETE",
    body: {},
  });
}

// 批量移除分组设备
export async function deviceGroupsSyncDelete(params) {
  return request(`${serverUrl}${baseURLPath}/devicetag`, {
    method: "DELETE",
    body: {
      ...params,
    },
  });
}

/**
 * 批量删除分组下的设备
 * */
export async function deviceDeleteByGroupSync({ id, ...params }) {
  return request(`${serverUrl}/ui/groups_sync/${id}/ape`, {
    method: "DELETE",
    body: {
      ...params,
    },
  });
}

/**
 * 分组下设备查询
 * */
export async function deviceSearchByGroupSync(params) {
  return request(`${serverUrl}${baseURLPath}/tagdevice/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}

/**
 * 查询分配设备
 * */
// export async function searchNoGroupDeviceSync(params) {
//   return request(`${serverUrl}${baseURLPath}/device/search`, {
//     method: "POST",
//     body: {
//       ...params,
//     },
//   });
// }
/**
 * 查询分配设备-设备分组
 * */
export async function searchNoGroupDevice(params) {
  return request(`${serverUrl}${baseURLPath}/device/searchNoGroupDevice`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
/**
 * 分配设备-设备分组
 * */
export async function distributeDevice(params) {
  return request(`${serverUrl}${baseURLPath}/groupsDevice/distributeDevice`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}

/**
 * 分配设备
 * */
// export async function distributeDeviceSync(params) {
//   return request(`${serverUrl}${baseURLPath}/device`, {
//     method: "POST",
//     body: {
//       ...params,
//     },
//   });
// }

/**
 * 批量增加分组设备
 * */
export async function deviceAddByGroupSync({ id, ...params }) {
  return request(`${serverUrl}/ui/groups_sync/ape/${id}`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
/**
 * 设备分组
 * */

//新增分组
export async function deviceGroupAdd(params) {
  return request(`${serverUrl}${baseURLPath}/groups`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
//分组查询
export async function deviceGroupSearch(params) {
  return request(`${serverUrl}${baseURLPath}/groups/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}

// 转发申请 > 新增, > 选择设备> 标签
export async function forwardApplyAddDeviceTag(params) {
  return request(`${serverUrl}${baseURLPath}/device_tag/name/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}

//删除分组
export async function deviceGroupDelete({ id }) {
  return request(`${serverUrl}${baseURLPath}/groups/${id}`, {
    method: "DELETE",
    body: {},
  });
}

// 批量移除分组设备
export async function deviceGroupsDelete(params) {
  return request(`${serverUrl}${baseURLPath}/groupDevices/delete`, {
    method: "DELETE",
    body: {
      ...params,
    },
  });
}

/**
 * 批量删除分组下的设备
 * */
export async function deviceDeleteByGroup({ id, ...params }) {
  return request(`${serverUrl}/ui/groups/${id}/ape`, {
    method: "DELETE",
    body: {
      ...params,
    },
  });
}

/**
 * 分组下设备查询
 * */
export async function deviceSearchByGroup(params) {
  return request(`${serverUrl}${baseURLPath}/groupsDevice/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}

/**
 * 批量增加分组设备
 * */
export async function deviceAddByGroup({ id, ...params }) {
  return request(`${serverUrl}/ui/groups/ape/${id}`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}

/**
 * 查询全部字典
 * */
export async function dictionaryAllSearch(params) {
  return request(`/ui/dictionary/all/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}

//设备管理 一机一档同步
// export async function deviceSearch(params) {
//   return request(`${serverUrl}${baseURLPath}/device/search`, {
//     method: "POST",
//     body: {
//       ...params,
//     },
//   });
// }

/**
 * 来源树形接口
 * */
// export async function deviceWithTotal(params) {
//   return request(`${serverUrl}${baseURLPath}/access_source/deviceWithTotal`, {
//     method: "POST",
//     body: {
//       ...params,
//     },
//   });
// }
export async function deviceWithTotal(params) {
  return request(`${serverUrl}${baseURLPath}/forward_request/source/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
/**
 * 根据来源查设备
 * */
export async function searchBySourceId(params) {
  return request(`${serverUrl}${baseURLPath}/device/searchBySourceId`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}

// 下载模板
export async function forwardTemplate(params) {
  return request(
    `${serverUrl}${baseURLPath}/download_template/forwardRequestSrc`,
    {
      method: "POST",
      body: {
        ...params,
      },
    }
  );
}
// 转发申请的上传
export async function forwardUpload({ file }) {
  return request(`${serverUrl}${baseURLPath}/upload/forwardRequestSrc`, {
    method: "POST",
    body: file
  });
}

export async function sourceSearch(params) {
  return request(`${serverUrl}${baseURLPath}/access_source/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}

/**
 * 报停
 * */
export async function deviceFeedbackSearch(params) {
  return request(`${serverUrl}${baseURLPath}/feedback/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}

// 根据设备状态查询数量
export async function deviceFeedbackTotal(params) {
  return request(`${serverUrl}${baseURLPath}/feedback/total`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
// 根据设备id查询报停  详情  记录
// export async function searchByCreatedAt(params) {
//   return request(`${serverUrl}${baseURLPath}/feedback/searchByCreatedAt`, {
//     method: "POST",
//     body: {
//       ...params,
//     },
//   });
// }

export async function deviceFeedbackDetail(id) {
  return request(`${serverUrl}${baseURLPath}/feedback/${id}`, {
    method: "GET"
  });
}
// 批量修改设备状态
export async function deviceFeedbackUpdate(params) {
  return request(`${serverUrl}${baseURLPath}/feedback/update`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}

/**
 * 登记
 * */
// 查询设备(device_sync)
export async function deviceSyncSearch(params) {
  return request(`${serverUrl}${baseURLPath}/access_device/register/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
// 查询设备discription(device_sync)
export async function deviceSyncDiscriptionSearch(params) {
  return request(`${serverUrl}${baseURLPath}/device/discription`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
// 新增设备(device_sync)
export async function deviceSyncAdd(params) {
  return request(`${serverUrl}${baseURLPath}/device`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
// 根据id获取单个设备详情(device_sync)
export async function deviceSyncDetail({ id }) {
  return request(`${serverUrl}${baseURLPath}/device/${id}`, {
    method: "GET",
  });
}
// 更新(device_sync)
export async function deviceSyncUpdate(params) {
  return request(`${serverUrl}${baseURLPath}/device/${params.id}`, {
    method: "PUT",
    body: {
      ...params,
    },
  });
}
// 删除设备（device_sync）
export async function deviceSyncDelete({ id }) {
  return request(`${serverUrl}${baseURLPath}/device/${id}`, {
    method: "DELETE",
    body: {},
  });
}
// 批量删除设备（device_sync）
export async function deviceSyncDeleteBatch(params) {
  return request(`${serverUrl}${baseURLPath}/device/batch/delete`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
// 导入设备（device_sync）
export async function deviceSyncImport({ formData }) {
  return request(`${serverUrl}${baseURLPath}/upload/keda`, {
    method: "POST",
    body: formData,
  });
}

// 字典数据接口
export async function dictionarySearch(params) {
  return request(`${serverUrl}${baseURLPath}/dictionary/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
// 添加字典
export async function dictionaryAdd(params) {
  return request(`${serverUrl}${baseURLPath}/dictionary`, {
    method: "POST",
    body: { ...params },
  });
}
// 批量修改字典
// export async function dictionaryBatchEdit(params) {
//   return request(`${serverUrl}${baseURLPath}/batchdictionary`, {
//     method: "PUT",
//     body: [...params],
//   });
// }
// 获取字典种类信息以及种类数量
export async function dictionaryCategorySearch(params) {
  return request(`${serverUrl}${baseURLPath}/dictionary/search`, {
    method: "POST",
    body: {
      category: "字典类别",
      ...params,
    },
  });
}

// 获取一个字典
export async function dictionaryDetail({ id }) {
  return request(`${serverUrl}${baseURLPath}/dictionary/${id}`, {
    method: "GET",
  });
}

// 更新字典
export async function dictionaryUpdate(id, params) {
  return request(`${serverUrl}${baseURLPath}/dictionary/${id}`, {
    method: "PUT",
    body: {
      ...params,
    },
  });
}

// 导入字典
export async function dictionaryImport({ formData }) {
  return request(`${serverUrl}${baseURLPath}/upload/dictionary`, {
    method: "POST",
    body: formData,
  });
}

// 删除设备（dictionary）字典删除
export async function dictionaryDelete({ id }) {
  return request(`${serverUrl}${baseURLPath}/dictionary/${id}`, {
    method: "DELETE",
    body: {},
  });
}

export async function a1(params) {
  return request(`${serverUrl}${baseURLPath}/groups/discription`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}

// 轨迹查询
// 人像轨迹
export async function searchTrackInfoFace(params) {
  return request(`${serverUrl}${baseURLPath}/trackinfoface/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
//获取一个人像轨迹
export async function trackinfofaceDetail({ id }) {
  return request(`${serverUrl}${baseURLPath}/trackinfoface/${id}`, {
    method: "GET",
  });
}
//获取一个车辆轨迹
export async function trackinfomotorvehicleDetail({ id }) {
  return request(`${serverUrl}${baseURLPath}/trackinfomotorvehicle/${id}`, {
    method: "GET",
  });
}
// 车辆轨迹
export async function searchTrackInfoVehicle(params) {
  return request(`${serverUrl}${baseURLPath}/trackinfomotorvehicle/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
//数据查询

// 人像
export async function faceSearch(params) {
  return request(`${serverUrl}${baseURLPath}/face/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
// 车辆
export async function carSearch(params) {
  return request(`${serverUrl}${baseURLPath}/motorvehicle/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
export async function dataQuerySearch(params) {
  return request(`${serverUrl}${baseURLPath}/data/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
export async function fenceSearch(params) {
  return request(`${serverUrl}${baseURLPath}/imsi/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
export async function networkFenceSearch(params) {
  return request(`${serverUrl}${baseURLPath}/mac/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}

//运维管理设备
export async function mainSearch(params) {
  return request(`${serverUrl}${baseURLPath}/device_overview/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
export async function CodeAndLongSearch(params) {
  return request(`${serverUrl}${baseURLPath}/device_view/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
// //total
export async function codeCount(params) {
  return request(`${serverUrl}${baseURLPath}/device_quality/total`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}

//质量管理
// 新接口-人脸抓拍数据异常监测中的（总览）
export async function overviewSearch(params) {
  return request(`${serverUrl}${baseURLPath}/data_face/quality/overview`, {
    method: "POST",
    body: {
      ...params
    }
  });
}
// 新接口-人脸抓拍数据异常监测中的（上方数据）
export async function TopDataSearch(params) {
  return request(
    `${serverUrl}${baseURLPath}/data_face/quality/total`,
    {
      method: "POST",
      body: {
        ...params
      }
    }
  );
}
// 新接口-人脸抓拍数据异常监测中的（列表）
export async function listSearch(params) {
  return request(
    `${serverUrl}${baseURLPath}/data_face/quality/list`,
    {
      method: "POST",
      body: {
        ...params
      }
    }
  );
}
// 新接口-一机一档异常检测列表接口
export async function deviceSyncAbnormalSearch(params) {
  return request(
    `${serverUrl}${baseURLPath}/device_sync/abnormal/search`,
    {
      method: "POST",
      body: {
        ...params
      }
    }
  );
}
// 新接口-一机一档异常检测详情接口
export async function deviceSyncAbnormalDetail(params) {
  return request(
    `${serverUrl}${baseURLPath}/device_sync/abnormal/detail`,
    {
      method: "POST",
      body: {
        ...params
      }
    }
  );
}

//过车数据、人脸抓拍、设备标签质量检测-总览
export async function TagSearch(params) {
  return request(`${serverUrl}${baseURLPath}/quality_overview/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}

// 过车数据、人脸抓拍、设备标签质量检测-total
export async function TotalSearch(params) {
  return request(`${serverUrl}${baseURLPath}/quality/total`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}

//过车数据、人脸抓拍、设备标签质量检测-search
export async function QualitySearch(params) {
  return request(`${serverUrl}${baseURLPath}/quality_view/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}

//系统管理

// 区域管理
export async function areaManagement(params) {
  return request(`${serverUrl}${baseURLPath}/unit/search`, {
    method: "POST",
    body: {
      category: "UNIT",
      ...params,
    },
  });
}
//应用管理增加

export async function systemApplicationAdd(params) {
  return request(`${serverUrl}${baseURLPath}/application`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}

//应用管理删除
export async function systemApplicationDelete({ id }) {
  return request(`${serverUrl}${baseURLPath}/application/${id}`, {
    method: "DELETE",
    body: {},
  });
}

export async function applicationSearch(params) {
  return request(`${serverUrl}${baseURLPath}/application/search`, {
    method: "POST",
    body: {
      ...params,
      // orderBy: "created_at desc"
    },
  });
}
// 应用管理编辑
export async function applicationEdite(id, params) {
  return request(`${serverUrl}${baseURLPath}/application/${id}`, {
    method: "PUT",
    body: {
      ...params,
    },
  });
}

export async function applicationAuthorization(id, time) {
  return request(`${serverUrl}${baseURLPath}/application/authorize/${id}`, {
    method: "POST",
    body: {
      expired_at: time,
    },
  });
}
// 应用系统导出
export async function systemApplicationExport(params) {
  return request(
    `${serverUrl}${baseURLPath}/download_application/application`,
    {
      method: "POST",
      body: {
        limit: 999,
        offset: 0,
        ...params
      },
    }
  );
}

export async function applicationDelete({ id }) {
  return request(`${serverUrl}${baseURLPath}/dictionary/${id}`, {
    method: "DELETE",
    body: {},
  });
}
//接入来源查询 是对字典接入来源类别查询
export async function applicationAccessSearch(params) {
  return request(`${serverUrl}${baseURLPath}/dictionary/search`, {
    method: "POST",
    body: {
      category: "接入来源",
      ...params,
    },
  });
}
export async function applicationAccessAdd(params) {
  return request(`${serverUrl}${baseURLPath}/dictionary`, {
    method: "POST",
    body: {
      category: "接入来源",
      ...params,
    },
  });
}
export async function applicationAccessDelete({ id }) {
  return request(`${serverUrl}${baseURLPath}/access_source/${id}`, {
    method: "DELETE",
    body: {},
  });
}
export async function applicationAccessEdit(id, params) {
  return request(`${serverUrl}${baseURLPath}/dictionary/${id}`, {
    method: "PUT",
    body: {
      category: "接入来源",
      ...params,
    },
  });
}

//协议管理
export async function applicationTcpSearch(params) {
  return request(`${serverUrl}${baseURLPath}/protocol/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
export async function applicationTcpAdd(params) {
  return request(`${serverUrl}${baseURLPath}/protocol`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}

// 导出协议
export async function downloadProtocol(params) {
  return request(
    `${serverUrl}${baseURLPath}/download_protocol/${params.name}`,
    {
      method: "POST",
      body: {
        ...params,
      },
    }
  );
}

export async function applicationTcpEdit(id, params) {
  return request(`${serverUrl}${baseURLPath}/protocol/${id}`, {
    method: "PUT",
    body: {
      ...params,
    },
  });
}

// 获取一个协议
export async function getTcpDetail(params) {
  return request(`${baseURLPath}/protocol/${params.id}`, {
    method: "GET",
  });
}

//系统管理-用户查询
export async function userSearch(params) {
  return request(`${serverUrl}${baseURLPath}/user/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
// 用户导出
export async function exportUser() {
  return request(`${serverUrl}${baseURLPath}/download/user/userExcel`, {
    method: "POST",
    body: {},
  });
}

//用户添加
export async function userAdd(params) {
  return request(`${serverUrl}${baseURLPath}/user`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
// 用户管理 > 删除 
export async function userDelete(id) {
  return request(`${serverUrl}${baseURLPath}/x_user/${id}`, {
    method: "DELETE",
    body: {
    },
  });
}
// 用户管理 > 重置密码
export async function resetPassword(userName) {
  return request(`${serverUrl}${baseURLPath}/user/${userName}/password_reset`, {
    method: "PUT",
    body: {},
  });
}
// 用户管理 > 编辑
export async function userEdit(id, params) {
  return request(`${serverUrl}${baseURLPath}/x_user/${id}`, {
    method: "PUT",
    body: {
      ...params
    },
  });
}

//部门管理-查询
export async function departmentSearch(params) {
  return request(`${serverUrl}${baseURLPath}/unit/search`, {
    method: "POST",
    body: {
      category: "DEPARTMENT",
      ...params,
    },
  });
}
//部门管理 & 区域管理 添加
export async function departmentAndUnitAdd(params) {
  return request(`${serverUrl}${baseURLPath}/unit`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
//部门管理 & 区域管理 编辑
export async function departmentAndUnitEdit(id, params) {
  return request(`${serverUrl}${baseURLPath}/unit/${id}`, {
    method: "PUT",
    body: {
      ...params,
    },
  });
}
//部门管理 & 区域管理 删除
export async function departmentAndUnitDelete(id) {
  return request(`${serverUrl}${baseURLPath}/unit/${id}`, {
    method: "DELETE",
    body: {
      category: 'DEPARTMENT'
    },
  });
}

/**
 * 数据共享
 * */
// 转发管理查询列表(forward_request)
export async function forwardRequestManageSearch(params) {
  return request(`${serverUrl}${baseURLPath}/forwardRequest/manageSearch`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}

/**
 * 绩效
 * */
// 市局考核
export async function checkTargetSearch(params) {
  return request(`${serverUrl}${baseURLPath}/check_target/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
// 市局考核-二期
export async function assessmentSearch() {
  return request(`${serverUrl}${baseURLPath}/assessment`, {
    method: "GET",
  });
}
// 省厅考核-二期
export async function assessmentCheckSearch() {
  return request(`${serverUrl}${baseURLPath}/assessment?is_upload=1`, {
    method: "GET",
  });
}
// 系统管理 > 权限配置 > 角色管理
export async function roleManager(params) {
  return request(`${serverUrl}${baseURLPath}/team/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
// 添加角色
export async function roleAdd(params) {
  return request(`${serverUrl}${baseURLPath}/team`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
// 编辑角色 
export async function roleEdit(id, params) {
  return request(`${serverUrl}${baseURLPath}/team/${id}`, {
    method: "PUT",
    body: {
      ...params,
    },
  });
}
// 角色删除
export async function roleDelete(id) {
  return request(`${serverUrl}${baseURLPath}/team/${id}`, {
    method: "DELETE",
    body: {},
  });
}
// 角色成员查询
export async function roleMemberSearch(params) {
  return request(`${serverUrl}${baseURLPath}/team_user/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
// 角色成员添加
export async function addRoleMember(team_id, user_id) {
  return request(`${serverUrl}${baseURLPath}/team_user`, {
    method: "POST",
    body: {
      team_id: team_id,
      user_id: user_id,
    },
  });
}
// 角色成员移除
export async function removeRoleMember(id) {
  return request(`${serverUrl}${baseURLPath}/team_user/${id}/revoke`, {
    method: "PUT",
    body: {},
  });
}

// 角色分配权限>操作权限(菜单)
export async function getMenuList() {
  return request(`${serverUrl}${baseURLPath}/feature/search`, {
    method: "POST",
    body: {},
  });
}
// 分配权限时,查询该角色已有的权限
export async function getRoleOwnAuthority(id) {
  return request(`${serverUrl}${baseURLPath}/authority/search`, {
    method: "POST",
    body: {
      owner_type: "TEAM",
      owner_id: id,
    },
  });
}

// 角色分配权限 > 添加操作权限
export async function addRoleOperationPermission(id, feature_ids) {
  return request(`${serverUrl}${baseURLPath}/authority`, {
    method: "POST",
    body: {
      owner_type: "TEAM",
      owner_id: id,
      feature_ids: [...feature_ids],
    },
  });
}
// 回收操作权限
export async function revokeRoleOperationPermission(ids) {
  return request(`${serverUrl}${baseURLPath}/authority/revoke`, {
    method: "POST",
    body: {
      ids: [...ids]
    },
  });
}


// 角色添加数据权限
export async function addRoleDataPermission(owner_id, scope_id) {
  return request(`${serverUrl}${baseURLPath}/authority_scope`, {
    method: "POST",
    body: {
      owner_type: "TEAM",
      owner_id: owner_id,
      scope_type: "SOURCE",
      scope_ids: [...scope_id],
    },
  });
}
// 角色 回收数据权限
export async function revokeRoleDataPermission(id) {
  return request(`${serverUrl}${baseURLPath}/authority_scope/revoke`, {
    method: "POST",
    body: {
      ids: [id]
    },
  });
}

// 系统管理 > 权限配置 > 查询
export async function getOperationPermission(params) {
  return request(`${serverUrl}${baseURLPath}/feature/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
// 权限新增
export async function operationPermissionSearchAdd(params) {
  return request(`${serverUrl}${baseURLPath}/feature`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
// 权限配置 > 编辑
export async function operationEdit(id, params) {
  return request(`${serverUrl}${baseURLPath}/feature/${id}`, {
    method: "PUT",
    body: {
      ...params,
    },
  });
}
// 权限配置 > 删除
export async function operationDelete(id) {
  return request(`${serverUrl}${baseURLPath}/feature/${id}`, {
    method: "DELETE",
    body: {},
  });
}
// 数据权限查询
export async function getDataPermission(id) {
  return request(`${serverUrl}${baseURLPath}/authority_scope/search`, {
    method: "POST",
    body: {
      owner_type: "TEAM",
      owner_id: id,
    },
  });
}

// 应用中心-图片共享中心
// 通过url查询图片
// export async function relationImage({ id }) {
//   return request(`${imgServiceUrl}/relation/image?id=${id}`, {
//     method: "GET",
//   });
// }
export async function relationImage(params) {
  return request(`${serverUrl}${baseURLPath}/image_share/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}

//// 应用中心-图片共享中心
// 图片详情
export async function relationImageDetail({ id }) {
  return request(`${imgServiceUrl}/trackinfoface/${id}`, {
    method: "GET",
  });
}

// 旅馆链路

//旅馆大屏
export async function hotelDataSearch(params) {
  return request(`${baseURLPath}/hotel_data/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}

export async function hotelGraphSearch(params) {
  return request(`${baseURLPath}/hotel_graph/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}

export async function hotelHistory(params) {
  return request(`${baseURLPath}/hotel_history/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}

//数据治理
// 数据标准管理
export async function protocolSearch(params) {
  return request(`${baseURLPath}/protocol/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
export async function protocolAdd(params) {
  return request(`${baseURLPath}/protocol`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
export async function protocolUpdate({ id, ...params }) {
  return request(`${baseURLPath}/protocol/${id}`, {
    method: "PUT",
    body: {
      ...params,
    },
  });
}
//详情
export async function protocolDetail({ id }) {
  return request(`${baseURLPath}/protocol/${id}`, {
    method: "GET",
  });
}
//导出
// export async function protocolExports({ name }) {
//   return request(`${serverUrl}${baseURLPath}/download_access_request/${name}`, {
//     method: "POST",
//     body: {},
//   });
// }

//服务管理-能力服务
export async function capabilityServicesSearch(params) {
  return request(`${baseURLPath}/service/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}

//服务管理-能力服务-删除

export async function mainServiceDelete({ id }) {
  return request(`${serverUrl}${baseURLPath}/service/${id}`, {
    method: "DELETE",
    body: {},
  });
}
export async function mainServiceDownLoad({ id }) {
  return request(`${serverUrl}${baseURLPath}/service_config/${id}`, {
    method: "GET",
  });
}
/**
 * 服务管理-共享服务-转发申请 and 订阅管理
 * */
export async function forwardSearch(params) {
  return request(`${serverUrl}${baseURLPath}/forward_request/search`, {
    method: "POST",
    body: {
      ...params,
      orderby: 'created_at desc'
    },
  });
}
/**
 * 服务管理-共享服务-转发申请新增
 * */
export async function forwardRequestAdd(params) {
  return request(`${serverUrl}${baseURLPath}/forward_request`, {
    method: "POST",
    body: {
      ...params,
      category: "FORWARD"
    },
  });
}
// 服务管理-共享服务-转发申请-导出
export async function forwardRequestExport(params) {
  return request(
    `${serverUrl}${baseURLPath}/download_forward_request/forwardRequest`,
    {
      method: "POST",
      body: {
        limit: 999,
        offset: 0,
        ...params
      },
    }
  );
}

/**
 * 服务管理-共享服务-转发申请-审核&编辑
 * */
export async function forwardRequestUpdate({ id, ...params }: any) {
  return request(`${serverUrl}${baseURLPath}/forward_request/${id}`, {
    method: "PUT",
    body: {
      ...params,
    },
  });
}

/**
 * 服务管理-共享服务-转发申请-分配服务
 *
 * */
export async function clusterSearch(params) {
  return request(`${serverUrl}${baseURLPath}/service/search`, {
    method: "POST",
    body: {
      categorys: ['FORWARD', 'ASYNC_FORWARD'],
      ...params,
    },
  });
}
// 接入申请分配服务,查询
export async function assignServerSearch(params) {
  return request(`${serverUrl}${baseURLPath}/service/search`, {
    method: "POST",
    body: {
      ...params,
      categorys: ['ACCESS']
    },
  });
}

/**
 * 服务管理-共享服务-转发申请-详情
 * */
export async function forwardDetailInfo({ id }) {
  return request(`${serverUrl}${baseURLPath}/forward_request/${id}`, {
    method: "GET",
  });
}
// 服务管理 > 转发申请->详情>服务信息
export async function forwardDetailServer(id) {
  return request(`${serverUrl}${baseURLPath}/forward_service/detail/search`, {
    method: "POST",
    body: {
      forward_id: id,
    },
  });
}
// 服务管理 > 转发申请->详情>设备列表
export async function forwardDetailDeviceList(params, forward_id) {
  return request(`${serverUrl}${baseURLPath}/forward_src/device/search`, {
    method: "POST",
    body: {
      ...params,
      forward_id: forward_id,
    },
  });
}

// 服务管理 > 转发申请 > 分配服务保存
export async function assignServeSave(id, serveId) {
  return request(`${serverUrl}${baseURLPath}/forward_service/batchAdd`, {
    method: "POST",
    body: {
      forward_id: id,
      service_ids: [serveId],
    },
  });
}

// 服务管理-共享服务-转发管理-列表
export async function forwardManageSearch(params) {
  return request(`${serverUrl}${baseURLPath}/forward_request/manage/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
// 转发管理 -> 导出
export async function forwardManageExport() {
  return request(`${serverUrl}${baseURLPath}/download_forward_request_manage/forwardRequestManage`, {
    method: "POST",
    body: {},
  });
}

// 转发管理 > 进度查询 -上半部分
export async function forwardManageProgress(id) {
  return request(`${serverUrl}${baseURLPath}/forward_request/track/search`, {
    method: "POST",
    body: {
      id: id,
    },
  });
}
// 人车关联
export async function getTrackInfoFace(params) {
  return request(`${baseURLPath}/trackinfoface/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
export async function getTrackInfoMotorvehicle(params) {
  return request(`${baseURLPath}/trackinfomotorvehicle/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
export async function a(params) {
  return request(`${baseURLPath}/trackinfomotorvehicle/discription`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
export async function b(params) {
  return request(`${baseURLPath}/trackinfoface/discription`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}

//数据资产原始库-图片查询
export async function imagesSearch(params) {
  return request(`${serverUrl}${baseURLPath}/images/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
//数据资产原始库-全市人脸采集库
export async function portraitFaceSearch(params) {
  return request(`${serverUrl}${baseURLPath}/facev2/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
//查看
export async function portraitDetail({ id }) {
  return request(`${serverUrl}${baseURLPath}/facev2?id=${id}`, {
    method: "GET",
  });
}

//数据资产原始库-全市人体采集库
export async function personSearch(params) {
  return request(`${serverUrl}${baseURLPath}/personv2/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
//查看
export async function personDetail({ id }) {
  return request(`${serverUrl}${baseURLPath}/personv2?id=${id}`, {
    method: "GET",
  });
}

// 数据汇聚
// 导出 ->依然是category穿的值不同
export async function exportService(params) {
  return request(`${serverUrl}${baseURLPath}/download_service/v2service`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
// 汇聚任务管理
export async function gatherTask(params) {
  return request(`${serverUrl}${baseURLPath}/service/search`, {
    method: "POST",
    body: {
      ...params,
      category: "JOB",
    },
  });
}

// 数据库汇聚
export async function databaseGather(params) {
  return request(`${serverUrl}${baseURLPath}/service/search`, {
    method: "POST",
    body: {
      ...params,
      category: "DATABASE",
    },
  });
}
// 文件汇聚
export async function fileGather(params) {
  return request(`${serverUrl}${baseURLPath}/service/search`, {
    method: "POST",
    body: {
      ...params,
      category: "FILE",
    },
  });
}

// 其他应用汇聚
export async function otherAppGather(params) {
  return request(`${serverUrl}${baseURLPath}/service/search`, {
    method: "POST",
    body: {
      ...params,
      category: "APPLICATION",
    },
  });
}

//数据资产原始库-全市车辆采集库
export async function motorvehicleSearch(params) {
  return request(`${serverUrl}${baseURLPath}/motorvehiclev2/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
//查看
export async function motorvehicleDetail({ id }) {
  return request(`${serverUrl}${baseURLPath}/motorvehiclev2?id=${id}`, {
    method: "GET",
  });
}

//数据资产原始库-全市ETC过车采集库
export async function EtcSearch(params) {
  return request(`${serverUrl}${baseURLPath}/etcmotorvehicletrack/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}

//数据资产原始库-全市ETC车主采集库
export async function ownerSearch(params) {
  console.log("params---", params);
  return request(`${serverUrl}${baseURLPath}/etcvehicleownerinfo/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}

//数据资产原始库-全市ETC热点采集库
export async function hotspotSearch(params) {
  return request(`${serverUrl}${baseURLPath}/etchotspotinfo/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}

//数据资产原始库-全市ETC终端连接热点采集库
export async function connectSearch(params) {
  return request(
    `${serverUrl}${baseURLPath}/etcterminalconnhotspotinfo/search`,
    {
      method: "POST",
      body: {
        ...params,
      },
    }
  );
}
//数据资产原始库-全市ETC终端握手信息采集库
export async function handShakeSearch(params) {
  return request(`${serverUrl}${baseURLPath}/etcterminalhandsinfo/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
//数据资产原始库-蓝牙
export async function blueToothSearch(params) {
  return request(`${serverUrl}${baseURLPath}/etcterminalbluetoothinfo/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
//数据资产原始库-状态
export async function statusSearch(params) {
  return request(`${serverUrl}${baseURLPath}/etcdevicestatusinfo/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}

//数据资产资源库-全市人像轨迹库
export async function trackinfoFaceSearch(params) {
  return request(`${serverUrl}${baseURLPath}/trackinfoface/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}

//数据资产资源库-全市车辆轨迹库
export async function trackinfoMotorvehicleSearch(params) {
  return request(`${serverUrl}${baseURLPath}/trackinfomotorvehicle/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}

//数据资产主题库-全市人员档案库
export async function personnelFilesSearch(params) {
  return request(`${serverUrl}${baseURLPath}/personarchive/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
//数据资产-主题库-全市车辆档案库
export async function MotorvehicleSearch(params) {
  return request(`${serverUrl}${baseURLPath}/motorvehiclearchive/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}

/* 设备建档 */
//
export async function countsInfoSearch() {
  return request(`${serverUrl}${baseURLPath}/dashboard/device/data/realtime`, {
    method: "GET",
  });
}

// 各地接入设备登记率
export async function accessdeviceRegister() {
  return request(`${serverUrl}${baseURLPath}/dashboard/accessdevice/register`, {
    method: "GET",
  });
}
// 设备接口(按照tag_type)
export async function deviceCounts(params) {
  return request(
    `${serverUrl}${baseURLPath}/dashboard/device/counts?tag_type=${params.type}`,
    {
      method: "GET",
    }
  );
}
// 各地设备活跃率
export async function aliveCounts() {
  return request(`${serverUrl}${baseURLPath}/dashboard/device/alive_counts`, {
    method: "GET",
  });
}
//  接入完整性
export async function deviceSample(params) {
  return request(
    `${serverUrl}${baseURLPath}/dashboard/device/data/sample?type=${params.type}`,
    {
      method: "GET",
    }
  );
}

// top100异常设备数
export async function qualityCount() {
  return request(
    `${serverUrl}${baseURLPath}/dashboard/access/face/image/quality_count`,
    {
      method: "GET",
    }
  );
}
// 接入数量
export async function deviceData(params) {
  return request(
    `${serverUrl}${baseURLPath}/dashboard/device/data?type=${params.type}`,
    {
      method: "GET",
    }
  );
}

/* 绩效考核 */
//  绩效考核
export async function performanceAppraisalSearch(params) {
  return request(`${serverUrl}${baseURLPath}/performance_appraisal/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
//  考核明细-折线统计图
export async function performanceBrokenLineSearch(params) {
  return request(
    `${serverUrl}${baseURLPath}/performance_appraisal/detail/broken_line/search`,
    {
      method: "POST",
      body: {
        ...params,
      },
    }
  );
}
//  考核明细-感知设备建档情况
export async function perceptionDeviceRecordSearch(params) {
  return request(
    `${serverUrl}${baseURLPath}/performance_appraisal/detail/perception_device_record/search`,
    {
      method: "POST",
      body: {
        ...params,
      },
    }
  );
}
// 考核明细-感知设备抓拍情况
export async function deviceCaptureSearch(params) {
  return request(
    `${serverUrl}${baseURLPath}/performance_appraisal/detail/device_capture/search`,
    {
      method: "POST",
      body: {
        ...params,
      },
    }
  );
}

/* 菜单 */
// 查询
export async function menuSearch(params) {
  return request(`${serverUrl}${baseURLPath}/beta/router/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
// 所有的菜单集合 用于下拉选择父节点
export async function menuComponentSearch(params) {
  return request(`${serverUrl}${baseURLPath}/beta/component/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
// 根据component  判断组件是否已经存在
export async function checkComponent(params) {
  return request(`${serverUrl}${baseURLPath}/beta/component/${params.id}`, {
    method: "get",
  });
}
// 新增
export async function menuAdd(params) {
  return request(`${serverUrl}${baseURLPath}/beta/router`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}

// 删除菜单
export async function menusDelete(params) {
  return request(`${serverUrl}${baseURLPath}/beta/router`, {
    method: "DELETE",
    body: {
      ...params,
    },
  });
}

//集群管理-服务管理新增-配置文件信息
export async function serveConfigInfo(id) {
  return request(`${baseURLPath}/service/${id}`, {
    method: "GET",
  });
}

/* 转发服务可视化 */
export async function forwardServiceHeader(params) {
  return request(`${serverUrl}${baseURLPath}/forward_service/header/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
export async function forwardServiceRank(params) {
  return request(`${serverUrl}${baseURLPath}/forward_service/today_data_rank/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
// 对账
export async function forwardServiceCheck(params) {
  return request(`${serverUrl}${baseURLPath}/forward_service/data_check/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
// 活跃情况
export async function forwardServiceAlive(params) {
  return request(`${serverUrl}${baseURLPath}/forward_service/device_alive/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}

// 接入测试提交
export async function toolsMockery(params) {
  return request(`$${serverUrl}${baseURLPath}/tools/mockery`,
    {
      method: "POST",
      body: {
        ...params,
      },
    }
  );
}