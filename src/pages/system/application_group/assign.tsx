import React, { useContext, useEffect, useState } from "react";
import { Modal, Input } from "antd";
import StandardTable from "@components/Table";
import SearchForm from "@components/SearchForm";
import { applicationGroupUnassignApp } from "@/services/v2";
import { formatDate, filterCategory, getCodeValue } from "@/utils/utils";

const Assign = (props) => {
  const { modalVisible, handleCancel, handleOk, loading, groupId } = props;
  const [selectedKeys, setSelectedKeys]: any = useState([]);

  const categorys = filterCategory("应用类型") || [];
  const secretLevel = filterCategory("密级") || [];
  const industry = filterCategory("行业属性") || [];
  const administrative = filterCategory("行政属性") || [];

  const columns = [
    {
      dataIndex: "name",
      title: "应用名称",
      align: "center",
    },
    {
      dataIndex: "category",
      title: "类型",
      align: "center",
      render: (val) => <span>{getCodeValue(categorys, val)}</span>,
    },
    {
      dataIndex: "expired_at",
      title: "授权有效期",
      align: "center",
      render: (val, record) => (
        <span>{formatDate(record && record.expired_at, "YYYY-MM-DD")}</span>
      ),
    },
    {
      dataIndex: "maintenance",
      title: "运维单位",
      align: "center",
    },
    {
      dataIndex: "management",
      title: "管理单位",
      align: "center",
    },
    {
      dataIndex: "secret_level",
      title: "密级",
      align: "center",
      render: (val) => <span>{getCodeValue(secretLevel, val)}</span>,
    },
    {
      dataIndex: "industry",
      title: "行业属性",
      align: "center",
      render: (val) => <span>{getCodeValue(industry, val)}</span>,
    },
    {
      dataIndex: "administrative",
      title: "行政属性",
      align: "center",
      render: (val) => <span>{getCodeValue(administrative, val)}</span>,
    },
    {
      dataIndex: "status",
      title: "状态",
      align: "center",
    },
    {
      dataIndex: "tag_name",
      title: "标签",
      align: "center",
      render: text => (
        <span>{text&&text[0]}</span>
      )
    },
    {
      dataIndex: "version",
      title: "版本",
      align: "center",
    },
    {
      dataIndex: "creator",
      title: "创建人/创建时间",
      align: "center",
      render: (val, record) => (
        <span>
          {(record && record.creator) || "-"}/
          {formatDate(record && record.created_at, "YYYY-MM-DD")}
        </span>
      ),
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedKeys(selectedRowKeys);
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
  };

  return (
    <div>
      <Modal
        title={"分配设备"}
        width={1400}
        visible={modalVisible}
        onCancel={handleCancel}
        onOk={() => handleOk(selectedKeys)}
        confirmLoading={loading}
      >
        <SearchForm
          formList={[
            {
              label: "国标ID",
              name: "tag_id",
              renderFormItem: () => <Input autoComplete="off" />,
            },
            {
              label: "设备名称",
              name: "name",
              renderFormItem: () => <Input autoComplete="off" />,
            },
          ]}
          onChange={() => {}}
        />
        <StandardTable
          rowKey={"id"}
          columns={columns}
          services={(params) =>
            applicationGroupUnassignApp({
              tag_id: groupId,
              ...params,
            })
          }
          
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          tableProps={{
            tableLayout: "fixed",
            scroll: {
              x: "auto",
            },
          }}
        />
      </Modal>
    </div>
  );
};

export default Assign;
