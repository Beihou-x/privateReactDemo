import React, { Component, useEffect, useState } from "react";
import { Card, Tabs, Row, Col } from "antd";
import OriginalBar from "./child/originalBar";
import Nav from "./child/nav";
import styles from "./index.less";
import Title from "@/components/Title";
import Pie from "./child/imgPie";
import StorageBar from "./child/storageBar";
import Funnel from "./child/funnel";
import Line from "./child/line";
import Rate from "./child/circleRate";
import { format } from "@/utils/utils";
import up from "@/assets/up.png";
import down from "@/assets/down.png";

const { TabPane } = Tabs;

const Home = (props) => {
  const { state } = props.location;

  const humanData = [
    { count: "1245678", yoy: "0.035", ChainRatio: "0.053" },
    { count: "1245678", yoy: "0.035", ChainRatio: "0.053" },
    { count: "1245678", yoy: "0.035", ChainRatio: "0.053" },
    { count: "1245678", yoy: "0.035", ChainRatio: "0.053" },
  ];
  return (
    <div className={styles.content}>
      <Tabs defaultActiveKey={state}>
        <TabPane tab="原始库" key="original">
          <Nav />
          <div className={styles.original_bar}>
            <Title title="近一周抓拍情况" />
            <OriginalBar />
          </div>
          <div className={styles.box}>
            <div className={styles.box_left}>
              <Title title="图片质量情况" />
              <Pie />
            </div>
            <div className={styles.box_right}>
              <Title title="各图片存储情况" />
              <StorageBar />
            </div>
          </div>
        </TabPane>
        <TabPane tab="主题库" key="theme">
          <Nav />
          <div className={styles.part}>
            <Title title="今日归档情况" />
            <Row style={{ marginTop: 25 }}>
              <Col span={8}>
                <span>人像</span>
                {humanData.map((item, index) => (
                  <div key={index} className={styles.centerRate}>
                    <span>{item.count}</span>
                    <span>
                      <span>同比</span>

                      <img src={up} alt="" />
                      <span>{format(item.yoy)}%</span>
                    </span>
                    <span>
                      <span>环比</span>

                      <img src={down} alt="" />
                      <span>{format(item.ChainRatio)}%</span>
                    </span>
                  </div>
                ))}
                <span>今日归档率: 98.4%</span>
              </Col>
              <Col span={8}>
                <div
                  style={{
                    height: 300,
                    width: "100%",
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Funnel />
                </div>
              </Col>
              <Col span={8}>
                <span>车辆</span>
                {humanData.map((item, index) => (
                  <div key={index} className={styles.centerRate}>
                    <span>{item.count}</span>
                    <span>
                      <span>同比</span>
                      <img src={up} alt="" />
                      <span>{format(item.yoy)}%</span>
                    </span>
                    <span>
                      <span>环比</span>
                      <img src={down} alt="" />
                      <span>{format(item.ChainRatio)}%</span>
                    </span>
                  </div>
                ))}
                <span>今日归档率: 98.4%</span>
              </Col>
            </Row>
          </div>
          <div className={styles.box}>
            <div className={styles.box_left}>
              <Title title="近一周档案情况" />
              <Line />
            </div>
            <div className={styles.box_right}>
              <Title title="质量情况" />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  height: 300,
                }}
              >
                <Rate />
                <Rate />
              </div>
            </div>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};
export default Home;
