import React, { useState, useRef, useEffect } from "react";
import StandardTable from "@components/Table";
import { Card, Tooltip, Table, Row, Col } from "antd";
import { deviceOverview, deviceOverviewExport } from "@/services/v2";
import DownLoadFile from "@components/DownLoadFile";
import { format } from "@/utils/utils";
import Modal from "./Modal";
import { QuestionCircleOutlined } from '@ant-design/icons';

const DeviceOverview = () => {
  const [tableData, setTableData]: any = useState([]);
  const [loading, setLoading] = useState(false);
  // 点击 弹框显示数据
  const [modalVisible, setModalVisible] = useState(false);
  const [tableParams, setTableParams]: any = useState({});
  // 点击展示的列表数据不一样,两种情况
  const [columnType, setColumnType] = useState('');
  const [statistical, setStatistical]: any = useState([]);

  useEffect(() => {
    setLoading(true);
    deviceOverview({})
      .then((res) => {
        setLoading(false);
        setTableData(res.items);
        getTableData(res.items);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);
  const getTableData = (val) => {
    // total卡口总数 total1抓拍数据总量total2无抓拍 detect_down抓拍量突降
    let total = val.reduce((pre, currentVal) => {
      return pre + (Number(currentVal.device_num) || 0);
    }, 0);
    let total1 = val.reduce((pre, currentVal) => {
      return pre + (Number(currentVal.register_num) || 0);
    }, 0);
    let total2 = val.reduce((pre, currentVal) => {
      return pre + (Number(currentVal.test_device_num) || 0);
    }, 0);
    let total3 = val.reduce((pre, currentVal) => {
      return pre + (Number(currentVal.no_capture_num) || 0);
    }, 0);
    let total4 = val.reduce((pre, currentVal) => {
      return pre + (Number(currentVal.detect_download) || 0);
    }, 0);
    const arr = [
      {
        name: "一机一档设备总数",
        value: total,
      },
      {
        name: "登记设备总数",
        value: total1,
      },
      {
        name: "今日检测状态异常总数",
        value: total2,
      },
      {
        name: "今日无抓拍设备总数",
        value: total3,
      },
      {
        name: "抓拍量突降设备总数",
        value: total4
      }
    ];
    setStatistical(arr);
  };

  const handleModalVisible = (isShow) => {
    setModalVisible(isShow);
  };
  const showDetail = (isShow, record, type, columnType) => {
    const obj = {
      place_code: record.place_code,
      type: type
    };
    setTableParams(obj);
    handleModalVisible(isShow);
    setColumnType(columnType)
  };

  const columns: any = [
    { dataIndex: "place", title: "区域名称", align: "center" },
    { dataIndex: "place_code", title: "区域编码", align: "center" },
    {
      dataIndex: "device_num",
      title: "一机一档设备数",
      align: "center",
      render: (val, record) => <a onClick={() => showDetail(true, record, "sync_device", "one")}>{val || 0}</a>,
    },
    {
      dataIndex: "register_num",
      title: "登记设备数",
      align: "center",
      render: (val, record) => <a onClick={() => showDetail(true, record, "access_device", "two")}>{val || 0}</a>,
    },
    // {
    //   dataIndex: "yesterday_alive_all",
    //   title: "今日活跃登记设备数",
    //   align: "center",
    //   render: (val, record) => <a onClick={() => showDetail(true, record, "alive_access_device","two")}>{val || 0}</a>,
    // },
    {
      dataIndex: "test_device_num",
      title: "今日检测状态异常数",
      align: "center",
      render: (val, record) => <span style={{ color: Number(val) > 0 ? 'red' : '#1890ff', cursor: 'pointer' }} onClick={() => showDetail(true, record, "check_abnormal", "two")}>{val || 0}</span>,
    },
    {
      dataIndex: "no_capture_num",
      title: "今日无抓拍设备数",
      align: "center",
      render: (val, record) => <span style={{ color: Number(val) > 0 ? 'red' : '#1890ff', cursor: 'pointer' }} onClick={() => showDetail(true, record, "no_data", "two")}>{val || 0}</span>,
    },
    // 登记不活跃=无抓拍
    {
      dataIndex: "yesterday_alive_quality",
      title: <><Tooltip title="当日登记不活跃设备数/登记设备数"><QuestionCircleOutlined /></Tooltip> 今日登记不活跃率</>,
      align: "center",
      render: (val, record) => <a onClick={() => showDetail(true, record, "no_data", "two")}>{(100 - format(val)).toFixed(2) || 0}%</a>,
    },
    {
      dataIndex: "delay_num_timely_quality",
      title: <><Tooltip title="当日登记延迟设备数(请求时间-抓拍时间>30)/登记设备数"><QuestionCircleOutlined /></Tooltip> 今日设备延迟率</>,
      align: "center",
      render: (val, record) => <a onClick={() => showDetail(true, record, "un_timely_device", "two")}>{(100 - format(val)).toFixed(2) || 0}%</a>,
    },
    {
      dataIndex: "down_num_quality",
      title: <><Tooltip title="当日登记倒挂设备数(请求时间<抓拍时间)/登记设备数"><QuestionCircleOutlined /></Tooltip> 今日设备倒挂率</>,
      align: "center",
      render: (val, record) => <a onClick={() => showDetail(true, record, "upside_down", "two")}>{(val && format(val)) || 0}%</a>,
    },

    {
      dataIndex: "un_complete_quality",
      title: <><Tooltip title="当日接收完整报文数/当日接收报文总数"><QuestionCircleOutlined /></Tooltip> 今日数据完整率</>,
      align: "center",
      render: (val, record) => (
        <a onClick={() => showDetail(true, record, "un_complete", "two")}>{val && format(val) || 0}%</a>
      )
    },
    {
      dataIndex: "detect_download",
      title: "抓拍量突降设备数",
      align: "center",
      render: (val, record) => <span style={{ color: Number(val) > 0 ? 'red' : '#1890ff', cursor: 'pointer' }} onClick={() => showDetail(true, record, "detect_download", "two")}>{val || 0}</span>,
    },
  ];

  return (
    <>
      <Card bordered={false} style={{ marginBottom: 10 }}>
        <Row gutter={[10, 10]}>
          {(statistical || []).map((item, index) => (
            <Col span={4} key={index}>
              <span>{item.name}</span>
              <span> : </span>
              <span>{item.value}</span>
            </Col>
          ))}
        </Row>
      </Card>
      <Card bordered={false}>
        <DownLoadFile
          services={() => {
            return deviceOverviewExport({});
          }}
          style={{ marginBottom: 20 }}
        >
          导出
        </DownLoadFile>
        {/* <StandardTable
          columns={columns}
          rowSelection={false}
          services={deviceOverview}
        /> */}
        <Table
          loading={loading}
          columns={columns}
          dataSource={tableData}
          rowKey="place_code"
          bordered
          pagination={false}
        ></Table>
        {modalVisible ? (
          <Modal
            modalVisible={modalVisible}
            handleModalVisible={handleModalVisible}
            tableParams={tableParams}
            columnType={columnType}
          />
        ) : (
          ""
        )}
      </Card>
    </>
  );
};

export default DeviceOverview;
