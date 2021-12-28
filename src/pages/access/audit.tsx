import React, { useRef } from "react";
import { Card, Button } from "antd";
import { useHistory } from "react-router-dom";
import BaseInfo from "./baseInfo";
const Audit = props => {
  const ref: any = useRef();
  const {
    match: {
      params: { id },
    },
  }: any = props;
  const history = useHistory();

  const onBack = () => {
    history.goBack();
  };

  const onSave = () => {
    const refs = ref;
    if (refs && refs.current) {
      refs.current.onAuditSave();
    }
  };
  return (
    <Card bordered={false}>
      <BaseInfo page="audit" id={id} onBack={() => onBack()} ref={ref} />
      <div style={{ textAlign: "right" }}>
        <Button style={{ marginRight: 20 }} onClick={() => onBack()}>取消</Button>
        <Button
          type="primary"
          onClick={() => onSave()}
        >
          保存
        </Button>
      </div>
    </Card>
  );
};

export default Audit;
