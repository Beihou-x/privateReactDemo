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
      return "就绪";
    } else if (val === "STARTING") {
      return "启动中";
    } else if (val === "RUNNING") {
      return "运行中";
    } else if (val === "STOPPING") {
      return "停止中";
    } else if (val === "UNKNOW") {
      return "未知"
    } else {
      return "就绪"
    }
  };
  const columns: any = [
    {
      title: "服务名称",
      dataIndex: "name",
      align: "center",
    },
    {
      title: "服务状态",
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
        <Descriptions title="报告信息" column={4}>
          <Descriptions.Item label="协议名称">{protocolName}</Descriptions.Item>
          <Descriptions.Item label="（今日）应转发总量">{statisticData.today_should_forward_num}</Descriptions.Item>
          <Descriptions.Item label="（今日）实转发总量">{statisticData.today_real_forward_num}</Descriptions.Item>
          <Descriptions.Item label="（今日）转发成功率">{statisticData.forward_success_quality ? `${format(statisticData.forward_success_quality)}%` : '-'}</Descriptions.Item>
          <Descriptions.Item label="人像卡口数">{statisticData.face_device_num}</Descriptions.Item>
          <Descriptions.Item label="超级卡口数">{statisticData.super_device_num}</Descriptions.Item>
          <Descriptions.Item label="其他设备数">{statisticData.other_device_num}</Descriptions.Item>
        </Descriptions>
      </Spin>
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
        <span>转发量变化</span>
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
        <p>服务列表</p>
        <Table columns={columns} rowKey="name" dataSource={statisticData.service || []} bordered loading={loading} pagination={false} />
      </div>
      <div style={{ textAlign: "right", marginTop: 20 }}>
        <Button onClick={() => history.goBack()}>取消</Button>
      </div>
    </Card>
  );
};

export default Report;
