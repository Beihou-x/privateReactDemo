import React, { useRef, useState, useEffect } from "react";
import { Modal } from "antd";
import VForm from "@components/VForm";
import {
  operationEdit,
  getOperationPermission
} from "@/services/v1";
import { filterCategory } from "@/utils/utils"
const Edit = (props) => {
  const { modalVisible, handleModalVisible, handleSearch,editData } = props;
  const childRef: any = useRef(null);
  const [loading, setLoading] = useState(false);

  // 父节点
  const [parentList, setParentList] = useState([]);
  const permissionCategory = filterCategory("权限种类") || []
  const handleCancel = () => {
    handleModalVisible && handleModalVisible({},false);
  };
  useEffect(() => {
    getParentList();
  }, [modalVisible]);

  const getParentList = async () => {
    const res = await getOperationPermission({});
    const list = (res.items || [] ).map((item) => {
      return {
        label: item.name,
        value: item.id,
      };
    });
    setParentList(list);
  };
  const handleOk = () => {
    const form = childRef.current.getForm();
    //可以在验证后再获取值
    form
      .validateFields()
      .then((valid) => {
        setLoading(true);
        operationEdit(editData.id,{
          ...valid,
        }).then((res) => {
          setLoading(false);
          if (res === undefined) {
            handleCancel();
            handleSearch && handleSearch();
          }
        });
      })
      .catch((e) => {});
  };

  const columns = [
    { name: "name", label: "权限名称", rules: [{ required: true }] },
    { name: "category", label: "权限种类", type: "select", list: permissionCategory,rules: [{ required: true }] },
    { name: "parent_id", label: "父ID", type: "select", list: parentList },
    { name: "description", label: "权限描述" },
  ];

  const layoutCol = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };

  return (
    <Modal
      title={"编辑"}
      width={700}
      visible={modalVisible}
      onCancel={handleCancel}
      onOk={handleOk}
      confirmLoading={loading}
    >
      <VForm columns={columns} ref={childRef} span={24} layoutCol={layoutCol} data={editData} />
    </Modal>
  );
};

export default Edit;
