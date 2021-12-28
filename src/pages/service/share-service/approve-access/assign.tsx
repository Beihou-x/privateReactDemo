import React, { useEffect, useState } from "react";
import { Card, Button, message } from "antd";
import { useHistory } from "react-router-dom";
import BaseInfo from "./baseInfo";
import Event from "@/utils/eventEmitter";
import { assignServeSave } from "@/services/v1";

const Assign = (props) => {
  const [tabKey, setTabkey] = useState("1");

  const {
    match: {
      params: { id },
    },
  }: any = props;
  const history = useHistory();
  const [serveId, setServeId] = useState("");
  useEffect(() => {
    (Event as any).addListener("serveChange", handleEmit);
    return () => {
      (Event as any).removeListener("serveChange", handleEmit);
    };
  }, []);

  const handleEmit = (serveId) => {
    console.log(id, serveId);
    setServeId(serveId);
  };

  const saveServe = async () => {
    try {
      await assignServeSave(id, serveId);
      message.success("保存成功!");
      history.goBack();
    } catch (error) {
      message.error("保存失败");
      console.log(error);
    }
  };
  const isButtonShow = (val) => {
    setTabkey(val);
  };

  return (
    <Card bordered={false}>
      <BaseInfo page="assign" id={id} isButtonShow={isButtonShow} />
      <div style={{ textAlign: "right", marginTop: 20 }}>
        <Button onClick={() => history.goBack()}>取消</Button>
        {tabKey === "1" ? (
          <Button
            type="primary"
            onClick={saveServe}
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
