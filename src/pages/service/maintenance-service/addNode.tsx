import React, { useEffect, useState, useRef } from "react";
import { Modal, Button } from "antd";
import VForm from "@components/VForm";

const addNode = (props) => {
  const { isModalVisible, handleOk, handleCancel } = props;
  const childRef: any = useRef(null);
  const handleOkHandel = () => {
    const form = childRef.current.getForm();
    //可以在验证后再获取值
    form
      .validateFields()
      .then((valid) => {
        handleOk && handleOk(valid);
      })
      .catch((e) => {});
  };
  const handleCancelHandel = () => {
    handleCancel && handleCancel();
  };
  const layoutCol = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };
  const columns = [
    { name: "name", label: "名称", rules: [{ required: true }] },
    { name: "ip", label: "IP信息", rules: [{ required: true }] },
    {
      name: "menu",
      label: "目录",
      type: "select",
      list: [
        // { value: "0", label: "接入服务" },
        // { value: "1", label: "实时转发服务" },
        // { value: "2", label: "离线转发服务" },
      ],
    },
    { name: "url", label: "管理服务URL" },
    { name: "description", label: "描述信息", type: "textarea" },
  ];
  return (
    <Modal
      title="新增节点"
      visible={isModalVisible}
      onOk={handleOkHandel}
      onCancel={handleCancelHandel}
    >
      <VForm columns={columns} ref={childRef} span={24} layoutCol={layoutCol} />
    </Modal>
  );
};

export default addNode;
