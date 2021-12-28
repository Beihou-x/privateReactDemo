import React, { useEffect, useState } from "react";
import { Card, Button, Descriptions, Table } from "antd";
import { useHistory } from "react-router-dom";
import { subscribeDetail, deviceExport } from "@/services/v2";
import { formatDate } from "@/utils/utils";
import DownLoadFile from "@components/DownLoadFile";

const Detail = (props) => {
  const {
    match: {
      params: { id },
    },
  }: any = props;
  const history = useHistory();
  const [data, setData]: any = useState({});
  useEffect(() => {
    subscribeDetail({ id }).then((res) => {
      setData(res)
    });
  }, []);

  const columns = [
    {
      title: '设备编号',
      dataIndex: 'device_code',
      key: 'device_code',
    },
    {
      title: '设备名称',
      dataIndex: 'device_name',
      key: 'device_name',
    },
  ];

  const renderTitle = () => {
    return <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
      <span>订阅范围</span>
      {data.device_list && data.device_list.length ? <DownLoadFile
        services={() => deviceExport({ id })}
        type='link'
      >
        下载设备
      </DownLoadFile> : ''
      }

    </div>
  }

  return (
    <Card bordered={false}>
      <div style={{ width: '50%', minWidth: 930, margin: '0 auto' }}>
        <Descriptions title="订阅详情" column={3}>
          <Descriptions.Item label="订阅标题">{data.title}</Descriptions.Item>
          <Descriptions.Item label="订阅名称">{data.name}</Descriptions.Item>
          <Descriptions.Item label="订阅视图库">{data.view_lib_name}</Descriptions.Item>
          <Descriptions.Item label="订阅协议">{data.protocol_name}</Descriptions.Item>
          <Descriptions.Item label="开始时间">{formatDate(data.begin, "YYYY-MM-DD")}</Descriptions.Item>
          <Descriptions.Item label="结束时间">{formatDate(data.end, "YYYY-MM-DD")}</Descriptions.Item>
          <Descriptions.Item label="描述">{data.description}</Descriptions.Item>
        </Descriptions>

        <Descriptions title={renderTitle()} column={1}>
        </Descriptions>
        <Table bordered rowKey='device_code' dataSource={(data.device_list || []).map(m => { return { device_code: m } })} columns={columns} scroll={{ y: 200 }} pagination={false} />

        <div style={{ textAlign: "right", marginTop: 20 }}>
          <Button onClick={() => history.goBack()}>取消</Button>
        </div>
      </div>
    </Card >
  );
};

export default Detail;
