import React, { useContext, useEffect, useState, useRef } from "react";
import StandardTable from "@components/Table";
import SearchForm from "@components/SearchForm";
import {
  Input,
  Select,
  Card,
  Button,
  Divider,
  DatePicker,
  Radio,
  message,
  Row,
  Col,
  Spin,
} from "antd";
import { GoldOutlined, HistoryOutlined, CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import {
  deviceSyncSearch,
  deviceSyncDelete,
  deviceSyncDiscriptionSearch,
  deviceSyncDeleteBatch,
  deviceSyncCount,
} from "@/services/v1";
import { deviceImport, downloadDeviceTemplate, operateRecordSearch } from "@/services/v2";
import { Link } from "react-router-dom";
import { DefaultPubSubContext } from "@components/PubSubscribe";
import { formatDate, formatDatetime, formatStartData, formatEndData, filterCategory } from "@/utils/utils";
import Upload from "@components/Upload";
import DownloadTemplate from "@components/DownloadTemplate";
import ModalForm from "@components/Modal";
import styles from "./index.less";


const { Option } = Select;
const { RangePicker } = DatePicker;

const Check = () => {
  const { pushlist, subscribe, unsubscribe } = useContext(DefaultPubSubContext);
  const [expandedRowKeys, setRowKeys]: any = useState([]);
  const [discriptions, setDiscriptions]: any = useState([]);
  const [selectedKeys, setSelectedKeys]: any = useState([]);
  const [total, setTotal] = useState(0);
  const [baseInfo, setBaseInfo]: any = useState({});
  const tableRef: any = useRef();
  const [loading, setLoading] = useState(false);
  const [data, setData]: any = useState([]);
  // 搜索条件保存,用于导出传参
  const [searchParams, setSearchParams] = useState({});
  // 来源
  const [sourceValue, setSourceValue] = useState('');

  useEffect(() => {
    deviceSyncDiscriptionSearch({}).then((res) => {
      setDiscriptions(res || []);
    });
    getBaseInfo();
    getData();
    subscribe('resetTypeFunction', setSourceValue);
    return () => {
      unsubscribe('resetTypeFunction', setSourceValue);
    }
  }, []);

  // 来源
  const getData = async () => {
    // 设备异常数
    setLoading(true);
    deviceSyncCount({
    }).then((res) => {
      setLoading(false);
      setData(res || []);
    });
  };

  // 获取基本信息
  const getBaseInfo = () => {
    operateRecordSearch({
      action: 'device_sync',
      limit: 1,
      offset: 0,
    }).then(res => {
      setBaseInfo(res && res.items && res.items[0] || {})
    })
  }

  //删除
  const handleDelete = async (id) => {
    try {
      await deviceSyncDelete({ id });
      pushlist("table:delete");
    } catch (e) {
      message.error(`${e}`);
    }
  };

  const handleRowExpand = (id) => {
    const index = expandedRowKeys.findIndex((q) => q === id);

    if (index > -1) {
      setRowKeys([]);
    } else {
      setRowKeys([id]);
    }
  };

  const renderTable = ({ record }) => {
    const keys = Object.keys(record);
    const obj = {
      ...record,
      created_at: formatDate(record && record.created_at, "YYYY-MM-DD"),
      updated_at: formatDate(record && record.updated_at, "YYYY-MM-DD"),
    };
    const items = discriptions.filter(f => keys.includes(f.name) && !f.hidden);
    return (
      <Row>
        {(items || []).map((item) => (
          <Col span={4} key={JSON.stringify(item)}>
            <div style={{ padding: "2px 10px" }}>
              <span>{item.display}：</span>
              <span>{obj[item.name]}</span>
            </div>
          </Col>
        ))}
      </Row>
    );
  };

  const columns = [
    {
      title: "摄像机功能类型",
      ellipsis: true,
      dataIndex: ["function_type"],
    },
    {
      title: "设备编码",
      ellipsis: true,
      dataIndex: ["id"],
    },
    {
      title: "设备名称",
      ellipsis: true,
      dataIndex: ["sync_name"],
    },
    {
      title: "设备厂商",
      ellipsis: true,
      dataIndex: ["manufactor_code"],
    },
    {
      title: "设备状态",
      ellipsis: true,
      dataIndex: ["status"],
      render: val => (
        <span>{val == "1" ? "正常" : val == "2" ? "报修" : "报停"}</span>
      )
    },
    {
      title: "行政区域",
      ellipsis: true,
      dataIndex: ["place_name"],
    },
    {
      title: "安装地址",
      ellipsis: true,
      dataIndex: ["sync_name"],
    },
    {
      title: "安装时间",
      ellipsis: true,
      dataIndex: ["install_time"],
      render: (val) => <span>{formatDatetime(val, 'YYYY-MM-DD HH:mm:ss')}</span>
    },
    {
      title: "经度",
      ellipsis: true,
      dataIndex: ["longitude"],
    },
    {
      title: "纬度",
      ellipsis: true,
      dataIndex: ["latitude"],
    },
    {
      title: "操作",
      ellipsis: true,
      fixed: "right",
      render: (val) => (
        <>
          {/* <Link to={`/device/DeviceCheck/edit/${val.id}`}>编辑</Link>
          <Divider type="vertical" /> */}
          {/* <a>点位</a>
          <Divider type="vertical" /> */}
          <a onClick={() => handleRowExpand(val.id)}>详情</a>
          {/* <Divider type="vertical" />
          <Link to={`/device/wx_device_file/device/check/access_info/${val.id}`}>接入信息</Link>
          <Divider type="vertical" />
          <Link to={`/device/wx_device_check_record/${val.id}`}>设备日志</Link> */}
          {/* <Popconfirm
            title="是否删除本条数据"
            onConfirm={() => handleDelete(val.id)}
          >
            <a>删除</a>
          </Popconfirm> */}
        </>
      ),
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedKeys(selectedRowKeys);
    },
    getCheckboxProps: (record) => ({
      id: record["id"],
    }),
  };

  const onBatchDelete = () => {
    deviceSyncDeleteBatch({ ids: selectedKeys }).then((res) => {
      pushlist("table:delete");
      setSelectedKeys([]);
    });
  };
  const checkEmit = (type, res) => {
    if (type === 'submit') {
      if (res) {
        message.success(`一共读取${res.count}条数据, 成功插入${res.success}条, 失败${res.failed}条`, 6);
      }
      pushlist('table:search')
      pushlist('deviceImport', false);
    } else {
      message.error('导入失败');
    }
  }

  const getTotal = val => {
    setTotal(val)

  }
  const sourceChange = val => {
    setSourceValue(val.target.value);
  }

  const sourceClick = val => {
    // const obj: any = { ...searchParams };

    // if (val === sourceValue) {
    //   setSourceValue('');
    //   pushlist('table:search', Object.keys(obj).length ? { ...obj } : null);
    // } else {
    //   pushlist('table:search', { ...obj, source: val })
    // }
  }

  const onSearchChange = (params) => {
    setSearchParams(params);
  }

  return (
    <>
      <Card bordered={false} style={{ marginBottom: 10 }}>
        <Spin spinning={loading}>
          <div style={{ lineHeight: '50px' }}>
            <GoldOutlined /> 设备总数：{total || 0}
            <HistoryOutlined style={{ marginLeft: 20 }} /> 最后一次同步时间：{baseInfo.created_at ? formatDate(Number(baseInfo.created_at), 'YYYY-MM-DD HH:mm:ss') : ''}
            <GoldOutlined style={{ marginLeft: 20 }} /> 同步设备数：{baseInfo.objectname ? baseInfo.objectname.split(',')[0] : ''}
            <CheckCircleOutlined style={{ marginLeft: 20 }} /> 成功数：{baseInfo.objectname ? baseInfo.objectname.split(',')[1] : ''}
            <CloseCircleOutlined style={{ marginLeft: 20 }} /> 失败数：{baseInfo.objectname ? baseInfo.objectname.split(',')[2] : ''}
          </div>
          <div className={styles.flex}>
            <div className={styles.label}>来源 </div>
            {data ? (
              <Radio.Group buttonStyle="solid" onChange={sourceChange} value={sourceValue}>
                {data.map((m) => (
                  m.source ? (
                    <Radio.Button key={m.source} style={{ marginLeft: 20 }} value={m.source} onClick={() => sourceClick(m.source)}>
                      {m.source} {m.Total}
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
              label: "设备编码",
              name: "id",
              renderFormItem: () => <Input autoComplete="off" />,
            },
            {
              label: "设备名称",
              name: "alias",
              renderFormItem: () => <Input autoComplete="off" />,
            },
            {
              label: "设备状态",
              name: "status",
              renderFormItem: () => (
                // <Select allowClear />
                <Select>
                  <Option value="1">正常</Option>
                  <Option value="2">报修</Option>
                  <Option value="3">报停</Option>
                </Select>
              ),
            },
            {
              label: "摄像机功能类型",
              name: "function_type",
              renderFormItem: () => (
                <Select options={filterCategory("摄像机功能类型")} allowClear />
              ),
            },
            {
              label: "安装时间",
              name: "install_time",
              renderFormItem: () => <RangePicker></RangePicker>,
            },
          ]}
          onChange={(params) => onSearchChange(params)}
        />
        <div style={{ display: "flex" }}>
          {/* <Button type="primary" style={{ marginRight: 20, marginBottom: 18 }}>
          <Link to="/device/DeviceCheck/add">登记</Link>
        </Button> */}
          <span style={{ marginRight: 20, marginBottom: 18 }}>
            {/* <UploadFile
            services={(params) => {
              return deviceSyncImport({
                ...params,
              }).then((res) => {
                console.log("res", res);
                if (res && !Object.keys(res).length) {
                  message.success("导入成功");
                  const tableR = tableRef;
                  tableR.current.handleSearch();
                } else {
                  message.error(res.message);
                }
              });
            }}
            submit={() => {}}
          >
            导入
          </UploadFile> */}
            <Button
              type="primary"
              onClick={() => {
                pushlist("deviceImport", true);
              }}
            >
              导入
            </Button>
          </span>
          {/* <Button
          type="primary"
          danger
          style={{ marginRight: 20, marginBottom: 18 }}
          disabled={!selectedKeys.length}
        >
          <Popconfirm title="是否删除数据" onConfirm={() => onBatchDelete()}>
            <a>批量删除</a>
          </Popconfirm>
        </Button> */}
        </div>
        <StandardTable
          ref={tableRef}
          columns={columns}
          services={(params: any) => {
            let obj: any = { ...params };
            // if (sourceValue) {
            //   obj.source = sourceValue
            // }
            if (params && params.install_time) {
              obj.install_time = [
                formatStartData(params.install_time[0], "x"),
                formatEndData(params.install_time[1], "x"),
              ];
            }
            return deviceSyncSearch({ ...obj });
          }}
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          tableProps={{
            tableLayout: "fixed",
            scroll: {
              x: "auto",
            },
            expandedRowKeys: expandedRowKeys,
            expandIcon: () => false,
            expandIconColumnIndex: -1,
            expandedRowRender: (record) => renderTable({ record }),
          }}
          getTotal={getTotal}
        />
        <ModalForm subscribeName="deviceImport" title="导入">
          <DownloadTemplate
            services={() => {
              return downloadDeviceTemplate({});
            }}
            type="link"
          >
            下载模板
          </DownloadTemplate>
          <Upload
            services={({ formData }) => {
              return deviceImport({
                file: formData,
              });
            }}
            onEmit={checkEmit}
          />
        </ModalForm>

      </Card>
    </>
  );
};

export default Check;
