import React from "react";
import styles from "./index.less";
import AreaDevice from "../summarizing/components/AreaDevice";
import { Row, Col, Card, Progress } from "antd";
import Line from "./components/Line";
import Pie from "./components/BorderedPie";
import ProgressSort from "./components/ProgressSort";

type MonitorDashboardProps = {};

const MonitorDashboard: React.FC<MonitorDashboardProps> = () => {
  return (
    <div className={styles["monitor-dashboard"]}>
      <header>
        <AreaDevice label="应用总数" value={12} />
        <AreaDevice label="今日转发总量" value={14317} rank="up" />
        <AreaDevice label="近一周转发总量" value={158967} rank="down" />
      </header>
      <Row gutter={16}>
        <Col span={4}>
          <Card
            className={styles["monitor-dashboard-card"]}
            title="转发量排行榜"
          >
            <Row>
              <Col span={24}>
                <AreaDevice
                  label={
                    <div className={styles.flex}>
                      <span className={styles.rank}>1</span> 百度
                    </div>
                  }
                  value={1589}
                  rank="down"
                />
              </Col>
              <Col span={24}>
                <AreaDevice
                  label={
                    <div className={styles.flex}>
                      <span className={styles.rank}>2</span> 依图
                    </div>
                  }
                  value={1471}
                  rank="up"
                />
              </Col>
              <Col span={24}>
                <AreaDevice
                  label={
                    <div className={styles.flex}>
                      <span className={styles.rank}>3</span> 商汤
                    </div>
                  }
                  value={1405}
                  rank="up"
                />
              </Col>
              <Col span={24}>
                <AreaDevice
                  label={
                    <div className={styles.flex}>
                      <span className={styles.rank}>4</span> 科达
                    </div>
                  }
                  value={1130}
                  rank="up"
                />
              </Col>
              <Col span={24}>
                <AreaDevice
                  label={
                    <div className={styles.flex}>
                      <span className={styles.rank}>5</span> 中软
                    </div>
                  }
                  value={1127}
                  rank="down"
                />
              </Col>
              <Col span={24}>
                <AreaDevice
                  label={
                    <div className={styles.flex}>
                      <span className={styles.rank}>6</span> 以萨
                    </div>
                  }
                  value={1123}
                  rank="up"
                />
              </Col>
              <Col span={24}>
                <AreaDevice
                  label={
                    <div className={styles.flex}>
                      <span className={styles.rank}>7</span> 华为
                    </div>
                  }
                  value={1120}
                  rank="down"
                />
              </Col>
              <Col span={24}>
                <AreaDevice
                  label={
                    <div className={styles.flex}>
                      <span className={styles.rank}>8</span> 金盾
                    </div>
                  }
                  value={1116}
                  rank="down"
                />
              </Col>
              <Col span={24}>
                <AreaDevice
                  label={
                    <div className={styles.flex}>
                      <span className={styles.rank}>9</span> 城之瞳
                    </div>
                  }
                  value={1081}
                  rank="up"
                />
              </Col>
              <Col span={24}>
                <AreaDevice
                  label={
                    <div className={styles.flex}>
                      <span className={styles.rank}>10</span> 任子行
                    </div>
                  }
                  value={1074}
                  rank="up"
                />
              </Col>
              <Col span={24}>
                <AreaDevice
                  label={
                    <div className={styles.flex}>
                      <span className={styles.rank}>11</span> 新奕软件
                    </div>
                  }
                  value={1042}
                  rank="down"
                />
              </Col>
              <Col span={24}>
                <AreaDevice
                  label={
                    <div className={styles.flex}>
                      <span className={styles.rank}>12</span> 聚合
                    </div>
                  }
                  value={1039}
                  rank="up"
                />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={14}>
          <Card className={styles["monitor-dashboard-card"]} title="数量监测">
            <Line
              styles={{
                height: "60vh",
              }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card className={styles["monitor-dashboard-card"]} title="异常监测">
            <p>响应时间</p>
            <Row>
              <Col span={8}>
                <Pie title="百度" />
              </Col>
              <Col span={8}>
                <Pie title="依图" />
              </Col>
              <Col span={8}>
                <Pie title="商汤" />
              </Col>
              <Col span={8}>
                <Pie title="科达" />
              </Col>
              <Col span={8}>
                <Pie title="中软" />
              </Col>
              <Col span={8}>
                <Pie title="以萨" />
              </Col>
              <Col span={8}>
                <Pie title="华为" />
              </Col>
              <Col span={8}>
                <Pie title="金盾" />
              </Col>
              <Col span={8}>
                <Pie title="城之瞳" />
              </Col>
              <Col span={8}>
                <Pie title="任子行" />
              </Col>
              <Col span={8}>
                <Pie title="新奕软件" />
              </Col>
              <Col span={8}>
                <Pie title="聚合" />
              </Col>
            </Row>
            <Row style={{ marginTop: 10 }}>
              <p>服务堆积</p>
              <Col span={24}>
                <ProgressSort
                  name="金盾"
                  percent={Number(((453 / 553) * 100).toFixed(1))}
                  number={453}
                />
              </Col>
              <Col span={24}>
                <ProgressSort
                  name="以萨"
                  percent={Number(((334 / 553) * 100).toFixed(1))}
                  number={334}
                />
              </Col>
              <Col span={24}>
                <ProgressSort
                  name="科达"
                  percent={Number(((234 / 553) * 100).toFixed(1))}
                  number={234}
                />
              </Col>
              <Col span={24}>
                <ProgressSort
                  name="任子行"
                  percent={Number(((124 / 553) * 100).toFixed(1))}
                  number={124}
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default MonitorDashboard;
