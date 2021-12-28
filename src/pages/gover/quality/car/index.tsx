import React, { useState } from "react";
import { Card, Tabs } from "antd";
import DataView from "./children/DataView";
import PlatenoView from "./children/PlatenoView";
import PicView from "./children/PicView";
import TimeView from "./children/TimeView";
import ConsistencyView from "./children/ConsistencyView";
import Home from "./children/Home";
import styles from "./index.less";

const { TabPane } = Tabs;

const Car = props => {
  return (
    <>
      <Home />
      {/* <Tabs defaultActiveKey="1" className={styles.leftTabs} tabPosition="left">
        <TabPane tab="总览" key="1">
          <Home />
        </TabPane>
        <TabPane tab="数据量监测" key="2">
          <DataView />
        </TabPane> */}
      {/* <TabPane tab="车牌识别监测" key="3">
          <PlatenoView />
        </TabPane> */}
      {/* <TabPane tab="图片访问监测" key="4">
          <PicView />
        </TabPane>
        <TabPane tab="数据时效性监测" key="5">
          <TimeView />
        </TabPane> */}
      {/* <TabPane tab="数据一致性监测" key="6">
          <ConsistencyView />
        </TabPane> */}
      {/* </Tabs> */}
    </>
  );
};

export default Car;
