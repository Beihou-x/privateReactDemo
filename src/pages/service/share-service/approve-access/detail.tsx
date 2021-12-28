import React from "react";
import { useHistory } from "react-router-dom";
import { Card, Button } from "antd";
import BaseInfo from "./baseInfo";

const Detail = props => {
  const {
    match: {
      params: { id }
    },
  }: any = props;
  const history = useHistory();
  return (
    <Card>
      <BaseInfo id={id} page="detail" />
      <div style={{ textAlign: "right" }}>
        <Button onClick={() => history.goBack()}>取消</Button>{" "}
      </div>
    </Card>
  );
};

export default Detail;
