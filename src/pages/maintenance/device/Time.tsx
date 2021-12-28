import React, { useEffect, useState, useRef } from "react";
import StandardTable from "@components/Table";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import SearchForm from "@components/SearchForm";
import { Input, Select, Card, Row, Col, Table, Form, Button } from "antd";
// import { timeMonitor } from "@/services/v2";
import { WarningOutlined, GoldOutlined } from "@ant-design/icons";
import DownLoadFile from "@components/DownLoadFile";

import { formatDate } from "@/utils/utils";

import styles from "./index.less";

const { Option } = Select;

const Long = (props) => {
  const refTable: any = useRef(null);
  const [loading, setLoading] = useState(false);
  const [headData, setHeadData]: any = useState({});
  const [tableData, setTableData]: any = useState([]);
  const [pagination, setPagination] = useState({
    total: 0,
    pageSize: 10,
    pageNumber: 1,
    showSizeChanger: true,
    showQuickJumper: true,
    current: 1,
  });
  useEffect(() => {
    getData({});
  }, []);

  const getData = async (params) => {
    setLoading(true);
    // timeMonitor({
    //   offset:
    //     (pagination.current &&
    //       pagination.pageSize &&
    //       (pagination.current - 1) * pagination.pageSize) ||
    //     0,
    //   limit: pagination.pageSize || 10,
    //   ...params
    // }).then((res) => {
    //   if (res) {
    //     setHeadData(res.operationDeviceTimeMonitor);
    //     setTableData(res.monitorResult);
    //     setPagination({
    //       ...pagination,
    //       total: (res && res.total) || 0,
    //       current: pagination.current
    //     })
    //   }
    //   setLoading(false);
    // });
  };
  const [form] = Form.useForm();
  const handleReset = () => {
    form.resetFields();
    getData({});
  };
  const handleSearch = () => {
    const res = form.getFieldsValue();
    getData(res)
  };
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 18 },
  };

  //表格查询
  const handleTableChange = (tablePagination) => {
    setPagination({
      ...pagination,
      ...tablePagination,
    });
  };

  const columns: any = [
    {
      dataIndex: "alias",
      title: "采集设备名称",
      align: "center",
    },
    {
      dataIndex: "device_id",
      title: "采集设备编码",
      align: "center",
    },
    {
      dataIndex: "status",
      title: "监测状态",
      align: "center",
      render: (val) => {
        let a = "";
        if (val === "1") {
          a = "正常";
        } else {
          a = "异常";
        }
        return <span>{a}</span>;
      },
    },
    {
      dataIndex: "time_difference",
      title: "时间差(毫秒)",
      align: "center",
    },
    {
      dataIndex: "error_type",
      title: "延迟/倒挂",
      align: "center",
    },
    {
      dataIndex: "alive_capture_at",
      title: "监测时间",
      align: "center",
      render: (val) => <span>{formatDate(val, "YYYY-MM-DD h:mm:ss")}</span>,
    },
    {
      dataIndex: "message",
      title: "监测失败原因",
      align: "center",
    },
  ];

  return (
    <>
      <Card bordered={false}>
        <Row>
          {/* <div><GoldOutlined /> 采集设备数：{data.total || 0}</div> */}
          <Col span={4}>
            <WarningOutlined /> 采集设备数：
            <span className={styles.error}>
              {headData.collection_device_num || 0}
            </span>
          </Col>
          <Col span={4}>
            <WarningOutlined /> 时间差异常数：
            <span className={styles.error}>
              {headData.time_up_side_down || 0}
            </span>
          </Col>
          <Col span={4}>
            <WarningOutlined /> 监测失败设备数：
            <span className={styles.error}>{headData.time_delay || 0}</span>
          </Col>
        </Row>
      </Card>
      <Card bordered={false}>
        <Form form={form} {...layout} onFinish={handleSearch}>
          <Row>
            {/* <Col span={6}>
              <Form.Item label="组织区域" name="place_name">
                <Input></Input>
              </Form.Item>
            </Col> */}
            <Col span={6}>
              <Form.Item label="设备名称" name="alias">
                <Input></Input>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="设备编码" name="device_id">
                <Input></Input>
              </Form.Item>
            </Col>
            <Col span={6}>
            <Form.Item label="监测结果" name="status">
                <Select>
                  <Option value="0">异常</Option>
                  <Option value="1">正常</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginRight: 20, marginLeft: 0, marginBottom: 20 }}
              >
                查询
              </Button>
              <Button onClick={handleReset}>重置</Button>
            </Col>
          </Row>
          {/* <Row>
            <Col span={6}>
              <Form.Item label="监测结果" name="status">
                <Select>
                  <Option value="0">异常</Option>
                  <Option value="1">正常</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="监测资源" name="function_type">
                <Select>
                  <Option value="0">异常</Option>
                  <Option value="1">正常</Option>
                </Select>
              </Form.Item>
            </Col>
            
          </Row> */}
        </Form>
        {/* <DownLoadFile
          services={() => {
            // return accessExports({
            //   name: 'access_request'
            // })
          }}
        >
          导出
        </DownLoadFile> */}
        <div style={{ marginBottom: 18 }}></div>
        <Table
          bordered
          loading={loading}
          columns={columns}
          dataSource={tableData}
          pagination={{ ...pagination, showTotal: (total) => `共 ${total} 条` }}
          onChange={handleTableChange}
        ></Table>
      </Card>
    </>
  );
};

export default Long;
