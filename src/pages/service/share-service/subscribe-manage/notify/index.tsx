import React, { useEffect, useState } from "react";
import StandardTable from "@components/Table";
import SearchForm from "@components/SearchForm";
import { Input, Select, Card, Button, Divider } from "antd";
import { forwardSearch } from "@/services/v1";
import DownLoadFile from "@components/DownLoadFile";
import { Link } from "react-router-dom";
import { formatDate, filterCategory, getCodeValue } from "@/utils/utils";

const { Option } = Select;

const ApproveAccess = () => {
  const columns = [
    {
      title: "申请ID",
      dataIndex: ["id"],
    },
    {
      title: "应用ID",
      dataIndex: ["application_id"],
    },
    {
      title: "申请标题",
      dataIndex: ["title"],
    },
    {
      title: "申请名称",
      dataIndex: ["name"],
    },
    {
      title: "供应商",
      dataIndex: ["category"],
    },
    {
      title: "版本",
      dataIndex: ["version"],
    },
    {
      title: "申请状态",
      dataIndex: ["status"],
      align: "center",
      render: (val, record) => <>{getCodeValue(status, val)}</>,
    },
    {
      title: "创建人/创建时间",
      dataIndex: ["creator"],
      render: (val, record) => (
        <span>
          {record && record.creator ? record.creator : "-"}/
          {formatDate(record && record.created_at, "YYYY-MM-DD")}
        </span>
      ),
    },
    {
      title: "处理人/处理时间",
      dataIndex: ["create_at"],
      render: (val, record) => (
        <span>
          {record && record.processor ? record.processor : "-"}/
          {formatDate(record && record.processed_at, "YYYY-MM-DD")}
        </span>
      ),
    },
    {
      title: "操作",
      render: val => (
        <>
          <Link to={`/service/share/ApproveAccess/update/${val && val.id}`}>
            编辑
          </Link>
          <Divider type="vertical" />
          <Link to={`/service/share/ApproveAccess/audit/${val && val.id}`}>
            审核
          </Link>
          <Divider type="vertical" />
          <Link
            to={`/service/share/ApproveAccess/distribution/${val && val.id}`}
          >
            分配服务
          </Link>
          <Divider type="vertical" />
          <Link to={`/service/share/ApproveAccess/detail/${val && val.id}`}>
            详情
          </Link>
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
              label: "申请ID",
              name: "id",
              renderFormItem: () => <Input autoComplete="off" />,
            },
            {
              label: "申请标题",
              name: "title",
              renderFormItem: () => <Input autoComplete="off" />,
            },
            {
              label: "申请类型",
              name: "traffic",
              renderFormItem: () => (
                <Select allowClear>
                  <Option value={1}>订阅</Option>
                  <Option value={2}>转发</Option>
                </Select>
              ),
            },
            {
              label: "申请应用",
              name: "application_id",
              renderFormItem: () => <Select allowClear></Select>,
            },
            {
              label: "申请状态",
              name: "status",
              renderFormItem: () => (
                <Select allowClear>
                  <Option value={"DRAFT"}>草稿</Option>
                  <Option value={"APPLYING"}>申请中</Option>
                  <Option value={"APPROVED"}>同意</Option>
                  <Option value={"REFUSE"}>拒绝</Option>
                  {/* <Option value={5}>已取消</Option> */}
                </Select>
              ),
            },
          ]}
          onChange={() => {}}
        />
        <Button
          type="primary"
          style={{ marginRight: 20, marginBottom: 18, marginTop: 18 }}
        >
          <Link to="/service/share/ApproveAccess/add">申请</Link>
        </Button>
        <DownLoadFile
          services={() => {
            return {
              data: "",
            };
          }}
        >
          导出
        </DownLoadFile>
        <StandardTable
          columns={columns}
          services={forwardSearch}
          rowSelection={false}
          
        />
      </Card>
    </>
  );
};

export default ApproveAccess;
