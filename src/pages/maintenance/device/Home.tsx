import React, { useEffect, useState } from "react";
import { Card, Table, Popover, Row, Col } from "antd";
import { QuestionCircleOutlined } from '@ant-design/icons';
import Modal from "./Modal";
import { viewAll } from "@/services/v2";

const Home = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [tableType, setTableType] = useState({});
  const [tableData, setTableData]: any = useState([]);
  const [pagination, setPagination] = useState({
    total: 0,
    pageSize: 13,
    pageNumber: 1,
    showSizeChanger: true,
    showQuickJumper: true,
    current: 1,
  });
  const [statistical, setStatistical]: any = useState([]);
  useEffect(() => {
    getData();
  }, [pagination.current, pagination.pageSize]);

  const getData = () => {
    viewAll({
      offset:
        (pagination.current &&
          pagination.pageSize &&
          (pagination.current - 1) * pagination.pageSize) ||
        0,
      limit: pagination.pageSize || 10,
    }).then((res) => {
      // setHeadData(res.operationDeviceIDMonitor)
      setTableData(res.operationDeviceOverview || []);
      getTableData(res.operationDeviceOverview || [])
    });
  };

  const showModal = (isShow, type, place) => {
    setTableType({
      type,
      place
    })
    handleModalVisible(isShow);
  }
  const handleModalVisible = (isShow) => {
    setModalVisible(isShow);
  };

  const getTableData = (val) => {
    // total卡口总数 total1抓拍数据总量total2无抓拍 detect_down抓拍量突降
    let total = val.reduce((pre, currentVal) => {
      return pre + (Number(currentVal.collection_device_num) || 0);
    }, 0);
    let total1 = val.reduce((pre, currentVal) => {
      return pre + (Number(currentVal.normal_device_num) || 0);
    }, 0);
    let total2 = val.reduce((pre, currentVal) => {
      return pre + (Number(currentVal.abnormal_deviceId_num) || 0);
    }, 0);
    let total3 = val.reduce((pre, currentVal) => {
      return pre + (Number(currentVal.abnormal_longitude_latitude_num) || 0);
    }, 0);
    let total4 = val.reduce((pre, currentVal) => {
      return pre + (Number(currentVal.abnormal_time_num) || 0);
    }, 0);

    const arr = [
      {
        name: "采集设备数",
        value: total,
      },
      {
        name: "检测设备正常数",
        value: total1,
      },
      {
        name: "编码异常设备数",
        value: total2,
      },
      {
        name: "经纬度异常设备数",
        value: total3,
      },
      {
        name: "时间异常设备数",
        value: total4,
      },
    ];
    setStatistical(arr);
  };
  const columns: any = [
    {
      dataIndex: "unit_name",
      title: "组织区域",
      align: "center",
    },
    {
      dataIndex: "device_type",
      title: "设备类型",
      align: "center",
    },
    {
      dataIndex: "collection_device_num",
      title: "采集设备数",
      align: "center",
    },
    {
      dataIndex: "normal_device_num",
      title: "检测设备正常数",
      align: "center",
    },

    {
      title: <>
        <Popover content="1、编码长度不等于20位; 2、设备编码前6位不符合标准; 3、设备编码11至13位不符合标准">
          <QuestionCircleOutlined />{" "}
        </Popover>
        编码异常设备数
      </>,
      dataIndex: "abnormal_deviceId_num",
      align: "center",
      render: (val, record) => (
        <a onClick={() => showModal(true, "operation_device_Id", record.unit_name)}>{val}</a>
      )
    },
    {
      title: <>
        <Popover content="1、设备经纬度缺失; 2、设备经纬度精度小于6位; 3、设备不在辖区">
          <QuestionCircleOutlined />{" "}
        </Popover>
        经纬度异常设备数
      </>,
      dataIndex: "abnormal_longitude_latitude_num",
      align: "center",
      render: (val, record) => (
        <a onClick={() => showModal(true, "operation_device_LoLa", record.unit_name)}>{val}</a>
      )
    },
    {
      title: <>
        <Popover content="1、设备倒挂; 2、设备延迟">
          <QuestionCircleOutlined />{" "}
        </Popover>
        时间异常设备数
      </>,
      dataIndex: "abnormal_time_num",
      align: "center",
      render: (val, record) => (
        <a onClick={() => showModal(true, "operation_device_time", record.unit_name)}>{val}</a>
      )
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
        <Table
          bordered
          columns={columns}
          dataSource={tableData}
          rowKey="unit_name"
          pagination={false}
        ></Table>
        {modalVisible ? (
          <Modal
            modalVisible={modalVisible}
            handleModalVisible={handleModalVisible}
            tableParams={tableType}
          />
        ) : (
          ""
        )}
      </Card>
    </>
  );
};

export default Home;
