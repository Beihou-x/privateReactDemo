import React, { useState, useRef, forwardRef } from "react";
import { Card, Button, Form, message, Select, Input } from "antd";
import { useHistory } from "react-router-dom";
import BaseInfo from "./baseInfo";
import { forwardRequestUpdate, forwardRequestAdd } from "@/services/v1";
import { formatDate, filterCategory } from "@/utils/utils";


const Audit = props => {
  const ref: any = useRef();
  const {
    match: {
      params: { id },
    },
  }: any = props;
  const history = useHistory();
  const [form] = Form.useForm();
  const [initialValues, setInitial] = useState({});
  const [tabKey, setTabkey] = useState("1");

  //新增或修改
  const handleOk = () => {
    const refs = ref;
    if (refs && refs.current) {
      refs.current.onAuditSave();
    }
  };
  const back = () => {
    history.goBack()
  }
  const isButtonShow = (val) => {
    setTabkey(val);
  };
  return (
    <Card bordered={false}>
      <BaseInfo page="audit" id={id} ref={ref} onBack={back} isButtonShow={isButtonShow} />
      {tabKey === '1' ? (
        <Form form={form}>
          <Form.Item wrapperCol={{ offset: 20 }}>
            <div style={{ textAlign: "right" }}>
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
      ) : null}
    </Card>
  );
};

export default Audit;
