import React, { useImperativeHandle, forwardRef } from "react";
import VForm from "@components/VForm";
import { Form } from "antd";
import { filterCategory } from "@/utils/utils";

const TransConfig = (props, ref) => {
  const { data = {} } = props

  const childRef1: any = Form.useForm();

  //ref就是父组件传过来的ref
  useImperativeHandle(ref, () => ({
    //getForm就是暴露给父组件的方法
    getFormValue: () => getFormValue(),
  }));

  const getFormValue = () => {
    const obj = childRef1[0].getFieldsValue();

    return {
      page: { '文件压缩算法': obj, }
    }
  }

  const layoutCol = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const columns1 = [
    {
      name: "name", label: "算法", type: "select", list: filterCategory("文件压缩算法"),
    },
  ];

  return <>
    <div style={{ marginBottom: 10 }}>文件压缩算法</div>
    <VForm
      columns={columns1}
      form={childRef1}
      span={12}
      layoutCol={layoutCol}
      data={data && data['文件压缩算法'] && { ...data['文件压缩算法'] }}
    />
  </>
}

export default forwardRef(TransConfig);