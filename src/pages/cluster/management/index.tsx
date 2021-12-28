import React, { useEffect, useState } from "react";
import { List, Card, Tabs, Modal, message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import {
  ServiceStatus,
  serviceConfigDownLoad,
} from "@/services/v1";
import {clusterSearch} from "@/services/v2"
import styles from "./index.less";
import DownloadTemplate from "@/components/DownloadTemplate";
import { Link } from "react-router-dom";

const { TabPane } = Tabs;

const Management = () => {
  const [cardData, setCardData]: any = useState([]);
  const[loading, setLoading] = useState(false);
  useEffect(() => {
    getData("内部");
  }, []);

  const getData = async (category) => {
    setLoading(true);
    const res = await clusterSearch({
      category: category,
    });
    if (res && res.items) {
      setCardData(res.items);
    }else {
      setCardData([])
    }
    setLoading(false);
  };

  const tabChange = (key) => {
    let category: any = [];
    if (key === "1") {
      category = "内部";
    } else {
      category = "外部";
    }
    getData(category);
  };

  // const handleRestartOrStop = (val, title, method) => {
  //   Modal.confirm({
  //     title: title,
  //     content: `是否确认${title}名称为:"${val.name}"的服务`,
  //     icon: <ExclamationCircleOutlined />,
  //     bodyStyle: { color: "#fff" },
  //     onOk() {
  //       restartOrStop(val.id, method, title);
  //     },
  //     onCancel() {},
  //   });
  // };
  // const restartOrStop = async (id, method, title) => {
  //   try {
  //     const res = await ServiceStatus(id, {
  //       status: method,
  //     });
  //     if (res) {
  //       message.success(`${title}成功`);
  //     }
  //   } catch (err) {}
  // };

  return (
    <Card bordered={false}>
      <Tabs defaultActiveKey="1" onChange={tabChange}>
        <TabPane tab="内部集群" key="1">
          <List
            loading={loading}
            grid={{ gutter: 16, column: 5 }}
            pagination={{
              onChange: (page) => {
                console.log(page);
              },
              pageSize: 10,
            }}
            dataSource={cardData}
            renderItem={(item: any) => (
              <List.Item style={{ textAlign: "center" }}>
                <div className={styles.content}>
                  <div className={styles.serveTitle}>{item.name}</div>
                  <div className={styles.serveContent}>
                    <span className={styles.serveContentName}>类型:</span>
                    <span style={{ color: "#fff" }}>{item.category}</span>
                  </div>
                  <div className={styles.serveContent}>
                    <span className={styles.serveContentName}>状态:</span>
                    <span style={{color: '#fff'}}>{item.status=== '0' ? '正常' : '异常'}</span>
                  </div>
                  <div className={styles.serveContent}>
                    <span className={styles.serveContentName}>描述:</span>
                    <span style={{color: '#fff'}}>{item.description}</span>
                  </div>
                  <div className={styles.footer}>
                    {/* <Link to={`/cluster/management_detail/${item && item.id}`}>
                      详情
                    </Link> */}
                  </div>
                </div>
              </List.Item>
            )}
          />
        </TabPane>
        <TabPane tab="外部集群" key="2">
          <List
            loading={loading}
            grid={{
              gutter: 16,
              column: 5,
            }}
            pagination={{
              onChange: (page) => {
                // console.log(page);
              },
              pageSize: 10,
            }}
            dataSource={cardData}
            renderItem={(item: any) => (
              <List.Item style={{ textAlign: "center" }}>
                <div className={styles.content}>
                  <div className={styles.serveTitle}>{item.name}</div>
                  <div className={styles.serveContent}>
                    <span className={styles.serveContentName}>类型:</span>
                    <span style={{ color: "#fff" }}>{item.category}</span>
                  </div>
                  <div className={styles.serveContent}>
                    <span className={styles.serveContentName}>状态:</span>
                    <span style={{color: '#fff'}}>{item.status=== '0' ? '正常' : '异常'}</span>
                  </div>
                  <div className={styles.serveContent}>
                    <span className={styles.serveContentName}>描述:</span>
                    <span style={{color: '#fff'}}>{item.description}</span>
                  </div>
                  <div className={styles.footer}>
                    {/* <Link to={`/cluster/management_detail/${item && item.id}`}>
                      详情
                    </Link> */}
                  </div>
                </div>
              </List.Item>
            )}
          />
        </TabPane>
      </Tabs>
    </Card>
  );
};
export default Management;
