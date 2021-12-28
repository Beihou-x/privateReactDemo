import { request } from "@/utils/request";
// import data from "../../public/config.json";
import { getUrl } from "@/utils/utils";
import { identity } from "lodash";
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

/**
 * 接入申请> 导入数据, > 下载模板
 * @param params
 * @returns
 */
export async function accessApplyDownloadTemplate() {
  return request(
    `${serverUrl}${baseURLPath}/download_template/access_device_template`,
    {
      method: "POST",
      body: {},
    }
  );
}
/**
 * 接入申请 > 详情 >下载设备信息
 * @param params access_id: 接入申请id
 * @returns
 */
export async function accessApplyDownloadDeviceInfo(params) {
  return request(
    `${serverUrl}${baseURLPath}/download_access_device/accessDeviceList`,
    {
      method: "POST",
      body: {
        ...params,
      },
    }
  );
}

//运维管理设备

// 总览
export async function viewAll(params) {
  return request(
    `${serverUrl}${baseURLPath}/operation_device/overview/search`,
    {
      method: "POST",
      body: {
        ...params,
      },
    }
  );
}

/**
 * 国标编码监测 经纬度监测 时间差监测
 * @param type 区分 国标编码监测 operation_device_Id 经纬度监测 operation_device_LoLa 时间差监测operation_device_time
 * @param params  用于分页
 * @returns 
 */
export async function deviceMonitor(type,params) {
  return request(
    `${serverUrl}${baseURLPath}/${type}/monitor/search`,
    {
      method: "POST",
      body: {
        ...params,
      },
    }
  );
}
// 经纬度监测
// export async function latLongitude(params) {
//   return request(
//     `${serverUrl}${baseURLPath}/operation_device_LoLa/monitor/search`,
//     {
//       method: "POST",
//       body: {
//         ...params,
//       },
//     }
//   );
// }
// 时间差监测
// export async function timeMonitor(params) {
//   return request(
//     `${serverUrl}${baseURLPath}/operation_device_time/monitor/search`,
//     {
//       method: "POST",
//       body: {
//         ...params,
//       },
//     }
//   );
// }
// 运维管理-设备对账-列表
export async function accessDeviceCheckSearch(params) {
  return request(
    `${serverUrl}${baseURLPath}/access_device/check/search`,
    {
      method: "POST",
      body: {
        ...params,
      },
    }
  );
}
// 运维管理-设备对账-柱状图
export async function performanceAppraisalSearch(params) {
  return request(
    `${serverUrl}${baseURLPath}/performance_appraisal/search`,
    {
      method: "POST",
      body: {
        ...params,
      },
    }
  );
}

// 质量管理 > 质量 > 卡口过车数据异常监测
// 总览
export async function checkpointCarUnusual(params) {
  return request(`${serverUrl}${baseURLPath}/data_car/quality/overview`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
// 质量管理-对账管理-数据对账-接入对账
export async function accessReconcile(params) {
  return request(`${serverUrl}${baseURLPath}/access_reconcile?${stringify(params)}`, {
    method: "GET",
  });
}
/**
 * 转发质量监测
 * @param params 
 * @returns 
 */
export async function forwardQuality(params) {
  return request(`${serverUrl}${baseURLPath}/forward_request/quality/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
// 订阅质量监测
export async function subscribeQuality(params) {
  return request(`${serverUrl}${baseURLPath}/subscribe/quality/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}

// 卡口过车数据异常监测 > 五个模块头部数据,根据不同type来识别
/**
 * 
 * @param params 
 * 根据type来查询：
  data   ： 数据量监测
  pic_req  ：图片访问监测
  timeliness ：数据时效性监测
  consistence ：数据一致性监测
  如果查询昨天的数据，需要传start和end两个参数
 * @returns 
 */
export async function checkpointCarUnusualHead(params) {
  return request(`${serverUrl}${baseURLPath}/data_car/quality/total`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}

export async function checkpointCarUnusualList(params) {
  return request(`${serverUrl}${baseURLPath}/data_car/quality/list`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}

/**
 * 标签设备异常分布监测,总览
 *
 */
export async function tagDeviceOverview(params) {
  return request(`${serverUrl}${baseURLPath}/data_tag/quality/overview`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
// 业务标签和自定义标签头部统计接口
export async function businessAndCustomizeHead(params) {
  return request(`${serverUrl}${baseURLPath}/data_tag/quality/total`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
// 业务标签和自定义标签 列表接口
export async function businessAndCustomizeList(params) {
  return request(`${serverUrl}${baseURLPath}/data_tag/quality/list`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
// 报文查询 > 设备信息
export async function messageDeviceInfo(id) {
  return request(`${serverUrl}${baseURLPath}/device/${id}`, {
    method: "GET",
  });
}

// 修改密码
export async function changePassWord(userName, params) {
  return request(`${serverUrl}${baseURLPath}/user/${userName}/password`, {
    method: "PUT",
    body: {
      ...params,
    },
  });
}

export async function deviceOverview(params) {
  return request(`${serverUrl}${baseURLPath}/device/target/total`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
export async function deviceOverviewExport(params) {
  return request(
    `${serverUrl}${baseURLPath}/download_device_total/device_target`,
    {
      method: "POST",
      body: {
        ...params,
      },
    }
  );
}

/**
 * 一机一档 > 登记> 设备导入
 */
export async function deviceImport({ file }) {
  return request(`${serverUrl}${baseURLPath}/upload/x_device`, {
    method: "POST",
    body: file,
  });
}

// 一机一档设备导入模板下载
export async function downloadDeviceTemplate(params) {
  return request(`${serverUrl}${baseURLPath}/download_template/x_device`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}

// 订阅管理 导出
export async function subscribeExport(params) {
  return request(
    `${serverUrl}${baseURLPath}/download_subscribe/downloadSubscribe`,
    {
      method: "POST",
      body: {
        ...params,
      },
    }
  );
}
// 订阅管理 下载设备
export async function deviceExport(params) {
  return request(
    `${serverUrl}${baseURLPath}/download_subscribe_device/subscribe_device`,
    {
      method: "POST",
      body: {
        ...params,
      },
    }
  );
}
// 订阅管理 下载设备模板
export async function deviceDownloadTemplate(params) {
  return request(`${serverUrl}${baseURLPath}/download_template/subscribe`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}

/**
 * 运维管理>设备对账>查询列表
 * @param params
 * @returns
 */

export async function deviceReconciliation(params) {
  return request(`${serverUrl}${baseURLPath}/access_device_alive/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
/**
 * 设备对账导出
 * @param params
 * @returns
 */
export async function deviceReconciliationExport(params) {
  return request(`${serverUrl}${baseURLPath}/download_operation/operation`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
/**
 * 数据对账
 * @param params
 * @returns
 */
export async function dataReconciliation(params) {
  return request(`${serverUrl}${baseURLPath}/data/target/total`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}

//数据接入-缓存查询
export async function cacheList(params) {
  return request(`tools/messages/list?${stringify(params)}`, {
    method: "GET",
  });
}

//数据接入-缓存详情查询
export async function cacheDetail(params) {
  return request(`tools/messages/detail?${stringify(params)}`, {
    method: "GET",
  });
}
//数据接入-缓存详情查询
export async function subimageList(params) {
  return request(`tools/messages/detail/subimage?${stringify(params)}`, {
    method: "GET",
  });
}
// 操作日志
export async function operateRecordSearch(params) {
  return request(`${serverUrl}${baseURLPath}/operation_log/search`, {
    method: "POST",
    body: {
      ...params,
      "orderby": "created_at desc"
    },
  });
}

/**
 * 服务运行上报信息
 * @param id
 * @returns
 */
export async function severRunInfo(id) {
  return request(`${serverUrl}${baseURLPath}/service_alive/${id}`, {
    method: "GET",
  });
}

/**
 * 订阅管理新增
 */
export async function subscribeAdd(params) {
  return request(`${serverUrl}${baseURLPath}/subscribe`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
export async function subscribeEdit(params) {
  return request(`${serverUrl}${baseURLPath}/subscribe`, {
    method: "PUT",
    body: {
      ...params,
    },
  });
}
// 订阅管理-状态修改
export async function subscribeStatusEdit(params) {
  return request(`${serverUrl}${baseURLPath}/subscribe/status/${params.id}`, {
    method: "PUT",
    body: {
      ...params,
    },
  });
}

// 订阅管理-删除
export async function subscribeDelete(id) {
  return request(`${serverUrl}${baseURLPath}/subscribe`, {
    method: "DELETE",
    body: { id },
  });
}
// 订阅管理-详情
export async function subscribeDetail(params) {
  return request(`${serverUrl}${baseURLPath}/subscribe?${stringify(params)}`, {
    method: "GET",
  });
}
/**
 * 订阅管理> 设备导入
 */
export async function deviceUpload({ file }) {
  return request(`${serverUrl}${baseURLPath}/upload/subscribe`, {
    method: "POST",
    body: file,
  });
}
// 订阅管理 > 协议报告 > 响应时间超过30s的设备数
export async function responseThirtySecond(params) {
  return request(`${serverUrl}${baseURLPath}/protocol/report/response_time`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
// 订阅管理 > 协议报告 > 订阅量变化
export async function subscribeChange(params) {
  return request(`${serverUrl}${baseURLPath}/protocol/subscribe/data`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
// 订阅管理 > 订阅对账
export async function subscribeCheckData(params) {
  return request(`${serverUrl}${baseURLPath}/subscribe/check/data`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
// 订阅管理 > 转发对账
export async function forwardRequestCheckData(params) {
  return request(`${serverUrl}${baseURLPath}/forward_request/check/data`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}

// 平台配置
export async function subscribePlatformDetail() {
  return request(`${serverUrl}${baseURLPath}/subscribe/platform`, {
    method: "GET",
  });
}
// 视图库-列表
export async function viewSearch(params) {
  return request(`${serverUrl}${baseURLPath}/subscribe/viewlib/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
// 视图库-删除
export async function viewDel(id) {
  return request(`${serverUrl}${baseURLPath}/subscribe/viewlib/${id}`, {
    method: "DELETE",
  });
}
// 视图库-详情
export async function viewDetail(params) {
  return request(
    `${serverUrl}${baseURLPath}/subscribe/viewlib?${stringify(params)}`,
    {
      method: "GET",
    }
  );
}
// 视图库-更新
export async function viewEdit(params) {
  return request(`${serverUrl}${baseURLPath}/subscribe/viewlib`, {
    method: "PUT",
    body: {
      ...params,
    },
  });
}
// 视图库-新增
export async function viewAdd(params) {
  return request(`${serverUrl}${baseURLPath}/subscribe/viewlib`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
//  视图库 导出
export async function viewExport(params) {
  return request(
    `${serverUrl}${baseURLPath}/download_view_lib/downloadViewLib`,
    {
      method: "POST",
      body: {
        ...params,
      },
    }
  );
}
/**
 * 设备分组,上传设备下载模板
 * @param
 * @returns
 */
export async function deviceGroupTempDownload() {
  return request(
    `${serverUrl}${baseURLPath}/download_template/upload_device_tag`,
    {
      method: "POST",
      body: {},
    }
  );
}
/**
 * 设备分组导入设备
 * @param id 标签id
 * @returns
 */
export async function deviceGroupUpload(id, { formData }) {
  return request(`${serverUrl}${baseURLPath}/upload/upload_device_tag/${id}`, {
    method: "POST",
    body: formData,
  });
}

// 运维管理 设备检测
export async function detectList(params = {}) {
  return request(`${serverUrl}${baseURLPath}/device/image/detect/summary`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}

//分组查询
export async function unitDeviceTotalSearch(params) {
  return request(`${serverUrl}${baseURLPath}/unit/device_total/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}

/**
 * 分组下设备查询
 * */
export async function deviceCheckSearch(params) {
  return request(
    `${serverUrl}${baseURLPath}/access_device/device_check/search`,
    {
      method: "POST",
      body: {
        ...params,
      },
    }
  );
}
/**
 * 图片查询查询
 * */
// export async function deviceImageSearch(params) {
//   return request(`${serverUrl}${baseURLPath}/warehouse/device_image/search`, {
//     method: "POST",
//     body: {
//       ...params,
//     },
//   });
// }

// 图片查询查询--一期接口
export async function deviceImageSearch(params = {}) {
  return request(`external/invalid_images?${stringify(params)}`, {
    method: "GET",
  });
}

/**
 * 区域管理 下载模板
 * @param params
 * @returns
 */
export async function unitTemplateDownload(params) {
  return request(`${serverUrl}${baseURLPath}/download_template/x_unit`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
/**
 * 区域管理 导入Excel
 * @param params
 * @returns
 */
export async function unitUpload({ file }) {
  return request(`${serverUrl}${baseURLPath}/upload/x_unit`, {
    method: "POST",
    body: file,
  });
}
/**
 * 区域管理标签添加
 * @param params unit_id,tag_id,category
 * @returns
 */
export async function unitTagAdd(params) {
  return request(`${serverUrl}${baseURLPath}/unit_tag`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
/**
 * 应用管理标签添加
 * @param params application_id,tag_id,category
 * @returns
 */
export async function applicationTagAdd(params) {
  return request(`${serverUrl}${baseURLPath}/application_tag`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
/**
 * 数据接入 > 设备管理(接入管理),配置(编辑)
 * @param params
 * @returns
 */
export async function accessManageUpdate(id, params) {
  return request(`${serverUrl}${baseURLPath}/access_device/${id}`, {
    method: "PUT",
    body: {
      ...params,
    },
  });
}

// 抓拍量统计图
/**
 * 接入管理,接入报告
 * @param params
 * @returns
 */
export async function getLine(params: any) {
  return request(
    `${serverUrl}${baseURLPath}/access_request/capture_data/search`,
    {
      method: "POST",
      body: {
        ...params,
      },
    }
  );
}
/**
 * 报文查询 快照 四个时间查询
 * @param params
 * @returns
 */
export async function messageTimeLine(params: any) {
  return request(`${serverUrl}${baseURLPath}/device/time/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}

// 一机一档 源管理
export async function deviceSource(params: any) {
  return request(`${serverUrl}${baseURLPath}/device_sync/config/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
// 一机一档 源管理 >设备同步
export async function deviceSync(params: any) {
  return request(`${serverUrl}${baseURLPath}/face_push_message/config/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
// 源管理 统计
export async function deviceSourceStatisticsr(params: any) {
  return request(`${serverUrl}${baseURLPath}/device/check/total`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}

// 服务管理新增根据服务类型查询配置模板
export async function getServiceConfig(params: any) {
  return request(`${serverUrl}${baseURLPath}/service/config/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
/**
 * 协议管理标签添加
 * @param params protocol_id,tag_id
 * @returns
 */
export async function protocolTagAdd(params) {
  return request(`${serverUrl}${baseURLPath}/protocol_tag`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
/**
 *
 * @param params 服务管理>应用实例
 * @returns
 */
export async function appInstance(params) {
  return request(`platform/instance?${stringify(params)}`, {
    method: "GET",
  });
}

/**
 * 订阅管理列表查询
 * @param params limit, offset
 * @returns
 */
export async function subscribeSearch(params) {
  return request(`${serverUrl}${baseURLPath}/subscribe/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}

/**
 *
 * @param params name,description
 * @returns
 */
export async function userGroupAdd(params) {
  return request(`${serverUrl}${baseURLPath}/group`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
/**
 * 用户组管理列表查询
 * @param params
 * @returns
 */
export async function userGroupSearch(params) {
  return request(`${serverUrl}${baseURLPath}/group/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
// 用户组珊瑚请求
export async function userGroupDelete(id) {
  return request(`${serverUrl}${baseURLPath}/group/${id}`, {
    method: "DELETE",
    body: {},
  });
}
// 用户组编辑请求
export async function userGroupUpdate(id, params) {
  return request(`${serverUrl}${baseURLPath}/group/${id}`, {
    method: "PUT",
    body: {
      ...params,
    },
  });
}
// 查询用户组下用户
export async function userInUserGroup(id) {
  return request(`${serverUrl}${baseURLPath}/user_group/search`, {
    method: "POST",
    body: {
      id,
    },
  });
}
/**
 *  用户组添加用户
 * @param params group_id, user_ids
 * @returns
 */
export async function UserGroupAddUser(params) {
  return request(`${serverUrl}${baseURLPath}/user_group/Add`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
// 用户组添加时,查询未分组用户
export async function getUnAssignMember(params) {
  return request(`${serverUrl}${baseURLPath}/user_group/user/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
// 删除用户组下用户
export async function userGroupUserDelete(params) {
  return request(`${serverUrl}${baseURLPath}/user_group/user/delete`, {
    method: "DELETE",
    body: {
      ...params,
    },
  });
}

// 转发申请最后抓拍时间/请求时间
export async function forwardRequestTime(params) {
  return request(`${serverUrl}${baseURLPath}/forward_request/time/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
// 转发申请对账 实转发,应转发
export async function forwardAndShouldForward(params) {
  return request(`${serverUrl}${baseURLPath}/forward_data/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
// 转发申请 数据过滤单独接口
export async function forwardDataFilter(params) {
  return request(`${serverUrl}${baseURLPath}/forward_request_src`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}

// 转发测试
export async function reqResponse(id) {
  return request(`${serverUrl}${baseURLPath}/req_response/${id}`, {
    method: "GET",
  });
}
// 转发测试获取ip地址
export async function getIP() {
  return request(`${serverUrl}${baseURLPath}/reverse/get`, {
    method: "GET",
  });
}

/**
 * 转发测试/订阅测试 获取信息
 * @param params method, url
 * @returns
 */
export async function forwardTestGetInfo(params) {
  return request(`${serverUrl}${baseURLPath}/req_response/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
// 集群管理查询
export async function clusterSearch(params) {
  return request(`${serverUrl}${baseURLPath}/cluster/search`, {
    method: "POST",
    body: {
      // categorys: ['FORWARD','ASYNC_FORWARD'],
      ...params,
    },
  });
}
// 应用分组 查询分组
export async function applicationGroupSearch(params) {
  return request(`${serverUrl}${baseURLPath}/tag_application_total/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
// 应用分组 分组新增
export async function applicationGroupAdd(params) {
  return request(`${serverUrl}${baseURLPath}/agroup`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
// 应用分组 分组编辑
export async function applicationGroupUpdate(params) {
  return request(`${serverUrl}${baseURLPath}/agroup/${params.id}`, {
    method: "PUT",
    body: {
      ...params,
    },
  });
}
// 应用分组 删除分组
export async function applicationGroupDelete({ id }) {
  return request(`${serverUrl}${baseURLPath}/agroup/${id}`, {
    method: "DELETE",
    body: {},
  });
}
// 应用分组 查询分组下设备
export async function applicationGroupAppSearch(params) {
  return request(`${serverUrl}${baseURLPath}/groupApplication/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
// 应用分组 查询未分组应用
export async function applicationGroupUnassignApp(params) {
  return request(`${serverUrl}${baseURLPath}/application/distribute/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
// 应用分组 分配应用
export async function applicationGroupassignApp(params) {
  return request(`${serverUrl}${baseURLPath}/applicationagroup`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
// 应用分组 批量删除
export async function applicationGroupDeleteApp(params) {
  return request(`${serverUrl}${baseURLPath}/applicationagroup`, {
    method: "DELETE",
    body: {
      ...params,
    },
  });
}
// 转发申请报表
export async function forwardTimelyMonitor(params) {
  return request(`${serverUrl}${baseURLPath}/forward_request/control/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
/**
 * 普罗米修斯
 * @param params type(pending,qps,latency),service_id,category(access(接入)  forward(转发)  subscribe(订阅)  service(服务))
 * @returns
 */
export async function prometheus(type, service_id, category) {
  return request(`${serverUrl}${baseURLPath}/forward_service/monitor/search`, {
    method: "POST",
    body: {
      type,
      service_id,
      category,
    },
  });
}
// 解析引擎普罗米修斯
export async function forwardAndParseEnginePrometheus(type, service_id, category, processor) {
  return request(`${serverUrl}${baseURLPath}/forward_service/monitor/search`, {
    method: "POST",
    body: {
      type,
      service_id,
      category,
      processor: `http_forward_${processor}`
    },
  });
}
// 推送管理 > 进度查询
export async function pushProgressSearch(params) {
  return request(`routers/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
//推送管理 > 进度查询 详情
export async function pushProgressSearchDetail(params) {
  return request(`metrics/forward?${stringify(params)}`, {
    method: "GET",
  });
}
// 设备检测 查询检测设备数,成功率小于90%占比
export async function deviceCheckHead(params) {
  return request(`${serverUrl}${baseURLPath}/access_device/device_check/header`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
// 大图可用检测
export async function bigPicUsableSearch(params) {
  return request(`${serverUrl}${baseURLPath}/access_device/big_vail/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
// 大图可用头部
export async function bigPicUsableHead(params) {
  return request(`${serverUrl}${baseURLPath}/access_device/big_vail/header`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
// 数据完整检测
export async function dataIntegralSearch(params) {
  return request(`${serverUrl}${baseURLPath}/access_device/data_complete/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
// 数据完整检测头部
export async function dataIntegralHead(params) {
  return request(`${serverUrl}${baseURLPath}/access_device/data_complete/header`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
// 数据过滤检测
export async function dataFilterSearch(params) {
  return request(`${serverUrl}${baseURLPath}/access_device/data_filter/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
// 数据过滤检测头部
export async function dataFilterHead(params) {
  return request(`${serverUrl}${baseURLPath}/access_device/data_filter/header`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
/**
 * 协议 选择厂商
 * @param params protocol_id(协议id),manufacturer_id (厂商和引擎id)
 * @returns 
 */
export async function protocolManufactureAdd(params) {
  return request(`${serverUrl}${baseURLPath}/protocol_manufacturer`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
// 查询已选中厂商 params: protocol_id
export async function protocolSelectedManufacture(params) {
  return request(`${serverUrl}${baseURLPath}/protocol_manufacturer/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
// 存储管理-人像资源库-人车关联库
export async function motorvehicleSearch(params) {
  return request(`${serverUrl}${baseURLPath}/trackinfo_face_motorvehicle/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
// 接入协议 协议报告 响应时间超过30s
export async function accessResponseThirty(params) {
  return request(`${serverUrl}${baseURLPath}/access_protocol/time/total`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
// 接入协议 协议报告 接入量变化
export async function accessProtocolDeviceChange(params) {
  return request(`${serverUrl}${baseURLPath}/access_protocol/data/total`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
export async function accessProtocolTotalnew(params) {
  return request(`${serverUrl}${baseURLPath}/access_protocol/data/totalnew`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
// 转发协议 协议报告 响应时间超过30s
export async function forwardResponseThirty(params) {
  return request(`${serverUrl}${baseURLPath}/forward_protocol/time/total`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
// 转啊协议 协议报告 转发量统计
export async function forwardProtocolDeviceChange(params) {
  return request(`${serverUrl}${baseURLPath}/forward_protocol/data/total`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
// 转发协议 能力报告添加统计内容
export async function forwardProtocolStatistics(params) {
  return request(`${serverUrl}${baseURLPath}/forward_protocol/report/total`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}

// 服务管理(原接入转发) 查询接入转发数量
export async function severAmount(params) {
  return request(`${serverUrl}${baseURLPath}/service/kind/total`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
// 首页列表展示
export async function homePageSearch() {
  return request(`${serverUrl}${baseURLPath}/beta/component_home_page/search`, {
    method: "POST",
    body: {
      hidden: false,
      exact: false,
      is_display: true,
    },
  });
}

// 人像,车辆头部统计
/**
 * 
 * @param params type: face,motor;time以天为纬度
 * @returns 
 */
export async function getPersonCarCount(params) {
  return request(`${serverUrl}${baseURLPath}/statistic_data?${stringify(params)}`, {
    method: "GET",
  });
}
// 人像,车辆统计延迟
export async function getPersonCarDelay(params) {
  return request(`${serverUrl}${baseURLPath}/statistic_delay_data?${stringify(params)}`, {
    method: "GET",
  });
}
/**
 * 质量检测>卡口过车,人像抓拍异常监测, 点击展示详情
 * @param params source,start,end,type,function_type
 * @returns 
 */
export async function carFaceDetail(params) {
  return request(`${serverUrl}${baseURLPath}/abnormal_detail/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
/**
 * 设备质量异常监测 ,点击查询异常设备
 * @param params type,place_code
 * @returns 
 */
export async function deviceQualityUnusual(params) {
  return request(`${serverUrl}${baseURLPath}/device/target/detail`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}

// 服务器监控可视化
export async function forwardServiceMonitorSearch(params) {
  return request(`${serverUrl}${baseURLPath}/forward_service/monitor/search`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
// 接入服务,转发服务日志
export async function accessServiceRecord(category, server_id) {
  return request(`${serverUrl}${baseURLPath}/view/log/${category}/${server_id}/raptor.log?last=100`, {
    method: "GET",
  });
}
// 设备同步 接入信息
export async function deviceSyncAccess(id,params) {
  return request(`${serverUrl}${baseURLPath}/device/access_request/${id}?${stringify(params)}`, {
    method: "GET",
  });
}
// 设备同步 接入信息
export async function parseReconcile(id) {
  return request(`${serverUrl}${baseURLPath}/analysis_reconcile?${stringify(id)}`, {
    method: "GET",
  });
}
//服务配置修改 /service/config/:id
export async function serviceConfig(id, xconfig) {
  return request(`${serverUrl}${baseURLPath}/service/config/${id}`, {
    method: "PUT",
    body: {
      ...xconfig
    }
  });
}
// 接入申请 日志
export async function accessLog(userId, appId, params) {
  return request(`${serverUrl}${baseURLPath}/operation_log_access/search`, {
    method: "POST",
    body: {
      action: `/krakatoa/api/v2/access_service/batchAdd/${appId},/upload/accessDevice/${appId},/access_request/add/${appId}`,
      ...params
    }
  });
}
// 用户分配权限接口
export async function userAssignPermission(params) {
  return request(`${serverUrl}${baseURLPath}/user/authority`, {
    method: "POST",
    body: {
      ...params
    }
  });
}
// 用户组分配权限接口
export async function userGroupAssignPermission(params) {
  return request(`${serverUrl}${baseURLPath}/group/authority`, {
    method: "POST",
    body: {
      ...params
    }
  });
}
// 转发服务schmea监控
export async function forwardServiceSchema(params) {
  return request(`${serverUrl}${baseURLPath}/forward_service/schema_monitor/search`, {
    method: "POST",
    body: {
      ...params
    }
  });
}
// 异常原因接口
export async function sampleDetail(params) {
  return request(`${serverUrl}${baseURLPath}/device/target/sample/detail`, {
    method: "POST",
    body: {
      ...params
    }
  });
}
// 不合格数
export async function abnormalDetail(params) {
  return request(`${serverUrl}${baseURLPath}/abnormal_detail/search`, {
    method: "POST",
    body: {
      ...params
    }
  });
}