import React from "react";
import StandardTable from "@components/Table";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import SearchForm from "@components/SearchForm";
import { Input, Select, Card, InputNumber } from "antd";
import { forwardRequestManageSearch } from "@/services/v1";
import DownLoadFile from "@components/DownLoadFile";
import { formatDate } from "@/utils/utils";

const { Option } = Select;

type ApproveManagementProps = {};

const ApproveManagement = () => {
  const columns = [
    {
      title: "申请编号",
      dataIndex: ["no"],
    },
    {
      title: "申请标题",
      dataIndex: ["title"],
    },
    {
      title: "设备数",
      dataIndex: ["device_num"],
      render: (val, record) => (
        <>
          {Object.keys(record.DeviceMap).length
            ? Object.keys(record.DeviceMap).map((m) => (
                <div key={m}>
                  {m}：{record.DeviceMap[m]}
                </div>
              ))
            : ""}
        </>
      ),
    },
    {
      title: "开始转发时间",
      dataIndex: ["forward_begin"],
      render: (val, record) => (
        <span>{formatDate(record && record.forward_begin, "YYYY-MM-DD")}</span>
      ),
    },
    // {
    //   title: "最后转发时间",
    //   dataIndex: ["forward_end"],
    //   render: (val, record) => (
    //     <span>{formatDate(record && record.forward_end, "YYYY-MM-DD")}</span>
    //   ),
    // },
    {
      title: "操作",
      render: (val) => (
        <>
          <a>进度查询</a>
        </>
      ),
    },
  ];

  return (
    <>
      <Card bordered={false}>
        <SearchForm
          formList={[
            {
              label: "申请编号",
              name: "no",
              renderFormItem: () => <Input autoComplete="off" />,
            },
            {
              label: "申请标题",
              name: "title",
              renderFormItem: () => <Input autoComplete="off" />,
            },
            {
              label: "国标ID",
              name: "id",
              renderFormItem: () => <InputNumber autoComplete="off" />,
            },
          ]}
          onChange={() => {}}
        />
        <DownLoadFile
          services={() => {
            return {
              data: "",
            };
          }}
          style={{ marginBottom: 18 }}
        >
          导出
        </DownLoadFile>
        <StandardTable
          columns={columns}
          services={forwardRequestManageSearch}
          rowSelection={false}
          
        />
      </Card>
    </>
  );
};

export default ApproveManagement;
