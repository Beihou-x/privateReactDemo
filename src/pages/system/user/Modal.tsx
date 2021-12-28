import React, { useRef, useState, useEffect } from "react";
import { Modal, message } from "antd";
import VForm from "@components/VForm";
import { userAdd, roleManager, departmentSearch } from "@/services/v1";

const VModal = (props) => {
  const { modalVisible, handleModalVisible, handleSearch } = props;
  const childRef: any = useRef(null);
  const [loading, setLoading] = useState(false);

  const [roleList, setRoleList] = useState([])
  const [departmentList, setDepartmentList] = useState([])

  useEffect(() => {
    // getRoleList()
    getDepartmentList()
  }, [])

  // const getRoleList = async () => {
  //   const res = await roleManager({})
  //   const list = res.items.map(item => {
  //     return {
  //       value: item.id,
  //       label: item.name
  //     }
  //   })
  //   setRoleList(list)
  // }

  const getDepartmentList = async () => {
    const res = await departmentSearch({})
    const list = res.items.map(item => {
      return {
        value: item.id,
        label: item.name
      }
    })
    setDepartmentList(list)
  }

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
        userAdd({
          ...valid,
        }).then((res) => {
          setLoading(false);
          if (res === undefined) {
            message.success('新增用户成功!')
            handleCancel();
            handleSearch && handleSearch();
          }
        });
      })
      .catch((e) => { });
  };

  const columns = [
    { name: "display_name", label: "用户名称", rules: [{ required: true }] },
    { name: "name", label: "用户账号", rules: [{ required: true }] },
    // { name: "team_ids", label: "用户权限", type: "select", mode: "multiple", list: roleList, rules: [{ required: true }] },
    {
      name: "unit_id", label: "部门", type: "select", list: departmentList, rules: [{ required: true }], props: {
        showSearch: true,
        optionFilterProp: "children",
        filterOption: (input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    },
    { name: "description", label: "用户描述" },

  ];

  const layoutCol = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };

  return (
    <Modal
      title={"新增用户"}
      width={700}
      visible={modalVisible}
      maskClosable={false}
      onCancel={handleCancel}
      onOk={handleOk}
      confirmLoading={loading}
    >
      <VForm columns={columns} ref={childRef} span={24} layoutCol={layoutCol} />
    </Modal>
  );
};

export default VModal;
