import React, {
  createElement,
  useEffect,
  useImperativeHandle,
  forwardRef,
  useState,
} from "react";
import {
  Form,
  Input,
  Select,
  DatePicker,
  Row,
  Col,
  InputNumber,
  TreeSelect,
  Tooltip,
  Upload,
  Radio,
  Switch,
  AutoComplete,
  Checkbox
} from "antd";

const FormItem = Form.Item,
  { Password } = Input,
  { Option } = Select,
  h = createElement;

const { TextArea } = Input;
const { RangePicker } = DatePicker;

const VForm = (props, ref) => {
  const {
    columns,
    data,
    span = 12,
    layoutCol,
    initialValues,
    form: vform,
  } = props;
  const [dates, setDates]: any = useState([]);
  const [hackValue, setHackValue]: any = useState([]);
  const [value, setValue]: any = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  //通过Form.useForm对表单数据域进行交互。useForm是React Hooks的实现，只能用于函数组件
  const [form]: any = vform || Form.useForm();
  //ref就是父组件传过来的ref
  useImperativeHandle(ref, () => ({
    //getForm就是暴露给父组件的方法
    getForm: () => form,
  }));

  const layout = layoutCol || {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
  };

  //若有正则验证，则在所有的正则校验都通过后用来获取输入的数据，若没有正则校验，则直接获取输入的数据
  const onFinish = (values) => {
    console.log(values);
  };

  //重置要配合着const [form] = Form.useForm()以及form={form}
  const onReset = () => {
    form.resetFields();
  };

  //form表单的回显
  useEffect(() => {
    form.setFieldsValue(data);
  }, [data]);

  const uploadButton = (
    <div>
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const customRequest = (file) => {
    const reader: any = new FileReader();

    reader.readAsDataURL(file.file);

    reader.addEventListener("load", () => {
      setImageUrl(reader.result);
    });
  };

  const components = {
    select: ({ label, list = [], mode, callback = (v) => { }, props, ...others }) => (
      <Select
        placeholder={label}
        mode={mode}
        onChange={(v: any) => callback(v)}
        allowClear
        {...props}
        {...others}
      >
        {list.map((c: any, index) => (
          <Option key={index} value={c.value} label={c.label}>
            {c.label}
          </Option>
        ))}
      </Select>
    ),
    input: ({ label, ...others }) => (
      <Input placeholder={label} autoComplete="off" {...others} />
    ),
    inputNumber: ({ label, defaultValue, ...others }) => (
      <InputNumber
        placeholder={label}
        defaultValue={defaultValue}
        {...others}
      />
    ),
    textarea: ({ label, ...others }) => (
      <TextArea placeholder={label} {...others} />
    ),
    switch: ({ label, itemProps, name, ...others }) => (
      <Switch
        {...others}
        checkedChildren="是"
        unCheckedChildren="否"
        defaultChecked={data && data[name]}
        key={data && data[name]}
      />
    ),
    treeSelect: ({
      label,
      treeData,
      treeDefaultExpandAll = true,
      ...others
    }) => (
      <TreeSelect
        placeholder={label}
        {...others}
        treeData={treeData}
        allowClear
        treeDefaultExpandAll={treeDefaultExpandAll}
        {...others}
      />
    ),
    password: ({ label, ...others }) =>
      h(Password, { placeholder: label, ...others }),
    datePicker: ({ label, props, ...others }) => (
      <DatePicker placeholder={label} {...others} {...props} format="YYYY-MM-DD" />
    ),
    rangePicker: ({ label, format = 'YYYY-MM-DD HH:mm', showTime = true, ...others }) => (
      <RangePicker
        placeholder={label}
        {...others}
        format={format}
        showTime={showTime}
      />
    ),
    upload: () => (
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        customRequest={customRequest}
        showUploadList={false}
      >
        {imageUrl ? (
          <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
        ) : (
          uploadButton
        )}
      </Upload>
    ),
    radioGroup: ({ label, list, props, ...others }) => (
      <Radio.Group options={list} {...props} {...others} />
    ),
    autoComplete: ({ label, list, props, ...others }) => (
      <AutoComplete
        options={list}
        placeholder={label}
        {...others}
        style={{ width: "100%", color: "#fff" }}
      />
    ),
    checkbox: () => (
      <Checkbox defaultChecked={false} />
    ),
    render: ({ label, list, props, render, ...others }) => render(),
  };

  const renderItem = (n, C) => {
    let obj: any = {};
    if (n.tooltip) {
      obj.tooltip = n.tooltip;
    }
    const _layout = n.layout || {};
    return (
      <Col span={n.span || span} key={n.name}>
        <FormItem
          label={n.label}
          name={n.name}
          rules={n.rules}
          key={n.name}
          {..._layout}
          {...obj}
          {...n.itemProps}
        >
          {C(n)}
        </FormItem>
      </Col>
    );
  };

  return (
    <Form
      {...layout}
      form={form}
      onFinish={onFinish}
      initialValues={initialValues}
    >
      <Row gutter={24}>
        {columns.map((n) => {
          const { type = "input" } = n,
            C = components[type];
          return renderItem(n, C);
        })}
        {props.children}
      </Row>
    </Form>
  );
};

export default forwardRef(VForm);
