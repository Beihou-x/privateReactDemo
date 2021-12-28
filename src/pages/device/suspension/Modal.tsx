import React, { useRef, useState } from 'react'
import { Modal } from 'antd'
import VForm from '@components/VForm'
import { deviceFeedbackUpdate } from '@/services/v1';

const VModal = (props) => {
    const { modalVisible, title, action, ids, handleModalVisible, handleSearch } = props
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
            deviceFeedbackUpdate({
                ids: [...ids],
                action: action,
                content: valid.content
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
        { name: 'content', type: 'textarea', label: '描述', rules: [{ required: true, message: '请输入描述' }] },
    ]

    const layoutCol = {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
    }

    return (
        <Modal
            title={`${title}`}
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