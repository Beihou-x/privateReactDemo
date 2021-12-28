import React, { useEffect, useState, useRef } from "react";
import { Table, Card, Spin, Popover, Row, Col } from "antd";
import { QuestionCircleOutlined } from '@ant-design/icons';
import "./index.less";
import moment from "moment";
import { accessDeviceCheckSearch, performanceAppraisalSearch } from "@/services/v2";
import VForm from "@components/VForm";
import Bar from "./charts/bar";
import styles from "./index.less";
import { formatStartData, formatEndData } from "@/utils/utils";

const DeviceOverview = () => {
  const childRef: any = useRef(null);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [dataTable, setDateTable] = useState([]);
  const [data, setData] = useState([]);
  const [statistical, setStatistical]: any = useState([]);

  useEffect(() => {
    searchHandel();
  }, []);

  const getTableData = (val) => {
    // total卡口总数 total1抓拍数据总量total2无抓拍 detect_down抓拍量突降
    let total = val.reduce((pre, currentVal) => {
      return pre + (Number(currentVal.device_num) || 0);
    }, 0);
    let total1 = val.reduce((pre, currentVal) => {
      return pre + (Number(currentVal.access_device_num) || 0);
    }, 0);
    let total2 = val.reduce((pre, currentVal) => {
      return pre + (Number(currentVal.face_num) || 0);
    }, 0);
    let total3 = val.reduce((pre, currentVal) => {
      return pre + (Number(currentVal.super_num) || 0);
    }, 0);
    let total4 = val.reduce((pre, currentVal) => {
      return pre + (Number(currentVal.other_num) || 0);
    }, 0);
    let total5 = val.reduce((pre, currentVal) => {
      return pre + (Number(currentVal.face_capture_num) || 0);
    }, 0);
    let total6 = val.reduce((pre, currentVal) => {
      return pre + (Number(currentVal.car_capture_num) || 0);
    }, 0);

    const arr = [
      {
        name: "一机一档登记总数",
        value: total,
      },
      {
        name: "匹配感知设备总数",
        value: total1,
      },
      {
        name: "人像卡口总数",
        value: total2,
      },
      {
        name: "超级卡口总数",
        value: total3,
      },
      {
        name: "其他卡口总数",
        value: total4
      },
      {
        name: "人像抓拍总量",
        value: total5
      },
      {
        name: "车辆抓拍总量",
        value: total6
      }
    ];
    setStatistical(arr);
  };

  const searchHandel = () => {
    const form = childRef.current.getForm();
    //可以在验证后再获取值
    form
      .validateFields()
      .then(valid => {
        setLoading(true);
        setLoading1(true);
        const start = valid.date
          ? formatStartData(valid.date)
          : null;
        const end = valid.date
          ? formatEndData(valid.date)
          : null;
        // 列表
        accessDeviceCheckSearch({
          start,
          end
        }).then(res => {
          setLoading(false);
          setDateTable(res || []);
          getTableData(res || [])
        });
        // 柱状图
        performanceAppraisalSearch({
          start_time: start
        }).then(res => {
          setLoading1(false);
          setData(res && res.deviceTotal || []);
        });
      })
      .catch(e => { });
  };

  const layoutCol = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  // 修改时间
  const onChangeDate = () => {
    searchHandel();
  };
  const columns = [
    {
      name: "date",
      label: "统计时间",
      type: "datePicker",
      onChange: onChangeDate,
      props: {
        allowClear: false
      }
    },
  ];
  const PopoverContent = () => (
    <div style={{ width: 220 }}>
      车辆卡口,人员卡口,微卡口/泛卡口,电子警察,枪球联动,卡口兼电警,超级卡口,无人机,布控球,4G警车,4G执法记录仪,移动闸机,人证核验
    </div>
  )
  const PopoverContentOther = () => (
    <div style={{ width: 220 }}>
      车辆卡口,微卡口/泛卡口,电子警察,枪球联动,卡口兼电警,无人机,布控球,4G警车,4G执法记录仪,移动闸机,人证核验
    </div>
  )

  const columnsTable: any = [
    {
      title: '区域',
      dataIndex: "name",
      key: "name",
      align: "center"
      // width: 100
    },
    {
      title: <>
        <Popover content={PopoverContent}>
          <QuestionCircleOutlined />{" "}
        </Popover>
        一机一档登记数
      </>,
      dataIndex: "device_num",
      key: "device_num",
      align: "center"
      // width: 100
    },
    {
      title: '匹配感知设备数',
      dataIndex: "access_device_num",
      key: "access_device_num",
      align: "center"
      // width: 100
    },
    {
      title: '人像卡口数',
      dataIndex: "face_num",
      key: "face_num",
      align: "center"
      // width: 100
    },
    {
      title: '超级卡口数',
      dataIndex: "super_num",
      key: "super_num",
      align: "center"
      // width: 100
    },
    {
      title: <>
        <Popover content={PopoverContentOther}>
          <QuestionCircleOutlined />{" "}
        </Popover>
        其他卡口数
      </>,
      dataIndex: "other_num",
      key: "other_num",
      align: "center"
    },
    {
      title: '人像抓拍量',
      dataIndex: "face_capture_num",
      key: "face_capture_num",
      align: "center"
      // width: 100
    },
    {
      title: '车辆抓拍量',
      dataIndex: "car_capture_num",
      key: "car_capture_num",
      align: "center"
      // width: 100
    },
  ];

  return (
    <Card bordered={false}>
      <p>各区域设备统计</p>
      <Spin spinning={loading1}>
        <div className={styles.bar}>
          <Bar data={data} />
        </div>
      </Spin>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
        <p>各区域设备情况统计</p>
        <div style={{ paddingRight: 25 }}>
          <VForm
            columns={columns}
            ref={childRef}
            span={24}
            layoutCol={layoutCol}
            initialValues={{ date: moment(new Date()) }}
          />
        </div>
      </div>
      <Card bordered={false} style={{ marginBottom: 10 }}>
        <Row gutter={[10, 10]}>
          {(statistical || []).map((item, index) => (
            <Col span={3} key={index}>
              <span>{item.name}</span>
              <span> : </span>
              <span>{item.value}</span>
            </Col>
          ))}
        </Row>
      </Card>
      <Table
        rowKey={"name"}
        dataSource={dataTable}
        columns={columnsTable}
        // scroll={{ y: 240 }}
        bordered
        size="small"
        pagination={false}
        loading={loading}
      />
    </Card>
  );
};

export default DeviceOverview;
