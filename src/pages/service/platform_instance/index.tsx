import React, { useState, useRef, useEffect } from "react";
import { appInstance } from "@/services/v2";
import { Card, Table, Drawer } from "antd";
import StandardTable from "@components/Table";
import { formatDate } from "@/utils/utils";
import styles from './index.less';
const Intstance = () => {
  const [tableData, setTableData]: any = useState([]);
  const [loading, setLoading] = useState(false);
  const [drawerShow, setDrawerShow] = useState(false);
  const [config, setConfig] = useState('');

  useEffect(() => {
    setLoading(true);
    appInstance({})
      .then((res) => {
        setLoading(false);
        setTableData(res.status.code === 0 ? res.body : []);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);
  const drawerVisiable = (val, isShow) => {
    setDrawerShow(isShow);
    setConfig(val);
  };

  const columns = [
    {
      title: "NodeID",
      dataIndex: "node_id",
      key: "node_id",
    },
    {
      title: "IP地址",
      dataIndex: "ip",
      key: "ip",
    },
    {
      title: "启动命令",
      dataIndex: "cmd",
      key: "cmd",
    },
    {
      title: "部署目录",
      dataIndex: "dir",
      key: "dir",
    },
    {
      title: "版本",
      dataIndex: "version",
      key: "version",
    },
    {
      title: "编译时间",
      dataIndex: "build_date",
      key: "build_date",
      render: (text) => (
        <span>{text && formatDate(text, "YYYY-MM-DD HH:mm:ss")}</span>
      ),
    },
    {
      title: "GO版本",
      dataIndex: "go_version",
      key: "go_version",
    },
    {
      title: "最近一次上报时间",
      dataIndex: "updated",
      key: "updated",
      render: (text) => (
        <span>{text && formatDate(text, "YYYY-MM-DD HH:mm:ss")}</span>
      ),
    },
    {
      title: "操作",
      dataIndex: "config",
      render: (val, config) => (
        <a onClick={() => drawerVisiable(val, true)}>配置文件</a>
      ),
    },
  ];

  const encodedDataConfig = config?decodeURIComponent(escape(window.atob(config))):'';

  return (
    <>
      <Card bordered={false}>
        <Table
          loading={loading}
          columns={columns}
          dataSource={tableData}
          bordered
        ></Table>
      </Card>
      <Drawer
        title="配置文件"
        width={500}
        placement="right"
        onClose={() => drawerVisiable('', false)}
        visible={drawerShow}
      >
        <div className={styles.json}>
          <pre style={{ margin: 0, display: "inline-block" }}>
            <div dangerouslySetInnerHTML={{ __html: encodedDataConfig }} />
          </pre>
        </div>
      </Drawer>
    </>
  );
};
export default Intstance;
