import React, { useRef, useState } from 'react'
import { Modal,message } from 'antd'
import VForm from '@components/VForm'
import { departmentAndUnitEdit } from '@/services/v1';
import { filterCategory,filterCategoryId } from '@/utils/utils';

const Business = (props) => {
    const { modalVisible, handleModalVisible, handleSearch,areaList,editData } = props
    const childRef: any = useRef(null);
    const [loading, setLoading] = useState(false)
    const businessList = filterCategoryId("业务分组") || []

    const handleCancel = () => {
        handleModalVisible && handleModalVisible({},false,'')
    }
    const handleOk = () => {
        const form = childRef.current.getForm();
        //可以在验证后再获取值
        form.validateFields().then(valid => {
            setLoading(true)
            departmentAndUnitEdit(editData.id,{
                ...valid,
                category: 'UNIT',
            }).then(res => {
                setLoading(false)
                if (res === undefined) {
                    message.success('业务分组修改成功!');
                    handleCancel();
                    handleSearch && handleSearch();
                }
            })

        }).catch((e) => { })
    }

    const columns = [
        { name: 'business_id', label: '业务分组' , list: businessList, type: 'select'},
    ]

    const layoutCol = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
    }

    return (
        <Modal
            title={'业务分组'}
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

export default Business