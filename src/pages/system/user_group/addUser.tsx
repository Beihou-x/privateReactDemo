import React, { useRef, useState, useEffect } from "react";
import { Modal, message } from "antd";
import VForm from "@components/VForm";
import { UserGroupAddUser,getUnAssignMember } from "@/services/v2";
import {userSearch} from "@/services/v1";
const VModal = (props) => {
  const { modalVisible, handleModalVisible, handleSearch,editData } = props;
  const childRef: any = useRef(null);
  const [loading, setLoading] = useState(false);
  const [userList, setUserList]:any = useState([]);
  useEffect(() => {
    getUnAssignMember({group_id: editData.id }).then(res => {
      setUserList(Array.isArray(res) ? res.map(item =>{
        return {
          label: item.display_name,
          value: item.id
        }
      }): []) 
    })
  },[])


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
        UserGroupAddUser({
          group_id: editData.id,
          ...valid
        }).then(res => {
          setLoading(false);
          if (res === undefined) {
            message.success("添加用户成功!");
            handleCancel();
            handleSearch && handleSearch();
          }
        })
      })
      .catch((e) => { });
  };

  const columns = [
    { name: "user_ids", label: "用户名", type: "select", list:userList, mode: "multiple", rules: [{ required: true }] },

  ];

  const layoutCol = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };

  return (
    <Modal
      title={"添加用户"}
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

export default VModal;
