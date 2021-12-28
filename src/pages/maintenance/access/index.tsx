import React, { useEffect, useState } from "react";
import { List, Card, Tabs, Modal, message, Button, Popover } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import {
  serviceSearch,
  ServiceStatus,
  serviceConfigDownLoad,
} from "@/services/v1";
import { severAmount } from "@/services/v2";
import styles from "./index.less";
import DownloadTemplate from "@/components/DownloadTemplate";
import { Link } from "react-router-dom";
import CardItem from "./card-item";
import OtherCardItem from "./other-card-item";
import { getColor, getStatus } from "./childUtils"

const { TabPane } = Tabs;

const Management = () => {
  const [cardData, setCardData]: any = useState([]);
  const [category, setCategory]: any = useState(["ACCESS"]);
  const [loading, setLoading] = useState(false);

  const [categoryNum, setCategoryNum]: any = useState([]);
  // 转发服务的数量(forward,sync_forward)
  const [forwardNum, setForwardNum] = useState(0);
  const [otherNum, setOtherNum] = useState(0);
  useEffect(() => {
    // setCategory(["ACCESS"]);
    getData(category);
  }, [category]);

  useEffect(() => {
    severAmount({}).then((res) => {
      setCategoryNum(res);
      let num1 = 0;
      let num2 = 0;
      res.forEach(item => {
        if (item.category === "ASYNC_FORWARD" || item.category === "FORWARD" || item.category === "SUBSCRIBE") {
          num1 += Number(item.num)
        }
      })
      res.forEach(item => {
        if (item.category === "PARSEENGIN" || item.category === "ACCESS" || item.category === "ASYNC_FORWARD" || item.category === "FORWARD" || item.category === "SUBSCRIBE") {
          return
        } else {
          num2 += Number(item.num)
        }
      })
      setForwardNum(num1);
      setOtherNum(num2);
    });
  }, []);

  const getData = async (category) => {
    setLoading(true);
    const res = await serviceSearch({
      categorys: category,
    });
    setCardData((res && res.items) || []);
    setLoading(false);
  };

  const tabChange = (key) => {
    if (key === "1") {
      setCategory(["ACCESS"]);
    } else if (key === "2") {
      setCategory(["FORWARD", "ASYNC_FORWARD", "SUBSCRIBE"]);
    } else if (key === "3") {
      setCategory(["PARSEENGIN"]);
    } else {
      setCategory([]);
    }
  };

  const handleRestartOrStop = (val, method, title) => {
    Modal.confirm({
      title: title,
      content: `是否确认${title}名称为:"${val.name}"的服务`,
      icon: <ExclamationCircleOutlined />,
      bodyStyle: { color: "#fff" },
      onOk() {
        restartOrStop(val.id, method, title);
      },
      onCancel() { },
    });
  };
  const restartOrStop = async (id, method, title) => {
    try {
      const res = await ServiceStatus(id, {
        status: method,
      });
      if (res) {
        message.success(`${title}成功`);
        getData(category);
      }
    } catch (err) { }
  };

  // 模型更新
  const downloadConfig = (config, name) => {
    if (!config) {
      message.error("此服务无配置文件")
      return
    }
    let Link = document.createElement('a');
    Link.download = `${name}.json`;
    Link.style.display = 'none';
    // 字符内容转变成blob地址
    var blob = new Blob([config]);
    Link.href = URL.createObjectURL(blob);
    // 触发点击
    document.body.appendChild(Link);
    Link.click();
    // 然后移除
    document.body.removeChild(Link);
  }

  const personContent = (
    <div style={{ width: 200, wordWrap: "break-word" }}>
      eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYXRlZ29yeSI6IkFOQUxZU0lTIiwidHlwZSI6ImZhY2UifQ.vOuOwUY8y4GlojyQXOEOHGymPUrrOBcfCFLfbFNLRw8
    </div>
  )
  const carContent = (
    <div style={{ width: 200, wordWrap: "break-word" }}>
      eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYXRlZ29yeSI6IkFOQUxZU0lTIiwidHlwZSI6ImNhciJ9.zaJ5271waN4Gs-jgfnL-bKOV_7vpjPjHVbMNPTVqjSE
    </div>
  )

  return (
    <Card bordered={false}>
      <Button
        type="primary"
        style={{ marginBottom: 18, marginRight: 20 }}
        onClick={() => {
          // handleModalVisible(true);
        }}
      >
        <Link to={`/system/wx_cluster/wx_maintenance_service_add`}>新增</Link>
      </Button>
      <Tabs defaultActiveKey="1" onChange={tabChange}>
        <TabPane
          tab={`接入服务 (${categoryNum.find(item => item.category == "ACCESS") && categoryNum.find(item => item.category == "ACCESS").num})`}
          key="1"
        >
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
              <List.Item style={{ textAlign: "center", marginBottom: 0 }}>
                <CardItem
                  item={item}
                  handleRestartOrStop={handleRestartOrStop}
                  downloadFile={() => downloadConfig(item.config, item.name)}
                  category="1"
                />
              </List.Item>
            )}
          />
        </TabPane>
        <TabPane
          tab={`转发/订阅服务 (${forwardNum})`}
          key="2"
        >
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
              <List.Item style={{ textAlign: "center", marginBottom: 0 }}>
                <CardItem
                  item={item}
                  handleRestartOrStop={handleRestartOrStop}
                  downloadFile={() => downloadConfig(item.config, item.name)}
                  category="2"
                />
              </List.Item>
            )}
          />
        </TabPane>
        <TabPane tab={`解析引擎 (${categoryNum.find(item => item.category == "PARSEENGIN") && categoryNum.find(item => item.category == "PARSEENGIN").num || 0})`} key="3">
          <List
            loading={loading}
            grid={{
              gutter: 16,
              column: 4,
            }}
            pagination={{
              onChange: (page) => {
                // console.log(page);
              },
              pageSize: 10,
            }}
            dataSource={cardData}
            renderItem={(item: any) => (
              <List.Item style={{ textAlign: "center", marginBottom: 0 }}>
                <div className={styles.content}>
                  <div className={styles.serveTitle}>{item.name}</div>
                  <div className={styles.serveContent}>
                    <span className={styles.serveContentName}>类型:</span>
                    <span style={{ color: "#fff" }}>解析引擎</span>
                  </div>
                  <div className={styles.serveContent}>
                    <span className={styles.serveContentName}>IP:</span>
                    <span style={{ color: "#fff" }}>{item.ip}</span>
                  </div>
                  <div className={styles.serveContent}>
                    <span className={styles.serveContentName}>状态:</span>
                    <span>
                      <span
                        className={styles.severStatus}
                        style={{ backgroundColor: getColor(item.status) }}
                      ></span>
                      <span style={{ color: getColor(item.status) }}>
                        {getStatus(item.status)}
                      </span>
                    </span>
                  </div>
                  <div className={styles.footer}>
                    <Link to={`/system/wx_cluster/wx_parse_engine_config/${item.id}`}>服务配置</Link>
                    {
                      item.status === "RUNNING" ? "" : (
                        <a onClick={() => handleRestartOrStop(item, "RUNNING", "更新")}>
                          更新
                        </a>
                      )
                    }
                    {
                      item.status === "UNKNOW" || item.status === "START" ? "" : (
                        <a onClick={() => handleRestartOrStop(item, "START", "停用")}>
                          停用
                        </a>
                      )
                    }
                    <Link to={`/engine_monitor/${item && item.id}/service/baidu`}>监控</Link>

                    <Link to={{ pathname: '/gover/wx_reconciliation/data_reconciliation', state: { parseId: item.id, category: "3" } }}>对账</Link>

                    <Popover trigger="click" content={item.name === "人像解析引擎" ? personContent : carContent}>
                      <a>认证信息</a>
                    </Popover>
                    <a onClick={() => downloadConfig(item.config, item.name)}>模型更新</a>
                    <Link to={`/system/wx_cluster/access/info/${item && item.id}`}>
                      详情
                    </Link>
                    <Link to={`/system/wx_cluster/wx_parse_engine_report/${item && item.id}`}>
                      结果报告
                    </Link>
                  </div>
                </div>
              </List.Item>
            )}
          />
        </TabPane>
        <TabPane
          tab={`其他服务 (${otherNum})`}
          key="4"
        >
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
              <List.Item style={{ textAlign: "center", marginBottom: 0 }}>
                <OtherCardItem
                  item={item}
                  handleRestartOrStop={handleRestartOrStop}
                  downloadFile={() => downloadConfig(item.config, item.name)}
                  category="4"
                />
              </List.Item>
            )}
          />
        </TabPane>
      </Tabs>
    </Card>
  );
};
export default Management;
