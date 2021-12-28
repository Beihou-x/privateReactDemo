import React, { useEffect, useState } from "react";
import SearchForm from "@components/SearchForm";
import StandardTable from "@components/Table";
import { Input, Divider, Card, Row, Col, Table, Spin, DatePicker } from "antd";
import {
  messageCheckhumanImg,
  totalDailyUseOne
} from "@/services/v1";
import {
  messageDeviceInfo,
  operateRecordSearch
} from "@/services/v2";
import moment from 'moment'
import styles from "./index.less";
import {formatDate,getDeviceStatus} from "@/utils/utils";
import sevenDay from "@/assets/access_management/seven_day.png";
import todayPic from "@/assets/access_management/today_pic.png";
import todayCar from "@/assets/access_management/today_car.png";
import TotalCard from "@/pages/access-management/components/TotalCard";
import TotalGraph from "@/pages/access-management/components/TotalGraph";

const { RangePicker } = DatePicker;
const MessageManagement = () => {
  useEffect(() => { }, []);
  // 使用一期接口查询的七天和当天数据
  const [todayTotal, setTodayTotal]:any = useState({});
  const [sevenTotal, setSevenTotal]:any = useState({});
  const [tableData, setTableData]:any = useState([]);
  // 查询的设备编码
  const [deviceId, setDeviceId] = useState("");
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [deviceInfo, setDeviceInfo]: any = useState({});

  const [timestamp,setTimestamp] = useState(0);

  const getData = (id) => {
    if(Object.keys(id).length) {
      setLoading(true);
      setDeviceId(id.id);
      totalSearchUseOne({
        device_id: id.id,
        start_at: moment().startOf('day').format("YYYYMMDDHHmmss"),
        end_at: moment().endOf('day').format("YYYYMMDDHHmmss"),
      },setTodayTotal);
      totalSearchUseOne({
        device_id: id.id,
        start_at: moment().subtract(6,"days").startOf('day').format("YYYYMMDDHHmmss"),
        end_at: moment().endOf('day').format("YYYYMMDDHHmmss"),
      },setSevenTotal);
      getDeviceInfo(id.id);
      getTableData(id.id);
      setTimestamp(new Date().getTime());

      setLoading(false);
    }else {
      // 置空
      setDeviceId('');
      setDeviceInfo({});
      setTodayTotal({});
      setSevenTotal({});
      setTableData([]);
    }
    
  };

  // 一期接口查询
  const totalSearchUseOne = async (params, setData) => {
    try {
      setLoading(true)
      const response = await totalDailyUseOne({ ...params });
      setData(response || {});
      setLoading(false)
    } catch (e) {
      console.error(e);
    }
  }
  // 获取设备基本信息
  const getDeviceInfo = async (id) => {
    try {
      const res = await messageDeviceInfo(id);
      setDeviceInfo(res);
    } catch (e) {
      console.error(e);
    }
  };

  const getTableData = async (id) => {
    try {
      setLoading1(true)
      const res = await operateRecordSearch({
        action: `access_device/${id}`,
        created_ats: [moment().subtract(6,"days").startOf("day").unix(),moment().endOf("day").unix()],
        offset: 0,
        limit: 99
      })
      setTableData(res&&res.items ||[]);
    } catch (e) {
      console.error(e);
    }finally {
      setLoading1(false)
    }
  }
  
  const columns:any = [
    {
      title: "用户名称",
      dataIndex: "user_name",
      align: "center",
    },
    {
      title: "操作内容",
      dataIndex: "action",
      align: "center",
    },
    {
      title: "操作时间",
      dataIndex: "created_at",
      align: "center",
      render: (val) => formatDate(val, "YYYY-MM-DD HH:mm:ss"),
    },
  ];

  return (
    <>
      <Card bordered={false}>
        <SearchForm
          formList={[
            {
              label: "设备编码",
              name: "id",
              renderFormItem: () => <Input autoComplete="off" />,
            },
          ]}
          onChange={getData}
        />
        <Spin tip="Loading..." spinning={loading1}>
          <p className={styles.title}>基础信息</p>
          <Row gutter={[24, 12]}>
            <Col span={6}>设备编码: {(deviceInfo && deviceInfo.id) || ""}</Col>
            <Col span={6}>设备状态: {getDeviceStatus(deviceInfo && deviceInfo.status)}</Col>
            <Col span={6}>
              警报发送名称: {(deviceInfo && deviceInfo.alarm_send_name) || ""}
            </Col>
            <Col span={6}>
              经度: {(deviceInfo && deviceInfo.longitude) || ""}
            </Col>
            <Col span={6}>
              纬度: {(deviceInfo && deviceInfo.latitude) || ""}
            </Col>
            <Col span={6}>地点: {(deviceInfo && deviceInfo.place_name) || ""}</Col>
            <Col span={6}>
              地点编号: {(deviceInfo && deviceInfo.place_code) || ""}
            </Col>
            <Col span={6}>设备IP: {(deviceInfo && deviceInfo.device_ip) || ""}</Col>
            <Col span={6}>
              设备型号: {(deviceInfo && deviceInfo.device_model) || ""}
            </Col>
            <Col span={6}>
              同步名称: {(deviceInfo && deviceInfo.sync_name) || ""}
            </Col>
          </Row>
        </Spin>
        <Divider />
        <Spin tip="Loading..." spinning={loading}>
          <Row gutter={32} justify="space-around">
            <Col>
              <TotalCard
                title="今日人像"
                total={(todayTotal && todayTotal.Face) || 0}
                icon={todayPic}
              />
            </Col>
            <Col>
              <TotalCard
                title="今日车辆"
                total={(todayTotal && todayTotal.Vehicle) || 0}
                icon={todayCar}
              />
            </Col>
            <Col>
              <TotalCard
                title="七天人像总数"
                total={(sevenTotal && sevenTotal.Face) || 0}
                icon={sevenDay}
              />
            </Col>
            <Col>
              <TotalCard
                title="七天车辆总数"
                total={(sevenTotal && sevenTotal.Vehicle) || 0}
                icon={sevenDay}
              />
            </Col>
          </Row>
        </Spin>
        <TotalGraph
          services={(start, end) => {
            return messageCheckhumanImg({start, end, device_id:deviceId,period:"day",group_by:"date"});
          }}
          title="人像上传量"
          deviceId={deviceId}
          timestamp={timestamp}
          dataType={1}
        />
        <TotalGraph
          services={(start, end) => {
            return messageCheckhumanImg({start, end, device_id:deviceId,period:"day",group_by:"date"});
          }}
          title="车辆上传量"
          deviceId={deviceId}
          timestamp={timestamp}
          dataType={2}
        />
        <p className={styles.title} style={{marginTop:20}}>操作日志</p>
        <Table columns={columns} rowKey="id" dataSource={tableData} bordered loading={loading1}  />
      </Card>
    </>
  );
};

export default MessageManagement;
