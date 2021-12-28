import React, { useEffect, useState } from "react";
import { Card } from "antd";
import styles from "./index.less";
import DataBar from "./child/dataBar";
import Line from "./child/line";
import AccessTime from "./child/accessTime";
import Pie from "./pie";
import Bar from "./bar";
import Radar from "./radar";
import Counts from "./counts";
import TopLine from "./topLine";
import {
  accessdeviceRegister,
  deviceCounts,
  aliveCounts,
  deviceSample,
  qualityCount,
  deviceData,
} from "@/services/v1";
import LabelPie from "./child/labelPie";
import { getCounts } from "@/utils/utils";

const Dashboard = () => {
  const [data, setData]: any = useState([]);
  const [data1, setData1]: any = useState([]);
  const [data2, setData2]: any = useState([]);
  const [data3, setData3]: any = useState([]);
  const [data4, setData4]: any = useState([]);
  const [data5, setData5]: any = useState([]);
  const [data6, setData6]: any = useState([]);
  const [data7, setData7]: any = useState([]);
  const [data9, setData9]: any = useState([]);
  const [data10, setData10]: any = useState([]);
  const [data11, setData11]: any = useState([]);
  const [data12, setData12]: any = useState([]);

  const format = (val) => {
    const v: any = Number(val) * 100;
    return Number(v.toFixed(2));
  };

  useEffect(() => {
    aliveCounts().then((res) => {
      if (res) {
        setData1(res);
      }
    });
    accessdeviceRegister().then((res) => {
      if (res) {
        setData(res);
      }
    });
    deviceCounts({ type: "wdfx" }).then((res) => {
      if (res) {
        setData2(res);
      }
    });
    deviceCounts({ type: "sgwd" }).then((res) => {
      if (res) {
        setData3(res);
      }
    });
    deviceCounts({ type: "zdqy" }).then((res) => {
      if (res) {
        setData4(res);
      }
    });
    deviceCounts({ type: "sbbqfb" }).then((res) => {
      if (res) {
        setData5(res);
      }
    });
    deviceCounts({ type: "szbq" }).then((res) => {
      if (res) {
        setData11(res);
      }
    });
    deviceCounts({ type: "ywbq" }).then((res) => {
      if (res) {
        setData12(res);
      }
    });

    qualityCount().then((res) => {
      if (res) {
        setData9(res);
      }
    });
    deviceData({ type: "delay" }).then((res) => {
      if (res) {
        setData10(res);
      }
    });
    deviceSample({ type: "01" }).then((res) => {
      if (res) {
        setData6(
          res.map((m) => {
            return { ...m, value: format(m.value) };
          })
        );
      }
    });
    deviceSample({ type: "25" }).then((res) => {
      if (res) {
        setData7(
          res.map((m) => {
            return { ...m, value: format(m.value) };
          })
        );
      }
    });
  }, []);

  return (
    <div className={styles.file}>
      <Card bordered={false}>
        <Counts />
      </Card>
      <Card bordered={false} style={{ marginTop: 10 }}>
        <div className={styles.part_1}>
          <div className={styles.item}>
            <div className={styles.title}>设备建档</div>
            <div className={styles.content}>
              <DataBar data={data} />
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.title}>各地设备活跃情况</div>
            <div className={styles.content}>
              <Line data={data1} />
            </div>
          </div>
        </div>
      </Card>
      <Card bordered={false} style={{ marginTop: 10 }}>
        <div className={styles.part_1}>
          <div className={styles.item}>
            <div className={styles.title}>档案质态</div>
            <div className={styles.content}>
              <div style={{ display: "flex", height: 140 }}>
                <div style={{ width: "55%" }}>
                  <Pie title="五道防线" data={data2} />
                </div>
                <div style={{ width: "45%" }}>
                  <Pie title="四个维度" data={data3} />
                </div>
              </div>
              <div className={styles.title_bar}>位置分布</div>
            </div>
            <div className={styles.content1}>
              <Bar title="场景分布" data={data4} />
            </div>
            <div className={`${styles.content1} ${styles.content2}`}>
              <div style={{ width: "50%" }}>
                <Pie
                  title="设备标签分布"
                  data={data5}
                  y="bottom"
                  radius="65%"
                  legend={{
                    top: "30%",
                    orient: "vertical",
                    right: "15%",
                    textStyle: {
                      //图例文字的样式
                      color: "#fff",
                      fontSize: 12,
                    },
                  }}
                  center={["30%", "50%"]}
                />
              </div>
              <div style={{ width: "25%" }}>
                <LabelPie
                  title="实战标签覆盖率"
                  data={getCounts(data11, "实战标签覆盖率")}
                />
              </div>
              <div style={{ width: "25%" }}>
                <LabelPie
                  title="业务标签覆盖率"
                  data={getCounts(data12, "业务标签覆盖率")}
                />
              </div>
            </div>
          </div>
          <div className={styles.item}>
            {/* <div className={styles.title}>接入方式</div>
            <div className={styles.content}>
              <AccessPie data={AccessPieData}> </AccessPie>
            </div> */}
            <div className={styles.title}>接入完整性</div>
            <div
              className={styles.content}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <div style={{ width: "45%" }}>
                {data6 && data6.length && (
                  <Radar title="人像卡口" data={data6} />
                )}
              </div>
              <div style={{ width: "45%" }}>
                {data7 && data7.length && (
                  <Radar title="超级卡口" data={data7} radius="30%" />
                )}
              </div>
            </div>
            <div className={styles.title}>接入及时性</div>
            <div
              className={styles.content}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <div style={{ width: "45%" }}>
                <AccessTime title="延迟率" data={getCounts(data10, "延迟率")} />
              </div>
              <div style={{ width: "45%" }}>
                <AccessTime title="倒挂率" data={getCounts(data10, "倒挂率")} />
              </div>
            </div>
            <div className={styles.title}>top100图片质量较差设备分布</div>
            <div className={styles.content}>
              <TopLine data={data9} />
            </div>
            {/* <div className={styles.title}>接入关系</div>
            <div className={styles.content}>
              <div
                style={{
                  display: "flex",
                  height: 160,
                }}
              >
                <div style={{ width: "20%" }}>
                  <p>人车同拍</p>
                  <p>3.1W+</p>
                </div>
                <div style={{ width: "25%" }}>
                  <AccessRelation title="关系占比" data={data6} />
                </div>
                <div style={{ width: "20%" }}>
                  <p>人人同拍</p>
                  <p>3.1W+</p>
                </div>
                <div style={{ width: "25%" }}>
                  <AccessRelation title="关系占比" data={data7} />
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
