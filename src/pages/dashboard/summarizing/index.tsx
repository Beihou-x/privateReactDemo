import React from "react";
import { Row, Col, Card } from "antd";
import AreaDevice from "./components/AreaDevice";
import DeviceType from "./components/DeviceType";
import TodayTotal from "./components/TodayTotal";
import Map from "./components/Map";
import AreaDeviceEchart from "./components/AreaDeviceEchart";
import DeviceTypeEcharts from "./components/DeviceTypeEcharts/DeviceTypeEchars";
import RelationalGraph from "./components/RelationalGraph";
import styles from "./index.less";

const Summarize = ({}) => {
  return (
    <div className={styles.summarize}>
      <Row gutter={32} justify="space-around">
        <Col span={7}>
          <AreaDeviceEchart
            styles={{
              height: "60vh",
            }}
          />
        </Col>
        <Col span={9}>
          <Map
            styles={{
              height: "60vh",
            }}
          />
        </Col>
        <Col span={7} style={{ textAlign: "center" }}>
          <DeviceTypeEcharts />
          <Card className={styles["summarize-card"]}>
            <TodayTotal label="今日数据量" value={98745} rank="down" />
            <TodayTotal label="今日出苏数据" value={10681} rank="up" />
            <TodayTotal label="今日入苏数据" value={18765} rank="up" />
          </Card>
        </Col>
      </Row>
      <Row>
        <Col span={22} offset={2}>
          <RelationalGraph
            styles={{
              height: "29vh",
              width: "100vw",
            }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Summarize;
