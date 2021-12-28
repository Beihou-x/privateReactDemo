import React, { useEffect, useState } from "react";
import { Form, Modal, message, Button } from "antd";
import VForm from '@components/VForm';
import { viewEdit, viewAdd } from "@/services/v2";

const Detail = (props) => {
  const { visible, onOk, onCancel, title = '', data = {} } = props
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false)

  const relations = [
    {
      value: 0,
      label: '上级'
    },
    {
      value: 1,
      label: '下级'
    }
  ]

  const handleOk = () => {
    form.validateFields().then(fieldsValue => {
      // console.log('fieldsValue', fieldsValue)
      setLoading(true)
      if (data && data.id) {
        viewEdit({ ...fieldsValue, id: data.id }).then(res => {
          if (res === undefined) {
            message.success('编辑成功')
            setLoading(false)
            form.resetFields();
            onOk && onOk()
          }
        })
      } else {
        viewAdd({ ...fieldsValue }).then(res => {
          if (res === undefined) {
            message.success('新增成功')
            setLoading(false)
            form.resetFields();
            onOk && onOk()
          }
        })
      }
    })
  }

  const handleCancel = () => {
    form.resetFields();
    onCancel && onCancel();
  }

  const layoutCol = {
    labelCol: { span: 3 },
    wrapperCol: { span: 20 },
  }
  const layoutCol1 = {
    labelCol: { span: 6 },
    wrapperCol: { span: 15 },
  }

  const columns = [
    { name: 'code', label: '视图库编号', rules: [{ required: true }], readOnly: title === '视图库详情' },
    { name: "name", label: "视图库名称", rules: [{ required: true }], readOnly: title === '视图库详情' },
    { name: "relation", label: "上下级", type: 'select', list: relations, rules: [{ required: true }], disabled: title === '视图库详情' },
  ]
  const columns1 = [
    { name: 'username', label: '用户名', rules: [{ required: true }], readOnly: title === '视图库详情' },
    { name: "password", label: "密码", rules: [{ required: true }], readOnly: title === '视图库详情' },
    { name: "address", label: "IP地址", rules: [{ required: true }], readOnly: title === '视图库详情' },
    { name: "port", label: "端口号", rules: [{ required: true }], readOnly: title === '视图库详情' },
    { name: "vendor", label: "厂商", rules: [{ required: true }], readOnly: title === '视图库详情' },
  ]
  const columns2 = [
    { name: 'description', label: '描述', type: 'textarea', readOnly: title === '视图库详情' },
  ]

  return (
    <Modal destroyOnClose confirmLoading={loading} width={1000} title={title} visible={visible} onOk={handleOk} onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          取消
        </Button>,
        title === '视图库详情' ? '' :
          <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
            保存
          </Button>
      ]}
    >
      <VForm columns={columns} form={[form]} data={data} span={12} layoutCol={layoutCol1} />
      <VForm columns={columns1} form={[form]} data={data} span={12} layoutCol={layoutCol1} />
      <VForm columns={columns2} form={[form]} data={data} span={24} layoutCol={layoutCol} />
    </Modal>
  );
};

export default Detail;
