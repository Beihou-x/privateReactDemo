import React, { useState, useRef, useEffect } from "react";
import { Card, Select, Descriptions } from "antd";
import { forwardRequestCheckData } from "@/services/v2";
import { serviceSearch } from "@/services/v1";
import { format } from "@/utils/utils";
import SearchForm from "@components/SearchForm";
import styles from "./index.less";

const Approve = (props) => {
  const { id } = props;

  const [data, setData]: any = useState({})
  const [sevices, setSevices]: any = useState([]);

  useEffect(() => {
    serviceSearch({ categorys: ["FORWARD", "ASYNC_FORWARD"] }).then(res => {
      setSevices((res && res.items || []).map(m => { return { label: m.name, value: m.id } }))
    })
    if (id) {
      forwardRequestCheckData({ service_id: id }).then(res => {
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
        customSearch={(values) => {
          forwardRequestCheckData({ ...values }).then(res => {
            setData(res || {})
          });
        }}
        initialValues={id ? { service_id: id } : {}}
        resetData={() => setData({})}
      />
      <div className={styles.content}>
        <Descriptions title="" column={2}>
          <Descriptions.Item label="协议名称">{data.protocol && data.protocol.join(',')}</Descriptions.Item>
          <Descriptions.Item label="转发设备数">{data.forward_device_num}</Descriptions.Item>
          <Descriptions.Item label="应转发数">{data.should_forward_num}</Descriptions.Item>
          <Descriptions.Item label="实转发数">{data.real_forward_num}</Descriptions.Item>
          <Descriptions.Item label="转发成功率">{data.forward_success_quality ? `${format(data.forward_success_quality)}%` : '-'}</Descriptions.Item>
          <Descriptions.Item label="转发失败率">{data.forward_failed_rec ? `${format(data.forward_failed_rec)}%` : '-'}</Descriptions.Item>
          <Descriptions.Item label="完整性过滤数">{data.complete_filter_num}</Descriptions.Item>
          <Descriptions.Item label="图片可用性过滤总数">{data.image_vail_filter_num}</Descriptions.Item>
          <Descriptions.Item label="图片可用性过滤报文数">{data.image_vail_filter_message_num}</Descriptions.Item>
          <Descriptions.Item label="转发响应总数">{data.sub_respond_num}</Descriptions.Item>
          <Descriptions.Item label="对应code响应数">{data.code_respond_num}</Descriptions.Item>
          <Descriptions.Item label="人卡人像图片数">{data.person_image_num}</Descriptions.Item>
        </Descriptions>
      </div>
    </Card>
  );
};

export default Approve;
