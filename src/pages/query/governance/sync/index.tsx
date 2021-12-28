import React, { useState, useRef, useContext } from "react";
import { Card, DatePicker, Select } from "antd";
import { deviceSearchByGroupSync } from "@/services/v1";
import StandardTable from "@components/Table";
import SearchForm from "@components/SearchForm";
import { DefaultPubSubContext } from "@components/PubSubscribe";
import { formatDate, filterCategory } from "@/utils/utils";

const { RangePicker } = DatePicker;
const { Option } = Select;

const Sync = () => {
  const { pushlist } = useContext(DefaultPubSubContext);
  const tableRef: any = useRef();
  const sources = filterCategory("接入来源") || [];
  const columns = [
    {
      title: "同步时间",
      dataIndex: ["access_id"],
      ellipsis: true,
      render: (val, record) => (
        <span>
          {formatDate(record && record.sync_updated_at, "YYYY-MM-DD")}
        </span>
      ),
    },
    {
      title: "同步设备",
      dataIndex: "id",
      ellipsis: true,
    },
    {
      title: "同步状态",
      dataIndex: "alias",
      ellipsis: true,
    },
    {
      title: "失败原因",
      dataIndex: "longitude",
      ellipsis: true,
    },
    {
      title: "操作",
      dataIndex: "latitude",
      ellipsis: true,
      render: (val, record) => <a>查看日志</a>,
    },
  ];
  return (
    <Card bordered={false}>
      <SearchForm
        formList={[
          {
            label: "区域",
            name: "tag_id",
            renderFormItem: () => <Select options={sources} />,
          },
          {
            label: "时间",
            name: "name",
            renderFormItem: () => <RangePicker />,
          },
          {
            label: "同步状态",
            name: "status",
            renderFormItem: () => (
              <Select>
                <Option value="同意">同意</Option>
                <Option value="拒绝">拒绝</Option>
              </Select>
            ),
          },
        ]}
        onChange={() => {}}
      />
      <StandardTable
        ref={tableRef}
        columns={columns}
        // services={}
        
        rowSelection={false}
      />
    </Card>
  );
};

export default Sync;
