import React, { useEffect, useState } from "react";
import { Card, Button, Descriptions, Spin, Table, DatePicker } from "antd";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { forwardResponseThirty, forwardProtocolDeviceChange, forwardProtocolStatistics } from "@/services/v2";
import { formatDate, format } from "@/utils/utils";
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
  const [subscribeData, setSubscribeData]: any = useState([]);
  const [statisticData, setStatisticData]: any = useState([]);
  const [loading, setLoading]: any = useState(false);

  useEffect(() => {
    getResponseData(upTime)
    getSubscribe(downTime);
    getStatistic(upTime);
  }, []);

  const getResponseData = (time) => {
    forwardResponseThirty({
      start: time[0],
      end: time[1],
      protocol_id: id
    }).then(res => {
      setProtocolName(res && res.protocol);
      setResponseData(res && res.forward_time_total_result || []);
    })
  }

  const getSubscribe = (time) => {
    forwardProtocolDeviceChange({
      start: time[0],
      end: time[1],
      protocol_id: id
    }).then(res => {
      setSubscribeData(res)
    })
  }
  const getStatistic = (time) => {
    setLoading(true);
    forwardProtocolStatistics({
      start: time[0],
      end: time[1],
      protocol_id: id
    }).then(res => {
      setStatisticData(res)
      setLoading(false);
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
  const getStatus = (val) => {
    if (val === "START") {
      return "??????";
    } else if (val === "STARTING") {
      return "?????????";
    } else if (val === "RUNNING") {
      return "?????????";
    } else if (val === "STOPPING") {
      return "?????????";
    } else if (val === "UNKNOW") {
      return "??????"
    } else {
      return "??????"
    }
  };
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
      render: val => (
        <span>{getStatus(val)}</span>
      )
    },
  ]

  return (
    <Card bordered={false}>
      <Spin spinning={loading}>
        <Descriptions title="????????????" column={4}>
          <Descriptions.Item label="????????????">{protocolName}</Descriptions.Item>
          <Descriptions.Item label="???????????????????????????">{statisticData.today_should_forward_num}</Descriptions.Item>
          <Descriptions.Item label="???????????????????????????">{statisticData.today_real_forward_num}</Descriptions.Item>
          <Descriptions.Item label="???????????????????????????">{statisticData.forward_success_quality ? `${format(statisticData.forward_success_quality)}%` : '-'}</Descriptions.Item>
          <Descriptions.Item label="???????????????">{statisticData.face_device_num}</Descriptions.Item>
          <Descriptions.Item label="???????????????">{statisticData.super_device_num}</Descriptions.Item>
          <Descriptions.Item label="???????????????">{statisticData.other_device_num}</Descriptions.Item>
        </Descriptions>
      </Spin>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
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
        <Table columns={columns} rowKey="name" dataSource={statisticData.service || []} bordered loading={loading} pagination={false} />
      </div>
      <div style={{ textAlign: "right", marginTop: 20 }}>
        <Button onClick={() => history.goBack()}>??????</Button>
      </div>
    </Card>
  );
};

export default Report;
