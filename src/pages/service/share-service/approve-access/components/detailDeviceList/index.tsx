import React, { useEffect, useState } from "react";
import { Select, Button, Input, Table, Form, Descriptions } from "antd";
import StandardTable from "@components/Table";
import SearchForm from "@components/SearchForm";
import { forwardDetailDeviceList } from "@/services/v1";
import { formatDate, filterCategory } from "@/utils/utils";
import styles from "./index.less";

const DeviceList = (props) => {
  const { page, id } = props;
  const sources = filterCategory("接入来源") || [];
  const types = filterCategory("摄像机功能类型") || [];
  const [deviceList, setDeviceList]: any = useState([]);
  const [checkPoint, setCheckPoint]: any = useState({});
  useEffect(() => {
    getTableData({});
  }, [id]);

  const { Option } = Select;

  const [form] = Form.useForm();
  const getTableData = (params) => {
    forwardDetailDeviceList(params, id).then((res) => {
      if (res && res.items) {
        setDeviceList(res.items.devices);
        setCheckPoint(res.items.device_map);
      }
    });
  };
  const handleSearch = (val) => {
    getTableData(val);
  };
  const handleReset = () => {
    form.resetFields();
    getTableData({});
  };

  const columns = [
    {
      title: "设备编号",
      dataIndex: "device_id",
      ellipsis: true,
    },
    {
      title: "设备名称",
      dataIndex: "alias",
      ellipsis: true,
    },
    {
      title: "标签",
      dataIndex: "tag_name",
      ellipsis: true,
    },
    {
      title: "类型",
      dataIndex: "function_type",
      ellipsis: true,
    },
    {
      title: "来源",
      dataIndex: "source",
      ellipsis: true,
    },
  ];

  const layout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 18 },
  };

  return (
    <>
      {/* <span>设备信息</span> */}
      <Form
        {...layout}
        layout="inline"
        form={form}
        onFinish={handleSearch}
        style={{ marginLeft: 25 }}
      >
        <Form.Item label="设备编号" name="device_id">
          <Input></Input>
        </Form.Item>
        {/* <Form.Item label="来源" name="source">
          <Select>
            {sources.map((item, index) => (
              <Option value={item.value} key={index}>
                {item.label}
              </Option>
            ))}
          </Select>
        </Form.Item> */}
        <Form.Item label="设备类型" name="function_type">
          <Select>
            {types.map((item, index) => (
              <Option value={item.value} key={index}>
                {item.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ marginRight: 20, marginLeft: 24 }}
        >
          查询
        </Button>
        <Button onClick={handleReset}>重置</Button>
      </Form>
      <div>
        {/* <Button type="link" onClick={() => {}}>
          下载设备信息
        </Button> */}
        {Object.keys(checkPoint || {}).map((m) => (
          <>
            <span style={{ marginLeft: 20 }}>{m} : </span>
            <span>{checkPoint[m]}</span>
          </>
        ))}
      </div>
      <Table
        bordered
        columns={columns}
        dataSource={deviceList}
        rowClassName={styles.tableRow}
        scroll={{ x: "auto", y: 330 }}
      ></Table>
      
    </>
  );
};

export default DeviceList;
