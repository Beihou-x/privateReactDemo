import React, { useEffect, useState } from "react";
import { Card } from "antd";
import CarForPerson from "./carForPerson";

const Facemotor = () => {
  return (
    <Card bordered={false}>
      <CarForPerson />
    </Card>
  );
};

export default Facemotor;
