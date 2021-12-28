import React, { useState, useRef, useEffect } from "react";
import { Card, Select, Descriptions } from "antd";
import { subscribeCheckData } from "@/services/v2";
import { serviceSearch } from "@/services/v1";
import { format } from "@/utils/utils";
import SearchForm from "@components/SearchForm";
import styles from "./index.less";

const Subscribe = (props) => {
  const [data, setData]: any = useState({})
  const [sevices, setSevices]: any = useState([]);
  useEffect(() => {
    serviceSearch({ categorys: ["ACCESS"] }).then(res => {
      setSevices((res && res.items || []).map(m => { return { label: m.name, value: m.id } }))
    })
  }, [])
  return (
    <Card bordered={false}>
      <SearchForm
        formList={[
          {
            label: "服务名称",
            name: "subscribe_id",
            renderFormItem: () => <Select></Select>,
          },
        ]}
        onChange={() => { }}
        customSearch={(values) => {
          subscribeCheckData({ ...values }).then(res => {
            setData(res || {})
          });
        }}
        resetData={() => setData({})}
      />
      <div className={styles.content}>
        <Descriptions title="" column={2}>
          <Descriptions.Item label="协议名称">{data.protocol && data.protocol.join(',')}</Descriptions.Item>
          <Descriptions.Item label="订阅设备数">{data.sub_device_num}</Descriptions.Item>
          <Descriptions.Item label="应订阅数">{data.should_sub_num}</Descriptions.Item>
          <Descriptions.Item label="实订阅数">{data.real_sub_num}</Descriptions.Item>
          <Descriptions.Item label="订阅成功率">{format(data.sub_success_quality)}%</Descriptions.Item>
          <Descriptions.Item label="完整性过滤数">{data.complete_filter_num}</Descriptions.Item>
          <Descriptions.Item label="图片可用性过滤总数">{data.image_vail_filter_num}</Descriptions.Item>
          <Descriptions.Item label="图片可用性过滤报文数">{data.image_vail_filter_message_num}</Descriptions.Item>
          <Descriptions.Item label="订阅响应总数">{data.sub_respond_num}</Descriptions.Item>
          <Descriptions.Item label="对应code响应数">{data.code_respond_num}</Descriptions.Item>
          <Descriptions.Item label="人卡人像图片数">{data.person_image_num}</Descriptions.Item>
        </Descriptions>
      </div>
    </Card>
  );
};

export default Subscribe;
