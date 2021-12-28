import React, { useRef, useState } from 'react'
import { Modal,message } from 'antd'
import VForm from '@components/VForm'
import { departmentAndUnitAdd } from '@/services/v1';
import { filterCategory } from '@/utils/utils';
const VModal = (props) => {
    const { modalVisible, handleModalVisible, handleSearch,areaList } = props
    const childRef: any = useRef(null);
    const [loading, setLoading] = useState(false)
    const unitCategory = filterCategory("区域类型") || []
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
                category: 'UNIT'
            }).then(res => {
                setLoading(false)
                if (res === undefined) {
                    message.success('添加成功!')
                    handleCancel()
                    handleSearch && handleSearch()
                }
            })

        }).catch((e) => { })
    }

    const columns = [
        { name: 'name', label: '区域名称' , rules: [{ required: true }]},
        { name: 'id', label: '区域ID' ,type: "inputNumber", rules: [{ required: true }]},
        { name: 'parent_id', label: '父ID' , list: areaList, type: 'select', rules: [{ required: true }]},
        { name: 'type', label: '类型', list:unitCategory , type: 'select'},
        { name: 'description', label: '区域描述' , type: "textarea"}
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