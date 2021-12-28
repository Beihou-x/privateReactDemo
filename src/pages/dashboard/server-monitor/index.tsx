import React, { useEffect, useState } from "react";
import { Card, Row, Col, Button, Spin } from "antd";
import { forwardServiceMonitorSearch } from "@/services/v2";
import RequestLatencyLine from "./RequestLatencyLine";
import { useHistory } from "react-router-dom";

import styles from "./index.less";

const ServerMonitor = (props) => {
  const { match: {
    params: { id },
  } } = props
  const history = useHistory();
  const [data, setData] = useState([]);  //cpu
  const [data1, setData1] = useState([]); //disk
  const [data2, setData2] = useState([]); //memory
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [cpuAvg, setCpuAvg] = useState(0);
  const [diskAvg, setDiskAvg] = useState(0);
  const [memoryAvg, setMemoryAvg] = useState(0);
  useEffect(() => {
    setLoading(true);
    setLoading1(true);
    setLoading2(true);
    forwardServiceMonitorSearch({ type: 'cpu', category: 'server', service_id: id }).then(res => {
      setLoading(false);
      setData(res.data.result[0].values || []);
      setCpuAvg(res && res.data && res.data.threshold || 0);
    })
    forwardServiceMonitorSearch({ type: 'disk', category: 'server', service_id: id }).then(res => {
      setLoading1(false);
      setData1(res.data.result[0].values || []);
      setDiskAvg(res && res.data && res.data.threshold || 0);
    })
    forwardServiceMonitorSearch({ type: 'memory', category: 'server', service_id: id }).then(res => {
      setLoading2(false);
      setData2(res.data.result[0].values || []);
      setMemoryAvg(res && res.data && res.data.threshold || 0);
    })
  }, [])
  return (
    <div className={styles.serverMonitor}>
      <Card bordered={false}>
        <div>
          <span style={{ marginLeft: 20 }}>cpu使用率阈值 : </span>
          <span>{cpuAvg}%</span>
          <span style={{ marginLeft: 20 }}>磁盘使用率阈值 : </span>
          <span>{diskAvg}%</span>
          <span style={{ marginLeft: 20 }}>内存使用率阈值 : </span>
          <span>{memoryAvg}%</span>
        </div>
        <Spin tip="Loading..." spinning={loading}>
          <div style={{ height: 300, width: "100%" }}>
            <RequestLatencyLine data={data} title="cpu使用率 (%)" avg={cpuAvg} type='one' />
          </div>
        </Spin>
      </Card>
      <Row gutter={16} style={{ marginTop: 20 }}>
        <Col span={12}>
          <Card bordered={false}>
            <Spin tip="Loading..." spinning={loading1}>
              <div style={{ height: 300, width: "100%" }}>
                <RequestLatencyLine data={data1} title="磁盘使用率 (%)" avg={diskAvg} />
              </div>
            </Spin>
          </Card>
        </Col>
        <Col span={12}>
          <Card bordered={false}>
            <Spin tip="Loading..." spinning={loading2}>
              <div style={{ height: 300, width: "100%" }}>
                <RequestLatencyLine data={data2} title="内存使用率 (%)" avg={memoryAvg} />
              </div>
            </Spin>
          </Card>
        </Col>
      </Row>
      <div style={{ textAlign: "right" }}>
        <Button style={{ marginTop: 20 }} onClick={() => history.goBack()}>取消</Button>
      </div>
    </div>
  );
};

export default ServerMonitor;
