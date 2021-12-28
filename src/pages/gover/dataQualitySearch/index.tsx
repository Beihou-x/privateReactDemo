import React, { useState } from "react";
import { Card, Tabs } from "antd";
import Data from "./data";
import Service from "./service";

const { TabPane } = Tabs;

const dataQualitySearch = () => {
  function callback(key) {
    console.log(key);
  }
  return (
    <Card bordered={false}>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="数据检测" key="1">
          <Data />
        </TabPane>
        <TabPane tab="服务检测" key="2">
          <Service />
        </TabPane>
      </Tabs>
    </Card>
  );
};

export default dataQualitySearch;
