import React, { useEffect, useState, useRef } from "react";
import { Form, message, Button, Card } from "antd";
import { useHistory } from "react-router-dom";
import FormList from "@components/FormList";
import VForm from "@components/VForm";

import {
  serverDiscription,
  serverAdd,
  serverUpdate,
  serverSearchOnce,
} from "@/services/v1";

type AddFormProps = {};

const AddForm: React.FC<AddFormProps> = (props) => {
  // const [form] = Form.useForm();
  const [initialValues, setInitial] = useState({});
  const [columns, setColumns]: any = useState([]);
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const form: any = useRef();

  const {
    match: {
      params: { id },
    },
  }: any = props;

  useEffect(() => {
    if (!!id) {
      fetchFormValues();
    }

    serverDiscription({}).then((res) => {
      let arr = (res || []).filter(f => f.name !== 'created_at' && f.name !== 'creator').map((item) => {
        return {
          label: item.display,
          rules: [{ required: item.required }],
          name: item.name,
          type: item.type === 'string' ? 'input' : item.type
        };
      });
      setColumns(arr);
    });
  }, []);

  //查询单个表格
  const fetchFormValues = () => {
    //执行查询操作
    serverSearchOnce({
      id,
    }).then((res) => {
      setInitial((res && res) || {});
    });
  };

  //新增或修改
  const handleOk = () => {
    const formRef = form.current.getForm()

    try {
      formRef.validateFields().then((fieldsValue) => {
        // await services({
        //     ...initialValues,
        //     ...fieldsValue
        // });
        if (id) {
          setLoading(true);

          serverUpdate({
            ...fieldsValue,
          }).then(() => {
            setLoading(false);
            history.goBack();
          });
        } else {
          setLoading(true);

          serverAdd({
            ...fieldsValue,
          }).then(() => {
            setLoading(false);
            history.goBack();
          });
        }
      });
    } catch (e) {
      message.error(`${e}`);
    }
  };

  const formLayout = { labelCol: { span: 10 }, wrapperCol: { span: 4 } };

  console.log("initialValues===", initialValues);
  return (
    <>
      <Card bordered={false}>
        <VForm columns={columns} ref={form} data={initialValues} />
        <div style={{ background: "#2B3748", textAlign: "right" }}>
          <Button style={{ marginRight: 20 }} onClick={() => history.goBack()}>取消</Button>
          <Button
            type="primary"
            loading={loading}
            onClick={handleOk}
          >
            保存
          </Button>
        </div>

        {/* {Object.keys(initialValues).length !== 0 ? (
          <Form form={form} {...formLayout} initialValues={initialValues}>
            <FormList services={serverDiscription} />
            <Form.Item wrapperCol={{ offset: 20 }}>
              <div style={{ background: "#2B3748" }}>
              <Button  style={{ marginRight: 20 }}onClick={() => history.goBack()}>取消</Button>
                <Button
                  type="primary"
                  onClick={handleOk}
                >
                  保存
                </Button>
              </div>
            </Form.Item>
          </Form>
        ) : null}

        {Object.keys(initialValues).length === 0 ? (
          <Form form={form} {...formLayout}>
            <FormList services={serverDiscription} />
            <Form.Item wrapperCol={{ offset: 20 }}>
              <div style={{ background: "#2B3748" }}>
              <Button style={{ marginRight: 20 }} onClick={() => history.goBack()}>取消</Button>
                <Button
                  type="primary"
                  onClick={handleOk}
                >
                  保存
                </Button>
              </div>
            </Form.Item>
          </Form>
        ) : null} */}
      </Card>
    </>
  );
};

export default AddForm;
