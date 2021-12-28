import React, { useRef, useState } from 'react'
import { Modal,message } from 'antd'
import VForm from '@components/VForm'
import { departmentAndUnitEdit } from '@/services/v1';
import { filterCategory } from '@/utils/utils';

const Edit = (props) => {
    const { modalVisible, handleModalVisible, handleSearch,areaList,editData } = props
    const childRef: any = useRef(null);
    const [loading, setLoading] = useState(false)
    const unitCategory = filterCategory("区域类型") || []

    const handleCancel = () => {
        handleModalVisible && handleModalVisible({},false,'')
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
                category: 'UNIT',
                type: valid.type
            }).then(res => {
                setLoading(false)
                if (res === undefined) {
                    message.success('编辑成功!');
                    handleCancel();
                    handleSearch && handleSearch();
                }
            })

        }).catch((e) => { })
    }

    const columns = [
        { name: 'id', label: '区域ID' ,type: "inputNumber",disabled:"disabled", rules: [{ required: true }]},
        { name: 'parent_id', label: '父ID' ,disabled:editData.editType === 'edit' ?"disabled" : '', list: areaList, type: 'select', rules: [{ required: true }]},
        { name: 'name', label: '区域名称' ,disabled:editData.editType === 'group' ?"disabled" : '', rules: [{ required: true }]},
        { name: 'type', label: '类型', disabled:editData.editType === 'group' ?"disabled" : '', list:unitCategory , type: 'select'},
        { name: 'description', label: '区域描述',disabled:editData.editType === 'group' ?"disabled" : '', type: "textarea"}
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

            <VForm columns={columns} ref={childRef} span={24} layoutCol={layoutCol} data={editData} />

        </Modal>
    )
}

export default Edit