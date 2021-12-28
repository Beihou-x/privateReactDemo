import React, { useRef, useState, useEffect } from "react";
import { Modal, message } from "antd";
import VForm from "@components/VForm";
import { roleAdd, roleManager } from "@/services/v1";

const VModal = (props) => {
  const { modalVisible, handleModalVisible, handleSearch } = props;
  const childRef: any = useRef(null);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  useEffect(() => {
    getRoleList();
  }, []);

  const handleCancel = () => {
    handleModalVisible && handleModalVisible(false);
  };
  const handleOk = () => {
    const form = childRef.current.getForm();
    //可以在验证后再获取值
    form
      .validateFields()
      .then((valid) => {
        setLoading(true);
        roleAdd({
          ...valid,
        }).then((res) => {
          setLoading(false);
          if (res === undefined) {
            message.success('角色添加成功!')
            handleCancel();
            handleSearch && handleSearch();
          }
        });
      })
      .catch((e) => { });
  };
  const getRoleList = async () => {
    const res = await roleManager({});
    const list = res.items.map((item) => {
      return {
        value: item.id,
        label: item.name,
      };
    });
    setList(list);
  };
  const initialValues = { name: '', parent_id: '', sequence: 0 }
  const columns = [
    { name: "name", label: "名称", rules: [{ required: true }] },
    { name: "quota", label: "日访问配额", type: "inputNumber" },
    // { name: "parent_id", label: "父级", type: "select", list: list,rules: [{ required: true }] },
    { name: "sequence", label: "排序", type: "inputNumber" }
  ];

  const layoutCol = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };

  return (
    <Modal
      title={"新增角色"}
      width={700}
      visible={modalVisible}
      onCancel={handleCancel}
      onOk={handleOk}
      confirmLoading={loading}
    >
      <VForm columns={columns} ref={childRef} span={24} layoutCol={layoutCol} initialValues={initialValues} />
    </Modal>
  );
};

export default VModal;
