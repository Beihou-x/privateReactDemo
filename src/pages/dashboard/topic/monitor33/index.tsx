import React from "react";
import { Tabs } from "antd";
import styles from "./index.less";
import Hotel from "./hotel";
import HotelLine from "./hotel-line";

const { TabPane } = Tabs;
const Dashboard = () => {
  return (
    <div className={styles.zt_hotel}>
      <Tabs defaultActiveKey="1">
        <TabPane tab="旅馆一览" key="1">
          <Hotel></Hotel>
        </TabPane>
        <TabPane tab="旅馆链路" key="2">
          <HotelLine></HotelLine>
        </TabPane>
      </Tabs>

    </div>
  );
};

export default Dashboard;
