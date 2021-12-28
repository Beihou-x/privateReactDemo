import webpackMockServer from "webpack-mock-server";

export default webpackMockServer.add((app) => {
  app.get("/api/v2/router", (req, res) => {
    res.json({
      code: 200,
      data: [
        //登录
        {
          id: "wx_login",
          name: "登录",
          path: "/login",
          permission: ["manager", "view"],
          exact: true,
        },
        //可视化大屏
        {
          id: "wx_visualization",
          name: "可视化大屏",
          path: "/visualization",
          routes: [
            // {
            //     id: 'wx_summarizing',
            //     name: '汇总',
            //     permission: ['manager', 'view'],
            //     path: '/visualization/summarize',
            //     exact: true
            // },
            // {
            //     id: 'wx_visualization_monitor',
            //     name: '监控可视化',
            //     permission: ['manager', 'view'],
            //     path: '/visualization/monitor',
            //     exact: true
            // }
            {
              id: "wx_visualization_screen",
              name: "大屏",
              permission: ["manager", "view"],
              path: "/visualization/screen",
              exact: true,
            },
          ],
        },
        {
          id: "wx_basic_layout",
          name: "layout",
          path: "/",
          routes: [
            {
              id: "wx_dashboard",
              name: "可视化管理",
              permission: ["manager", "view"],
              path: "/dashboard",
              routes: [
                {
                  id: "wx_summarizing",
                  name: "汇总",
                  permission: ["manager", "view"],
                  path: "/dashboard/summarize",
                  exact: true,
                },
                {
                  id: "wx_visualization_monitor",
                  name: "监控可视化",
                  permission: ["manager", "view"],
                  path: "/dashboard/monitor",
                  exact: true,
                },
                {
                  id: "wx_screen",
                  name: "大屏",
                  permission: ["manager", "view"],
                  path: "/dashboard/screen",
                  exact: true,
                  redirect: "/visualization/screen",
                },
              ],
            },
            {
              id: "wx_device",
              name: "设备管理",
              permission: ["manager", "view"],
              path: "/device",
              routes: [
                {
                  id: "wx_device_check",
                  name: "登记",
                  permission: ["manager", "view"],
                  path: "/device/check",
                  exact: true,
                },
                {
                  id: "wx_device_check_add",
                  name: "登记新增",
                  permission: ["manager", "view"],
                  path: "/device/DeviceCheck/add",
                  hideInMenu: true,
                  exact: true,
                },
                {
                  id: "wx_device_check_add",
                  name: "登记编辑",
                  permission: ["manager", "view"],
                  path: "/device/DeviceCheck/edit/:id",
                  hideInMenu: true,
                  exact: true,
                },
                {
                  id: "wx_group",
                  name: "分组",
                  permission: ["manager", "view"],
                  path: "/device/group",
                  exact: true,
                },
                {
                  id: "wx_device_permission",
                  name: "权限",
                  permission: ["manager", "view"],
                  path: "/device/permission",
                  exact: true,
                },
                {
                  id: "wx_device_suspension",
                  name: "报停",
                  permission: ["manager", "view"],
                  path: "/device/suspension",
                },
                {
                  id: "wx_device_dictionary",
                  name: "字典",
                  permission: ["manager", "view"],
                  path: "/device/dictionary",
                  exact: true,
                },
                {
                  id: "wx_device_dictionary_add",
                  name: "新增字典",
                  permission: ["manager", "view"],
                  path: "/device/dictionary/add",
                  hideInMenu: true,
                  exact: true,
                },
                {
                  id: "wx_device_dictionary_edit",
                  name: "编辑字典",
                  permission: ["manager", "view"],
                  path: "/device/dictionary/edit/:id",
                  hideInMenu: true,
                  exact: true,
                },
                {
                  id: "wx_device_application",
                  name: "应用",
                  permission: ["manager", "view"],
                  path: "/device/application",
                },
              ],
            },
            {
              id: "wx_data_access",
              name: "数据接入",
              permission: ["manager", "view"],
              path: "/data",
              routes: [
                {
                  id: "wx_access",
                  name: "接入申请",
                  permission: ["wx_access_manager", "wx_access_view"],
                  path: "/data/access",
                  exact: true,
                },
                {
                  id: "wx_access_add",
                  name: "接入申请新增",
                  permission: ["wx_access_add_manager", "wx_access_add_view"],
                  path: "/data/access/add",
                  hideInMenu: true,
                  exact: true,
                },
                {
                  id: "wx_access_detail",
                  name: "申请详情",
                  permission: ["manager", "view"],
                  path: "/data/access/detail/:id",
                  hideInMenu: true,
                  exact: true,
                },
                {
                  id: "wx_access_check",
                  name: "申请校验",
                  permission: ["manager", "view"],
                  path: "/data/access/check/:id",
                  hideInMenu: true,
                  exact: true,
                },
                {
                  id: "wx_access_audit",
                  name: "申请审核",
                  permission: ["manager", "view"],
                  path: "/data/access/audit/:id",
                  hideInMenu: true,
                  exact: true,
                },
                {
                  id: "wx_access_assign",
                  name: "分配服务",
                  permission: ["manager", "view"],
                  path: "/data/access/assign/:id",
                  hideInMenu: true,
                  exact: true,
                },
                {
                  id: "wx_access_management",
                  name: "接入管理",
                  permission: [
                    "wx_access_management_manager",
                    "wx_access_management_view",
                  ],
                  path: "/data/AccessManagement",
                  exact: true,
                },
                {
                  id: "wx_access_management_add",
                  name: "接入管理新增",
                  permission: [
                    "wx_access_management_add_manager",
                    "wx_access_management_add_view",
                  ],
                  path: "/data/AccessManagement/add",
                  hideInMenu: true,
                  exact: true,
                },
                {
                  id: "wx_access_management_update",
                  name: "接入管理更新",
                  permission: [
                    "wx_access_management_update_manager",
                    "wx_access_management_update_manager",
                  ],
                  path: "/data/AccessManagement/update/:id",
                  hideInMenu: true,
                  exact: true,
                },
                {
                  id: "wx_access_management_info",
                  name: "接入管理详情",
                  permission: ["manager", "view"],
                  path: "/data/AccessManagement/info/:id",
                  hideInMenu: true,
                  exact: true,
                },
                {
                  id: "wx_access_group",
                  name: "设备分组",
                  permission: ["manager", "view"],
                  path: "/data/access/group",
                  exact: true,
                },
                {
                  id: "wx_access_test",
                  name: "接入测试",
                  permission: ["manager", "view"],
                  path: "/data/access/test",
                  exact: true,
                },
                // {
                //     id: 'wx_message',
                //     name: '报文查询',
                //     permission: ['manager', 'view'],
                //     path: '/data/message',
                //     exact: true
                // },
                // {
                //     id: 'wx_cache',
                //     name: '缓存查询',
                //     permission: ['manager', 'view'],
                //     path: '/data/cache',
                //     exact: true
                // }
              ],
            },
            {
              id: "wx_data_share",
              name: "数据共享",
              permission: ["manager", "view"],
              path: "/share",
              routes: [
                {
                  id: "wx_approve_access",
                  name: "转发申请",
                  permission: [
                    "wx_approve_access_manager",
                    "wx_approve_access_view",
                  ],
                  path: "/share/ApproveAccess",
                  exact: true,
                },
                {
                  id: "wx_approve_access_add",
                  name: "转发申请新增",
                  permission: [
                    "wx_approve_access_addmanager",
                    "wx_approve_access_add_view",
                  ],
                  path: "/share/ApproveAccess/add",
                  hideInMenu: true,
                  exact: true,
                },
                {
                  id: "wx_approve_access_update",
                  name: "转发申请修改",
                  permission: ["manager", "view"],
                  path: "/share/ApproveAccess/update/:id",
                  hideInMenu: true,
                  exact: true,
                },
                {
                  id: "wx_approve_access_audit",
                  name: "转发申请审核",
                  permission: ["manager", "view"],
                  path: "/share/ApproveAccess/audit/:id",
                  hideInMenu: true,
                  exact: true,
                },
                {
                  id: "wx_approve_management",
                  name: "转发管理",
                  permission: [
                    "wx_approve_management_manager",
                    "wx_approve_access_manager",
                  ],
                  path: "/share/ApproveManagement",
                  exact: true,
                },
                {
                  id: "wx_approve_test",
                  name: "转发测试",
                  permission: ["manager", "view"],
                  path: "/share/test",
                  exact: true,
                },
              ],
            },
            {
              id: "wx_data_query",
              name: "数据查询",
              permission: ["manager", "view"],
              path: "/query",
              routes: [
                {
                  id: "wx_lib",
                  name: "原始库",
                  permission: ["manager", "view"],
                  path: "/query/lib",
                  routes: [
                    {
                      id: "wx_dataquery",
                      name: "数据查询",
                      permission: ["manager", "view"],
                      path: "/query/lib/dataquery",
                      exact: true
                    },
                    {
                      id: "wx_portrait",
                      name: "人像",
                      permission: ["manager", "view"],
                      path: "/query/lib/person",
                      exact: true
                    },
                    {
                      id: "wx_person",
                      name: "人体",
                      permission: ["manager", "view"],
                      path: "/query/lib/portrait",
                      exact: true
                    },
                    {
                      id: "wx_vehicle",
                      name: "车辆",
                      permission: ["manager", "view"],
                      path: "/query/lib/vehicle",
                      exact: true
                    },
                    {
                      id: "wx_picture",
                      name: "图片",
                      permission: ["manager", "view"],
                      path: "/query/lib/picture",
                      exact: true
                    },
                    {
                      id: "wx_fence",
                      name: "电子围栏",
                      permission: ["manager", "view"],
                      path: "/query/lib/fence",
                      exact: true
                    },
                    {
                      id: "wx_network_fence",
                      name: "网络围栏",
                      permission: ["manager", "view"],
                      path: "/query/lib/networkfence",
                      exact: true
                    },
                    {
                      id: "wx_dingdong",
                      name: "叮咚买菜",
                      permission: ["manager", "view"],
                      path: "/query/lib/dingdong",
                      exact: true
                    },
                  ],
                },
                {
                  id: "wx_source",
                  name: "资源库",
                  permission: ["manager", "view"],
                  path: "/query/source",
                  routes: [
                    {
                      id: "wx_source_portrait",
                      name: "人像轨迹",
                      permission: ["manager", "view"],
                      path: "/query/source/portrait",
                      exact: true
                    },
                    {
                      id: "wx_source_vehicle",
                      name: "车辆轨迹",
                      permission: ["manager", "view"],
                      path: "/query/source/vehicle",
                      exact: true
                    }
                  ]
                }
              ],
            },
            {
              id: "wx_maintenance",
              name: "运维管理",
              permission: ["manager", "view"],
              path: "/maintenance",
              routes: [
                {
                  id: "wx_maintenance_device",
                  name: "设备",
                  permission: ["manager", "view"],
                  path: "/maintenance/device",
                  exact: true,
                },
                {
                  id: "wx_maintenance_service",
                  name: "服务",
                  permission: ["manager", "view"],
                  path: "/maintenance/service",
                  exact: true,
                },
                {
                  id: "wx_service_info",
                  name: "服务详情",
                  permission: ["manager", "view"],
                  path: "/maintenance/service/info/:id",
                  exact: true,
                  hideInMenu: true,
                },
                {
                  id: "wx_maintenance_access",
                  name: "接入转发",
                  permission: ["manager", "view"],
                  path: "/maintenance/access",
                  exact: true,
                },
                {
                  id: "wx_service_info",
                  name: "接入转发详情",
                  permission: ["manager", "view"],
                  path: "/maintenance/access/info/:id",
                  exact: true,
                  hideInMenu: true,
                },
              ],
            },
            {
              id: "wx_quality_control",
              name: "质量管理",
              permission: ["manager", "view"],
              path: "/quality",
              routes: [
                {
                  id: "wx_quality",
                  name: "质量",
                  permission: ["manager", "view"],
                  path: "/quality/management",
                  routes: [
                    {
                      id: "wx_collect",
                      name: "采集设备属性异常监测",
                      permission: ["manager", "view"],
                      path: "/quality/management/collect",
                      exact: true,
                    },
                    {
                      id: "wx_car_check",
                      name: "卡口过车数据异常监测",
                      permission: ["manager", "view"],
                      path: "/quality/management/car",
                      exact: true,
                    },
                    {
                      id: "wx_face_capture",
                      name: "人脸抓拍数据异常监测",
                      permission: ["manager", "view"],
                      path: "/quality/management/face",
                      exact: true,
                    },
                    {
                      id: "wx_device_tag",
                      name: "标签设备分布异常监测",
                      permission: ["manager", "view"],
                      path: "/quality/management/tag",
                      exact: true,
                    },
                  ],
                },
              ],
            },
            {
              id: "wx_cluster",
              name: "集群管理",
              permission: ["manager", "view"],
              path: "/cluster",
              routes: [
                {
                  id: "wx_server",
                  name: "服务器管理",
                  permission: ["manager", "view"],
                  path: "/cluster/server",
                  exact: true,
                },
                {
                  id: "wx_management",
                  name: "集群管理",
                  permission: ["manager", "view"],
                  path: "/cluster/management",
                  exact: true,
                },
                {
                  id: "wx_server_add",
                  name: "服务器新增",
                  permission: ["manager", "view"],
                  path: "/cluster/server/add",
                  exact: true,
                  hideInMenu: true,
                },
                {
                  id: "wx_server_update",
                  name: "服务器新增",
                  permission: ["manager", "view"],
                  path: "/cluster/server/update/:id",
                  exact: true,
                  hideInMenu: true,
                },
                {
                  id: "wx_service",
                  name: "服务管理",
                  permission: ["manager", "view"],
                  path: "/cluster/service",
                  exact: true,
                },
                {
                  id: "wx_service_add",
                  name: "服务管理新增",
                  permission: ["manager", "view"],
                  path: "/cluster/service/add",
                  exact: true,
                  hideInMenu: true,
                },
                {
                  id: "wx_service_update",
                  name: "服务管理新增",
                  permission: ["manager", "view"],
                  path: "/cluster/service/update/:id",
                  exact: true,
                  hideInMenu: true,
                },
              ],
            },
            {
              id: "wx_system",
              name: "系统管理",
              permission: ["manager", "view"],
              path: "/system",
              routes: [
                {
                  id: "wx_system_application",
                  name: "应用系统",
                  permission: ["manager", "view"],
                  path: "/system/application",
                  exact: true,
                },
                // {
                //     id: 'wx_system_label',
                //     name: '标签管理',
                //     permission: ['manager', 'view'],
                //     path: '/system/label',
                //     exact: true
                // },
                {
                  id: "wx_system_access",
                  name: "接入来源",
                  permission: ["manager", "view"],
                  path: "/system/access",
                  exact: true,
                },
                {
                  id: "wx_system_tcp",
                  name: "协议管理",
                  permission: ["manager", "view"],
                  path: "/system/tcp",
                  exact: true,
                },
                {
                  id: "wx_system_user",
                  name: "用户管理",
                  permission: ["manager", "view"],
                  path: "/system/user",
                  exact: true,
                },
                {
                  id: "wx_system_department",
                  name: "部门管理",
                  permission: ["manager", "view"],
                  path: "/system/department",
                  exact: true,
                },
                {
                  id: "wx_system_permission",
                  name: "权限配置",
                  permission: ["manager", "view"],
                  path: "/system/permission",
                  exact: true,
                  routes: [
                    {
                      id: "wx_system_permission_role",
                      name: "角色管理",
                      permission: ["manager", "view"],
                      path: "/system/permission/role",
                      exact: true,
                    },
                    {
                      id: "wx_system_permission_operation",
                      name: "操作权限",
                      permission: ["manager", "view"],
                      path: "/system/permission/operation",
                      exact: true,
                    },
                    {
                      id: "wx_system_permission_data",
                      name: "数据权限",
                      permission: ["manager", "view"],
                      path: "/system/permission/data",
                      exact: true,
                    },
                  ],
                },
                {
                  id: "wx_system_login",
                  name: "登录",
                  permission: ["manager", "view"],
                  path: "/system/login",
                  exact: true,
                },
              ],
            },
            {
              id: "wx_subscription",
              name: "订阅管理",
              permission: ["manager", "view"],
              path: "/subscription",
              routes: [
                {
                  id: "wx_subscription_management",
                  name: "订阅管理",
                  permission: ["manager", "view"],
                  path: "/subscription/management",
                  exact: true,
                },
                {
                  id: "wx_subscription_notification",
                  name: "通知查询",
                  permission: ["manager", "view"],
                  path: "/subscription/notification",
                  exact: true,
                },
              ],
            },
          ],
        },
      ],
    });
  });
});
  