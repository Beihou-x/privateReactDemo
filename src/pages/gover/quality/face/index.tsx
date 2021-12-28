import React from "react";
import { Tabs } from "antd";
import DataView from "./children/DataView";
import PicView from "./children/PicView";
import TimeView from "./children/TimeView";
import ConsistencyView from "./children/ConsistencyView";
import PicQualityView from "./children/PicQualityView";
import Home from "./children/Home";

const { TabPane } = Tabs;

const Face = () => {
  return (
    <>
      <Home />
      {/* <Tabs defaultActiveKey="1" tabPosition="left"> */}
      {/* <TabPane tab="总览" key="1">
          <Home />
        </TabPane>
        <TabPane tab="数据量监测" key="2">
          <DataView />
        </TabPane>
        <TabPane tab="图片访问监测" key="3">
          <PicView />
        </TabPane> */}
      {/* <TabPane tab="图片质量监测" key="4">
          <PicQualityView />
        </TabPane> */}
      {/* <TabPane tab="数据时效性监测" key="5">
          <TimeView />
        </TabPane> */}
      {/* <TabPane tab="数据一致性监测" key="6">
          <ConsistencyView />
        </TabPane> */}
      {/* </Tabs> */}
    </>
  );
};

export default Face;
