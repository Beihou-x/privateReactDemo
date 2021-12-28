import React, { useState, useEffect, useRef } from "react";
import StandardTable from "@components/Table";
import { Card, Tabs, Row, Col, Table } from "antd";
import { forwardQuality, subscribeQuality, forwardServiceMonitorSearch } from "@/services/v2";
import { formatDate } from "@/utils/utils";

const { TabPane } = Tabs;

const Home = (props) => {
  const [expandedRowKeys, setRowKeys]: any = useState([]);
  const [data, setData]: any = useState([]);
  const [avg, setAvg]: any = useState(0);
  const [active, setActive]: any = useState('1');
  const [statistical, setStatistical]: any = useState([]);

  const columns: any = [
    {
      dataIndex: "name",
      title: "任务名称",
      align: "center",
    },
    {
      dataIndex: "device_num",
      title: "设备数",
      align: "center",
    },
    {
      dataIndex: "device_sync_num",
      title: "一机一档登记数",
      align: "center",
    },
    {
      dataIndex: "abnormal_device_num",
      title: "异常设备数",
      align: "center",
    },
    {
      dataIndex: "complete_filter_num",
      title: "数据缺失数",
      align: "center",
    },

    {
      dataIndex: "image_vail_filter_num",
      title: "图片可用性过滤数",
      align: "center",
    },
    {
      dataIndex: "image_vail_filter_message_num",
      title: "图片可用性过滤报文数",
      align: "center",
    },
    {
      dataIndex: "real_forward_num",
      title: "转发数",
      align: "center",
    },
    {
      dataIndex: "person_image_num",
      title: "转发人像数",
      align: "center",
    },
    {
      dataIndex: "car_image_num",
      title: "转发车辆数",
      align: "center",
    },
    {
      dataIndex: "forward_failed_num",
      title: "转发失败数",
      align: "center",
    },
    {
      dataIndex: "sjycyj",
      title: "",
      align: "center",
      render: (val, row) => {
        return <a onClick={() => handleExpand(row.forward_id, 'forward')}>数据预警</a>
      }
    },
  ];
  const columns1: any = [
    {
      dataIndex: "name",
      title: "任务名称",
      align: "center",
    },
    {
      dataIndex: "device_num",
      title: "设备数",
      align: "center",
    },
    {
      dataIndex: "device_sync_num",
      title: "一机一档登记数",
      align: "center",
    },
    {
      dataIndex: "abnormal_device_num",
      title: "异常设备数",
      align: "center",
    },
    {
      dataIndex: "complete_filter_num",
      title: "数据缺失数",
      align: "center",
    },
    {
      dataIndex: "image_vail_filter_num",
      title: "图片可用性过滤数",
      align: "center",
    },
    {
      dataIndex: "image_vail_filter_message_num",
      title: "图片可用性过滤报文数",
      align: "center",
    },
    {
      dataIndex: "real_forward_num",
      title: "订阅数",
      align: "center",
    },
    {
      dataIndex: "person_image_num",
      title: "订阅人像数",
      align: "center",
    },
    {
      dataIndex: "forward_failed_num",
      title: "订阅失败数",
      align: "center",
    },
    {
      dataIndex: "sjycyj",
      title: "",
      align: "center",
      render: (val, row) => {
        return <a onClick={() => handleExpand(row.subscribe_id, 'subscribe')}>数据预警</a>
      }
    },
  ];
  //详情
  const handleExpand = async (id, category) => {
    const index = expandedRowKeys.findIndex((q) => q === id);

    if (index > -1) {
      setRowKeys([]);
      setData([]);
      setAvg(0)
    } else {
      setRowKeys([id]);
      const res = await forwardServiceMonitorSearch({ type: 'latency', category, service_id: id });
      const values = res && res.data && res.data.result && res.data.result[0] && res.data.result[0].values || [];
      const value = values.length ? values[values.length - 1] : []
      const avg = res && res.data && res.data.threshold || 0
      setData(value || []);
      setAvg(avg || 0)
    }
  };
  const expandedRow = () => {
    return <>
      <div>
        <span>数据延迟预警</span>
        ：
        <span>{formatDate(data[0], "YYYY-MM-DD HH:mm:ss")}</span>
      </div>

      <div>
        <span>数据时效性预警</span>
        ：
        <span>{!data[1] ? '-' : (Number(data[1]) >= avg ? '延迟' : '及时')}</span>
      </div>
    </>
  }

  return (
    <>
      <Card bordered={false}>
        <Tabs defaultActiveKey="1" activeKey={active} destroyInactiveTabPane={true} onChange={(key) => setActive(key)}>
          <TabPane tab="转发质量" key="1">
            <StandardTable
              columns={columns}
              services={() => forwardQuality({})}
              rowSelection={false}
              rowKey='forward_id'
              summary={val => {
                let total = val.reduce((pre, currentVal) => {
                  return pre + (Number(currentVal.device_num) || 0);
                }, 0);
                let total1 = val.reduce((pre, currentVal) => {
                  return pre + (Number(currentVal.device_sync_num) || 0);
                }, 0);
                let total2 = val.reduce((pre, currentVal) => {
                  return pre + (Number(currentVal.abnormal_device_num) || 0);
                }, 0);
                let total3 = val.reduce((pre, currentVal) => {
                  return pre + (Number(currentVal.complete_filter_num) || 0);
                }, 0);
                let total4 = val.reduce((pre, currentVal) => {
                  return pre + (Number(currentVal.image_vail_filter_num) || 0);
                }, 0);
                let total5 = val.reduce((pre, currentVal) => {
                  return pre + (Number(currentVal.image_vail_filter_message_num) || 0);
                }, 0);
                let total6 = val.reduce((pre, currentVal) => {
                  return pre + (Number(currentVal.real_forward_num) || 0);
                }, 0);
                let total7 = val.reduce((pre, currentVal) => {
                  return pre + (Number(currentVal.person_image_num) || 0);
                }, 0);
                let total8 = val.reduce((pre, currentVal) => {
                  return pre + (Number(currentVal.car_image_num) || 0);
                }, 0);
                let total9 = val.reduce((pre, currentVal) => {
                  return pre + (Number(currentVal.forward_failed_num) || 0);
                }, 0);

                return (
                  <Table.Summary fixed>
                    <Table.Summary.Row>
                      <Table.Summary.Cell align='center' index={0}>总计</Table.Summary.Cell>
                      <Table.Summary.Cell align='center' index={1}>{total}</Table.Summary.Cell>
                      <Table.Summary.Cell align='center' index={2}>{total1}</Table.Summary.Cell>
                      <Table.Summary.Cell align='center' index={3}>{total2}</Table.Summary.Cell>
                      <Table.Summary.Cell align='center' index={4}>{total3}</Table.Summary.Cell>
                      <Table.Summary.Cell align='center' index={5}>{total4}</Table.Summary.Cell>
                      <Table.Summary.Cell align='center' index={6}>{total5}</Table.Summary.Cell>
                      <Table.Summary.Cell align='center' index={7}>{total6}</Table.Summary.Cell>
                      <Table.Summary.Cell align='center' index={8}>{total7}</Table.Summary.Cell>
                      <Table.Summary.Cell align='center' index={9}>{total8}</Table.Summary.Cell>
                      <Table.Summary.Cell align='center' index={10}>{total9}</Table.Summary.Cell>
                    </Table.Summary.Row>
                  </Table.Summary>
                );
              }}
              tableProps={
                {
                  pagination: false,
                  expandable: {
                    expandedRowRender: expandedRow,
                    expandIcon: () => { },
                    expandIconColumnIndex: -1,
                    expandedRowKeys: expandedRowKeys,
                  },
                }
              }
            />

          </TabPane>
          <TabPane tab="订阅质量" key="2">
            <StandardTable
              columns={columns1}
              services={() => subscribeQuality({})}
              rowSelection={false}
              rowKey='subscribe_id'
              summary={val => {
                let total = val.reduce((pre, currentVal) => {
                  return pre + (Number(currentVal.device_num) || 0);
                }, 0);
                let total1 = val.reduce((pre, currentVal) => {
                  return pre + (Number(currentVal.device_sync_num) || 0);
                }, 0);
                let total2 = val.reduce((pre, currentVal) => {
                  return pre + (Number(currentVal.abnormal_device_num) || 0);
                }, 0);
                let total3 = val.reduce((pre, currentVal) => {
                  return pre + (Number(currentVal.complete_filter_num) || 0);
                }, 0);
                let total4 = val.reduce((pre, currentVal) => {
                  return pre + (Number(currentVal.image_vail_filter_num) || 0);
                }, 0);
                let total5 = val.reduce((pre, currentVal) => {
                  return pre + (Number(currentVal.image_vail_filter_message_num) || 0);
                }, 0);
                let total6 = val.reduce((pre, currentVal) => {
                  return pre + (Number(currentVal.real_forward_num) || 0);
                }, 0);
                let total7 = val.reduce((pre, currentVal) => {
                  return pre + (Number(currentVal.person_image_num) || 0);
                }, 0);

                let total9 = val.reduce((pre, currentVal) => {
                  return pre + (Number(currentVal.forward_failed_num) || 0);
                }, 0);

                return (
                  <Table.Summary fixed>
                    <Table.Summary.Row>
                      <Table.Summary.Cell align='center' index={0}>总计</Table.Summary.Cell>
                      <Table.Summary.Cell align='center' index={1}>{total}</Table.Summary.Cell>
                      <Table.Summary.Cell align='center' index={2}>{total1}</Table.Summary.Cell>
                      <Table.Summary.Cell align='center' index={3}>{total2}</Table.Summary.Cell>
                      <Table.Summary.Cell align='center' index={4}>{total3}</Table.Summary.Cell>
                      <Table.Summary.Cell align='center' index={5}>{total4}</Table.Summary.Cell>
                      <Table.Summary.Cell align='center' index={6}>{total5}</Table.Summary.Cell>
                      <Table.Summary.Cell align='center' index={7}>{total6}</Table.Summary.Cell>
                      <Table.Summary.Cell align='center' index={8}>{total7}</Table.Summary.Cell>
                      <Table.Summary.Cell align='center' index={9}>{total9}</Table.Summary.Cell>
                    </Table.Summary.Row>
                  </Table.Summary>
                );
              }}
              tableProps={
                {
                  pagination: false,
                  expandable: {
                    expandedRowRender: expandedRow,
                    expandIcon: () => { },
                    expandIconColumnIndex: -1,
                    expandedRowKeys: expandedRowKeys,
                  },
                }
              }
            />
          </TabPane>
        </Tabs>

      </Card>
    </>
  );
};

export default Home;
