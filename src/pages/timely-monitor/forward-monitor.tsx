import React, { useEffect, useState } from "react";
import { Card, Row, Col, Button, Spin, Table } from "antd";
import {
  forwardAndParseEnginePrometheus,
  forwardServiceSchema,
  forwardRequestCheckData,
} from "@/services/v2";
import RequestLatencyLine from "./child/RequestLatencyLine";
import testData from "./child/test.json";
import { useHistory } from "react-router-dom";

const Monitor = (props) => {
  const {
    match: {
      params: { id, category, engine, type },
    },
  } = props;

  const data = testData.data.result[0].values;

  const [latency, setLatency]: any = useState([]);
  const [pending, setPending]: any = useState([]);
  const [qps, setQps]: any = useState([]);
  const [forwardTotal, setForwardTotal]: any = useState([]);
  // 三个图的阈(yu)值
  const [latencyAvg, setLatencyAvg] = useState(0);
  const [pendingAvg, setPendingAvg] = useState(0);
  const [qpsAvg, setQpsAvg] = useState(0);
  // schema监控获取的设备列表
  const [deviceList, setDeviceList]: any = useState([]);
  const [serviceData, setServiceData]: any = useState({});
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);

  useEffect(() => {
    setLoading(true);
    setLoading1(true);
    setLoading2(true);
    forwardAndParseEnginePrometheus("latency", id, category, engine).then(
      (res) => {
        setLoading(false);
        setLatencyAvg((res && res.data && res.data.threshold) || 0);
        if (res && res.data && res.data.result.length) {
          setLatency(res.data.result[0].values);
        } else {
          setLatency([]);
        }
      }
    );
    forwardAndParseEnginePrometheus("pending", id, category, engine).then(
      (res) => {
        setLoading1(false);
        setPendingAvg((res && res.data && res.data.threshold) || 0);
        if (res && res.data && res.data.result.length) {
          setPending(res.data.result[0].values);
        } else {
          setPending([]);
        }
      }
    );
    forwardAndParseEnginePrometheus("qps", id, category, engine).then((res) => {
      setLoading2(false);
      setQpsAvg((res && res.data && res.data.threshold) || 0);
      if (res && res.data && res.data.result.length) {
        setQps(res.data.result[0].values);
      } else {
        setQps([]);
      }
    });
    forwardAndParseEnginePrometheus("total", id, category, engine).then(
      (res) => {
        setLoading2(false);
        if (res && res.data && res.data.result.length) {
          setForwardTotal(res.data.result[0].values);
        } else {
          setForwardTotal([]);
        }
      }
    );
    // 转发schema
    forwardServiceSchema({
      type: "service",
      service_id: id,
    }).then((res) => {
      setDeviceList(Array.isArray(res) ? res : []);
    });
    forwardRequestCheckData({
      service_id: id,
    }).then((res) => {
      setServiceData(res);
    });
  }, [id]);

  // console.log('data', data)
  const history = useHistory();
  const columns: any = [
    {
      title: "设备编码",
      dataIndex: "device_id",
      align: "center",
    },
    {
      title: "设备名称",
      dataIndex: "alias",
      align: "center",
    },
    {
      title: "设备类型",
      dataIndex: "function_type",
      align: "center",
    },
    {
      title: "成功总数",
      dataIndex: "success_total",
      align: "center",
    },
    {
      title: "失败总数",
      dataIndex: "failedTotal",
      align: "center",
    },
    {
      title: "区域",
      dataIndex: "source",
      align: "center",
    },
    {
      title: "设备厂商",
      dataIndex: "manufactor",
      align: "center",
    },
  ];

  return (
    <>
      <div style={{ marginBottom: 10 }}>
        <span style={{ color: "#c1c5ca" }}> 当前位置：</span>
        <a style={{ fontSize: "14px" }}>实时监控</a>
      </div>
      <Card bordered={false}>
        <div>
          <span>{engine === "baidu" ? "解析总量" : "转发总量"} : </span>
          <span>{(forwardTotal[0] && forwardTotal[0][1]) || 0}</span>

          <span style={{ marginLeft: 20 }}>响应时间阈值 : </span>
          <span>{latencyAvg} 毫秒</span>
          <span style={{ marginLeft: 20 }}>请求数阈值 : </span>
          <span>{qpsAvg} 次/秒</span>
          <span style={{ marginLeft: 20 }}>等待数阈值 : </span>
          <span>{pendingAvg} 次/秒</span>
          <span style={{ marginLeft: 20 }}>应转发量 : </span>
          <span>{serviceData.real_forward_num || 0}</span>
          <span style={{ marginLeft: 20 }}>实转发量 : </span>
          <span>{serviceData.should_forward_num || 0}</span>
        </div>

        <Spin tip="Loading..." spinning={loading}>
          <div>
            总结  (
            <span>响应时间 : </span>
            <span>
              {latency.some((item) => Number(item[1]) >= latencyAvg)
                ? "服务响应时间过长，需要检查数据存储、数据缓存组件"
                : "正常"}
            </span>
            <span style={{ marginLeft: 20 }}>请求数 : </span>
            <span>
              {pending.some((item) => Number(item[1]) >= pendingAvg)
                ? "服务请求过多，需要进行扩容"
                : "正常"}
            </span>
            <span style={{ marginLeft: 20 }}>等待数 : </span>
            <span>
              {qps.some((item) => Number(item[1]) >= qpsAvg)
                ? "服务等待请求过多，需要进行扩容"
                : "正常"}
            </span>
            )
          </div>
          <div style={{ height: 300, width: "100%" }}>
            <RequestLatencyLine
              data={latency}
              title="响应时间 (毫秒)"
              avg={latencyAvg}
              type="one"
            />
          </div>
        </Spin>
      </Card>
      <Row gutter={16} style={{ marginTop: 20, marginBottom: 20 }}>
        <Col span={12}>
          <Card bordered={false}>
            <Spin tip="Loading..." spinning={loading1}>
              <div style={{ height: 300, width: "100%" }}>
                <RequestLatencyLine
                  data={qps}
                  title="请求数 (次/秒)"
                  avg={qpsAvg}
                />
              </div>
            </Spin>
          </Card>
        </Col>
        <Col span={12}>
          <Card bordered={false}>
            <Spin tip="Loading..." spinning={loading2}>
              <div style={{ height: 300, width: "100%" }}>
                <RequestLatencyLine
                  data={pending}
                  title="等待数 (次)"
                  avg={pendingAvg}
                />
              </div>
            </Spin>
          </Card>
        </Col>
      </Row>
      <Card bordered={false}>
        <div>设备列表</div>
        <Table columns={columns} dataSource={deviceList} bordered />
      </Card>

      <div style={{ textAlign: "right", marginTop: 20 }}>
        <Button onClick={() => history.goBack()}>取消</Button>
      </div>
    </>
  );
};

export default Monitor;
