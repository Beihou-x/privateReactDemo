import React, { useEffect, useState, useRef } from "react";
import StandardTable from "@components/Table";
import { Input, Select, Card, Divider, Row, Col, Button} from "antd";
import {
  serviceSearch,
  serviceDiscription,
} from "@/services/v1";

const { Option } = Select;

const Record = props => {
  const refTable: any = useRef(null);



  const columns = [
    {
      dataIndex: "a",
      title: "数据源（实入）",
      align: "center",
    },
    {
      dataIndex: "v",
      title: "转发成功率",
      align: "center"
    },
    {
      dataIndex: "x",
      title: "转发应用(应收/实收)",
      align: "center",
    }
  ];

  return (
    <>
      <Card bordered={false}>
        <StandardTable
          ref={refTable}
          columns={columns}
          services={serviceSearch}
          rowSelection={false}
          
        />
      </Card>
    </>
  );
};

export default Record;
