import Loadable from "react-loadable";
import BoxLoading from "react-loadingg/lib/BoxLoading";

export const reactRoutes = [
  //basiclayout
  {
    id: "wx_basic_layout",
    component: Loadable({
      loader: () => import("@/layouts/BasicLayout"),
      loading: BoxLoading,
    }),
  },
  // 首页
  {
    id: "wx_home",
    component: Loadable({
      loader: () => import("@/pages/home"),
      loading: BoxLoading,
    }),
  },
  //可视化
  {
    id: "wx_dashboard",
    icon: "DownCircleOutlined ",
    component: Loadable({
      loader: () => import("@/pages/dashboard/test"),
      loading: BoxLoading,
    }),
  },

  // "专题可视化"
  {
    id: "wx_summarizing_topic",
    component: Loadable({
      loader: () => import("@/pages/dashboard/topic"),
      loading: BoxLoading,
    }),
  },
  // 专题可视化(旅馆)
  {
    id: "wx_visualization_monitor4",
    component: Loadable({
      loader: () => import("@/pages/dashboard/topic/monitor33"),
      loading: BoxLoading,
    }),
  },
  {
    id: "wx_summarize",
    component: Loadable({
      loader: () => import("@/pages/dashboard/test"),
      loading: BoxLoading,
    }),
  },
  {
    id: "wx_monitor",
    component: Loadable({
      loader: () => import("@/pages/dashboard/test"),
      loading: BoxLoading,
    }),
  },
  {
    id: "wx_visualization",
    component: Loadable({
      // loader: () => import("@/pages/dashboard"),
      loader: () => import("@/pages/home"),
      loading: BoxLoading,
    }),
  },
  {
    id: "wx_summarizing_second",
    component: Loadable({
      loader: () => import("@/pages/dashboard/summarizing"),
      loading: BoxLoading,
    }),
  },
  {
    id: "wx_visualization_monitor_second",
    component: Loadable({
      loader: () => import("@/pages/dashboard/monitor-dashboard"),
      loading: BoxLoading,
    }),
  },
  {
    id: "wx_screen",
    component: Loadable({
      loader: () => import("@/pages/dashboard"),
      loading: BoxLoading,
    }),
  },
  {
    id: "wx_visualization_screen",
    component: Loadable({
      loader: () => import("@/pages/dashboard/screen"),
      loading: BoxLoading,
    }),
  },

  // 可视化汇总
  {
    id: "wx_summarizing1",
    component: Loadable({
      loader: () => import("@/pages/dashboard/summarize"),
      loading: BoxLoading,
    }),
  },
  {
    id: "wx_summarizing",
    component: Loadable({
      loader: () => import("@/pages/dashboard/summarize/summarize1"),
      loading: BoxLoading,
    }),
  },
  // 可视化数据资产可视化
  {
    id: "wx_visualization_monitor",
    component: Loadable({
      loader: () => import("@/pages/dashboard/summarize/monitor6"),
      loading: BoxLoading,
    }),
  },
  // 感知前端分布可视化
  {
    id: "wx_front_end_distribute_visualization",
    component: Loadable({
      loader: () => import("@/pages/dashboard/front-end-view"),
      loading: BoxLoading,
    }),
  },
  // 服务器监控可视化
  {
    id: "wx_server_monitor_visualization",
    component: Loadable({
      loader: () => import("@/pages/dashboard/server-monitor"),
      loading: BoxLoading,
    }),
  },
  // 感知数据分布可视化
  {
    id: "wx_data_distribute_visualization",
    component: Loadable({
      loader: () => import("@/pages/dashboard/data-view"),
      loading: BoxLoading,
    }),
  },
  // 转发服务可视化
  {
    id: "wx_forward_distribute_visualization",
    component: Loadable({
      loader: () => import("@/pages/dashboard/forward-serve-view"),
      loading: BoxLoading,
    }),
  },
  // 数据链路
  {
    id: "wx_visualization_monitor10",
    component: Loadable({
      loader: () => import("@/pages/dashboard/summarize/monitor10"),
      loading: BoxLoading,
    }),
  },
  {
    id: "wx_visualization_storage",
    component: Loadable({
      loader: () => import("@/pages/dashboard/summarize/storage"),
      loading: BoxLoading,
    }),
  },
  {
    id: "wx_visualization_monitor7",
    component: Loadable({
      loader: () => import("@/pages/dashboard/topic/monitor66"),
      loading: BoxLoading,
    }),
  },
  // 接入监控(原 前端运行可视化)
  {
    id: "wx_access_monitor",
    component: Loadable({
      loader: () => import("@/pages/dashboard/system-view"),
      loading: BoxLoading,
    }),
  },

  //数据接入
  {
    id: "wx_data_access",
    component: Loadable({
      loader: () => import("@/pages/data"),
      loading: BoxLoading,
    }),
  },
  //审批记录
  {
    id: "wx_approval_record",
    component: Loadable({
      loader: () => import("@/pages/approval-record"),
      loading: BoxLoading,
    }),
  },
  //接入申请
  {
    id: "wx_access",
    component: Loadable({
      loader: () => import("@/pages/access"),
      loading: BoxLoading,
    }),
  },
  {
    id: "wx_access_record",
    component: Loadable({
      loader: () => import("@/pages/access/component/SubmitList"),
      loading: BoxLoading,
    }),
  },
  // 接入审核
  {
    id: "wx_access_check",
    component: Loadable({
      loader: () => import("@/pages/access/accessCheck"),
      loading: BoxLoading,
    }),
  },
  // 接入申请 日志
  {
    id: "wx_access_log",
    component: Loadable({
      loader: () => import("@/pages/access/component/log_record"),
      loading: BoxLoading,
    }),
  },
  //缓存查询
  {
    id: "wx_cache",
    component: Loadable({
      loader: () => import("@/pages/gather/search/cache"),
      loading: BoxLoading,
    }),
  },
  //缓存详情
  {
    id: "wx_cache_detail",
    component: Loadable({
      loader: () => import("@/pages/gather/search/cache/detail"),
      loading: BoxLoading,
    }),
  },
  {
    id: "wx_access_add",
    component: Loadable({
      loader: () => import("@/pages/access/add-form"),
      loading: BoxLoading,
    }),
  },
  {
    id: "wx_access_detail",
    component: Loadable({
      loader: () => import("@/pages/access/detail"),
      loading: BoxLoading,
    }),
  },
  {
    id: "wx_access_check",
    component: Loadable({
      loader: () => import("@/pages/access/check"),
      loading: BoxLoading,
    }),
  },
  {
    id: "wx_access_audit",
    component: Loadable({
      loader: () => import("@/pages/access/audit"),
      loading: BoxLoading,
    }),
  },
  {
    id: "wx_access_assign",
    component: Loadable({
      loader: () => import("@/pages/access/assign"),
      loading: BoxLoading,
    }),
  },
  //接入管理
  {
    id: "wx_access_management",
    component: Loadable({
      loader: () => import("@/pages/access-management"),
      loading: BoxLoading,
    }),
  },
  {
    id: "wx_access_management_add",
    component: Loadable({
      loader: () => import("@/pages/access-management/add-form"),
      loading: BoxLoading,
    }),
  },
  {
    id: "wx_access_management_update",
    component: Loadable({
      loader: () => import("@/pages/access-management/add-form"),
      loading: BoxLoading,
    }),
  },
  {
    id: "wx_access_management_info",
    component: Loadable({
      loader: () => import("@/pages/access-management/info"),
      loading: BoxLoading,
    }),
  },
  // 操作日志
  {
    id: "wx_access_management_record",
    component: Loadable({
      loader: () => import("@/pages/access-management/operation_record"),
      loading: BoxLoading,
    }),
  },
  // 报文查询
  {
    id: "wx_access_message",
    component: Loadable({
      loader: () => import("@/pages/message-management"),
      loading: BoxLoading,
    }),
  },
  // 接入协议
  {
    id: "wx_access_tcp",
    component: Loadable({
      loader: () => import("@/pages/access-tcp"),
      loading: BoxLoading,
    }),
  },
  // 接入协议新增
  {
    id: "wx_access_tcp_add",
    component: Loadable({
      loader: () => import("@/pages/access-tcp/add-form"),
      loading: BoxLoading,
    }),
  },
  // 接入协议编辑
  {
    id: "wx_access_tcp_edit",
    component: Loadable({
      loader: () => import("@/pages/access-tcp/add-form"),
      loading: BoxLoading,
    }),
  },
  // 接入协议报告
  {
    id: "wx_access_tcp_report",
    component: Loadable({
      loader: () => import("@/pages/access-tcp/protocol-report"),
      loading: BoxLoading,
    }),
  },
  // 接入协议日志
  {
    id: "wx_access_tcp_record",
    component: Loadable({
      loader: () => import("@/pages/access-tcp/record"),
      loading: BoxLoading,
    }),
  },
  // 接入管理 >设备多维度统计
  {
    id: "wx_access_device_statistic",
    component: Loadable({
      loader: () => import("@/pages/access-device-statistic"),
      loading: BoxLoading,
    }),
  },
  // 设备分组
  // {
  //   id: "wx_access_group",
  //   component: Loadable({
  //     loader: () => import("@/pages/access-group/group"),
  //     loading: BoxLoading,
  //   }),
  // },

  // 转发管理
  {
    id: "wx_approve_management",
    component: Loadable({
      loader: () => import("@/pages/approve-access"),
      loading: BoxLoading,
    }),
  },
  // 转发管理 ->进度查询
  {
    id: "wx_approve_progress",
    component: Loadable({
      loader: () => import("@/pages/approve-access/progressSearch"),
      loading: BoxLoading,
    }),
  },
  //转发测试
  {
    id: "wx_approve_test",
    component: Loadable({
      loader: () => import("@/pages/approve-test"),
      loading: BoxLoading,
    }),
  },
  // 转发协议 
  {
    id: "wx_approve_tcp",
    component: Loadable({
      loader: () => import("@/pages/approve-tcp"),
      loading: BoxLoading,
    }),
  },
  // 转发协议 新增
  {
    id: "wx_approve_tcp_add",
    component: Loadable({
      loader: () => import("@/pages/approve-tcp/add-form"),
      loading: BoxLoading,
    }),
  },
  // 转发协议 编辑
  {
    id: "wx_approve_tcp_edit",
    component: Loadable({
      loader: () => import("@/pages/approve-tcp/add-form"),
      loading: BoxLoading,
    }),
  },
  // 转发协议报告
  {
    id: "wx_approve_tcp_report",
    component: Loadable({
      loader: () => import("@/pages/approve-tcp/protocol-report"),
      loading: BoxLoading,
    }),
  },
  // 订阅管理
  {
    id: "wx_approve_test1",
    component: Loadable({
      loader: () => import("@/pages/service/share-service/subscribe-manage"),
      loading: BoxLoading,
    }),
  },
  // 订阅管理>平台配置
  {
    id: "wx_platform_config",
    component: Loadable({
      loader: () =>
        import("@/pages/service/share-service/subscribe-manage/platform_config"),
      loading: BoxLoading,
    }),
  },
  // 订阅管理>视图库
  {
    id: "wx_view",
    component: Loadable({
      loader: () =>
        import("@/pages/service/share-service/subscribe-manage/view"),
      loading: BoxLoading,
    }),
  },
  // 订阅管理>订阅协议
  {
    id: "wx_subscribe_tcp",
    component: Loadable({
      loader: () =>
        import("@/pages/service/share-service/subscribe-manage/subscribe-tcp"),
      loading: BoxLoading,
    }),
  },
  // 接入协议新增
  {
    id: "wx_subscribe_tcp_add",
    component: Loadable({
      loader: () => import("@/pages/service/share-service/subscribe-manage/subscribe-tcp/add-form"),
      loading: BoxLoading,
    }),
  },
  // 接入协议编辑
  {
    id: "wx_subscribe_tcp_edit",
    component: Loadable({
      loader: () => import("@/pages/service/share-service/subscribe-manage/subscribe-tcp/add-form"),
      loading: BoxLoading,
    }),
  },
  // 接入协议报告
  {
    id: "wx_subscribe_tcp_report",
    component: Loadable({
      loader: () => import("@/pages/service/share-service/subscribe-manage/subscribe-tcp/protocol-report"),
      loading: BoxLoading,
    }),
  },
  // 订阅管理>订阅管理
  {
    id: "wx_approve_access1",
    component: Loadable({
      loader: () =>
        import("@/pages/service/share-service/subscribe-manage/subscribe"),
      loading: BoxLoading,
    }),
  },
  // 订阅管理 > 新增
  {
    id: "wx_approve_access1_add",
    component: Loadable({
      loader: () =>
        import(
          "@/pages/service/share-service/subscribe-manage/subscribe/add-form"
        ),
      loading: BoxLoading,
    }),
  },
  // 订阅管理 > 编辑
  {
    id: "wx_approve_access1_edit",
    component: Loadable({
      loader: () =>
        import(
          "@/pages/service/share-service/subscribe-manage/subscribe/add-form"
        ),
      loading: BoxLoading,
    }),
  },
  // 订阅管理 > 详情
  {
    id: "wx_approve_access1_detail",
    component: Loadable({
      loader: () =>
        import(
          "@/pages/service/share-service/subscribe-manage/subscribe/detail"
        ),
      loading: BoxLoading,
    }),
  },
  // 订阅管理 协议报告
  {
    id: "wx_approve_protocol_report",
    component: Loadable({
      loader: () =>
        import(
          "@/pages/service/share-service/subscribe-manage/subscribe/protocol-report"
        ),
      loading: BoxLoading,
    }),
  },
  // 订阅管理>通知查询
  {
    id: "wx_approve_access2",
    component: Loadable({
      loader: () =>
        import("@/pages/service/share-service/subscribe-manage/notify"),
      loading: BoxLoading,
    }),
  },
  //接入测试
  {
    id: "wx_access_test",
    component: Loadable({
      loader: () => import("@/pages/access-test"),
      loading: BoxLoading,
    }),
  },
  //订阅测试
  {
    id: "wx_subscribe_test",
    component: Loadable({
      loader: () => import("@/pages/approve-test"),
      loading: BoxLoading,
    }),
  },
  //集群管理
  {
    id: "wx_cluster",
    component: Loadable({
      loader: () => import("@/pages/cluster"),
      loading: BoxLoading,
    }),
  },
  // 集群管理详情
  {
    id: "wx_service_info",
    component: Loadable({
      loader: () => import("@/pages/service/maintenance-service/detailService"),
      loading: BoxLoading,
    }),
  },

  //服务器管理
  {
    id: "wx_server",
    component: Loadable({
      loader: () => import("@/pages/server"),
      loading: BoxLoading,
    }),
  },
  //服务器新增
  {
    id: "wx_server_add",
    component: Loadable({
      loader: () => import("@/pages/server/add-form"),
      loading: BoxLoading,
    }),
  },
  //服务器修改
  {
    id: "wx_server_update",
    component: Loadable({
      loader: () => import("@/pages/server/add-form"),
      loading: BoxLoading,
    }),
  },
  //服务管理
  {
    id: "wx_service",
    component: Loadable({
      loader: () => import("@/pages/service"),
      loading: BoxLoading,
    }),
  },
  //分节点管理
  {
    id: "wx_management",
    component: Loadable({
      loader: () => import("@/pages/cluster/management"),
      loading: BoxLoading,
    }),
  },
  // 分节点管理 >设备下发
  {
    id: "wx_devicedispatch",
    component: Loadable({
      loader: () => import("@/pages/cluster/device-dispatch"),
      loading: BoxLoading,
    }),
  },
  // 分节点管理 >接入规范下发
  {
    id: "wx_accessstandarddispatch",
    component: Loadable({
      loader: () => import("@/pages/cluster/access-standard-dispatch"),
      loading: BoxLoading,
    }),
  },
  // 分节点管理 >数据规范下发
  {
    id: "wx_datastandarddispatch",
    component: Loadable({
      loader: () => import("@/pages/cluster/data-standard-dispatch"),
      loading: BoxLoading,
    }),
  },
  //服务管理-能力服务
  {
    id: "wx_maintenance_service1",
    component: Loadable({
      loader: () => import("@/pages/service/maintenance-service"),
      loading: BoxLoading,
    }),
  },
  //服务管理-实时监控
  {
    id: "wx_real_monitor",
    component: Loadable({
      loader: () => import("@/pages/timely-monitor/monitor"),
      loading: BoxLoading,
    }),
  },
  // 解析引擎 实时监控,多个参数
  {
    id: "wx_parse_engine_monitor",
    component: Loadable({
      loader: () => import("@/pages/timely-monitor/engine-monitor"),
      loading: BoxLoading,
    }),
  },
  // 转发.订阅服务 实时监控
  {
    id: "wx_forward_monitor",
    component: Loadable({
      loader: () => import("@/pages/timely-monitor/forward-monitor"),
      loading: BoxLoading,
    }),
  },
  // 新增服务
  {
    id: "wx_maintenance_service_add",
    component: Loadable({
      loader: () => import("@/pages/service/maintenance-service/addService"),
      loading: BoxLoading,
    }),
  },
  // 服务编辑
  {
    id: "wx_maintenance_service_edit",
    component: Loadable({
      loader: () => import("@/pages/service/maintenance-service/editService"),
      loading: BoxLoading,
    }),
  },
  // 服务详情
  {
    id: "wx_maintenance_service_detail",
    component: Loadable({
      loader: () => import("@/pages/service/maintenance-service/detailService"),
      loading: BoxLoading,
    }),
  },
  // 服务配置
  {
    id: "wx_service_config",
    component: Loadable({
      loader: () => import("@/pages/service/maintenance-service/serviceConfig"),
      loading: BoxLoading,
    }),
  },
  //服务管理-共享服务
  {
    id: "wx_share_service",
    component: Loadable({
      loader: () => import("@/pages/service/share-service"),
      loading: BoxLoading,
    }),
  },
  //服务管理-共享服务-转发申请
  {
    id: "wx_approve_access",
    component: Loadable({
      loader: () => import("@/pages/service/share-service/approve-access"),
      loading: BoxLoading,
    }),
  },
  //服务管理-共享服务-转发申请-申请
  {
    id: "wx_approve_access_add",
    component: Loadable({
      loader: () =>
        import("@/pages/service/share-service/approve-access/add-form"),
      loading: BoxLoading,
    }),
  },
  //服务管理-共享服务-转发申请-编辑
  {
    id: "wx_approve_access_update",
    component: Loadable({
      loader: () =>
        import("@/pages/service/share-service/approve-access/add-form"),
      loading: BoxLoading,
    }),
  },
  // 转发申请数据过滤
  {
    id: "wx_approve_access_data_filter",
    component: Loadable({
      loader: () =>
        import("@/pages/service/share-service/approve-access/data-filter"),
      loading: BoxLoading,
    }),
  },
  //转发审核
  {
    id: "wx_approve_access_check",
    component: Loadable({
      loader: () =>
        import("@/pages/service/share-service/approve-access/check"),
      loading: BoxLoading,
    }),
  },

  //转发审核-审核
  {
    id: "wx_approve_access_audit",
    component: Loadable({
      loader: () =>
        import("@/pages/service/share-service/approve-access/audit"),
      loading: BoxLoading,
    }),
  },
  //服务管理-共享服务-转发申请-分配任务
  {
    id: "wx_approve_access_distribution",
    component: Loadable({
      loader: () =>
        import("@/pages/service/share-service/approve-access/assign"),
      loading: BoxLoading,
    }),
  },
  //服务管理-共享服务-转发申请-详情
  {
    id: "wx_approve_access_detail",
    component: Loadable({
      loader: () =>
        import("@/pages/service/share-service/approve-access/detail"),
      loading: BoxLoading,
    }),
  },
  //设备管理
  {
    id: "wx_device",
    component: Loadable({
      loader: () => import("@/pages/device"),
      loading: BoxLoading,
    }),
  },
  // 设备档案管理
  {
    id: "wx_device_file",
    component: Loadable({
      loader: () => import("@/pages/device"),//只做占位
      loading: BoxLoading,
    }),
  },
  // 接入设备管理
  {
    id: "wx_access_device",
    component: Loadable({
      loader: () => import("@/pages/device"), //只做占位
      loading: BoxLoading,
    }),
  },
  // 设备接入引擎菜单
  {
    id: "wx_device_access_engine",
    component: Loadable({
      loader: () => import("@/pages/device-access-engine"),
      loading: BoxLoading,
    }),
  },
  // 设备接入引擎菜单 新增
  {
    id: "wx_device_access_engine_add",
    component: Loadable({
      loader: () => import("@/pages/device-access-engine/addService"),
      loading: BoxLoading,
    }),
  },
  // 设备接入引擎菜单 编辑
  {
    id: "wx_device_access_engine_edit",
    component: Loadable({
      loader: () => import("@/pages/device-access-engine/addService"),
      loading: BoxLoading,
    }),
  },
  {
    id: "wx_maintenance_device",
    component: Loadable({
      loader: () => import("@/pages/maintenance/device"),
      loading: BoxLoading,
    }),
  },
  // 设备同步
  {
    id: "wx_device_check",
    component: Loadable({
      loader: () => import("@/pages/query/lib/check"),
      loading: BoxLoading,
    }),
  },
  {
    id: "wx_device_check_add",
    component: Loadable({
      loader: () => import("@/pages/query/lib/check/add-form"),
      loading: BoxLoading,
    }),
  },
  {
    id: "wx_device_check_edit",
    component: Loadable({
      loader: () => import("@/pages/query/lib/check/add-form"),
      loading: BoxLoading,
    }),
  },
  // 设备同步 接入信息
  {
    id: "wx_device_check_access_info",
    component: Loadable({
      loader: () => import("@/pages/query/lib/check/accessInfo"),
      loading: BoxLoading,
    }),
  },
  {
    id: "wx_device_check_record",
    component: Loadable({
      loader: () => import("@/pages/query/lib/check/record"),
      loading: BoxLoading,
    }),
  },
  {
    id: "wx_device_permission",
    component: Loadable({
      loader: () => import("@/pages/device/permission"),
      loading: BoxLoading,
    }),
  },
  // {
  //   id: "wx_device_check",
  //   component: Loadable({
  //     loader: () => import("@/pages/query/lib/check"),
  //     loading: BoxLoading,
  //   }),
  // },
  {
    id: "wx_device_application",
    component: Loadable({
      loader: () => import("@/pages/device/application"),
      loading: BoxLoading,
    }),
  },
  // 报停
  {
    id: "wx_device_suspension",
    component: Loadable({
      loader: () => import("@/pages/device/suspension"),
      loading: BoxLoading,
    }),
  },
  // 一机一档  > 源管理
  {
    id: "wx_device_source",
    component: Loadable({
      loader: () => import("@/pages/device/deviceSource"),
      loading: BoxLoading,
    }),
  },
  //数据查询下原始库
  {
    id: "wx_data_query",
    component: Loadable({
      loader: () => import("@/pages/query"),
      loading: BoxLoading,
    }),
  },
  //原始库-图片综合查询
  {
    id: "wx_dataquery",
    component: Loadable({
      loader: () => import("@/pages/application/pic/no-plate"),
      loading: BoxLoading,
    }),
  },
  // 原始库-全市人脸采集库
  {
    id: "wx_portrait",
    component: Loadable({
      loader: () => import("@/pages/query/lib/portrait"),
      loading: BoxLoading,
    }),
  },
  // 存储管理-人车关联库
  {
    id: "wx_person_car",
    component: Loadable({
      loader: () => import("@/pages/query/lib/personCar"),
      loading: BoxLoading,
    }),
  },
  //原始库-全市车辆采集库
  {
    id: "wx_vehicle",
    component: Loadable({
      loader: () => import("@/pages/query/lib/vehicle"),
      loading: BoxLoading,
    }),
  },
  // 原始库
  {
    id: "wx_lib",
    component: Loadable({
      loader: () => import("@/pages/query/lib"),
      loading: BoxLoading,
    }),
  },
  //原始库-全市人体采集库
  {
    id: "wx_person",
    component: Loadable({
      loader: () => import("@/pages/query/lib/person"),
      loading: BoxLoading,
    }),
  },
  //原始库-全市ETC过车采集库
  {
    id: "wx_etc",
    component: Loadable({
      loader: () => import("@/pages/query/lib/etc"),
      loading: BoxLoading,
    }),
  },
  //原始库-全市ETC车主采集库
  {
    id: "wx_owner",
    component: Loadable({
      loader: () => import("@/pages/query/lib/owner"),
      loading: BoxLoading,
    }),
  },
  //原始库-全市ETC热点采集库
  {
    id: "wx_hotspot",
    component: Loadable({
      loader: () => import("@/pages/query/lib/hotspot"),
      loading: BoxLoading,
    }),
  },
  //原始库-全市ETC终端连接热点采集库
  {
    id: "wx_connect",
    component: Loadable({
      loader: () => import("@/pages/query/lib/connect"),
      loading: BoxLoading,
    }),
  },
  //原始库-全市ETC终端握手信息采集库
  {
    id: "wx_handshake",
    component: Loadable({
      loader: () => import("@/pages/query/lib/handshake"),
      loading: BoxLoading,
    }),
  },
  //原始库-全市ETC终端蓝牙信息采集库
  {
    id: "wx_bluetooth",
    component: Loadable({
      loader: () => import("@/pages/query/lib/bluetooth"),
      loading: BoxLoading,
    }),
  },
  //原始库-全市ETC设备状态信息采集库
  {
    id: "wx_status",
    component: Loadable({
      loader: () => import("@/pages/query/lib/status"),
      loading: BoxLoading,
    }),
  },
  // 原始库,图片
  {
    id: "wx_picture",
    component: Loadable({
      loader: () => import("@/pages/query/lib/picture"),
      loading: BoxLoading,
    }),
  },
  //原始库-报文查询
  {
    id: "wx_lib_message",
    component: Loadable({
      loader: () => import("@/pages/query/lib/message"),
      loading: BoxLoading,
    }),
  },

  {
    id: "wx_fence",
    component: Loadable({
      loader: () => import("@/pages/query/lib/fence"),
      loading: BoxLoading,
    }),
  },
  {
    id: "wx_network_fence",
    component: Loadable({
      loader: () => import("@/pages/query/lib/network-fence"),
      loading: BoxLoading,
    }),
  },
  // {
  //   id: "wx_dingdong",
  //   component: Loadable({
  //     loader: () => import("@/pages/query/lib/dingdong"),
  //     loading: BoxLoading,
  //   }),
  // },
  {
    id: "wx_business_device",
    component: Loadable({
      loader: () => import("@/pages/query/lib/check"),
      loading: BoxLoading,
    }),
  },

  //资源库
  {
    id: "wx_source",
    component: Loadable({
      loader: () => import("@/pages/query/source"),
      loading: BoxLoading,
    }),
  },
  {
    id: "wx_source_portrait",
    component: Loadable({
      loader: () => import("@/pages/query/source/portrait"),
      loading: BoxLoading,
    }),
  },
  {
    id: "wx_source_vehicle",
    component: Loadable({
      loader: () => import("@/pages/query/source/vehicle"),
      loading: BoxLoading,
    }),
  },
  // 专题库
  {
    id: "wx_theme",
    component: Loadable({
      loader: () => import("@/pages/query/theme"),
      loading: BoxLoading,
    }),
  },
  {
    id: "wx_theme_face",
    component: Loadable({
      loader: () => import("@/pages/query/theme/personnel"),
      loading: BoxLoading,
    }),
  },
  {
    id: "wx_theme_car",
    component: Loadable({
      loader: () => import("@/pages/query/theme/vehicle"),
      loading: BoxLoading,
    }),
  },
  {
    id: "wx_special",
    component: Loadable({
      loader: () => import("@/pages/query/special"),
      loading: BoxLoading,
    }),
  },
  {
    id: "wx_special_hotel",
    component: Loadable({
      loader: () => import("@/pages/query/special/hotel"),
      loading: BoxLoading,
    }),
  },
  {
    id: "wx_special_task",
    component: Loadable({
      loader: () => import("@/pages/query/special/task"),
      loading: BoxLoading,
    }),
  },
  {
    id: "wx_business",
    component: Loadable({
      loader: () => import("@/pages/query/business"),
      loading: BoxLoading,
    }),
  },
  {
    id: "wx_business_device",
    component: Loadable({
      loader: () => import("@/pages/query/business/device"),
      loading: BoxLoading,
    }),
  },
  {
    id: "wx_business_hotel",
    component: Loadable({
      loader: () => import("@/pages/query/business/hotel"),
      loading: BoxLoading,
    }),
  },
  // 公安其他实战数据
  {
    id: "wx_other_real_data",
    component: Loadable({
      loader: () => import("@/pages/maintenance"),//空页面只是做占位
      loading: BoxLoading,
    }),
  },
  //运维管理
  {
    id: "wx_maintenance",
    component: Loadable({
      loader: () => import("@/pages/maintenance"),
      loading: BoxLoading,
    }),
  },
  // 服务管理 (原接入转发)
  {
    id: "wx_maintenance_access",
    component: Loadable({
      loader: () => import("@/pages/maintenance/access"),

      // loader: () => import("@/pages/cluster/management"),
      loading: BoxLoading,
    }),
  },
  {
    id: "wx_maintenance_device_overview",
    component: Loadable({
      // loader: () => import("@/pages/maintenance/access"),
      loader: () => import("@/pages/maintenance/device_overview"),
      loading: BoxLoading,
    }),
  },
  {
    id: "wx_maintance_device_reconciliation",
    component: Loadable({
      loader: () => import("@/pages/maintenance/device_reconciliation"),
      loading: BoxLoading,
    }),
  },
  // 解析引擎服务配置
  {
    id: "wx_parse_engine_config",
    component: Loadable({
      loader: () => import("@/pages/maintenance/access/parseEngineConfig"),
      loading: BoxLoading,
    }),
  },
  //  设备检测
  {
    id: "wx_maintance_detect",
    component: Loadable({
      loader: () => import("@/pages/gover"),
      loading: BoxLoading,
    }),
  },
  // // 设备检测详情
  // {
  //   id: "wx_maintance_detect_detail",
  //   component: Loadable({
  //     loader: () => import("@/pages/maintenance/device_detect/detail"),
  //     loading: BoxLoading,
  //   }),
  // },
  //数据完整检测
  {
    id: "wx_data_integral_detect",
    component: Loadable({
      loader: () => import("@/pages/maintenance/data-integral"),
      loading: BoxLoading,
    }),
  },
  // 小图合格检测
  {
    id: "wx_small_pic_qualified_detect",
    component: Loadable({
      loader: () => import("@/pages/maintenance/device_detect"),
      loading: BoxLoading,
    }),
  },
  // 小图合格检测详情
  {
    id: "wx_small_pic_qualified_detect_detail",
    component: Loadable({
      loader: () => import("@/pages/maintenance/device_detect/detail"),
      loading: BoxLoading,
    }),
  },
  // 大图可用检测
  {
    id: "wx_big_pic_usable_detect",
    component: Loadable({
      loader: () => import("@/pages/maintenance/big-pic-usable"),
      loading: BoxLoading,
    }),
  },
  // 数据过滤检测
  {
    id: "wx_data_filter_detect",
    component: Loadable({
      loader: () => import("@/pages/maintenance/data-filter"),
      loading: BoxLoading,
    }),
  },
  // 设备活跃检测
  {
    id: "wx_data_alive_detect",
    component: Loadable({
      loader: () => import("@/pages/gover/quality/face/children/ConsistencyView"),
      loading: BoxLoading,
    }),
  },
  // 一机一档异常检测
  {
    id: "wx_anomaly_detection",
    component: Loadable({
      loader: () => import("@/pages/gover/quality/face/children/AnomalyDetection"),
      loading: BoxLoading,
    }),
  },
  // 对账管理
  {
    id: "wx_reconciliation",
    component: Loadable({
      loader: () => import("@/pages/gover"),
      loading: BoxLoading,
    }),
  },
  // 数据对账
  {
    id: "wx_maintance_data_reconciliation",
    component: Loadable({
      loader: () => import("@/pages/maintenance/data_reconciliation"),
      loading: BoxLoading,
    }),
  },
  // 运维管理> 推送管理
  {
    id: "wx_maintance_push",
    component: Loadable({
      loader: () => import("@/pages/maintenance/push"),
      loading: BoxLoading,
    }),
  },

  // 进度查询
  {
    id: "wx_maintance_push_progress_search",
    component: Loadable({
      loader: () => import("@/pages/maintenance/push/progress_search"),
      loading: BoxLoading,
    }),
  },
  // 进度查询 详情 
  {
    id: "wx_maintance_push_progress_search_detail",
    component: Loadable({
      loader: () => import("@/pages/maintenance/push/progress_search/detail"),
      loading: BoxLoading,
    }),
  },
  {
    id: "wx_quality_control",
    component: Loadable({
      loader: () => import("@/pages/quality-management"),
      loading: BoxLoading,
    }),
  },
  //质量管理
  {
    id: "wx_data_gover",
    component: Loadable({
      loader: () => import("@/pages/gover"),
      loading: BoxLoading,
    }),
  },

  //数据治理-图片数据质量
  {
    id: "wx_approve_picturequality",
    component: Loadable({
      loader: () => import("@/pages/gover/pic-data"),
      loading: BoxLoading,
    }),
  },
  // 数据质量查询
  {
    id: "wx_approve_management1",
    component: Loadable({
      loader: () => import("@/pages/gover/dataQualitySearch"),
      loading: BoxLoading,
    }),
  },
  {
    id: "wx_quality",
    component: Loadable({
      loader: () => import("@/pages/gover/quality"),
      loading: BoxLoading,
    }),
  },
  //质量管理-质量检测-转发/订阅质量监测
  {
    id: "wx_quality_control_subscribe",
    component: Loadable({
      loader: () => import("@/pages/gover/quality/subscribe"),
      loading: BoxLoading,
    }),
  },
  // {
  //   id: "wx_collect",
  //   component: Loadable({
  //     loader: () => import("@/pages/gover/quality/collect"),
  //     loading: BoxLoading,
  //   }),
  // },
  {
    id: "wx_car_check",
    component: Loadable({
      loader: () => import("@/pages/gover/quality/car"),
      loading: BoxLoading,
    }),
  },
  {
    id: "wx_face_capture",
    component: Loadable({
      loader: () => import("@/pages/gover/quality/face"),
      loading: BoxLoading,
    }),
  },
  {
    id: "wx_device_tag",
    component: Loadable({
      loader: () => import("@/pages/gover/quality/bussiness"),
      loading: BoxLoading,
    }),
  },
  //绩效
  {
    id: "wx_performance",
    component: Loadable({
      loader: () => import("@/pages/quality-management/performance"),
      loading: BoxLoading,
    }),
  },
  {
    id: "wx_performance_check",
    component: Loadable({
      loader: () => import("@/pages/quality-management/performance/check"),
      loading: BoxLoading,
    }),
  },
  {
    id: "wx_performance_office_check",
    component: Loadable({
      loader: () =>
        import("@/pages/quality-management/performance/checkOffice"),
      loading: BoxLoading,
    }),
  },
  {
    id: "wx_performance_check_second",
    component: Loadable({
      loader: () =>
        import("@/pages/quality-management/performance/checkSecond"),
      loading: BoxLoading,
    }),
  },
  {
    id: "wx_performance_office_check_second",
    component: Loadable({
      loader: () =>
        import("@/pages/quality-management/performance/checkOfficeSecond"),
      loading: BoxLoading,
    }),
  },
  // 绩效考核
  {
    id: "wx2_assessment",
    component: Loadable({
      loader: () => import("@/pages/quality-management/performance/assessment"),
      loading: BoxLoading,
    }),
  },
  // 绩效考核详情
  {
    id: "wx2_assessment_detail",
    component: Loadable({
      loader: () =>
        import("@/pages/quality-management/performance/assessment/detail"),
      loading: BoxLoading,
    }),
  },
  //应用中心
  {
    id: "wx_quality_control_application",
    component: Loadable({
      loader: () => import("@/pages/application"),
      loading: BoxLoading,
    }),
  },
  //应用中心-图片关联查询
  {
    id: "wx_performance_pic",
    component: Loadable({
      loader: () => import("@/pages/application/pic/relation"),
      loading: BoxLoading,
    }),
  },
  //应用中心-图片关联查询（无车牌）
  {
    id: "wx_performance_noplate",
    component: Loadable({
      loader: () => import("@/pages/application/pic/no-plate"),
      loading: BoxLoading,
    }),
  },
  //应用中心-图片链路查询
  {
    id: "wx_performance_link",
    component: Loadable({
      loader: () => import("@/pages/application/pic/pic-link"),
      loading: BoxLoading,
    }),
  },
  //系统管理
  {
    id: "wx_system",
    component: Loadable({
      loader: () => import("@/pages/system"),
      loading: BoxLoading,
    }),
  },
  // 基础配置
  {
    id: "wx_basic_config",
    component: Loadable({
      loader: () => import("@/pages/quality-management/performance"),
      loading: BoxLoading,
    }),
  },
  // 应用系统
  {
    id: "wx_system_application",
    component: Loadable({
      loader: () => import("@/pages/system/application"),
      loading: BoxLoading,
    }),
  },
  // 应用系统查看日志
  {
    id: "wx_system_application_record",
    component: Loadable({
      loader: () => import("@/pages/system/application/record"),
      loading: BoxLoading,
    }),
  },
  {
    id: "wx_system_unit",
    component: Loadable({
      loader: () => import("@/pages/system/unit"),
      loading: BoxLoading,
    }),
  },
  {
    id: "wx_system_access",
    component: Loadable({
      loader: () => import("@/pages/system/access"),
      loading: BoxLoading,
    }),
  },
  // 设备厂商
  {
    id: "wx_device_manufactor",
    component: Loadable({
      loader: () => import("@/pages/system/manufactor"),
      loading: BoxLoading,
    }),
  },
  // 引擎厂商
  {
    id: "wx_engine_manufactor",
    component: Loadable({
      loader: () => import("@/pages/system/engineManufactor"),
      loading: BoxLoading,
    }),
  },
  // 分类标签
  {
    id: "wx_classify_tag",
    component: Loadable({
      loader: () => import("@/pages/system/classify_tag"),
      loading: BoxLoading,
    }),
  },
  {
    id: "wx_system_user",
    component: Loadable({
      loader: () => import("@/pages/system/user"),
      loading: BoxLoading,
    }),
  },
  {
    id: "wx_system_department",
    component: Loadable({
      loader: () => import("@/pages/system/department"),
      loading: BoxLoading,
    }),
  },
  // 系统管理 > 权限管理
  {
    id: "wx_system_permission",
    component: Loadable({
      loader: () => import("@/pages/system/permission/operation"),
      loading: BoxLoading,
    }),
  },
  // 角色下面查询成员
  {
    id: "wx_system_member",
    component: Loadable({
      loader: () => import("@/pages/system/permission/role/viewMember"),
      loading: BoxLoading,
    }),
  },
  //角色管理
  {
    id: "wx_system_role",
    component: Loadable({
      loader: () => import("@/pages/system/permission/role"),
      loading: BoxLoading,
    }),
  },
  // 角色管理 > 分配权限
  {
    id: "wx_assign_permission",
    component: Loadable({
      loader: () => import("@/pages/system/permission/role/assignPermisson"),
      loading: BoxLoading,
    }),
  },
  // 操作权限
  // {
  //   id: "wx_system_permission_operation",
  //   component: Loadable({
  //     loader: () => import("@/pages/system/permission/operation"),
  //     loading: BoxLoading,
  //   }),
  // },
  // 数据权限
  // {
  //   id: "wx_system_permission_data",
  //   component: Loadable({
  //     loader: () => import("@/pages/system/permission/data"),
  //     loading: BoxLoading,
  //   }),
  // },
  // 菜单
  {
    id: "wx_system_menu",
    component: Loadable({
      loader: () => import("@/pages/system/menu"),
      loading: BoxLoading,
    }),
  },
  {
    id: "wx_system_dictionary",
    component: Loadable({
      loader: () => import("@/pages/system/dictionary"),
      loading: BoxLoading,
    }),
  },
  {
    id: "wx_device_dictionary_add",
    component: Loadable({
      loader: () => import("@/pages/system/dictionary/add-form"),
      loading: BoxLoading,
    }),
  },
  {
    id: "wx_device_dictionary_edit",
    component: Loadable({
      loader: () => import("@/pages/system/dictionary/add-form"),
      loading: BoxLoading,
    }),
  },
  // 协议管理
  {
    id: "wx_system_tcp",
    component: Loadable({
      loader: () => import("@/pages/data_gover/tcp"),
      loading: BoxLoading,
    }),
  },
  {
    id: "wx_system_tcp_add",
    component: Loadable({
      loader: () => import("@/pages/data_gover/tcp/add-form"),
      loading: BoxLoading,
    }),
  },
  {
    id: "wx_system_tcp_edit",
    component: Loadable({
      loader: () => import("@/pages/data_gover/tcp/add-form"),
      loading: BoxLoading,
    }),
  },
  //通知管理
  {
    id: "wx_subscription",
    component: Loadable({
      loader: () => import("@/pages/subscription"),
      loading: BoxLoading,
    }),
  },
  {
    id: "wx_subscription_management",
    component: Loadable({
      loader: () => import("@/pages/subscription/subscription-management"),
      loading: BoxLoading,
    }),
  },
  {
    id: "wx_subscription_notification",
    component: Loadable({
      loader: () => import("@/pages/subscription/notification"),
      loading: BoxLoading,
    }),
  },
  // 数据汇聚
  {
    id: "wx_data_gather",
    component: Loadable({
      loader: () => import("@/pages/gather"),
      loading: BoxLoading,
    }),
  },
  {
    id: "wx_access1",
    component: Loadable({
      loader: () => import("@/pages/gather/search"),
      loading: BoxLoading,
    }),
  },
  {
    id: "wx_access_detail1",
    component: Loadable({
      loader: () => import("@/pages/gather/search/mentain"),
      loading: BoxLoading,
    }),
  },
  {
    id: "wx_access1_db",
    component: Loadable({
      loader: () => import("@/pages/gather/search/db"),
      loading: BoxLoading,
    }),
  },
  {
    id: "wx_access1_file",
    component: Loadable({
      loader: () => import("@/pages/gather/search/file"),
      loading: BoxLoading,
    }),
  },
  {
    id: "wx_access1_app",
    component: Loadable({
      loader: () => import("@/pages/gather/search/app"),
      loading: BoxLoading,
    }),
  },
  // 资产库质态
  {
    id: "wx_access1_assetquality",
    component: Loadable({
      loader: () => import("@/pages/gather/state"),
      loading: BoxLoading,
    }),
  },
  //原始库
  {
    id: "wx_access1_assetquality_original",
    component: Loadable({
      loader: () => import("@/pages/gather/state/original"),
      loading: BoxLoading,
    }),
  },
  //设备建档
  {
    id: "wx_access1_equipmentfile",
    component: Loadable({
      loader: () => import("@/pages/gather/search/dashboard"),
      loading: BoxLoading,
    }),
  },
  //数据治理
  {
    id: "wx_approve_access_add1",
    component: Loadable({
      loader: () => import("@/pages/data_gover/group"),
      loading: BoxLoading,
    }),
  },
  {
    id: "wx_approve_access_update1",
    component: Loadable({
      loader: () => import("@/pages/data_gover/tcp"),
      loading: BoxLoading,
    }),
  },
  {
    id: "wx_approve_access_update2",
    component: Loadable({
      loader: () => import("@/pages/data_gover/record"),
      loading: BoxLoading,
    }),
  },
  //应用中心-旅馆
  {
    id: "wx_performance_hotel",
    component: Loadable({
      loader: () => import("@/pages/application/hotel"),
      loading: BoxLoading,
    }),
  },
  //数据资产-业务库
  {
    id: "wx_bussiness",
    component: Loadable({
      loader: () => import("@/pages/query"),
      loading: BoxLoading,
    }),
  },
  // 原设备分组, 业务分组
  {
    id: "wx_group",
    component: Loadable({
      loader: () => import("@/pages/data_gover/group"),
      loading: BoxLoading,
    }),
  },
  // 设备标签
  {
    id: "wx_access_device_tag",
    component: Loadable({
      loader: () => import("@/pages/data_gover/group/device_tag"),
      loading: BoxLoading,
    }),
  },
  {
    id: "wx_governance",
    component: Loadable({
      loader: () => import("@/pages/query/governance"),
      loading: BoxLoading,
    }),
  },
  {
    id: "wx_sync",
    component: Loadable({
      loader: () => import("@/pages/query/governance/sync"),
      loading: BoxLoading,
    }),
  },

  //人车关联
  {
    id: "wx_performance_facemotor",
    component: Loadable({
      loader: () => import("@/pages/application/facemotor"),
      loading: BoxLoading,
    }),
  },
  //原始库双页面
  {
    id: "wx_portrait_noIdentity",
    component: Loadable({
      loader: () => import("@/pages/query/lib/portrait-no"),
      loading: BoxLoading,
    }),
  },
  {
    id: "wx_person_noIdentity",
    component: Loadable({
      loader: () => import("@/pages/query/lib/person-no"),
      loading: BoxLoading,
    }),
  },
  {
    id: "wx_vehicle_noplateno",
    component: Loadable({
      loader: () => import("@/pages/query/lib/vehicle-no"),
      loading: BoxLoading,
    }),
  },
  {
    id: "wx_dataquery_noIdentity",
    component: Loadable({
      loader: () => import("@/pages/query/lib/picture-no"),
      loading: BoxLoading,
    }),
  },
  {
    id: "wx_performance_nofacemotor",
    component: Loadable({
      loader: () => import("@/pages/application/facemotor-no"),
      loading: BoxLoading,
    }),
  },
  // 日志管理
  {
    id: 'wx_log',
    component: Loadable({
      loader: () => import("@/pages/query"),
      loading: BoxLoading,
    }),
  },
  // 操作日志,登录日志

  {
    id: "wx_log_login",
    component: Loadable({
      loader: () => import("@/pages/system/login_record"),
      loading: BoxLoading,
    }),
  },
  {
    id: "wx_log_operate",
    component: Loadable({
      loader: () => import("@/pages/system/operate_record"),
      loading: BoxLoading,
    }),
  },
  // 应用实例
  {
    id: "wx_app_instance",
    component: Loadable({
      loader: () => import("@/pages/service/platform_instance"),
      loading: BoxLoading,
    }),
  },
  // 用户组管理
  {
    id: "wx_user_group",
    component: Loadable({
      loader: () => import("@/pages/system/user_group"),
      loading: BoxLoading,
    }),
  },
  {
    id: "wx_user_group_view_member",
    component: Loadable({
      loader: () => import("@/pages/system/user_group/viewMember"),
      loading: BoxLoading,
    }),
  },
  // 系统管理>应用分组
  {
    id: "wx_system_application_group",
    component: Loadable({
      loader: () => import("@/pages/system/application_group"),
      loading: BoxLoading,
    }),
  },
  //接入转发-实时监控
  {
    id: "wx_access_forward_monitor",
    component: Loadable({
      loader: () => import("@/pages/timely-monitor/monitor"),
      loading: BoxLoading,
    }),
  },
  // 用户管理
  {
    id: "wx_user_manage",
    component: Loadable({
      loader: () => import("@/pages/gather/search"),
      loading: BoxLoading,
    }),
  },

  // 服务引擎报告
  {
    id: "wx_parse_engine_report",
    component: Loadable({
      loader: () => import("@/pages/maintenance/access/report"),
      loading: BoxLoading,
    }),
  },

];
