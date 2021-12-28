import React, { useContext, useEffect, useState, useRef } from "react";
import styles from "./index.less";
import { Row, Col } from "antd";
import up from "@/assets/dashboard/up.png";
import down from "@/assets/dashboard/down.png";
import leftBox from "@/assets/dashboard/leftBox.png";
import rightBox from "@/assets/dashboard/rightBox.png";
import K1Line from "./K1Line";
import K2Line from "./K2Line";
import PieBar1 from "./PieBar1";
import PieBar2 from "./PieBar2";
import PieBar3 from "./PieBar3";
import PieBar4 from "./PieBar4";
import PieBar5 from "./PieBar5";
import Rador1 from './Rador1'
import Rador2 from './Rador2'


const Monitor6 = () => {
  return (
    <div className={styles.bg}>
      <Row>
        <Col span={6}>
          <div className={styles.left_top}>
            <div className={styles.title}>原始库今日数据</div>
            <div className={styles.topPadding}>
              <Row className={styles.top}>
                <Col span={10} className={styles.label1}>
                  全市人脸采集库
                </Col>
                <Col span={4} className={styles.value1}>
                  2478
                </Col>
                <Col span={4} className={styles.label2}>
                  较昨日
                </Col>
                <Col span={4}>
                  <img src={up}></img>
                </Col>
                <Col span={2} className={styles.value2}>
                  27
                </Col>
              </Row>
              <Row className={styles.top}>
                <Col span={10} className={styles.label1}>
                  全市人体采集库
                </Col>
                <Col span={4} className={styles.value1}>
                  2156
                </Col>
                <Col span={4} className={styles.label2}>
                  较昨日
                </Col>
                <Col span={4}>
                  <img src={up}></img>
                </Col>
                <Col span={2} className={styles.value2}>
                  27
                </Col>
              </Row>
              <Row className={styles.top}>
                <Col span={10} className={styles.label1}>
                  全市车辆采集库（超卡）
                </Col>
                <Col span={4} className={styles.value1}>
                  2478
                </Col>
                <Col span={4} className={styles.label2}>
                  较昨日
                </Col>
                <Col span={4}>
                  <img src={up}></img>
                </Col>
                <Col span={2} className={styles.value2}>
                  78
                </Col>
              </Row>
              <Row className={styles.top}>
                <Col span={10} className={styles.label1}>
                  全市车辆采集库（车卡）
                </Col>
                <Col span={4} className={styles.value1}>
                  2478
                </Col>
                <Col span={4} className={styles.label2}>
                  较昨日
                </Col>
                <Col span={4}>
                  <img src={down}></img>
                </Col>
                <Col span={2} className={styles.value2}>
                  56
                </Col>
              </Row>
              <Row className={styles.top}>
                <Col span={10} className={styles.label1}>
                  全市IMSI采集库
                </Col>
                <Col span={4} className={styles.value1}>
                  2478
                </Col>
                <Col span={4} className={styles.label2}>
                  较昨日
                </Col>
                <Col span={4}>
                  <img src={up}></img>
                </Col>
                <Col span={2} className={styles.value2}>
                  56
                </Col>
              </Row>
              <Row className={styles.top}>
                <Col span={10} className={styles.label1}>
                  全市MAC采集库
                </Col>
                <Col span={4} className={styles.value1}>
                  2478
                </Col>
                <Col span={4} className={styles.label2}>
                  较昨日
                </Col>
                <Col span={4}>
                  <img src={up}></img>
                </Col>
                <Col span={2} className={styles.value2}>
                  58
                </Col>
              </Row>
              <Row className={styles.top}>
                <Col span={10} className={styles.label1}>
                  全市特征值库
                </Col>
                <Col span={4} className={styles.value1}>
                  2478
                </Col>
                <Col span={4} className={styles.label2}>
                  较昨日
                </Col>
                <Col span={4}>
                  <img src={up}></img>
                </Col>
                <Col span={2} className={styles.value2}>
                  48
                </Col>
              </Row>
              <Row className={styles.top}>
                <Col span={10} className={styles.label1}>
                  旅馆采集库
                </Col>
                <Col span={4} className={styles.value1}>
                  2478
                </Col>
                <Col span={4} className={styles.label2}>
                  较昨日
                </Col>
                <Col span={4}>
                  <img src={down}></img>
                </Col>
                <Col span={2} className={styles.value2}>
                  48
                </Col>
              </Row>
              <Row className={styles.top}>
                <Col span={10} className={styles.label1}>
                  叮咚买菜采集库
                </Col>
                <Col span={4} className={styles.value1}>
                  2478
                </Col>
                <Col span={4} className={styles.label2}>
                  较昨日
                </Col>
                <Col span={4}>
                  <img src={down}></img>
                </Col>
                <Col span={2} className={styles.value2}>
                  48
                </Col>
              </Row>
            </div>
          </div>
          <div className={styles.left_bottom}>
            <div className={styles.title}>近一周数据分析</div>
            <K1Line />
          </div>
        </Col>
        <Col span={12}>
          <div className={styles.middle_top}>
            <div className={styles.middle_title}>
              <p>数据资产</p>
              <div className={styles.boxImg}>
                <div className={styles.le}>
                  <p>全市人员档案</p>
                  <img src={leftBox}></img>
                </div>
                <div className={styles.ri}>
                  <p>全市车辆档案</p>
                  <img src={rightBox}></img>
                </div>
              </div>
            </div>
            <div className={styles.total}>
              <Row justify="space-between">
                <Col span={10}>
                  <span className={styles.dataC}>数据总量</span>
                  <span className={styles.dataT}>19874</span>
                </Col>
                <Col offset={8}>
                  <span className={styles.dataT}>19874</span>
                  <span className={styles.dataC}>数据总量</span>
                </Col>
              </Row>
              <Row justify="space-between">
                <Col span={10}>
                  <span className={styles.dataC}>今日数据</span>
                  <span className={styles.dataT}>6514</span>
                  <span className={styles.yd}>较昨日</span>
                  <img src={up}></img>
                  <span className={styles.ud}>36</span>
                </Col>
                <Col offset={6}>
                  <span className={styles.ud}>36</span>
                  <img src={up}></img>
                  <span className={styles.yd}>较昨日</span>
                  <span className={styles.dataT}>6514</span>
                  <span className={styles.dataC}>今日数据</span>
                </Col>
              </Row>
              <div className={styles.rador}><Rador1 /><Rador2 /></div>
            </div>
            <i className={styles.middle_footer}></i>
          </div>
          <div className={styles.middle_bottom}>
            <div className={styles.bottomTitle}>
              <div className={styles.leTitle}>专题库</div>
              <div className={styles.riTitle}>业务库</div>
            </div>
            <div className={styles.bottomBox}>
              <Row>
                <Col span={12}>
                  <p>旅馆专题</p>
                  <div className={styles.bar1}>
                    <PieBar1 />
                    <PieBar2 />
                  </div>
                  <p>重点人员轨迹库</p>
                  <div className={styles.bar2}>
                    <PieBar3 />
                    <PieBar4 />
                    <PieBar5 />
                  </div>
                </Col>
                <Col span={12}>
                  <p style={{ padding: "10px", fontSize: "18px" }}>
                    感知设备库
                  </p>
                  <div className={styles.todayTotal}>
                    <span>数据总量</span>
                    <span>今日数据量</span>
                    <span>感知设备档案质量</span>
                  </div>
                  <div className={styles.todayData}>
                    <span style={{ color: "#00FDF6", fontSize: "18px" }}>
                      23568
                    </span>
                    <span style={{ color: "#00FDF6", fontSize: "18px" }}>
                      7102
                    </span>
                    <span>较昨日</span>
                    <img src={up}></img>
                    <span>2</span>
                    <span style={{ color: "#00FDF6", fontSize: "18px" }}>
                      96分
                    </span>
                  </div>
                  <p style={{ padding: "10px", fontSize: "18px" }}>旅馆库</p>
                  <div>
                    <div className={styles.todayTotal}>
                      <span>数据总量</span>
                      <span>今日数据量</span>
                    </div>
                    <div className={styles.todayData}>
                      <span style={{ color: "#00FDF6", fontSize: "18px" }}>
                        15768
                      </span>
                      <span style={{ color: "#00FDF6", fontSize: "18px" }}>
                        7102
                      </span>
                      <span>较昨日</span>
                      <img src={up}></img>
                      <span>2</span>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div className={styles.right_top}>
            <div className={styles.title}>资源库今日数据</div>
            <div className={styles.toprPadding}>
              <Row className={styles.topr}>
                <Col span={10} className={styles.label1}>
                  全市人脸轨迹库
                </Col>
                <Col span={4} className={styles.value1}>
                  2478
                </Col>
                <Col span={4} className={styles.label2}>
                  较昨日
                </Col>
                <Col span={2}>
                  <img src={up}></img>
                </Col>
                <Col span={4} className={styles.value2}>
                  27
                </Col>
              </Row>
              <Row className={styles.topr}>
                <Col span={10} className={styles.label1}>
                  全市人体采集库
                </Col>
                <Col span={4} className={styles.value1}>
                  2156
                </Col>
                <Col span={4} className={styles.label2}>
                  较昨日
                </Col>
                <Col span={2}>
                  <img src={up}></img>
                </Col>{" "}
                <Col span={2} className={styles.value2}>
                  27
                </Col>
              </Row>
              <Row className={styles.topr}>
                <Col span={10} className={styles.label1}>
                  全市车辆轨迹库
                </Col>
                <Col span={4} className={styles.value1}>
                  2478
                </Col>
                <Col span={4} className={styles.label2}>
                  较昨日
                </Col>
                <Col span={2}>
                  <img src={up}></img>
                </Col>
                <Col span={4} className={styles.value2}>
                  27
                </Col>
              </Row>
              <Row className={styles.topr}>
                <Col span={10} className={styles.label1}>
                  全市人/车关联库
                </Col>
                <Col span={4} className={styles.value1}>
                  2156
                </Col>
                <Col span={4} className={styles.label2}>
                  较昨日
                </Col>
                <Col span={2}>
                  <img src={up}></img>
                </Col>
                <Col span={4} className={styles.value2}>
                  78
                </Col>
              </Row>
              <Row className={styles.topr}>
                <Col span={10} className={styles.label1}>
                  全市人/人关联库
                </Col>
                <Col span={4} className={styles.value1}>
                  2478
                </Col>
                <Col span={4} className={styles.label2}>
                  较昨日
                </Col>
                <Col span={2}>
                  <img src={down}></img>
                </Col>
                <Col span={4} className={styles.value2}>
                  56
                </Col>
              </Row>
              <Row className={styles.topr}>
                <Col span={10} className={styles.label1}>
                  全市车/车关联库
                </Col>
                <Col span={4} className={styles.value1}>
                  2478
                </Col>
                <Col span={4} className={styles.label2}>
                  较昨日
                </Col>
                <Col span={2}>
                  <img src={down}></img>
                </Col>
                <Col className={styles.value2}>58</Col>
              </Row>
            </div>
          </div>
          <div className={styles.right_bottom}>
            <div className={styles.title}>近一周数据分析</div>
            <K2Line />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Monitor6;
