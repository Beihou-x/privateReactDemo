import React, { useContext, useEffect, useState } from "react";
import { Modal, Input } from "antd";
import StandardTable from "@components/Table";
import SearchForm from "@components/SearchForm";
import { accessDeviceDistribute } from "@/services/v1";
import { formatDate } from "@/utils/utils";

const Assign = (props) => {
  const { modalVisible, handleCancel, handleOk, loading, groupId } = props;
  const [selectedKeys, setSelectedKeys]: any = useState([]);

  const columns = [
    {
      title: "国标ID",
      dataIndex: "device_id",
      width: 200,
      ellipsis: true,
    },
    {
      title: "设备名称",
      dataIndex: "alias",
      width: 200,
      ellipsis: true,
    },
    {
      title: "经度",
      dataIndex: "longitude",
      width: 80,
      ellipsis: true,
    },
    {
      title: "纬度",
      dataIndex: "latitude",
      width: 80,
      ellipsis: true,
    },
    {
      title: "地点",
      dataIndex: "place",
      width: 200,
      ellipsis: true,
    },
    {
      title: "设备IP",
      dataIndex: "ipv4",
      width: 100,
      ellipsis: true,
    },
    {
      title: "设备厂商",
      dataIndex: "manufactor",
      width: 100,
      ellipsis: true,
    },
    {
      title: "行政区划",
      dataIndex: "place_code",
      width: 200,
      ellipsis: true,
    },
    {
      title: "自定义标签/业务标签",
      dataIndex: "business_label",
      width: 100,
      ellipsis: true,
      render: (_, record) => (
        <>
          {record.custom_label || "-"}/{record.business_label || "-"}
        </>
      ),
    },
    {
      title: "接入来源",
      dataIndex: "source",
      width: 100,
      ellipsis: true,
    },
    {
      title: "卡口类型",
      dataIndex: "function_type",
      width: 100,
      ellipsis: true,
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
              name: "device_id",
              renderFormItem: () => <Input autoComplete="off" />,
            },
            {
              label: "设备名称",
              name: "alias",
              renderFormItem: () => <Input autoComplete="off" />,
            },
          ]}
          onChange={() => {}}
          subscribeName="assignDevice"
        />
        <StandardTable
          rowKey={"device_id"}
          columns={columns}
          services={(params:any) =>
            accessDeviceDistribute({
              tag_id: groupId,
              ...params,
            })
          }
          subscribeName="assignDevice"
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
