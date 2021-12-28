import React, { useEffect, useRef, useState } from 'react'
import { Modal } from 'antd'
import VForm from '@components/VForm'
import { deviceGroupSyncAdd, deviceGroupSyncUpdate } from '@/services/v1';

const getTreeData = (data) => {
    return data.map(m => {
        if (m.childgroups) {
            return { title: m.name, value: m.id, children: getTreeData(m.childgroups) }
        } else {
            return { title: m.name, value: m.id }
        }
    })
}

const VModal = (props) => {
    const { modalVisible, treeData, handleModalVisible, handleSearchGroup, parentId, data } = props
    const childRef: any = useRef(null);
    const [loading, setLoading] = useState(false)

    const handleCancel = () => {
        handleModalVisible && handleModalVisible(false)
    }
    const handleOk = (id) => {
        const form = childRef.current.getForm();
        //可以在验证后再获取值
        form.validateFields().then(valid => {
            setLoading(true)
            if(!!id){
              deviceGroupSyncUpdate({...valid}).then(res =>{
                setLoading(false)
                if (res === undefined){
                  handleCancel()
                  handleSearchGroup && handleSearchGroup()
                }
              })
            }else{
                deviceGroupSyncAdd({
                    ...valid
                }).then(res => {
                    setLoading(false)
                    if (res === undefined) {
                        handleCancel()
                        handleSearchGroup && handleSearchGroup()
                    }
                })

            }

        }).catch((e) => { })
    }

    const columns = [
        { name: 'parent_id', type: 'treeSelect', label: '父级分组', treeData: getTreeData(treeData), disabled: data.parent_id },
        { name: 'name', label: '分组名称', rules: [{ required: true }] },
        { name: 'sequence', type: 'inputNumber', label: '排序', rules: [{ required: true }] },
    ]

    const layoutCol = {
        labelCol: { span: 8 },
        wrapperCol: { span: 10 },
    }

    return (
        <Modal
            title='${title}'
            width={700}
            visible={modalVisible}
            onCancel={handleCancel}
            onOk={handleOk}
            confirmLoading={loading}
        >

            <VForm columns={columns} ref={childRef} span={24} layoutCol={layoutCol} data={{ ...data }} />

        </Modal>
    )
}

export default VModal