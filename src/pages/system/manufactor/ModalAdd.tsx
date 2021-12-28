import React, { useRef, useState } from 'react'
import { Modal, message } from 'antd'
import VForm from '@components/VForm'
import { dictionaryAdd } from '@/services/v1';

const VModal = (props) => {
    const { modalVisible, handleModalVisible, handleSearch } = props
    const childRef: any = useRef(null)
    const [loading, setLoading] = useState(false)

    const handleCancel = () => {
        handleModalVisible && handleModalVisible(false)
    }

    const handleOk = () => {
        const form = childRef.current.getForm();
        //可以在验证后再获取值
        form.validateFields().then(valid => {
            setLoading(true)
            dictionaryAdd({
                category: '设备厂商',
                ...valid
            }).then(res => {
                setLoading(false)
                if (res === undefined) {
                    handleCancel()
                    message.success('添加成功!')
                    handleSearch && handleSearch()
                }
            })

        }).catch((e) => { })
    }
    const initialValues = { name: '', code: '', sequence: 0 }
    const columns = [
        { name: 'name', label: '名称', rules: [{ required: true }] },
        { name: 'code', label: '编码', rules: [{ required: true }] },
        { name: 'sequence', label: '排序', type: 'inputNumber' }
    ]
    const layoutCol = {
        labelCol: { span: 8 },
        wrapperCol: { span: 10 }
    }


    return (
        <Modal
            title='新增'
            width={700}
            visible={modalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            confirmLoading={loading}
        >
            <VForm columns={columns} ref={childRef} span={24} layoutCol={layoutCol} initialValues={initialValues} />
        </Modal>
    )

}
export default VModal;