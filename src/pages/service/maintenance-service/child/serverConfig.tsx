import React, { useImperativeHandle, forwardRef } from "react";
import VForm from "@components/VForm";
import { Form } from "antd";

const ServerConfig = (props, ref) => {
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
      page: { ...obj, enable_https: obj.enable_https ? true : false, enable_health_check: obj.enable_health_check ? true : false }
    }
  }

  const layoutCol = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const columns1 = [
    { name: "registery", label: "注册中心" },
  ];
  const columns2 = [
    { name: "router_load_balnce", label: "路由负载方法", type: "select", list: [{ label: 'weight', value: 'weight' }, { label: 'ip_hash', value: 'ip_hash' }] },
  ];
  const columns3 = [
    { name: "proxy_rule", label: "代理规则" },
  ];
  const columns4 = [
    { name: "enable_https", label: "启用HTTPS", type: 'switch' },
  ];
  const columns5 = [
    { name: "enable_health_check", label: "启用健康检查", type: 'switch' },
  ];

  return <>
    <div style={{ marginBottom: 10 }}>动态注册</div>
    <VForm
      columns={columns1}
      form={childRef1}
      span={12}
      layoutCol={layoutCol}
      data={data}
    />
    <div style={{ marginBottom: 10 }}>路由负载均衡</div>
    <VForm
      columns={columns2}
      form={childRef1}
      span={12}
      layoutCol={layoutCol}
      data={data}
    />
    <div style={{ marginBottom: 10 }}>通过代理规则</div>
    <VForm
      columns={columns3}
      form={childRef1}
      span={12}
      layoutCol={layoutCol}
      data={data}
    />
    <div style={{ marginBottom: 10 }}>通过安全防护</div>
    <VForm
      columns={columns4}
      form={childRef1}
      span={12}
      layoutCol={layoutCol}
      data={data}
    />
    <div style={{ marginBottom: 10 }}>标准系统自检</div>
    <VForm
      columns={columns5}
      form={childRef1}
      span={12}
      layoutCol={layoutCol}
      data={data}
    />
  </>
}

export default forwardRef(ServerConfig);