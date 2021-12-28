import React,{useEffect, useState} from "react";
import { Tabs } from "antd";
import Access from "./access";
import Approve from "./approve";
import Subscribe from "./subscribe";
import Parse from "./parse";
const { TabPane } = Tabs;

const DeviceOverview = (props) => {
  const {location: { state }} = props;
  
  return (
    <>
      <Tabs defaultActiveKey={state && state.category || 1} tabPosition="left" >
        <TabPane tab="接入对账" key="1">
          <Access id={state && state.accessId || ''} />
        </TabPane>
        <TabPane tab="转发对账" key="2">
          <Approve id={state && state.forwardId || ''} />
        </TabPane>
        <TabPane tab="解析对账" key="3">
          <Parse id={state && state.parseId || ''}></Parse>
        </TabPane>
        {/* <TabPane tab="订阅对账" key="3">
          <Subscribe data={obj}/>
        </TabPane> */}
      </Tabs>
    </>
  );
};

export default DeviceOverview;
