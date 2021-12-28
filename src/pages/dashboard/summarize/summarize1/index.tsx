import React, { useContext, useEffect, useState, useRef } from "react";
import styles from "./index.less";
import { Row, Col } from "antd";
import up from "@/assets/dashboard/up.png";
import down from "@/assets/dashboard/down.png";
import data from "@/assets/dashboard/data.png";
import leftBox from "@/assets/dashboard/leftBox.png";
import rightBox from "@/assets/dashboard/rightBox.png";
import PieBar1 from "./PieBar1";
import PieBar2 from "./PieBar2";
import PieBar3 from "./PieBar3";
import PieBar4 from "./PieBar4";
import PieBar5 from "./PieBar5";
import AnalyLine from "./AnalyLine";
import ShareLine from "./ShareLine";
import NoticeInfo from "./NoticeInfo";
import Ring from "./Ring";
import Ring2 from "./Ring2";

const Summarize1 = () => {
  return (
    <div className={styles.bg}>
      <div className={styles.topData}>
        <Row className={styles.topRow}>
          <Col span={8}>
            <span>数据库总量</span>
            <a>708</a>
          </Col>
          <Col span={8}>
            <span>累计数据量</span>
            <a>10</a>
            <span>W</span>
          </Col>
          <Col span={8}>
            <span>较昨日</span>
            <img src={up}></img>
            <a>356</a>
          </Col>
        </Row>
      </div>
      <Row>
        <Col span={6}>
          <div className={styles.left_top}>
            <div className={styles.title}>数据来源</div>
            <div className={styles.source}>
              <Row className={styles.rowpadding}>
                <Col span={6}>视频网</Col>
                <Col span={2} style={{ color: "#01FFF6", fontSize: "18px" }}>
                  247
                </Col>
                <Col span={4} style={{ color: "#01FFF6", fontSize: "18px" }}>
                  33689
                </Col>
                <Col span={2}>
                  <img src={up}></img>
                </Col>
                <Col span={8}>
                  <img src={data}></img>
                </Col>
              </Row>
              <Row className={styles.rowpadding}>
                <Col span={6}>互联网</Col>
                <Col span={2} style={{ color: "#01FFF6", fontSize: "18px" }}>
                  215
                </Col>
                <Col span={4} style={{ color: "#01FFF6", fontSize: "18px" }}>
                  31586
                </Col>
                <Col span={2}>
                  <img src={up}></img>
                </Col>
                <Col span={8}>
                  <img src={data}></img>
                </Col>
              </Row>
              <Row className={styles.rowpadding}>
                <Col span={6}>公安网</Col>
                <Col span={2} style={{ color: "#01FFF6", fontSize: "18px" }}>
                  215
                </Col>
                <Col span={4} style={{ color: "#01FFF6", fontSize: "18px" }}>
                  33689
                </Col>
                <Col span={2}>
                  <img src={up}></img>
                </Col>
                <Col span={8}>
                  <img src={data}></img>
                </Col>
              </Row>
              <Row className={styles.rowpadding}>
                <Col span={6}>电子政务网</Col>
                <Col span={2} style={{ color: "#01FFF6", fontSize: "18px" }}>
                  247
                </Col>
                <Col span={4} style={{ color: "#01FFF6", fontSize: "18px" }}>
                  33689
                </Col>
                <Col span={2}>
                  <img src={up}></img>
                </Col>
                <Col span={8}>
                  <img src={data}></img>
                </Col>
              </Row>
            </div>
          </div>
          <div className={styles.left_bottom}>
            <div className={styles.title}>数据解析</div>
            <div className={styles.analysis}>
              <Row>
                <Col span={24}>
                  <AnalyLine />
                </Col>
                <Col span={24} className={styles.tableBorder}>
                  <table>
                    <tr>
                      <th></th>
                      <th>今日成功解析度</th>
                      <th>今日平均解析时间</th>
                    </tr>
                    <tr>
                      <td>百度</td>
                      <td>96%</td>
                      <td>36ms</td>
                    </tr>
                    <tr>
                      <td>依图</td>
                      <td>88</td>
                      <td>65ms</td>
                    </tr>
                    <tr>
                      <td>商汤</td>
                      <td>76</td>
                      <td>92ms</td>
                    </tr>
                  </table>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
        <Col span={12}>
          <div className={styles.middle_top}>
            <div className={styles.middle_title}>
              <p>数据资产</p>
              <div className={styles.boxImg}>
                <div className={styles.le}>
                  <p>库数占比</p>
                  <img src={leftBox}></img>
                </div>
                <div className={styles.ri}>
                  <p>数据量排名</p>
                  <img src={rightBox}></img>
                </div>
              </div>
              <div className={styles.middleCharts}>
                <Ring />
                <Ring2 />
              </div>
            </div>
            <div className={styles.total}>
              <div className={styles.rador}></div>
            </div>
            <i className={styles.middle_footer}></i>
          </div>
          <div className={styles.middle_bottom}>
            <div className={styles.bottomTitle}>
              <div className={styles.leTitle}>告警通知</div>
            </div>
            <div className={styles.bottomBox}>
              <NoticeInfo />
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div className={styles.right_top}>
            <div className={styles.title}>数据质量</div>
            <div className={styles.barBox}>
              <div className={styles.bar1}>
                <PieBar1 />
                <PieBar2 />
              </div>
              <div className={styles.bar2}>
                <PieBar3 />
                <PieBar4 />
                <PieBar5 />
              </div>
            </div>
          </div>
          <div className={styles.right_bottom}>
            <div className={styles.title}>数据共享</div>
            <div className={styles.share}>
              <Row>
                <Col span={7} offset={1}>
                  <p>接口数量</p>
                  <div>157</div>
                  <div>
                    <span>较昨日</span>
                    <img src={up}></img>
                    <span>2</span>
                  </div>
                </Col>
                <Col span={8}>
                  <p>服务次数</p>
                  <div>2667</div>
                  <div>
                    <span>较昨日</span>
                    <img src={up}></img>
                    <span>65</span>
                  </div>
                </Col>
                <Col span={8}>
                  <p>服务厂商</p>
                  <div>57</div>
                  <div>
                    <span>较昨日</span>
                    <img src={up}></img>
                    <span>12</span>
                  </div>
                </Col>
              </Row>
              <div className={styles.shareLine}>
                <p>近一月服务次数</p>
                <ShareLine />
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Summarize1;
