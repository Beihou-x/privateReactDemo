import React, { useRef, useState, useEffect } from "react";
import { Modal, message } from "antd";
import VForm from "@components/VForm";
import { userGroupAdd,userGroupUpdate, } from "@/services/v2";
import {roleManager} from "@/services/v1";
const VModal = (props) => {
  const { modalVisible, handleModalVisible, handleSearch,editData } = props;
  const childRef: any = useRef(null);
  const [loading, setLoading] = useState(false);
  const [roleList, setRoleList] = useState([])

  useEffect(() => {
    getRoleList();

  },[])

  const getRoleList = async () => {
    const res = await roleManager({})
    const list = res.items.map(item => {
      return {
        value: item.id,
        label: item.name
      }
    })
    setRoleList(list)
  }

  const handleCancel = () => {
    handleModalVisible && handleModalVisible(false,{});
  };
  const handleOk = () => {
    const form = childRef.current.getForm();
    //可以在验证后再获取值
    form
      .validateFields()
      .then((valid) => {
        setLoading(true);
        if(Object.keys(editData).length) {
          userGroupUpdate(editData.id,{...valid,}).then(res =>{
            setLoading(false);
            if (res === undefined) {
              message.success('编辑用户组成功!')
              handleCancel();
              handleSearch && handleSearch();
            }
          })
        }else {
          userGroupAdd({
            ...valid,
          }).then((res) => {
            setLoading(false);
            if (res === undefined) {
              message.success('新增用户组成功!')
              handleCancel();
              handleSearch && handleSearch();
            }
          });
        }
      })
      .catch((e) => { });
  };

  const columns = [
    { name: "name", label: "用户组名称", rules: [{ required: true }] },
    // {name: 'team_ids', label: '用户权限',type: 'select', mode: "multiple", list:roleList},
    { name: "description", label: "用户描述" },

  ];

  const layoutCol = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };

  return (
    <Modal
      title={Object.keys(editData).length ? "编辑用户组":"新增用户组"}
      width={700}
      visible={modalVisible}
      onCancel={handleCancel}
      onOk={handleOk}
      confirmLoading={loading}
    >
      <VForm columns={columns} ref={childRef} span={24} layoutCol={layoutCol} data={{...editData,team_ids:editData.teams||[] }} />
    </Modal>
  );
};

export default VModal;
