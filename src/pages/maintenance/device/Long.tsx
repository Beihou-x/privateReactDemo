import React, { useEffect, useState, useRef } from "react";
import { Input, Select, Card, Row, Col, Table, Form, Button } from "antd";
// import { latLongitude } from "@/services/v2";
import { WarningOutlined, GoldOutlined } from "@ant-design/icons";

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
  }, [pagination.current, pagination.pageSize]);

  const getData = async (params) => {
    setLoading(true);
    // latLongitude({
    //   offset:
    //     (pagination.current &&
    //       pagination.pageSize &&
    //       (pagination.current - 1) * pagination.pageSize) ||
    //     0,
    //   limit: pagination.pageSize || 10,
    //   ...params
    // }).then((res) => {
    //   if (res) {
    //     setHeadData(res.operationDeviceLoLaMonitor);
    //     setTableData(res.monitorResult);
    //     setPagination({
    //       ...pagination,
    //       total: (res && res.total) || 0,
    //       current: pagination.current,
    //     });
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

  //表格查询
  const handleTableChange = (tablePagination) => {
    setPagination({
      ...pagination,
      ...tablePagination,
    });
  };
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 18 },
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
      dataIndex: "unit",
      title: "组织区域",
      align: "center",
    },
    {
      dataIndex: "function_type",
      title: "设备类型",
      align: "center",
    },
    {
      dataIndex: "status",
      title: "监测结果",
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
      dataIndex: "message",
      title: "异常类型",
      align: "center",
    },
  ];

  return (
    <>
      <Card bordered={false}>
        <Row>
          <Col span={4}>
            <WarningOutlined /> 采集设备数：
            <span className={styles.error}>
              {headData.collection_device_num || 0}
            </span>
          </Col>
          <Col span={4}>
            <WarningOutlined /> 设备经纬度缺失：
            <span className={styles.error}>{headData.lola_deletion || 0}</span>
          </Col>
          <Col span={4}>
            <WarningOutlined /> 设备经纬度精度过低：
            <span className={styles.error}>{headData.lola_accuracy || 0}</span>
          </Col>
          <Col span={4}>
            <WarningOutlined /> 不在辖区数：
            <span className={styles.error}>
              {headData.lola_not_in_place || 0}
            </span>
          </Col>
        </Row>
      </Card>
      <Card bordered={false}>
        <Form form={form} {...layout} onFinish={handleSearch}>
          <Row>
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
          loading={loading}
          bordered
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
