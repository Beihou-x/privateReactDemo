import React, { useRef, useState } from 'react'
import { message, Modal } from 'antd'
import VForm from '@components/VForm'
import { dictionaryUpdate } from '@/services/v1';

const VModal = (props) => {
    const { editForm, editModalShow, handleEditShow, handleSearch } = props
    const childRef: any = useRef(null)
    const [loading, setLoading] = useState(false)

    const handleCancel = () => {
        handleEditShow && handleEditShow({}, false)
    }

    const handleOk = () => {
        const form = childRef.current.getForm();
        //可以在验证后再获取值
        form.validateFields().then(valid => {
            setLoading(true)
            dictionaryUpdate(editForm.id, {
                category: '设备厂商',
                ...valid,
            }).then(res => {
                setLoading(false)
                if (res === undefined) {
                    message.success('编辑成功!')
                    handleCancel()
                    handleSearch && handleSearch()
                }
            })

        }).catch((e) => { })
    }

    const columns = [
        { name: 'name', label: '名称', rules: [{ required: true }] },
        { name: 'code', label: '编码', rules: [{ required: true }] },
        { name: 'sequence', label: '排序' },
    ]
    const layoutCol = {
        labelCol: { span: 8 },
        wrapperCol: { span: 10 }
    }

    const initialValues = { name: '', code: '', sequence: 0 }
    return (
        <Modal
            title='编辑'
            width={700}
            visible={editModalShow}
            onOk={handleOk}
            onCancel={handleCancel}
            confirmLoading={loading}
        >
            <VForm columns={columns} ref={childRef} span={24} data={editForm} layoutCol={layoutCol} initialValues={initialValues} />
        </Modal>
    )

}
export default VModal;