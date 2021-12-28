import React, { useEffect, useState, useContext } from "react";
import { Card, Button, Descriptions } from "antd";
import { useHistory } from "react-router-dom";
import styles from "./index.less";
import { monthStartAndEndDate,filterCategoryValue } from "@/utils/utils";
import {serviceSearchOnce} from "@/services/v1";
import { forwardServiceMonitorSearch, forwardAndParseEnginePrometheus } from "@/services/v2";

const Report = (props) => {
  const {
    match: {
      params: { id },
    },
  }: any = props;
  const history = useHistory();
  const [data, setData]: any = useState([]);
  const [data1, setData1]: any = useState([]);
  const [latencyAvg, setLatencyAvg] = useState(0);
  const [num, setNum] = useState([])
  const [num1, setNum1] = useState([])
  const [num2, setNum2] = useState([])
  const [time, setTime] = useState([])
  const [time1, setTime1] = useState([])
  const [time2, setTime2] = useState([])
  const [dateObj, setDateObj]: any = useState({})
  const [serviceBaseInfo, setServiceBaseInfo]:any = useState({});

  useEffect(() => {
    // 服务基本信息
    serviceSearchOnce({ id }).then((res) => {
      if (res) {
        setServiceBaseInfo(res);
      }
    });
    // 服务总次数
    forwardServiceMonitorSearch({ type: 'total', category: 'service', service_id: id }).then(res => {
      const arr = res && res.data && res.data.result && res.data.result[0] && res.data.result[0].values || [];
      setData(arr.length ? arr[0] : []);
    })
    // 响应时间
    forwardServiceMonitorSearch({ type: 'latency', category: 'service', service_id: id }).then(res => {
      const arr = res && res.data && res.data.result && res.data.result[0] && res.data.result[0].values || [];
      setData1(arr.length ? arr[arr.length - 1] : []);
    })
    forwardAndParseEnginePrometheus("latency", id, "service", 'baidu').then(
      (res) => {
        // 响应时间阈值
        setLatencyAvg((res && res.data && res.data.threshold) || 0);
      }
    );
    // 本月
    const date = monthStartAndEndDate(0);
    // 服务总次数
    forwardServiceMonitorSearch({ type: 'total', category: 'service', service_id: id, start_time: date[1], end_time: date[2] }).then(res => {
      const arr = res && res.data && res.data.result && res.data.result[0] && res.data.result[0].values || [];
      setNum(arr.length ? arr[0] : []);
    })
    // 响应时间
    forwardServiceMonitorSearch({ type: 'latency', category: 'service', service_id: id, start_time: date[1], end_time: date[2] }).then(res => {
      const arr = res && res.data && res.data.result && res.data.result[0] && res.data.result[0].values || [];
      setTime(arr.length ? arr[arr.length - 1] : []);
    })
    // 上月
    const date1 = monthStartAndEndDate(1);
    // 服务总次数
    forwardServiceMonitorSearch({ type: 'total', category: 'service', service_id: id, start_time: date1[1], end_time: date1[2] }).then(res => {
      const arr = res && res.data && res.data.result && res.data.result[0] && res.data.result[0].values || [];
      setNum1(arr.length ? arr[0] : []);
    })
    // 响应时间
    forwardServiceMonitorSearch({ type: 'latency', category: 'service', service_id: id, start_time: date1[1], end_time: date1[2] }).then(res => {
      const arr = res && res.data && res.data.result && res.data.result[0] && res.data.result[0].values || [];
      setTime1(arr.length ? arr[arr.length - 1] : []);
    })
    // 上上月
    const date2 = monthStartAndEndDate(2);
    // 服务总次数
    forwardServiceMonitorSearch({ type: 'total', category: 'service', service_id: id, start_time: date2[1], end_time: date2[2] }).then(res => {
      const arr = res && res.data && res.data.result && res.data.result[0] && res.data.result[0].values || [];
      setNum2(arr.length ? arr[0] : []);
    })
    // 响应时间
    forwardServiceMonitorSearch({ type: 'latency', category: 'service', service_id: id, start_time: date2[1], end_time: date2[2] }).then(res => {
      const arr = res && res.data && res.data.result && res.data.result[0] && res.data.result[0].values || [];
      setTime2(arr.length ? arr[arr.length - 1] : []);
    })
    setDateObj({
      date: date[0],
      date1: date1[0],
      date2: date2[0],
    })
  }, []);

  const renderItem = (date, num, time) => {
    const n = num.length ? num[1] : '-';
    const t = time.length && time[1] ? `${Number(time[1]).toFixed(2)}ms` : '-'
    return <Descriptions column={4} title={date}>
      <Descriptions.Item label="服务总次数">{n}</Descriptions.Item>
      <Descriptions.Item label="响应时间">
        {t}
      </Descriptions.Item>
    </Descriptions>
  }

  return (
    <div className={styles.detail}>
      <Card bordered={false}>
        <p>结果报告</p>
        <Descriptions column={4}>
          <Descriptions.Item label="服务类型">
            {filterCategoryValue('服务', serviceBaseInfo.category)}
          </Descriptions.Item>
          <Descriptions.Item label="协议名称">
            {serviceBaseInfo.protocol_name}
          </Descriptions.Item>
          <Descriptions.Item label="服务总次数">{data.length ? data[1] : '-'}</Descriptions.Item>
          <Descriptions.Item label="响应时间">
            {data1.length && data1[1] ? `${Number(data1[1]).toFixed(2)}ms` : '-'}
            &nbsp;&nbsp;&nbsp;
            {data1.length && data1[1] >= latencyAvg ? "(服务响应时间过长，需要检查数据存储、数据缓存组件)" : "(正常)"}
          </Descriptions.Item>
          <Descriptions.Item label="服务名称">{serviceBaseInfo.name}</Descriptions.Item>
          
        </Descriptions>
        <p>近三个月结果报告详情</p>
        {renderItem(dateObj.date, num, time)}
        {renderItem(dateObj.date1, num1, time1)}
        {renderItem(dateObj.date2, num2, time2)}
        <div style={{ textAlign: "right", marginTop: 20 }}>
          <Button onClick={() => history.goBack()}>取消</Button>
        </div>
      </Card>
    </div>
  );
};

export default Report;
