import React, { useImperativeHandle, forwardRef } from "react";
import VForm from "@components/VForm";
import { Form } from "antd";

const AccessConfig = (props, ref) => {
  const { data = {} } = props

  const childRef1: any = Form.useForm();
  const childRef2: any = Form.useForm();
  const childRef3: any = Form.useForm();
  const childRef4: any = Form.useForm();
  const childRef5: any = Form.useForm();
  const childRef6: any = Form.useForm();
  const childRef7: any = Form.useForm();

  //ref就是父组件传过来的ref
  useImperativeHandle(ref, () => ({
    //getForm就是暴露给父组件的方法
    getFormValue: () => getValues(),
  }));

  const getValues = () => {
    const obj = childRef1[0].getFieldsValue();
    const obj1 = childRef2[0].getFieldsValue();
    const obj2 = childRef3[0].getFieldsValue();
    const obj3 = childRef4[0].getFieldsValue();
    const obj4 = childRef5[0].getFieldsValue();
    const obj5 = childRef6[0].getFieldsValue();
    const obj6 = childRef7[0].getFieldsValue();

    return {
      page: {
        interfaces: [{ ...obj }],
        encrypt: obj1,
        limit: obj2,
        cache: {
          queue_addrs: obj3 && obj3.queue_addrs && obj3.queue_addrs.split(','),
          urls: obj3 && obj3.urls && obj3.urls.split(','),
        },
        metrics: obj4,
        stat: {
          ...obj5,
          enable: obj5 && obj5.enable ? true : false,
        },
        alarm: {
          enable: obj6 && obj6.enable ? true : false,
          enable_filter: obj6 && obj6.enable_filter ? true : false,
        }
      }
    }
  }


  const layoutCol = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const columns1 = [
    { name: "endpoint", label: "endpoint" },
    { name: "querys", label: "querys", type: "select", mode: "multiple", list: [{ label: 'qyjbxx_query', value: 'qyjbxx_query' }] },
  ];
  const columns2 = [
    { name: "key", label: "key" },
    { name: "method", label: "method" },
  ];
  const columns3 = [
    { name: "max_connection", label: "max_connection", type: 'inputNumber' },
    { name: "max_req_body_size", label: "max_req_body_size", type: 'inputNumber' },
  ];
  const columns4 = [
    { name: "queue_addrs", label: "queue_addrs", type: "textarea" },
    { name: "urls", label: "urls", type: "textarea" },
  ];
  const columns5 = [
    { name: "data_source", label: "data_source" },
    { name: "keep_hour", label: "keep_hour", type: 'inputNumber' },
  ];
  const columns6 = [
    { name: "enable", label: "enable", type: 'switch' },
    { name: "redis_conn", label: "redis_conn" },
  ];
  const columns7 = [
    { name: "enable", label: "enable", type: 'switch' },
    { name: "enable_filter", label: "enable_filter", type: 'switch' },
  ];
  return <>
    <div style={{ marginBottom: 10 }}>认证鉴权</div>
    <VForm
      columns={columns1}
      form={childRef1}
      span={12}
      layoutCol={layoutCol}
      data={data && data.interfaces ? { ...data.interfaces[0] } : {}}
    />
    <div style={{ marginBottom: 10 }}>加密解密</div>
    <VForm
      columns={columns2}
      form={childRef2}
      span={12}
      layoutCol={layoutCol}
      data={data && data.encrypt ? { ...data.encrypt } : {}}
    />
    <div style={{ marginBottom: 10 }}>流量控制</div>
    <VForm
      columns={columns3}
      form={childRef3}
      span={12}
      layoutCol={layoutCol}
      data={data && data.limit ? { ...data.limit } : {}}
    />
    <div style={{ marginBottom: 10 }}>缓存管理</div>
    <VForm
      columns={columns4}
      form={childRef4}
      span={12}
      layoutCol={layoutCol}
      data={data && data.cache ? { ...data.cache, queue_addrs: data.cache.queue_addrs && data.cache.queue_addrs.join(','), urls: data.cache.urls && data.cache.urls.join(',') } : {}}
    />
    <div style={{ marginBottom: 10 }}>计量计次</div>
    <VForm
      columns={columns5}
      form={childRef5}
      span={12}
      layoutCol={layoutCol}
      data={data && data.metrics ? { ...data.metrics } : {}}
    />
    <div style={{ marginBottom: 10 }}>性能监控</div>
    <VForm
      columns={columns6}
      form={childRef6}
      span={12}
      layoutCol={layoutCol}
      data={data && data.stat ? { ...data.stat } : {}}
    />
    <div style={{ marginBottom: 10 }}>安全预警</div>
    <VForm
      columns={columns7}
      form={childRef7}
      span={12}
      layoutCol={layoutCol}
      data={data && data.alarm ? { ...data.alarm } : {}}
    />
  </>
}

export default forwardRef(AccessConfig);