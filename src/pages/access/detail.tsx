import React from "react";
import { Card, Button } from "antd";
import { useHistory } from "react-router-dom";
import BaseInfo from "./baseInfo";
const Detail = (props) => {
  const {
    match: {
      params: { id },
    },
  }: any = props;
  const history = useHistory();
  return (
    <Card bordered={false}>
      <BaseInfo page="detail" id={id} />
      <div>

      </div>
      <div style={{ textAlign: "right", marginTop: 20 }}>
        <Button onClick={() => history.goBack()}>取消</Button>
      </div>
    </Card>
  );
};

export default Detail;
