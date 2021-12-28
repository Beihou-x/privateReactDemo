import React, { useEffect, useState } from "react";
import styles from "./index.less";
import Title from "./components/title";
import Pie from "./components/topPie";
import Bar from "./components/deviceDistribute";
import ImgPie from "./components/imgPie";
import Rank1 from "./components/rank1";
import Rank2 from "./components/rank2";
import Rank3 from "./components/rank3";
import Map from "./components/map";
import up from "@/assets/up.png";
import down from "@/assets/down.png";
import {
  frontEndHead,
  frontEndData,
  unusualDevice,
  deviceTop5,
} from "@/services/feel_view";
import { bigNumberTransform } from "@/utils/utils";
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Popover } from "antd";
const FrontEnd = () => {
  const [placeName, setPlaceName] = useState("苏州市");
  const [deviceNum, setDeviceNum]: any = useState([]);
  const [dataNum, setDataNUm]: any = useState([]);
  const [todayNum, setTodayNum]: any = useState([]);
  const [rankData, setRankData]: any = useState({});
  const [mapData, setMapData]: any = useState({});

  useEffect(() => {
    frontEndHead().then((res) => {
      if (res && res.topTotal) {
        let deviceArr: any = [];
        let dataArr: any = [];
        deviceArr.push({
          name: res.displayMap.k7,
          value: res.topTotal.k7,
        });
        deviceArr.push({
          name: res.displayMap.k8,
          value: res.topTotal.k8,
        });
        dataArr.push({
          name: res.displayMap.k3,
          value: res.topTotal.k3,
        });
        dataArr.push({
          name: res.displayMap.k2,
          value: res.topTotal.k2,
        });
        setDeviceNum(deviceArr);
        setDataNUm(dataArr);
      }
    });
    frontEndData().then((res) => {
      if (res && res.dataWithMessage) {
        setTodayNum(res.dataWithMessage.slice(0, 13));
      }
      // setTodayNum(res.dataWithMessage);
    });
    unusualDevice({}).then((res) => {
      if (res) {
        setMapData(res);
      }
    });

    getDeviceTop5({});
  }, []);

  // 获取设备质量最优Top5
  const getDeviceTop5 = (params) => {
    deviceTop5(params).then((res) => {
      setRankData(res);
    });
  };
  // 地区名
  const getPlaceName = (name) => {
    setPlaceName(name);
  };

  return (
    <div className={styles.content}>
      <div className={styles.leftPart}>
        <div className={styles.gather}>
          <div style={{ width: 557, height: 220, position: "relative" }}>
            <div style={{ width: "100%", height: 220 }}>
              <Pie title="设备总量" data={deviceNum}></Pie>
            </div>
            <div style={{ marginLeft: 70, position: "absolute", top: "55%" }}>
              <Popover content="人像卡口和超级卡口设备总量">
                <QuestionCircleOutlined /> 
              </Popover>
              设备总量
            </div>
          </div>
          <div
            style={{
              height: "85%",
              width: "1px",
              borderRight: "1px dashed rgba(199, 204, 208, 0.2)",
            }}
          ></div>
          <div style={{ width: 557, height: 220, position: "relative" }}>
            <div style={{ width: "100%", height: 220 }}>
              <Pie title="" data={dataNum}></Pie>
            </div>
            <div style={{ marginLeft: 70, position: "absolute", top: "55%" }}>
              <Popover content="人像卡口和超级卡口设备抓拍总量">
                <QuestionCircleOutlined /> 
              </Popover>
              数据总量
            </div>
          </div>
        </div>
        <div className={styles.deviceDistribute}>
          <Title title="设备分布" description="活跃率：当日活跃的登记设备数/登记设备数"></Title>
          <Bar />
        </div>
        <div className={styles.bottom}>
          <div className={styles.bottomLeft}>
            <Title title="数据分布"></Title>
            <div style={{ padding: "0 24px" }}>
              <div
                style={{
                  lineHeight: "40px",
                  color: "rgba(199, 204, 208, 1)",
                  fontSize: "12px",
                }}
              >
                今日数据
              </div>
              {(todayNum || []).map((item, index) => (
                <div key={index} className={styles.areaDevice}>
                  <div className={styles.rank}>{index + 1}</div>
                  <div title={item.k1} className={styles.areaDeviceName}>
                    {item.k1}
                  </div>
                  <div className={styles.areaDeviceRate}>
                    <span className={styles.areaDeviceRank}>
                      {item.k2 === item.k3 ? (
                        <span>-</span>
                      ) : (
                        <img src={item.k2 > item.k3 ? up : down}></img>
                      )}
                    </span>
                    <span>
                      {
                        Number(item.k4) ? `${Number((Math.abs(Number(item.k4)) * 100).toFixed(2))}%` : '-'
                      }
                    </span>
                  </div>
                  <div className={styles.areaDeviceValue}>
                    {bigNumberTransform(item.k2)}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.bottomRight}>
            <Title title="图片数量板块分布"></Title>
            <ImgPie />
          </div>
        </div>
      </div>
      <div className={styles.rightPart}>
        <div className={styles.rightTop}>
          <Title title="异常设备分布"></Title>
          <div className={styles.text}>
            <div className={styles.text_left}>
              {mapData.unusualDeviceSpread
                ? mapData.unusualDeviceSpread
                  .slice(0, 13)
                  .map((item, index) => (
                    <div key={index + 1}>
                      <div
                        style={{
                          color: "rgba(199, 204, 208, 1)",
                          fontSize: 14,
                        }}
                      >
                        <span
                          style={{
                            width: 80,
                            display: "inline-block",
                            textAlign: "right",
                          }}
                        >
                          {item.k1}：
                        </span>
                        <span>{bigNumberTransform(item.k3)}</span>
                      </div>
                    </div>
                  ))
                : ""}
            </div>
            <div className={styles.text_right}>
              <Map
                data={
                  mapData.unusualDeviceSpread &&
                  mapData.unusualDeviceSpread.slice(0, 13)
                }
                getDeviceTop5={getDeviceTop5}
                getPlaceName={getPlaceName}
              />
            </div>
          </div>
        </div>
        <div className={styles.rightBottom}>
          <Title title="今日设备质量TOP5分布排名"></Title>
          <div className={styles.placeName}>{placeName}</div>
          <div className={styles.deviceQuality}>
            <Rank2
              title="设备活跃"
              content="当日活跃的登记设备数/登记设备数"
              data={
                rankData.deviceAliveWithUnit &&
                rankData.deviceAliveWithUnit.slice(0, 5)
              }
            ></Rank2>
            <Rank1
              title="及时上传"
              content="当日抓拍及时数据量/当日抓拍总量"
              data={
                rankData.uploadTimelyWithUnit &&
                rankData.uploadTimelyWithUnit.slice(0, 5)
              }
            ></Rank1>
            <Rank3
              title="时钟异常"
              content="当日倒挂的登记设备数(请求时间<抓拍时间)/登记设备数"
              data={
                rankData.clockAbnormalWithUnit &&
                rankData.clockAbnormalWithUnit.slice(0, 5)
              }
            ></Rank3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrontEnd;
