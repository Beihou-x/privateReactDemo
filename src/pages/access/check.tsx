import React, { useRef, useState, useEffect } from "react";
import { Card, Button } from "antd";
import VForm from "@components/VForm";
import { sourceSearch, getDetailInfo } from "@/services/v1";
import { useHistory } from "react-router-dom";

const Check = (props) => {
  const {
    match: {
      params: { id },
    },
  }: any = props;
  const history = useHistory();
  const childRef: any = useRef(null);
  const [sources, setSources] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    // 设备来源
    const response1 = await sourceSearch({});
    const { items = [] } = response1;
    setSources(
      items
        ? items.map((d) => {
          return { label: d.id, value: d.id };
        })
        : []
    );
    // 申请详情
    const detailObj = await getDetailInfo({ id });
    console.log("detailObj==", detailObj);
  };
  const columns = [
    { name: "no", label: "申请编号", disabled: true },
    { name: "title", label: "申请标题" },
    { name: "vendor", label: "供应商" },
    {
      name: "sourceId",
      label: "申请来源",
      type: "select",
      list: sources,
    },
    { name: "contact", label: "申请联系人" },
    { name: "telephone", label: "联系人手机号" },
    {
      name: "protocol",
      label: "接入协议",
      rules: [{ required: true }],
      type: "select",
      list: [
        { value: "HTTP协议", label: "HTTP协议" },
        { value: "HTTPS协议", label: "HTTPS协议" },
      ],
    },
  ];

  const layoutCol = {
    labelCol: { span: 8 },
    wrapperCol: { span: 10 },
  };

  return (
    <Card bordered={false}>
      <p>申请信息</p>
      <VForm columns={columns} ref={childRef} span={8} layoutCol={layoutCol} />

      <p>设备信息</p>

      <div style={{ textAlign: "right" }}>
        <Button style={{ marginRight: 20 }} onClick={() => history.goBack()}>取消</Button>
        <Button type="primary" onClick={() => { }}>
          保存
        </Button>
      </div>
    </Card>
  );
};

export default Check;
