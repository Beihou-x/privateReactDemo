import React, { useContext, useEffect, useState } from "react";
import { Modal, Input } from "antd";
import StandardTable from "@components/Table";
import SearchForm from "@components/SearchForm";
// import { searchNoGroupDeviceSync } from "@/services/v1";

const Assign = (props) => {
  const { modalVisible, handleCancel, handleOk, loading, groupId } = props;
  const [selectedKeys, setSelectedKeys]: any = useState([]);

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
    getCheckboxProps: (record) => ({
      id: record["id"],
    }),
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
              label: "设备编码",
              name: "id",
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
          columns={columns}
          // services={(params) =>
          //   searchNoGroupDeviceSync({
          //     ...params,
          //     "exclude":["id","device_id","device_tag"]
          //   })
          // }
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
        />
      </Modal>
    </div>
  );
};

export default Assign;
