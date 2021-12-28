import React, { useState, useEffect } from "react";
import {
  Card,
  Input,
  Divider,
  Select,
  Button,
  Row,
  Col,
  Form,
  Table,
} from "antd";

import StandardTable from "@components/Table";
import SearchForm from "@components/SearchForm";
import { formatDate } from "@/utils/utils";
import { pushProgressSearch } from "@/services/v2";
import { Link } from "react-router-dom"

const Progress = (props) => {
  const [loading, setLoading] = useState(false);
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
    pushProgressSearch({
      offset:
        (pagination.current &&
          pagination.pageSize &&
          (pagination.current - 1) * pagination.pageSize) ||
        0,
      limit: pagination.pageSize || 10,
      ...params,
    }).then((res) => {

      if (Array.isArray(res.data)) {
        setTableData(res.data);
        setPagination({
          ...pagination,
          total: (res && res.total) || 0,
          current: pagination.current,
        });
      } else {
        setTableData([]);

      }
      setLoading(false);
    });
  };

  //表格查询
  const handleTableChange = (tablePagination) => {
    setPagination({
      ...pagination,
      ...tablePagination,
    });
  };

  const [form] = Form.useForm();
  const handleReset = () => {
    form.resetFields();
    getData({});
  };
  const handleSearch = () => {
    const res = form.getFieldsValue();
    getData(res);
  };

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 18 },
  };

  const columns: any = [
    {
      title: "推送编号",
      dataIndex: "code",
      align: "center",
    },
    {
      title: "推送名称",
      dataIndex: "name",
      align: "center",
    },
    {
      title: "推送地址",
      dataIndex: "url",
      align: "center",
    },
    {
      title: "推送进度",
      dataIndex: "progress",
      align: "center",
      render: (val) => (
        <span>{!val || val === '0' ? '' : formatDate(val, "YYYY-MM-DD HH:mm:ss")}</span>
      ),
    },
    {
      title: "操作",
      align: "center",
      render: (val, record) => <Link to={`/dashboard/progress_search/detail/${record.code}/${record.model}`}>详情</Link>,
    },
  ];

  return (
    <>
      <Card bordered={false}>
        <Form form={form} {...layout} onFinish={handleSearch}>
          <Row>
            <Col span={6}>
              <Form.Item label="推送名称" name="name">
                <Input></Input>
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
        </Form>
        <Table
          rowKey='id'
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

export default Progress;
