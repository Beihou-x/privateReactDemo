import React, { useImperativeHandle, forwardRef } from "react";
import VForm from "@components/VForm";
import { Form } from "antd";

const ProtocolConfig = (props, ref) => {
  const { data = {} } = props

  const childRef1: any = Form.useForm();
  const childRef2: any = Form.useForm();
  const childRef3: any = Form.useForm();

  //ref就是父组件传过来的ref
  useImperativeHandle(ref, () => ({
    //getForm就是暴露给父组件的方法
    getFormValue: () => getFormValue(),
  }));

  const getFormValue = () => {
    const obj = childRef1[0].getFieldsValue();
    const obj1 = childRef2[0].getFieldsValue();
    const obj3 = childRef3[0].getFieldsValue();

    return {
      page: {
        '触发条件': {
          ...obj,
          required: obj && obj.required && obj.required.split(','),
        },
        '响应条件': {
          ...obj1,
          required: obj1 && obj1.required && obj1.required.split(','),
        },
        '处理方式': {
          ...obj3,
        },
      }
    }
  }

  const layoutCol = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
  };

  const columns1 = [
    { name: "$schema", label: "$schema" },
    { name: "required", label: "required", type: "textarea" },
  ];
  const columns2 = [
    { name: "$schema", label: "$schema" },
    { name: "required", label: "required", type: "textarea" },
  ];
  const columns3 = [
    { name: "process_method", label: "process_method" },
  ];

  return <>
    <div style={{ marginBottom: 10 }}>触发条件</div>
    <VForm
      columns={columns1}
      form={childRef1}
      span={12}
      layoutCol={layoutCol}
      data={data && data['触发条件'] ? { ...data['触发条件'], required: data['触发条件'].required ? data['触发条件'].required.join(',') : '' } : {}}
    />
    <div style={{ marginBottom: 10 }}>响应条件</div>
    <VForm
      columns={columns2}
      form={childRef2}
      span={12}
      layoutCol={layoutCol}
      data={data && data['响应条件'] ? { ...data['响应条件'], required: data['响应条件'].required ? data['响应条件'].required.join(',') : '' } : {}}
    />
    <div style={{ marginBottom: 10 }}>处理方式</div>
    <VForm
      columns={columns3}
      form={childRef3}
      span={12}
      layoutCol={layoutCol}
      data={data && data['处理方式']}
    />
  </>
}

export default forwardRef(ProtocolConfig);