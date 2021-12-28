import React, { useRef, useState, useEffect } from "react";
import { Modal, message } from "antd";
import VForm from "@components/VForm";
import { userAdd, roleManager, departmentSearch, userEdit } from "@/services/v1";
import {userAssignPermission} from '@/services/v2';
const Edit = (props) => {
  const { modalVisible, handleModalVisible, handleSearch, editData, type } = props;
  const childRef: any = useRef(null);
  const [loading, setLoading] = useState(false);
  const [oldTeamId, setOldTeamId] = useState([]);
  const [roleList, setRoleList] = useState([])
  const [departmentList, setDepartmentList] = useState([])
  const [defalutData, setDefaultData] = useState({})

  useEffect(() => {
    getDefaultData()
    getRoleList()
    getDepartmentList()
  }, [])

  const getDefaultData = () => {
    let arr = ((editData && editData.teams) || []).map(item => {
      return item.id
    })
    setOldTeamId(arr);
    setDefaultData({ ...editData, team_ids: arr })
  }

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
    handleModalVisible && handleModalVisible({}, false);
  };
  const handleOk = () => {
    const form = childRef.current.getForm();
    //可以在验证后再获取值
    form
      .validateFields()
      .then((valid) => {
        setLoading(true);
        if(type==="edit") {
          userEdit(editData.id, {
            name: valid.name,
            display_name: valid.display_name,
            description: valid.description,
            unit_id: valid.unit_id,
            old_team_id: oldTeamId,
            new_team_id: valid.team_ids
          }).then((res) => {
            setLoading(false);
            if (res === undefined) {
              message.success('编辑成功')
              handleCancel();
              handleSearch && handleSearch();
            }
          });
        }else {
          userAssignPermission({
            id: editData.id,
            ...valid
          }).then(res => {
            setLoading(false);
            if (res === undefined) {
              message.success('权限分配成功')
              handleCancel();
              handleSearch && handleSearch();
            }
          })
        }
        
      })
      .catch((e) => { });
  };

  const columns = [
    { name: "display_name", label: "用户名称", rules: [{ required: true }], disabled: type==="assign"  },
    { name: "name", label: "用户账号", rules: [{ required: true }], disabled: type==="assign"  },
    {
      name: "unit_id", label: "部门", type: "select", list: departmentList, rules: [{ required: true }], props: {
        showSearch: true,
        optionFilterProp: "children",
        filterOption: (input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      },
      disabled: type==="assign" 
    },
    { name: "description", label: "用户描述",disabled: type==="assign"  },
  ];

  const columnsAssign = [
    { name: "team_ids", label: "用户权限", type: "select", mode: "multiple", list: roleList },
  ]

  const layoutCol = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };

  return (
    <Modal
      title={type==="edit"?"编辑用户":"分配用户权限"}
      width={700}
      maskClosable={false}
      visible={modalVisible}
      onCancel={handleCancel}
      onOk={handleOk}
      confirmLoading={loading}
    >
      <VForm columns={type==="edit"?columns:columnsAssign} ref={childRef} span={24} layoutCol={layoutCol} data={defalutData} />
    </Modal>
  );
};

export default Edit;
