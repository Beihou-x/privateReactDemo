import React, { useState, useRef, useEffect } from "react";
import { Card, Select, Descriptions } from "antd";
import { accessReconcile } from "@/services/v2";
import { serviceSearch } from "@/services/v1";
import { format } from "@/utils/utils";
import SearchForm from "@components/SearchForm";
import styles from "./index.less";

const Access = (props) => {
  const { id } = props;
  const [data, setData]: any = useState({});
  const [sevices, setSevices]: any = useState([]);

  useEffect(() => {
    serviceSearch({ categorys: ["ACCESS"] }).then(res => {
      setSevices((res && res.items || []).map(m => { return { label: m.name, value: m.id } }))
    })
    if (id) {
      accessReconcile({ id }).then(res => {
        setData(res || {})
      });
    }
  }, [])

  return (
    <Card bordered={false}>
      <SearchForm
        formList={[
          {
            label: "服务名称",
            name: "id",
            renderFormItem: () => <Select options={sevices}></Select>,
          },
        ]}
        onChange={() => { }}
        customSearch={(values) => {
          accessReconcile({ ...values }).then(res => {
            setData(res || {})
          });
        }}
        resetData={() => setData({})}
        initialValues={id ? { id } : {}}
      />
      <div className={styles.content}>
        <Descriptions title="" column={1}>
          <Descriptions.Item label="协议名称">{data.proctoal_name}</Descriptions.Item>
        </Descriptions>
        <Descriptions title="" column={2}>
          <Descriptions.Item label="设备数">{data.device_total}</Descriptions.Item>
          <Descriptions.Item label="接收数">{data.all}</Descriptions.Item>
          <Descriptions.Item label="接收人像数">{data['11']}</Descriptions.Item>
          <Descriptions.Item label="接收车辆数">{data['02']}</Descriptions.Item>
        </Descriptions>
      </div>
    </Card>
  );
};

export default Access;
