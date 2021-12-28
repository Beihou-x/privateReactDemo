import React, { useEffect, useState } from "react";
import { Card, Button, Descriptions, Table, DatePicker } from "antd";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { responseThirtySecond, subscribeChange } from "@/services/v2";
import { formatDate } from "@/utils/utils";
import Bar from "./bar";
import BarLine from './bar-line';

const Report = (props) => {
  const {
    match: {
      params: { id },
    },
  }: any = props;
  const history = useHistory();

  const [upTime, setUpTime]: any = useState([moment().startOf('day').format("X"), moment().endOf('day').format("X")])

  const [downTime, setDownTime]: any = useState([(moment().unix() - 7 * 24 * 60 * 60).toString(), moment().endOf('day').format("X")]);

  const [protocolNames, setProtocolNames]: any = useState([]);
  const [responseData, setResponseData]: any = useState([]);

  const [subscribeData, setSubscribeData]: any = useState([]);

  useEffect(() => {
    getResponseData(upTime)
    getSubscribe(downTime)
  }, []);

  const getResponseData = (time) => {
    responseThirtySecond({
      start: time[0],
      end: time[1],
      subscribe_id: id
    }).then(res => {
      setProtocolNames(res && res.protocols || []);
      setResponseData(res && res.report_response_time_result || []);
    })
  }

  const getSubscribe = (time) => {
    subscribeChange({
      start: time[0],
      end: time[1],
      subscribe_id: id
    }).then(res => {
      setSubscribeData(res)
    })
  }

  const dateChange = (date) => {
    setUpTime([date ? date.startOf('day').format('X') : '', date ? date.endOf('day').format('X') : '']);
    getResponseData([date ? date.startOf('day').format('X') : '', date ? date.endOf('day').format('X') : '']);
  };

  const rangeChange = date => {
    setDownTime([date ? date[0].startOf('day').format('X') : '', date ? date[0].endOf('day').format('X') : ''])
    getSubscribe([date ? date[0].startOf('day').format('X') : '', date ? date[0].endOf('day').format('X') : '']);
  }

  return (
    <Card bordered={false}>
      <div>
        <span>协议名称 : </span>
        <span>{protocolNames.toString()}</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>响应超过30s设备统计</span>
        <div style={{ width: 240 }}>
          <DatePicker
            defaultValue={moment(new Date(), "YYYY-MM-DD")}
            onChange={dateChange}
            allowClear={false}
          />
        </div>
      </div>
      <div style={{ width: "100%", height: 400 }}>
        {responseData.length ? <Bar data={responseData} /> : ''}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>订阅量变化</span>
        <div style={{ width: 240 }}>
          <DatePicker.RangePicker
            defaultValue={[moment(new Date().getTime() - 7 * 24 * 60 * 60 * 1000), moment(new Date(), "YYYY-MM-DD")]}
            onChange={rangeChange}
            allowClear={false}
          />
        </div>
      </div>
      <div style={{ width: "100%", height: 400 }}>
        {subscribeData.length ? <BarLine data={subscribeData} /> : ''}
      </div>
      <div style={{ textAlign: "right", marginTop: 20 }}>
        <Button onClick={() => history.goBack()}>取消</Button>
      </div>
    </Card>
  );
};

export default Report;
