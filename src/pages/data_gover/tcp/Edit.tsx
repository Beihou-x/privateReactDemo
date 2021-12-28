import React, { useRef, useState } from "react";
import { Modal } from "antd";
import VForm from "@components/VForm";
import { protocolUpdate } from "@/services/v1";
import { filterCategory } from "@/utils/utils";

const VModal = props => {
  const { tcpEditData, tcpShow, handleTcpEdit, handleSearch } = props;

  const childRef: any = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleCancel = () => {
    handleTcpEdit && handleTcpEdit({}, false);
  };

  const handleOk = () => {
    const form = childRef.current.getForm();
    //可以在验证后再获取值
    form
      .validateFields()
      .then(valid => {
        setLoading(true);
        protocolUpdate({
          id: tcpEditData.id,
          ...valid,
        }).then(res => {
          setLoading(false);
          if (res === undefined) {
            handleCancel();
            handleSearch && handleSearch();
          }
        });
      })
      .catch(e => {});
  };

  const columns = [
    { name: "name", label: "应用名称", rules: [{ required: true }] },
    {
      name: "category",
      label: "协议类型",
      rules: [{ required: true }],
      type: "select",
      list:filterCategory("协议类型"),
    },
    { name: "config", label: "配置", type: "textarea" },
  ];
  const layoutCol = {
    labelCol: { span: 8 },
    wrapperCol: { span: 10 },
  };

  return (
    <Modal
      title="编辑"
      width={700}
      visible={tcpShow}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={loading}
    >
      <VForm
        columns={columns}
        ref={childRef}
        span={24}
        data={tcpEditData}
        layoutCol={layoutCol}
      />
    </Modal>
  );
};
export default VModal;
