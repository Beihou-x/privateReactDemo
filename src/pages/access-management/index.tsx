import React, { useContext, useEffect, useState } from "react";
import StandardTable from "@components/Table";
import SearchForm from "@components/SearchForm";
import {
  Input,
  Select,
  Card,
  message,
  Button,
  Divider,
  Spin,
  Radio,
} from "antd";
import {
  accessSearch,
  accessDelete,
  accessUpload,
  accessManageImportDownloadTemplate,
  accessManageSearchkDownloadTemplate,
  deviceStatusCount,
  sourceSearch,
  accessImport,
  accessManageExport,
} from "@/services/v1";
import DownLoadFile from "@components/DownLoadFile";
import DownloadTemplate from "@components/DownloadTemplate";
import { Link } from "react-router-dom";
import { DefaultPubSubContext } from "@components/PubSubscribe";
import ModalForm from "@components/Modal";
import Upload from "@components/Upload";
import ExpandedRow from "./ExpandedRow";
import styles from "./index.less";
import { WarningOutlined, GoldOutlined } from "@ant-design/icons";
import { formatDate, filterCategory, getCodeValue,getDeviceStatus } from "@/utils/utils";
import moment from "moment"
const { Option } = Select;

const AccessManagement = () => {

  const { pushlist }: any = useContext(DefaultPubSubContext);
  const { subscribe, unsubscribe }: any = useContext(DefaultPubSubContext);

  const [data, setData]: any = useState({});
  const [loading, setLoading] = useState(false);
  const [expandedRowKeys, setRowKeys]: any = useState([]);
  // 类型 
  const [typeValue, setTypeValue] = useState('');
  // 来源
  const [sourceValue, setSourceValue] = useState('');

  // 搜索条件保存,用于导出传参
  const [searchParams, setSearchParams] = useState({});
  const handleRowExpand = (id) => {
    const index = expandedRowKeys.findIndex((q) => q === id);

    if (index > -1) {
      setRowKeys([]);
    } else {
      setRowKeys([id]);
    }
  };

  useEffect(() => {
    getData();
    subscribe('resetTypeFunction', setTypeValue);
    subscribe('resetTypeFunction', setSourceValue);
    return () => {
      unsubscribe('resetTypeFunction', setTypeValue);
      unsubscribe('resetTypeFunction', setSourceValue);
    }
  }, []);

  const getData = async () => {
    // 设备异常数
    setLoading(true);
    deviceStatusCount({
      names: {
        function_type: ["1", "2", "3", "25", "13", "26", "21", "28", "20"],
        source: [
          "姑苏区",
          "吴中区",
          "相城区",
          "园区",
          "常熟",
          "度假区",
          "张家港",
          "新区",
          "太仓市",
          "昆山市",
          "吴江",
          "交警",
          "轨交"
        ],
      },
    }).then((res) => {
      setLoading(false);
      if (res) {
        setData(res);
      }
    });
  };

  const getStatus = (val, request_at) => {
    if (val === "2" || val === "3" && Number(request_at) >= moment().startOf("day").unix()) {
      return "异常"
    } else {
      return "正常"
    }
  }

  const columns = [
    {
      title: "申请编号",
      dataIndex: "access_id",
      width: 200,
      ellipsis: true,
      align: "center",
    },
    {
      title: "国标ID",
      dataIndex: "device_id",
      width: 200,
      ellipsis: true,
      align: "center",
    },
    {
      title: "设备名称",
      dataIndex: "alias",
      width: 200,
      ellipsis: true,
      align: "center",
    },
    {
      title: "接入来源",
      dataIndex: "source",
      width: 100,
      ellipsis: true,
      align: "center",
    },
    {
      title: "卡口类型",
      dataIndex: "function_type",
      width: 100,
      ellipsis: true,
      align: "center",
    },
    {
      title: "模型",
      dataIndex: "protocol_name",
      width: 100,
      ellipsis: true,
      align: "center",
    },
    {
      title: "检测状态",
      dataIndex: "sync_status",
      align: "center",
      width: 100,
      ellipsis: true,
      render: (val, record) => (
        <span>{getStatus(record.sync_status, record.request_at)}</span>
      )
    },
    {
      title: "设备状态",
      // dataIndex: "sync_status",
      align: "center",
      width: 100,
      ellipsis: true,
      render: (val, record) => (
        <span>{getDeviceStatus(record.sync_status)}</span>
      )
    },
    {
      width: 200,
      title: "最后抓拍时间",
      dataIndex: "capture_at",
      ellipsis: true,
      align: "center",
      render: (val, record) => (
        <span>{formatDate(record && record.capture_at, "YYYY-MM-DD")}</span>
      ),
    },
    {
      width: 200,
      title: "最后上传时间",
      dataIndex: "request_at",
      ellipsis: true,
      align: "center",
      render: (val, record) => (
        <span>{formatDate(record && record.request_at, "YYYY-MM-DD")}</span>
      ),
    },
    {
      title: "是否注册一机一档",
      dataIndex: "is_sync",
      width: 80,
      ellipsis: true,
      align: "center",
    },
    {
      title: "是否注册人像引擎",
      dataIndex: "is_vendor_register",
      width: 80,
      ellipsis: true,
      align: "center",
    },
    {
      title: "经度",
      dataIndex: "longitude",
      width: 80,
      ellipsis: true,
      align: "center",
    },
    {
      title: "纬度",
      dataIndex: "latitude",
      width: 80,
      ellipsis: true,
      align: "center",
    },
    {
      title: "地点",
      dataIndex: "place",
      width: 200,
      ellipsis: true,
      align: "center",
    },
    {
      title: "设备IP",
      dataIndex: "ipv4",
      width: 100,
      ellipsis: true,
      align: "center",
    },
    {
      title: "设备厂商",
      dataIndex: "manufactor",
      width: 100,
      ellipsis: true,
      align: "center",
    },
    {
      title: "行政区划",
      dataIndex: "place_code",
      width: 100,
      ellipsis: true,
      align: "center",
    },
    {
      title: "标签",
      dataIndex: "tag_name",
      width: 100,
      ellipsis: true,
      align: "center",
    },

    {
      title: "操作",
      width: 100,
      ellipsis: true,
      fixed: "right",
      render: (val) => (
        <>
          <Link
            to={`/device/wx_access_device/AccessManagement/info/${(val && val.id) || ""}/${(val && val.device_id) || ""
              }`}
          >
            验证
          </Link>
          {/* <Link to={{pathname: '/gather/data/AccessManagement/info',state:{id: val.id}}}>
            详情
          </Link> */}
          <Divider type="vertical" />
          <Link
            to={`/device/wx_access_device/AccessManagement/update/${(val && val.id) || ""}`}
          >
            配置
          </Link>
          <Divider type="vertical" />
          <a onClick={() => handleRowExpand(val.id)}>接入报告</a>
          <Divider type="vertical" />
          <Link
            to={`/gather/data/AccessManagement/operation_record/${(val && val.device_id) || ""
              }`}
          >
            查看日志
          </Link>
          <Divider type="vertical" />
          <Link to={`/device/wx_access_device/device/check/access_info/${val.device_id}`}>接入信息</Link>

          {/* <Divider type="vertical" />
          <Popconfirm
            title="是否删除本条数据"
            onConfirm={() => handleDelete(val)}
          >
            <a>删除</a>
          </Popconfirm> */}
        </>
      ),
    },
  ];
  const formLayout = {
    labelCol: { span: 12 },
    wrapperCol: { span: 6 },
  };

  const typeChange = (val) => {
    setTypeValue(val.target.value)
  }

  const typeClick = val => {
    const obj: any = { ...searchParams };
    if (sourceValue) {
      obj.source = sourceValue
    }
    if (val === typeValue) {
      setTypeValue('')
      pushlist('table:search', Object.keys(obj).length ? { ...obj } : null)
    } else {
      pushlist('table:search', { ...obj, function_type: val })

    }
  }

  const sourceChange = val => {
    setSourceValue(val.target.value);
  }

  const sourceClick = val => {
    const obj: any = { ...searchParams };
    if (typeValue) {
      obj.function_type = typeValue
    }

    if (val === sourceValue) {
      setSourceValue('');
      pushlist('table:search', Object.keys(obj).length ? { ...obj } : null);
    } else {
      pushlist('table:search', { ...obj, source: val })
    }
  }

  const importEmit = (val) => {
    if (val === "error") {
      message.error("导入失败");
      pushlist("modalForm", false);
    } else if (val === "submit") {
      message.success("导入成功");
      pushlist("modalForm", false);
      pushlist("table:search", {});
    }
  };

  const checkEmit = (val, res) => {
    if (val === "error") {
      message.error("检索失败");
      pushlist("deviceImport", false);
    } else if (val === "submit") {
      window.open(res);
      message.success("检索成功");
      pushlist("deviceImport", false);
    }
  };
  const onSearchChange = (params) => {
    setSearchParams(params);
  }
  return (
    <>
      <Card bordered={false} className={styles.top}>
        <Spin spinning={loading}>
          <div className={styles.flex}>
            <div>
              <GoldOutlined /> 设备总数：{data.total || 0}
            </div>
            <div style={{ marginLeft: 30 }}>
              <WarningOutlined /> 异常设备数：
              <span className={styles.error}>{data.abnormal_total || 0}</span>
            </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.label}>类型 </div>
            {data.function_type_status_num ? (
              <Radio.Group buttonStyle="solid" onChange={typeChange} value={typeValue} >
                {data.function_type_status_num.map((m) => (
                  m.name ? (
                    <Radio.Button key={m.name} style={{ marginLeft: 20 }} value={m.name} onClick={() => typeClick(m.name)}>
                      {m.name} {m.device_num}
                    </Radio.Button>
                  ) : (
                    ""
                  )
                ))}
              </Radio.Group>
            ) : (
              ""
            )}
          </div>
          <div className={styles.flex}>
            <div className={styles.label}>来源 </div>
            {data.sourceid_status_num ? (
              <Radio.Group buttonStyle="solid" onChange={sourceChange} value={sourceValue}>
                {data.sourceid_status_num.map((m) => (
                  m.name ? (
                    <Radio.Button key={m.name} style={{ marginLeft: 20 }} value={m.name} onClick={() => sourceClick(m.name)}>
                      {m.name} {m.device_num}
                    </Radio.Button>
                  ) : (
                    ""
                  )
                ))}
              </Radio.Group>
            ) : (
              ""
            )}
          </div>
        </Spin>
      </Card>

      <Card bordered={false}>
        <SearchForm
          formList={[
            {
              label: "申请编号",
              name: "access_id",
              renderFormItem: () => <Input autoComplete="off" />,
            },
            {
              label: "设备ID",
              name: "device_id",
              renderFormItem: () => <Input autoComplete="off" />,
            },
            {
              label: "设备名称",
              name: "alias",
              renderFormItem: () => <Input autoComplete="off" />,
            },
            {
              label: "检测状态",
              name: "status",
              renderFormItem: () => (
                <Select allowClear>
                  <Option value="0">异常</Option>
                  <Option value="1">正常</Option>
                </Select>
              )
            },
            {
              label: "设备状态",
              name: "sync_status",
              renderFormItem: () => (
                <Select allowClear>
                  <Option value="1">正常</Option>
                  <Option value="2">报修</Option>
                  <Option value="3">报停</Option>
                </Select>
              ),
            },
          ]}
          onChange={(params) => onSearchChange(params)}
          formLayout={formLayout}
          className="accessForm"

        />
        <Button type="primary" style={{ marginRight: 20, marginBottom: 18 }}><Link to="/device/wx_access_device/AccessManagement/add">登记</Link></Button>
        <Button
          style={{ marginRight: 20 }}
          onClick={() => {
            pushlist("modalForm", true);
          }}
          type="primary"
        >
          导入设备
        </Button>
        <DownLoadFile
          style={{ marginRight: 20, marginBottom: 18 }}
          services={() => {
            return accessManageExport(
              {
                ...searchParams,
                function_type: typeValue,
                source: sourceValue
              }
            );
          }}
        >
          导出
        </DownLoadFile>
        {/* <Button type="primary" onClick={() => pushlist("deviceImport", true)}>
          检索
        </Button> */}

        <StandardTable
          columns={columns}
          services={(params) => {
            let obj: any = {};
            if (typeValue) {
              obj.function_type = typeValue
            }
            if (sourceValue) {
              obj.source = sourceValue
            }

            return accessSearch({ ...params, ...obj })
          }}
          rowSelection={false}
          tableProps={{
            tableLayout: "fixed",
            scroll: {
              x: "auto",
            },
            expandable: {
              expandedRowRender: (record) => <ExpandedRow values={record} />,
              expandIcon: () => { },
              expandIconColumnIndex: -1,
              expandedRowKeys: expandedRowKeys,
            },
          }}
        />
      </Card>
      <ModalForm subscribeName="modalForm" title="设备导入">
        <DownloadTemplate
          services={() => {
            return accessManageImportDownloadTemplate();
          }}
          type="link"
        >
          下载模板
        </DownloadTemplate>
        <Upload
          services={({ formData }) => {
            return accessImport({
              file: formData,
            });
          }}
          onEmit={importEmit}
        />
      </ModalForm>
      <ModalForm subscribeName="deviceImport" title="检索">
        <DownloadTemplate
          services={() => {
            return accessManageSearchkDownloadTemplate();
          }}
          type="link"
        >
          下载模板
        </DownloadTemplate>
        <Upload
          services={({ formData }) => {
            return accessUpload({
              file: formData,
            });
          }}
          onEmit={checkEmit}
        />
      </ModalForm>
    </>
  );
};

export default AccessManagement;
