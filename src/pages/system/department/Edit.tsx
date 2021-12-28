import React, { useRef, useState,useEffect } from 'react'
import { Modal,message} from 'antd'
import VForm from '@components/VForm'
import { departmentAndUnitEdit,roleManager } from '@/services/v1';

const Edit = (props) => {
    const { modalVisible, handleModalVisible, handleSearch,departmentList,editData } = props
    const childRef: any = useRef(null);
    const [loading, setLoading] = useState(false);
    const [roleList, setRoleList] = useState([]);
    const [oldTeamId, setOldTeamId] = useState([]);
    const [defalutData, setDefaultData] = useState({})

    useEffect(() => {
        getRoleList();
        getDefaultData();
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
  const getDefaultData = () => {
    let arr = ((editData && editData.teams) || []).map(item => {
      return item.id
    })
    setOldTeamId(arr);
    setDefaultData({ ...editData, team_ids: arr })
  }


    const handleCancel = () => {
        handleModalVisible && handleModalVisible({},false)
    }
    const handleOk = () => {
        const form = childRef.current.getForm();
        //可以在验证后再获取值
        form.validateFields().then(valid => {
            setLoading(true)
            departmentAndUnitEdit(editData.id,{
                name: valid.name,
                new_id:valid.id.toString(),
                parent_id: valid.parent_id,
                description: valid.description,
                team_ids: valid.team_ids,
                category: 'DEPARTMENT'
            }).then(res => {
                setLoading(false)
                if (res === undefined) {
                    message.success('编辑组织成功');

                    handleCancel()
                    handleSearch && handleSearch()
                }
            })

        }).catch((e) => { })
    }

    const columns = [
        { name: 'id', label: '组织ID' ,type: "inputNumber",disabled:"disabled", rules: [{ required: true }],},
        { name: 'parent_id', label: '父ID' ,disabled:"disabled", list: departmentList, type: 'select', rules: [{ required: true }]},
        { name: 'name', label: '组织名称' , rules: [{ required: true }]},
        {name: 'team_ids', label: '用户权限',type: 'select', mode: "multiple", list:roleList},
        { name: 'description', label: '组织描述' , type: "textarea"}
    ]

    const layoutCol = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
    }

    return (
        <Modal
            title={'编辑'}
            width={700}
            visible={modalVisible}
            onCancel={handleCancel}
            onOk={handleOk}
            confirmLoading={loading}
        >

            <VForm columns={columns} ref={childRef} span={24} layoutCol={layoutCol} data={defalutData} />

        </Modal>
    )
}

export default Edit