import React, { useEffect, useState } from 'react';
import { forwardRequestTime, forwardTimelyMonitor,forwardAndShouldForward } from "@/services/v2";
import {
  Card,
  Input,
  Button,
  Divider,
  Descriptions
} from 'antd';
import { formatDate } from "@/utils/utils";
import Line from "./line";
const ExpandedRow = props => {

  const { values } = props

  const [timeData, setTimeData]: any = useState({})
  const [monitor, setMonitor]: any = useState({});
  const [forwardData, setForwardData]:any = useState({})
  useEffect(() => {
    forwardRequestTime({ id: values.id }).then(res => {
      setTimeData(res || {})
    })
    forwardTimelyMonitor({ id: values.id }).then(res => {
      setMonitor(res || {})
    })
    forwardAndShouldForward({type:"forward",forward_id:values.id }).then((res) => {
      setForwardData(res || {})
    })
  }, [])

  return (
    <div style={{ width: "100%" }}>
      <Descriptions title="" column={4}>
        <Descriptions.Item label="应转发量">{forwardData.should_forward_total||0}</Descriptions.Item>
        <Descriptions.Item label="实转发量">{forwardData.real_forward_total||0}</Descriptions.Item>
        <Descriptions.Item label="最后抓拍时间">{timeData.last_capture_at && timeData.last_capture_at !== '0' ? formatDate(timeData.last_capture_at, "YYYY-MM-DD HH:mm:ss") : '暂无抓拍'}</Descriptions.Item>
        <Descriptions.Item label="最后请求时间">{timeData.last_request_at && timeData.last_request_at !== '0' ? formatDate(timeData.last_request_at, "YYYY-MM-DD HH:mm:ss") : '暂无请求'}</Descriptions.Item>
      </Descriptions>
      <div style={{ display: 'flex', height: 400 }}>
        <div style={{ width: "50%" }}>
          <Line data={monitor && monitor.face_control || []} title="人像图片" />
        </div>
        <div style={{ width: "50%" }}>
          <Line data={monitor && monitor.car_control || []} title="车辆图片" />
        </div>
      </div>
    </div>
  )
}


export default ExpandedRow;