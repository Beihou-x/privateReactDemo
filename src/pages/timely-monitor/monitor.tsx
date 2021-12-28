import React, { useEffect, useState } from "react";
import { Card, Row, Col, Button, Spin } from "antd";
import { prometheus } from "@/services/v2";
import RequestLatencyLine from "./child/RequestLatencyLine";
import testData from "./child/test.json";
import { useHistory } from "react-router-dom";

const Monitor = (props) => {

  const {
    match: {
      params: { id, category },
    },
  } = props;

  const data = testData.data.result[0].values;

  const [latency, setLatency]: any = useState([]);
  const [pending, setPending]: any = useState([]);
  const [qps, setQps]: any = useState([]);
  const [forwardTotal, setForwardTotal]: any = useState([]);
  const [latencyAvg,setLatencyAvg] = useState(0);
  const [pendingAvg,setPendingAvg] = useState(0);
  const [qpsAvg, setQpsAvg] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  useEffect(() => {
    setLoading(true)
    setLoading1(true)
    setLoading2(true)
    prometheus('latency', id, category).then(res => {
      setLoading(false)
      setLatencyAvg(res&&res.data&&res.data.threshold ||0);
      if (res && res.data && res.data.result.length) {
        setLatency(res.data.result[0].values);
      } else {
        setLatency([]);
      }
    })
    prometheus('pending', id, category).then(res => {
      setLoading1(false)
      setPendingAvg(res&&res.data&&res.data.threshold ||0);
      if (res && res.data && res.data.result.length) {
        setPending(res.data.result[0].values)
      } else {
        setPending([])
      }
    })
    prometheus('qps', id, category).then(res => {
      setLoading2(false)
      setQpsAvg(res&&res.data&&res.data.threshold ||0);
      if (res && res.data && res.data.result.length) {
        setQps(res.data.result[0].values)
      } else {
        setQps([])
      }
    })
    prometheus('total',id,category).then(res => {
      if (res && res.data && res.data.result.length) {
        setForwardTotal(res.data.result[0].values)
      } else {
        setForwardTotal([])
      }
    })
  }, [id]);

  // console.log('data', data)
  const history = useHistory();

  return (
    <>
      <div style={{ marginBottom: 10 }}><span style={{ color: '#c1c5ca' }}> 当前位置：</span><a style={{ fontSize: '14px' }}>实时监控</a></div>
      <Card bordered={false}>
        <div>
          <span>调用总量 : </span>
          <span>{forwardTotal[0]&&forwardTotal[0][1] ||0}</span>
          <span style={{marginLeft:20}}>响应时间阈值 : </span>
          <span>{latencyAvg} 毫秒</span>
          <span style={{marginLeft:20}}>请求数阈值 : </span>
          <span>{qpsAvg} 次/秒</span>
          <span style={{marginLeft:20}}>等待数阈值 : </span>
          <span>{pendingAvg} 次/秒</span>
        </div>
        <Spin tip="Loading..." spinning={loading}>
          <div>
            总结 (
            <span>响应时间 : </span>
            <span>
              {
                latency.some(item => Number(item[1]) >=latencyAvg) ? "服务响应时间过长，需要检查数据存储、数据缓存组件" : "正常"
              }
            </span>
            <span style={{marginLeft: 20}}>请求数 : </span>
            <span>
              {
                pending.some(item => Number(item[1]) >=pendingAvg) ? "服务请求过多，需要进行扩容" : "正常"
              }
            </span>
            <span style={{marginLeft: 20}}>等待数 : </span>
            <span>
              {
                qps.some(item => Number(item[1]) >=qpsAvg) ? "服务等待请求过多，需要进行扩容" : "正常"
              }
            </span>
            )
          </div>
          <div style={{ height: 300, width: "100%" }}>
            <RequestLatencyLine data={latency} title="响应时间 (毫秒)" avg={latencyAvg} type='one'/>
          </div>
        </Spin>
      </Card>
      <Row gutter={16} style={{ marginTop: 20 }}>
        <Col span={12}>
          <Card bordered={false}>
            <Spin tip="Loading..." spinning={loading1}>
              <div style={{ height: 300, width: "100%" }}>
                <RequestLatencyLine data={qps} title="请求数 (次/秒)" avg={qpsAvg} />
              </div>
            </Spin>
          </Card>
        </Col>
        <Col span={12}>
          <Card bordered={false}>
            <Spin tip="Loading..." spinning={loading2}>
              <div style={{ height: 300, width: "100%" }}>
                <RequestLatencyLine data={pending} title="等待数 (次)" avg={pendingAvg} />
              </div>
            </Spin>
          </Card>
        </Col>
      </Row>
      <div style={{ textAlign: "right", marginTop: 20 }}>
        <Button onClick={() => history.goBack()}>取消</Button>
      </div>
    </>
  );
};

export default Monitor;
