import React, { useState, useRef, useEffect } from "react";
import { Card, Select, Descriptions } from "antd";
import { parseReconcile } from "@/services/v2";
import { serviceSearch } from "@/services/v1";
import { format } from "@/utils/utils";
import SearchForm from "@components/SearchForm";
import styles from "./index.less";

const Parse = (props) => {
  const {id} = props;

  const [data, setData]: any = useState({})
  const [sevices, setSevices]: any = useState([]);

  useEffect(() => {
    serviceSearch({ categorys: ["PARSEENGIN"] }).then(res => {
      setSevices((res && res.items || []).map(m => { return { label: m.name, value: m.id } }))
    })
    if(id) {
      parseReconcile({ id }).then(res => {
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
            name: "service_id",
            renderFormItem: () => <Select options={sevices}></Select>,
          },
        ]}
        onChange={() => { }}
        customSearch={(values:any) => {
          parseReconcile({ id:values.service_id }).then(res => {
            setData(res || {})
          });
        }}
        initialValues={id? {service_id:id}:{}}
        resetData={()=>setData({})}
      />
      <div className={styles.content}>
        <Descriptions title="" column={2}>
          <Descriptions.Item label="协议名称">{data.name ||''}</Descriptions.Item>
          <Descriptions.Item label="接入总量">{data.access_total||0}</Descriptions.Item>
          <Descriptions.Item label="解析总量">{data.analysis_total||0}</Descriptions.Item>
          <Descriptions.Item label="解析异常量">{data.analysis_invalid_total||0}</Descriptions.Item>
        </Descriptions>
      </div>
    </Card>
  );
};

export default Parse;
