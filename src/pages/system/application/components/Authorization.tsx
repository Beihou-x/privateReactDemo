import React, { useRef, useState,useEffect } from "react";
import { Modal, Form, DatePicker, Input, Select, Tabs} from "antd";
import Dictionary from "./Dictionary";
import { applicationAuthorization,applicationEdite } from '@/services/v1';

const Authorization = (props) => {
const {authorizationData,authorizationShow, handleAuthorization,handleSearch} = props;
const [visiable, setVisiable] = useState(false)
const { TextArea } = Input;
const {Option} = Select;

//form表单的回显
useEffect(() => {
  form.setFieldsValue({
    // expired_at: authorizationData.expired_at,
    authorization: authorizationData.authorization
  });
}, [authorizationData]);

const handleOk = async () =>{
  const formData = form.getFieldsValue(true)
  await applicationEdite(authorizationData.id,{
    expired_at:formData.expired_at.unix().toString(),
    authorization:formData.authorization
  })
  handleAuthorization && handleAuthorization({},false)
  handleSearch && handleSearch()
}
const handleCancel = () => {
  handleAuthorization && handleAuthorization({},false)
}
const {id} = authorizationData;
const DateChange =(date) => {
  
  let time = date.unix()
  applicationAuthorization(id, time).then((res) => {
    form.setFieldsValue({
      authorization: res
    })
  }).catch(err => {
    console.log(err);
    
  }) 
  
}

// const deviceChange = (val) => {
//   if(val === 'filterDevice') {
//     setVisiable(true)
//   }else {
//     setVisiable(false)
//   }
// }
const [form] = Form.useForm();
const layoutCol = {
  labelCol: { span: 8 },
  wrapperCol: { span: 10 }
}

  return (
    <Modal
      visible={authorizationShow}
      title="授权"
      width={900}
      onOk={handleOk}
      onCancel={handleCancel}
      >
      <Form {...layoutCol} form={form}>
        <Form.Item name="expired_at" label="授权有效期">
          <DatePicker onChange={DateChange}/>
        </Form.Item>
        <Form.Item name="authorization" label="授权信息">
          <TextArea disabled></TextArea>
        </Form.Item>
        {/* <Form.Item name="device" label="选择设备">
          <Select onChange={deviceChange}>
            <Option value="allDevice">全部设备</Option>
            <Option value="filterDevice">过滤设备</Option>
          </Select>
        </Form.Item> */}
      </Form>

      {/* { visiable ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Tabs defaultActiveKey="1" centered style={{width: '800px'}}>
            <Tabs.TabPane tab="字典" key="1">
              <Dictionary></Dictionary>
            </Tabs.TabPane>
            <Tabs.TabPane tab="分组" key="2">
              <Group></Group>
            </Tabs.TabPane>
          </Tabs>
        </div>
      ): null } */}
    </Modal>
  )
}

export default Authorization