import React, { useEffect, useState } from "react";
import { Card, Button, Descriptions, Table, DatePicker, Spin } from "antd";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { accessResponseThirty, accessProtocolDeviceChange, accessProtocolTotalnew } from "@/services/v2";
import { format } from "@/utils/utils";
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

  const [protocolName, setProtocolName] = useState('');
  const [responseData, setResponseData]: any = useState([]);
  const [data, setData]: any = useState({});
  const [loading, setLoading]: any = useState(false);

  const [subscribeData, setSubscribeData]: any = useState([]);

  useEffect(() => {
    getResponseData(upTime)
    getSubscribe(downTime)
  }, []);

  const getResponseData = (time) => {
    accessResponseThirty({
      start: time[0],
      end: time[1],
      protocol_id: id
    }).then(res => {
      setProtocolName(res && res.protocol);
      setResponseData(res && res.access_time_total_result || []);
    })
    setLoading(true)
    accessProtocolTotalnew({
      start: time[0],
      end: time[1],
      protocol_id: id
    }).then(res => {
      setLoading(false)
      setData(res || {});
    })
  }

  const getSubscribe = (time) => {
    accessProtocolDeviceChange({
      start: time[0],
      end: time[1],
      protocol_id: id
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

  const columns: any = [
    {
      title: "????????????",
      dataIndex: "name",
      align: "center",
    },
    {
      title: "????????????",
      dataIndex: "status",
      align: "center",
    },
  ]

  return (
    <Card bordered={false}>
      <Spin spinning={loading}>
        <Descriptions title="????????????" column={4}>
          <Descriptions.Item label="????????????">{protocolName}</Descriptions.Item>
          <Descriptions.Item label="????????????????????????">{data.access_total}</Descriptions.Item>
          <Descriptions.Item label="???????????????????????????">{format(data.repeat_quality)}%</Descriptions.Item>
          <Descriptions.Item label="????????????">{data.device_total}</Descriptions.Item>
          <Descriptions.Item label="???????????????">{data.person_tollgate_total}</Descriptions.Item>
          <Descriptions.Item label="???????????????">{data.super_tollgate_total}</Descriptions.Item>
          <Descriptions.Item label="???????????????">{data.device_other}</Descriptions.Item>
        </Descriptions>
      </Spin>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10 }}>
        <span>????????????30s????????????</span>
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
        <span>???????????????</span>
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
      <div>
        <p>????????????</p>
        <Table columns={columns} rowKey="name" dataSource={data.services || []} bordered loading={loading} pagination={false} />
      </div>

      <div style={{ textAlign: "right", marginTop: 20 }}>
        <Button onClick={() => history.goBack()}>??????</Button>
      </div>
    </Card>
  );
};

export default Report;
