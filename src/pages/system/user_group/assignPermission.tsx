import React, { useRef, useState, useEffect } from "react";
import { Modal, message } from "antd";
import VForm from "@components/VForm";
import { userGroupAssignPermission } from "@/services/v2";
import {roleManager} from "@/services/v1";
const Assign = (props) => {
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
        userGroupAssignPermission({
          id: editData.id,
          ...valid
        }).then(res => {
          message.success('用户组分配权限成功!')
          handleCancel();
          handleSearch && handleSearch();
        })
      })
      .catch((e) => { });
  };

  const columns = [
    {name: 'team_ids', label: '用户权限',type: 'select', mode: "multiple", list:roleList},
  ];

  const layoutCol = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };

  return (
    <Modal
      title={"分配用户组权限"}
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

export default Assign;
