import React, { useRef, useState,useEffect } from 'react'
import { Modal,message } from 'antd'
import VForm from '@components/VForm'
import { departmentAndUnitAdd,roleManager } from '@/services/v1';

const VModal = (props) => {
    const { modalVisible, handleModalVisible, handleSearch,departmentList } = props
    const childRef: any = useRef(null);
    const [loading, setLoading] = useState(false)
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
        handleModalVisible && handleModalVisible(false)
    }
    const handleOk = () => {
        const form = childRef.current.getForm();
        //可以在验证后再获取值
        form.validateFields().then(valid => {
            setLoading(true)
            departmentAndUnitAdd({
                ...valid,
                id:valid.id.toString(),
                category: "DEPARTMENT"
            }).then(res => {
                setLoading(false)
                if (res === undefined) {
                    message.success('新增组织成功');
                    handleCancel()
                    handleSearch && handleSearch({})
                }
            })

        }).catch((e) => { })
    }

    const columns = [
        { name: 'name', label: '组织名称' , rules: [{ required: true }]},
        { name: 'id', label: '组织id',type: 'inputNumber', rules: [{ required: true }]},
        { name: 'parent_id', label: '父ID' , list: departmentList, type: 'select', rules: [{ required: true }]},
        {name: 'team_ids', label: '用户权限',type: 'select', mode: "multiple", list:roleList},

        { name: 'description', label: '描述' , type:"textarea"}
    ]

    const layoutCol = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
    }

    return (
        <Modal
            title={'新增'}
            width={700}
            visible={modalVisible}
            onCancel={handleCancel}
            onOk={handleOk}
            confirmLoading={loading}
        >

            <VForm columns={columns} ref={childRef} span={24} layoutCol={layoutCol} />

        </Modal>
    )
}

export default VModal