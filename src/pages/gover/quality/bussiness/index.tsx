import React from "react";
import { Card, Tabs } from "antd";
import BussinessView from "./BussinessView";
import CustomHome from "./CustomHome";
import Home from "./Home";
import CustomView from "./CustomView";
import styles from "./index.less";

const { TabPane } = Tabs;

const Bussiness = props => {
  return (
    <>
      <Tabs defaultActiveKey="1" className={styles.leftTabs} tabPosition="left">
        <TabPane tab="业务标签总览" key="1">
          <Home />
        </TabPane>
        <TabPane tab="业务标签设备类型分布监测" key="2">
          <BussinessView />
        </TabPane>
        <TabPane tab="自定义标签总览" key="3">
          <CustomHome />
        </TabPane>
        <TabPane tab="自定义标签设备类型分布监测" key="4">
          <CustomView />
        </TabPane>
      </Tabs>
    </>
  );
};

export default Bussiness;
