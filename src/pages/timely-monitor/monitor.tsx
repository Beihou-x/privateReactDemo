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
      <div style={{ marginBottom: 10 }}><span style={{ color: '#c1c5ca' }}> ???????????????</span><a style={{ fontSize: '14px' }}>????????????</a></div>
      <Card bordered={false}>
        <div>
          <span>???????????? : </span>
          <span>{forwardTotal[0]&&forwardTotal[0][1] ||0}</span>
          <span style={{marginLeft:20}}>?????????????????? : </span>
          <span>{latencyAvg} ??????</span>
          <span style={{marginLeft:20}}>??????????????? : </span>
          <span>{qpsAvg} ???/???</span>
          <span style={{marginLeft:20}}>??????????????? : </span>
          <span>{pendingAvg} ???/???</span>
        </div>
        <Spin tip="Loading..." spinning={loading}>
          <div>
            ?????? (
            <span>???????????? : </span>
            <span>
              {
                latency.some(item => Number(item[1]) >=latencyAvg) ? "????????????????????????????????????????????????????????????????????????" : "??????"
              }
            </span>
            <span style={{marginLeft: 20}}>????????? : </span>
            <span>
              {
                pending.some(item => Number(item[1]) >=pendingAvg) ? "???????????????????????????????????????" : "??????"
              }
            </span>
            <span style={{marginLeft: 20}}>????????? : </span>
            <span>
              {
                qps.some(item => Number(item[1]) >=qpsAvg) ? "?????????????????????????????????????????????" : "??????"
              }
            </span>
            )
          </div>
          <div style={{ height: 300, width: "100%" }}>
            <RequestLatencyLine data={latency} title="???????????? (??????)" avg={latencyAvg} type='one'/>
          </div>
        </Spin>
      </Card>
      <Row gutter={16} style={{ marginTop: 20 }}>
        <Col span={12}>
          <Card bordered={false}>
            <Spin tip="Loading..." spinning={loading1}>
              <div style={{ height: 300, width: "100%" }}>
                <RequestLatencyLine data={qps} title="????????? (???/???)" avg={qpsAvg} />
              </div>
            </Spin>
          </Card>
        </Col>
        <Col span={12}>
          <Card bordered={false}>
            <Spin tip="Loading..." spinning={loading2}>
              <div style={{ height: 300, width: "100%" }}>
                <RequestLatencyLine data={pending} title="????????? (???)" avg={pendingAvg} />
              </div>
            </Spin>
          </Card>
        </Col>
      </Row>
      <div style={{ textAlign: "right", marginTop: 20 }}>
        <Button onClick={() => history.goBack()}>??????</Button>
      </div>
    </>
  );
};

export default Monitor;
