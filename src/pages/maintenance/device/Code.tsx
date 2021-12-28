import React, { useEffect, useState, useRef } from "react";
import StandardTable from "@components/Table";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import SearchForm from "@components/SearchForm";
import { Input, Select, Card, Row, Col, Table, Form, Button } from "antd";
// import { codeMonitor } from "@/services/v2";
import { WarningOutlined, GoldOutlined } from "@ant-design/icons";
import DownLoadFile from "@components/DownLoadFile";
import styles from "./index.less";

const { Option } = Select;

const Code = (props) => {
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
    // codeMonitor({
    //   ...params,
    //   offset:
    //     (pagination.current &&
    //       pagination.pageSize &&
    //       (pagination.current - 1) * pagination.pageSize) ||
    //     0,
    //   limit: pagination.pageSize || 10,
    // }).then((res) => {
    //   if (res) {
    //     setHeadData(res.operationDeviceIDMonitor);
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
      dataIndex: "alias",
      title: "点位名称",
      align: "center",
    },
    {
      dataIndex: "unit",
      title: "所在组织",
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
  return (
    <>
      <Card bordered={false}>
        <Row>
          <Col span={4}>
            <GoldOutlined /> 采集设备数：{headData.collection_device_num || 0}
          </Col>
          <Col span={4}>
            <WarningOutlined /> 编码长度不等于20位数:{" "}
            <span className={styles.error}>
              {headData.length_not_twenty || 0}
            </span>
          </Col>
          <Col span={4}>
            <WarningOutlined /> 前6位不符合标准数:{" "}
            <span className={styles.error}>
              {headData.before6_not_vail || 0}
            </span>
          </Col>
          <Col span={4}>
            <WarningOutlined /> 11至13位不符合标准数:{" "}
            <span className={styles.error}>
              {headData.id11to13_not_vail || 0}
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

export default Code;
