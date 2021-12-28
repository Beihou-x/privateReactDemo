import React, { useState } from "react";
import StandardTable from "@components/Table";
import SearchForm from "@components/SearchForm";
import { Card, Input, Divider, DatePicker } from "antd";
import DownLoadFile from "@components/DownLoadFile";
import { applicationSearch, accessExports } from "@/services/v1";
import { formatDate } from "@/utils/utils";

const { RangePicker } = DatePicker;

const Data = () => {
  const columns = [
    {
      dataIndex: "code",
      title: "设备编码",
      align: "center",
    },
    {
      dataIndex: "name",
      title: "设备名称",
      align: "center",
    },
    {
      dataIndex: "type",
      title: "活跃状态",
      align: "center",
    },
    {
      dataIndex: "num",
      title: "异常原因",
      align: "center",
      render: (val, record) => <a>{record && record.num}</a>,
    },
    {
      dataIndex: "time",
      title: "异常时间",
      align: "center",
      render: (val, record) => (
        <>{formatDate(record && record.time, "YYYY-MM-DD")}</>
      ),
    },
    {
      title: "操作",
      align: "center",
      render: (val, record) => <a>查看日志</a>,
    },
  ];

  return (
    <Card bordered={false}>
      <SearchForm
        formList={[
          {
            label: "设备编码",
            name: "id",
            renderFormItem: () => <Input autoComplete="off" />,
          },
          {
            label: "设备名称",
            name: "name",
            renderFormItem: () => <Input autoComplete="off" />,
          },
          {
            label: "异常时间",
            name: "time",
            renderFormItem: () => <RangePicker autoComplete="off" />,
          },
        ]}
        onChange={() => {}}
      />
      <DownLoadFile
        style={{ marginBottom: 20 }}
        services={() => {
          return accessExports({
            name: "access_request",
          },{});
        }}
      >
        导出
      </DownLoadFile>
      <StandardTable
        columns={columns}
        services={applicationSearch}
        rowSelection={false}
        
      />
    </Card>
  );
};

export default Data;
