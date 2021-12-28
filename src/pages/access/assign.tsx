import React, { useRef, useState } from "react";
import { Card, Button } from "antd";
import { useHistory } from "react-router-dom";
import BaseInfo from "./baseInfo";
const Assign = (props) => {
  const [tabKey, setTabkey] = useState("1");
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
      refs.current.onSaveService();
    }
  };
  const isButtonShow = (val) => {
    setTabkey(val);
  };
  return (
    <Card bordered={false}>
      <BaseInfo
        page="assign"
        id={id}
        onBack={() => onBack()}
        ref={ref}
        isButtonShow={isButtonShow}
      />
      <div style={{ textAlign: "right", marginTop: 20 }}>
        <Button onClick={() => onBack()}>取消</Button>
        {tabKey === "1" ? (
          <Button
            type="primary"
            onClick={() => onSave()}
            style={{ marginLeft: 20 }}
          >
            保存
          </Button>
        ) : (
          ""
        )}
      </div>
    </Card>
  );
};

export default Assign;
