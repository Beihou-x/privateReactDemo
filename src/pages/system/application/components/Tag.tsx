import React, { useRef, useState } from 'react'
import { Modal,message } from 'antd'
import VForm from '@components/VForm'
import { applicationTagAdd } from '@/services/v2';
import {filterCategoryId} from "@/utils/utils";

const VModal = (props) => {
    const { modalVisible, handleModalVisible, handleSearch,tagData} = props
    const childRef: any = useRef(null);
    const [loading, setLoading] = useState(false)

    const tagList = filterCategoryId("应用标签") || []
    const handleCancel = () => {
        handleModalVisible && handleModalVisible(false)
    }
    const handleOk = () => {
        const form = childRef.current.getForm();
        //可以在验证后再获取值
        form.validateFields().then(valid => {
            setLoading(true)
            applicationTagAdd({
                tag_id: [valid.tag_id],
                application_id: tagData.id,
                category: tagData.category
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
        { name: 'tag_id', label: '标签' , list: tagList, type: 'select', rules: [{ required: true }]},
    ]

    const layoutCol = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
    }

    return (
        <Modal
            title={'标签管理'}
            width={700}
            visible={modalVisible}
            onCancel={handleCancel}
            onOk={handleOk}
            confirmLoading={loading}
        >

            <VForm columns={columns} ref={childRef} span={24} layoutCol={layoutCol} initialValues={{tag_id:tagData.tag_name ? tagData.tag_name[0]: '' }} />

        </Modal>
    )
}

export default VModal