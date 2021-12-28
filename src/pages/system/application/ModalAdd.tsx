import React, { useRef, useState } from 'react'
import { message, Modal } from 'antd'
import VForm from '@components/VForm'
import { systemApplicationAdd } from '@/services/v1';
import {filterCategory} from "@/utils/utils"

const VModal = (props) => {
    const { modalVisible, handleModalVisible, handleSearch } = props
    const childRef: any = useRef(null)
    const [ loading, setLoading ] = useState(false)

    const handleCancel = () => {
        handleModalVisible && handleModalVisible(false)
    }

    const handleOk = () => {
        const form = childRef.current.getForm();
        //可以在验证后再获取值
        form.validateFields().then(valid => {
            setLoading(true)
            systemApplicationAdd({
               ...valid
            }).then(res => {
                setLoading(false)
                if (res === undefined) {
                    message.success("新增成功!")
                    handleCancel()
                    handleSearch && handleSearch()
                }
            })

        }).catch((e) => { })
    }
    
    const columns = [
        { name: 'name', label: '应用名称', rules: [{ required: true}]},
        { name: 'category', label: '类型',  type: 'select', list: filterCategory("应用类型")},
        { name: 'maintenance', label: '运维单位', type: 'select',list: filterCategory("运维单位")},
        { name: 'maintenance_contact', label: '运维单位联系方式'},
        { name: 'management', label: '管理单位', type: 'select',list: filterCategory("管理单位")},
        { name: 'management_contact', label: '管理单位联系方式'},
        { name: 'secret_level', label: '密级', type: 'select',list: filterCategory("密级")},
        { name: 'industry', label: '行业属性', type: 'select',list: filterCategory("行业属性")},
        { name: 'administrative', label: '行政属性', type: 'select',list: filterCategory("行政属性")},
        { name: 'description', label: '描述信息', type: 'textarea'}
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
            <VForm columns={columns} ref={childRef} span={24} layoutCol={layoutCol} />
        </Modal>
    )

}
export default VModal;