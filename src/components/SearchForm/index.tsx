import React, { useContext, useEffect, useState } from "react";
import styles from "./index.less";
import { Form, Button, Row, Col } from "antd";
import { FormInstance } from "antd/es/form";
import { DefaultPubSubContext } from "@components/PubSubscribe";

const { Item: FormItem } = Form;

type SearchFormProps = {
  formLayout?: object;
  initialValues?: object;
  formList: Array<{
    label: string;
    name?: string;
    renderFormItem: (k: object, v: FormInstance) => {} | any;
    formItemProps?: object;
  }>;
  onChange: (values?: object, type?: string) => void;
  className?: any;
  subscribeName?: string;
  customSearch?: (values?: object) => void;
  resetData?: () => void;
};

const SearchForm: React.FC<SearchFormProps> = ({
  formLayout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 16 },
  },
  initialValues = {},
  formList,
  onChange,
  className,
  subscribeName = '',
  customSearch, //自定义查询
  resetData
}) => {
  const [form] = Form.useForm();
  const { pushlist }: any = useContext(DefaultPubSubContext);

  const handleSearch = values => {
    // 搜索框中某个值为空字符串,会导致搜索无效,改为undefined,请求时候JSON.stringify会过滤掉
    for (let key in values) {
      if (values.hasOwnProperty(key) && values[key] === '') {
        values[key] = undefined;
      }
    }
    const params = {
      ...values,
    };

    onChange(
      {
        ...params,
      },
      "search"
    );
    pushlist(subscribeName ? subscribeName : "table:search", {
      ...params,
    });
  };

  const handleReset = () => {
    form.resetFields();
    onChange({}, "reset");
    pushlist(subscribeName ? subscribeName : "table:search", null);
    pushlist('resetTypeFunction', '')
    resetData && resetData()
  };
  const layout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 16 },
  };
  return (
    <div className={styles["search-form"]}>
      <Form
        form={form}
        layout="inline"
        initialValues={initialValues}
        onFinish={customSearch ? customSearch : handleSearch}
        {...formLayout}
      // className={className}
      >
        {(formList || []).map(({ formItemProps = {}, ...item }) => (
          <FormItem
            label={item.label}
            key={item.label}
            name={item.name}
            {...formItemProps}
          >
            {item.renderFormItem(item, form)}
          </FormItem>
        ))}
        <Button type="primary" style={{ marginRight: 10 }} htmlType="submit">
          查询
        </Button>
        <Button onClick={() => handleReset()}>重置</Button>
        {/*<Row gutter={32}>*/}
        {/**/}
        {/*<Col span={6}>*/}
        {/**/}
        {/*</Col>*/}
        {/*</Row>*/}
      </Form>
    </div>
  );
};

export default SearchForm;
