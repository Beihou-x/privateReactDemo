import React, { useRef, useState } from 'react'
import { Modal, message } from 'antd'
import { useHistory } from 'react-router-dom';
import VForm from '@components/VForm'
import { dictionaryAdd,protocolUpdate } from '@/services/v1';

const ConfigModal = (props) => {
    const { modalVisible, handleModalVisible, handleSearch,configEditData } = props
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
          protocolUpdate({
            id: configEditData.id,
            ...valid,
            // category: valid.category.join(),
            // data_example: profileData,
            type: 'SUBSCRIBE'
          }).then((res) => {
            setLoading(false);
            if (res===undefined) {
              message.success("编辑协议成功!");
              handleCancel()
              handleSearch()
            }
          });

        }).catch((e) => { })
    }
    const initialValues = { name: '', code: '', sequence: 0 }
    const columns = [
      { name: "config", label: "配置", type: "textarea" },

    ]
    const layoutCol = {
        labelCol: { span: 8 },
        wrapperCol: { span: 10 }
    }


    return (
        <Modal
            title='配置'
            width={700}
            visible={modalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            confirmLoading={loading}
        >
            <VForm columns={columns} ref={childRef} span={24} layoutCol={layoutCol} data={configEditData} />
        </Modal>
    )

}
export default ConfigModal;