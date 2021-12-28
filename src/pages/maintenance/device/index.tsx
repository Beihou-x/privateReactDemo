import React, { useState } from 'react';
import StandardTable from '@components/Table';
import {
  Card,
  Tabs,
} from 'antd';
// import Code from './Code';
// import Long from './Long';
import Home from './Home';
// import Time from './Time';

const { TabPane } = Tabs;


const Device = (props) => {


  return (
    <>
      <Home></Home>
      {/* <Tabs defaultActiveKey="1">
            <TabPane tab="总览" key="1">
                <Home />
            </TabPane>
            <TabPane tab="国标编码监测" key="2">
                <Code />
            </TabPane>
            <TabPane tab="经纬度监测" key="3">
                <Long />
            </TabPane>
            <TabPane tab="时间差监测" key="4">
                <Time />
            </TabPane>
        </Tabs> */}
    </>
  );
};

export default Device;