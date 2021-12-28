import React, { } from "react";
import {
  Card,
  Table
} from "antd";

const AnalyTable = () => {

  const columns = [
    {
      title: "设备所属类型",
      dataIndex: ["source_type"],
    },
    {
      title: "设备编码",
      dataIndex: ["id"],
    },
    {
      title: "设备名称",
      dataIndex: ["name"],
    },
    {
      title: "设备厂商",
      dataIndex: ["manufactor"],
    },
    {
      title: "设备状态",
      dataIndex: ["status"],
    },
    {
      title: "行政区域",
      dataIndex: ["unit"],
    },
    {
      title: "安装地址",
      dataIndex: ["address"],
    },
    {
      title: "安装时间",
      dataIndex: ["inst_time"],
    },
    {
      title: "经度",
      dataIndex: ["longitude"],
    },
    {
      title: "纬度",
      dataIndex: ["latitude"],
    }
  ];

  return (
    <Card bordered={false}>
      <Table
        columns={columns}
      />
    </Card>
  );
};

export default AnalyTable;
