import React, { useRef, useState } from 'react'
import { Modal } from 'antd'
import VForm from '@components/VForm'
import { roleAdd } from '@/services/v1';

const AddMumber = (props) => {
    const { modalVisible, handleModalVisible, handleSearch } = props
    const childRef: any = useRef(null);
    const [loading, setLoading] = useState(false)

    const handleCancel = () => {
        handleModalVisible && handleModalVisible(false)
    }
    const handleOk = () => {
        const form = childRef.current.getForm();
        //可以在验证后再获取值
        form.validateFields().then(valid => {
            setLoading(true)
            roleAdd({
                ...valid,
            }).then(res => {
                setLoading(false)
                if (res === undefined) {
                    handleCancel()
                    handleSearch && handleSearch()
                }
            })

        }).catch((e) => { })
    }

    const columns = [
        { name: 'name', label: '名称' , rules: [{ required: true }]},
        { name: 'parent_id', label: '父ID' }
    ]

    const layoutCol = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
    }

    return (
        <Modal
            title={'新增成员'}
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

export default AddMumber