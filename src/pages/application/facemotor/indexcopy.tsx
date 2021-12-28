import React, { useEffect, useState } from "react";
import { Card, Tabs } from "antd";
import PersonForCar from "./personForCar";
import CarForPerson from "./carForPerson";
const { TabPane } = Tabs;

const Facemotor = () => {
  const [active, setActive] = useState("1");
  const callback = (key) => {
    setActive(key);
  };

  return (
    <Card bordered={false}>
      <Tabs activeKey={active} onChange={callback}>
        <TabPane tab="车查询" key="1">
          {active === "1" ? <CarForPerson /> : ""}
        </TabPane>
        <TabPane tab="人查询" key="2">
          {active === "2" ? <PersonForCar /> : ""}
        </TabPane>
      </Tabs>
    </Card>
  );
};

export default Facemotor;
