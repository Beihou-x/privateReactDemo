import React, { useEffect, useState } from 'react';
import { subscribeCheckData } from "@/services/v2";
import {
  Descriptions
} from 'antd';
import { format } from "@/utils/utils";
import Line from "./line";
const ExpandedRow = props => {

  const { values } = props

  const [data, setData]: any = useState({})
  useEffect(() => {
    // 对账
    subscribeCheckData({ subscribe_id: values.id }).then(res => {
      setData(res)
      console.log('res===', res)
    })
  }, [])

  return (
    <div style={{ width: "100%" }}>
      <Descriptions title="" column={4}>
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
  )
}


export default ExpandedRow;